import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Articles.css'; // Use the same styles as public articles page

// Import article images
import Article1 from '../assets/Article1.jpg';
import Article2 from '../assets/Article2.png';
import Article3 from '../assets/Article3.png';
import Article4 from '../assets/Article4.jpg';
import Article5 from '../assets/Article5.jpg';

// Map article image paths to actual imported images
const articleImageMap: Record<string, string> = {
  '/assets/Article1.jpg': Article1,
  '/assets/Article2.png': Article2,
  '/assets/Article3.png': Article3,
  '/assets/Article4.jpg': Article4,
  '/assets/Article5.jpg': Article5
};

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category?: string;
  tags?: string;
  is_published: number;
  is_featured: number;
  publish_date?: string;
  created_at?: string;
}

const ArticleManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '/assets/Article1.jpg',
    author: 'Dan Landi',
    category: 'teaching_methodology',
    tags: '',
    is_published: 1,
    is_featured: 0,
    publish_date: new Date().toISOString().split('T')[0]
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('cms_token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8787/api/cms/articles', getAuthHeaders());
      setArticles(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingArticle) {
        await axios.put(
          `http://localhost:8787/api/cms/articles/${editingArticle.id}`,
          formData,
          getAuthHeaders()
        );
      } else {
        await axios.post('http://localhost:8787/api/cms/articles', formData, getAuthHeaders());
      }
      fetchArticles();
      resetForm();
      alert('Article saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content,
      featured_image: article.featured_image || '/assets/Article1.jpg',
      author: article.author,
      category: article.category || 'teaching_methodology',
      tags: article.tags || '',
      is_published: article.is_published,
      is_featured: article.is_featured,
      publish_date: article.publish_date || new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.delete(`http://localhost:8787/api/cms/articles/${id}`, getAuthHeaders());
      fetchArticles();
      alert('Article deleted successfully!');
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '/assets/Article1.jpg',
      author: 'Dan Landi',
      category: 'teaching_methodology',
      tags: '',
      is_published: 1,
      is_featured: 0,
      publish_date: new Date().toISOString().split('T')[0]
    });
    setEditingArticle(null);
    setShowForm(false);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    (article.excerpt && article.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="articles-blog-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="blog-header">Article Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : '+ Add New Article'}
        </button>
      </div>

      <div className="blog-search-container">
        <input
          type="text"
          className="blog-search"
          placeholder="Search articles..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem' }}>{editingArticle ? 'Edit Article' : 'Create New Article'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Title *"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <input
                type="text"
                placeholder="Slug (e.g., my-article-title) *"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                required
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <textarea
                placeholder="Excerpt"
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                rows={2}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <textarea
                placeholder="Content *"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                required
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              />
              <select
                value={formData.featured_image}
                onChange={e => setFormData({ ...formData, featured_image: e.target.value })}
                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px' }}
              >
                <option value="/assets/Article1.jpg">Article Image 1</option>
                <option value="/assets/Article2.png">Article Image 2</option>
                <option value="/assets/Article3.png">Article Image 3</option>
                <option value="/assets/Article4.jpg">Article Image 4</option>
                <option value="/assets/Article5.jpg">Article Image 5</option>
              </select>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={resetForm} style={{
                  flex: 1, padding: '0.75rem', backgroundColor: '#6c757d', color: 'white',
                  border: 'none', borderRadius: '6px', cursor: 'pointer'
                }}>Cancel</button>
                <button type="submit" style={{
                  flex: 1, padding: '0.75rem', backgroundColor: '#667eea', color: 'white',
                  border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600
                }}>{editingArticle ? 'Update' : 'Create'} Article</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No articles found. {search ? 'Try a different search.' : 'Click "Add New Article" to get started!'}</p>
        </div>
      ) : (
        <div className="blog-list">
          {filteredArticles.map((article) => {
            // Get the actual imported image for this article
            const articleImage = article.featured_image
              ? (articleImageMap[article.featured_image] || article.featured_image)
              : null;

            return (
              <div key={article.id} className="blog-card blog-summary-card">
                <div className="blog-image-link">
                  {articleImage ? (
                    <img src={articleImage} alt={article.title} className="blog-image" />
                  ) : (
                    <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      No Image
                    </div>
                  )}
                </div>
                <div className="blog-content">
                  <h2 className="blog-title">{article.title}</h2>
                  <div className="blog-meta-row">
                    <span className="blog-author">{article.author}</span>
                    <span className="blog-date">
                      {article.publish_date ? new Date(article.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : 'Not published'}
                    </span>
                    <span className={`blog-comments ${article.is_published ? '' : 'draft-badge'}`}>
                      {article.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="blog-body">
                    <p>{article.excerpt || article.content.substring(0, 150)}...</p>
                  </div>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(article)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
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
  );
};

export default ArticleManagement;
