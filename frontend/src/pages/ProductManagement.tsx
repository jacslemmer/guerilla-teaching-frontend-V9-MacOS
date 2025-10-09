import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import './IGCSECoursesGrid.css'; // Use the same styles as public website

// Import all IGCSE course images
import GCSEAfrikaans from '../assets/GCSE Afrikaans.jpeg';
import GCSEBiology from '../assets/GCSE Biology.jpeg';
import GCSEBusiness from '../assets/GCSE Business.jpg';
import GCSEEnglish from '../assets/GCSE English.jpeg';
import GCSEChemistry from '../assets/GCSE Chemistry.jpeg';
import GCSEEnvironmentalManagement from '../assets/GCSE Environmental management.jpeg';
import GCSEGeography from '../assets/GCSE Geography Cambridge.jpeg';
import GCSEHistory from '../assets/GCSE History.jpeg';
import GCSEMath from '../assets/GCSE Math.jpg';
import GCSEPhysics from '../assets/GCSE Physics.jpeg';
import GCSEReligiousStudies from '../assets/GCSE Religious Studies.png';

// Import all AS Level course images
import ASBiology from '../assets/AS Biology.jpeg';
import ASBusiness from '../assets/AS Business.jpeg';
import ASChemistry from '../assets/AS Chemistry.jpeg';
import ASEnglish from '../assets/AS English.jpeg';
import ASGeographyPearson from '../assets/AS Geography Pearson.jpeg';
import ASGeographyCambridge from '../assets/AS Geography.jpeg';
import ASEnvironmentManagement from '../assets/AS Environment Management.jpeg';
import ASMath from '../assets/AS Math.jpeg';
import ASPhysics from '../assets/AS Physics.jpeg';
import ASReligiousStudies from '../assets/AS Relgious Studies.png';

interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  currency: string;
  image_url?: string;
  product_type: string;
  category?: string;
  exam_board?: string;
  duration?: string;
  is_active: number;
  is_featured: number;
  display_order: number;
  created_at?: string;
}

// Map product slugs to actual imported images
const productImageMap: Record<string, string> = {
  // IGCSE courses
  'igcse-mathematics': GCSEMath,
  'igcse-physics': GCSEPhysics,
  'igcse-chemistry': GCSEChemistry,
  'igcse-biology': GCSEBiology,
  'igcse-english': GCSEEnglish,
  'igcse-afrikaans': GCSEAfrikaans,
  'igcse-history': GCSEHistory,
  'igcse-geography': GCSEGeography,
  'igcse-business': GCSEBusiness,
  'igcse-environmental-management': GCSEEnvironmentalManagement,
  'igcse-religious-studies': GCSEReligiousStudies,

  // AS Level courses
  'as-biology': ASBiology,
  'as-business': ASBusiness,
  'as-chemistry': ASChemistry,
  'as-english': ASEnglish,
  'as-geography-pearson': ASGeographyPearson,
  'as-geography-cambridge': ASGeographyCambridge,
  'as-environment-management': ASEnvironmentManagement,
  'as-math': ASMath,
  'as-physics': ASPhysics,
  'as-religious-studies': ASReligiousStudies
};

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<'igcse' | 'as'>('igcse'); // IGCSE or AS Level
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: 350,
    currency: 'ZAR',
    image_url: '',
    product_type: 'course',
    category: 'Sciences',
    exam_board: 'Pearson',
    duration: '2 years',
    is_active: 1,
    is_featured: 1,
    display_order: 0
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('cms_token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getApiUrl('/api/cms/products'), getAuthHeaders());
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure slug has correct prefix
    const slugPrefix = selectedLevel === 'igcse' ? 'igcse-' : 'as-';
    const slug = formData.slug.startsWith(slugPrefix) ? formData.slug : slugPrefix + formData.slug;

    try {
      const productData = { ...formData, slug };

      if (editingProduct) {
        await axios.put(
          getApiUrl(`/api/cms/products/${editingProduct.id}`),
          productData,
          getAuthHeaders()
        );
      } else {
        await axios.post(getApiUrl('/api/cms/products'), productData, getAuthHeaders());
      }
      fetchProducts();
      resetForm();
      alert('Product saved successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      short_description: product.short_description || '',
      price: product.price,
      currency: product.currency,
      image_url: product.image_url || '',
      product_type: product.product_type,
      category: product.category || 'Sciences',
      exam_board: product.exam_board || 'Pearson',
      duration: product.duration || '2 years',
      is_active: product.is_active,
      is_featured: product.is_featured,
      display_order: product.display_order
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete "${name}"?\n\nThis action cannot be undone.`)) return;
    try {
      await axios.delete(getApiUrl(`/api/cms/products/${id}`), getAuthHeaders());
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: 350,
      currency: 'ZAR',
      image_url: '',
      product_type: 'course',
      category: 'Sciences',
      exam_board: 'Pearson',
      duration: selectedLevel === 'igcse' ? '2 years' : '1 year',
      is_active: 1,
      is_featured: 1,
      display_order: 0
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  // Filter products by level (IGCSE or AS)
  const levelProducts = products.filter(p => {
    if (selectedLevel === 'igcse') {
      return p.slug.startsWith('igcse-');
    } else {
      return p.slug.startsWith('as-');
    }
  });

  // Get unique categories for the selected level
  const categories = [
    { id: 'all', name: 'All Courses', count: levelProducts.length },
    ...Array.from(new Set(levelProducts.map(p => p.category).filter(Boolean)))
      .map(cat => ({
        id: cat!,
        name: cat!,
        count: levelProducts.filter(p => p.category === cat).length
      }))
  ];

  const filteredProducts = selectedCategory === 'all'
    ? levelProducts
    : levelProducts.filter(product => product.category === selectedCategory);

  return (
    <div className="igcse-courses-grid">
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="container">
          <h1>Product Management</h1>
          <p className="hero-description">
            Manage all products and courses in the database. Changes here will be reflected throughout the system.
          </p>

          {/* Level Tabs - IGCSE / AS Level */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
            marginBottom: '1rem'
          }}>
            <button
              onClick={() => {
                setSelectedLevel('igcse');
                setSelectedCategory('all');
              }}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: selectedLevel === 'igcse' ? '#667eea' : 'white',
                color: selectedLevel === 'igcse' ? 'white' : '#667eea',
                border: `2px solid #667eea`,
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              IGCSE Courses ({products.filter(p => p.slug.startsWith('igcse-')).length})
            </button>
            <button
              onClick={() => {
                setSelectedLevel('as');
                setSelectedCategory('all');
              }}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: selectedLevel === 'as' ? '#667eea' : 'white',
                color: selectedLevel === 'as' ? 'white' : '#667eea',
                border: `2px solid #667eea`,
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              AS Level Courses ({products.filter(p => p.slug.startsWith('as-')).length})
            </button>
          </div>

          <button
            className="add-to-quote-btn"
            style={{ marginTop: '0.5rem' }}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : `+ Add New ${selectedLevel === 'igcse' ? 'IGCSE' : 'AS Level'} Product`}
          </button>
        </div>
      </section>

      {/* Product Form */}
      {showForm && (
        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '1.5rem' }}>
                {editingProduct ? 'Edit Product' : `Create New ${selectedLevel === 'igcse' ? 'IGCSE' : 'AS Level'} Product`}
              </h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Product Name *"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                  <input
                    type="text"
                    placeholder={`Slug (${selectedLevel}-...) *`}
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    required
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    style={{ gridColumn: '1 / -1', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Business">Business</option>
                  </select>
                  <select
                    value={formData.exam_board}
                    onChange={e => setFormData({ ...formData, exam_board: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  >
                    <option value="Pearson">Pearson</option>
                    <option value="Cambridge">Cambridge</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Duration (e.g., 2 years)"
                    value={formData.duration}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                  <input
                    type="number"
                    placeholder="Price *"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    required
                    step="0.01"
                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                  <input
                    type="text"
                    placeholder="Image Path (e.g., /assets/GCSE Math.jpg)"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    style={{ gridColumn: '1 / -1', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={resetForm} style={{
                    flex: 1, padding: '0.75rem', backgroundColor: '#6c757d', color: 'white',
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
                  }}>Cancel</button>
                  <button type="submit" style={{
                    flex: 1, padding: '0.75rem', backgroundColor: '#667eea', color: 'white',
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600
                  }}>{editingProduct ? 'Update' : 'Create'} Product</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="course-categories">
        <div className="container">
          <h2>Browse by Category</h2>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="category-count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="courses-content">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p>No products yet. Click "Add New Product" to get started!</p>
            </div>
          ) : (
            <div className="courses-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              {filteredProducts.map((product) => {
                // Get the actual imported image for this product
                const productImage = productImageMap[product.slug] || product.image_url || GCSEMath;

                return (
                  <div key={product.id} className="course-card">

                    <div className="course-image">
                      <img src={productImage} alt={product.name} />
                      {product.exam_board && (
                        <div className="exam-board-badge">
                          {product.exam_board}
                        </div>
                      )}
                    </div>

                    <div className="course-content">
                      <h3 className="course-title">{product.name}</h3>
                      <p className="course-description">
                        {product.description || product.short_description || 'No description available'}
                      </p>

                      <div className="course-details">
                        {product.duration && (
                          <div className="detail-item">
                            <span className="detail-label">Duration:</span>
                            <span className="detail-value">{product.duration}</span>
                          </div>
                        )}
                        {product.category && (
                          <div className="detail-item">
                            <span className="detail-label">Category:</span>
                            <span className="detail-value">{product.category}</span>
                          </div>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value" style={{
                            color: product.is_active ? '#155724' : '#721c24',
                            fontWeight: 500
                          }}>
                            {product.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <div className="course-price">
                        <span className="price-amount">{product.currency} {product.price.toFixed(2)}</span>
                        <span className="price-period">/course</span>
                      </div>

                      <div className="course-actions" style={{ gap: '0.5rem' }}>
                        <button
                          className="add-to-quote-btn"
                          style={{
                            backgroundColor: '#667eea',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem'
                          }}
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="view-details-btn"
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            borderColor: '#dc3545',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem'
                          }}
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductManagement;
