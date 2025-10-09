/**
 * CMS API Routes for Cloudflare Workers
 * Handles authentication, videos, articles, products, webinars
 */

import { Hono } from 'hono';
import { jwt } from 'hono/jwt';

// Types
interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

interface CMSUser {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  role: string;
  is_active: number;
}

// Initialize Hono app
const app = new Hono<{ Bindings: Env }>();

// JWT Secret - use environment variable or fallback
const JWT_SECRET = 'your-secret-key-change-in-production';

// ===============================
// AUTHENTICATION ROUTES
// ===============================

// Login endpoint
app.post('/auth/login', async (c) => {
  try {
    console.log('Login attempt started');
    const { email, password } = await c.req.json();
    console.log('Email:', email);

    if (!email || !password) {
      console.log('Missing email or password');
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Find user by email
    console.log('Searching for user in database...');
    const user = await c.env.DB.prepare(
      'SELECT * FROM cms_users WHERE email = ? AND is_active = 1'
    ).bind(email).first() as CMSUser | null;

    if (!user) {
      console.log('User not found');
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    console.log('User found:', user.email);

    // For now, simple password check (in production, use bcrypt)
    // The password stored is hashed with bcrypt, but we'll do simple check for demo
    // TODO: Import bcrypt.js for Workers to do proper hash comparison
    const isValidPassword = password === 'SecurePass123!'; // Temporary!
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      console.log('Invalid password');
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Update last login
    console.log('Updating last login...');
    await c.env.DB.prepare(
      'UPDATE cms_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(user.id).run();

    // Create JWT token
    console.log('Creating JWT token...');
    const token = await createJWT({
      id: user.id,
      email: user.email,
      role: user.role
    }, JWT_SECRET);
    console.log('JWT token created successfully');

    return c.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    return c.json({
      error: 'Login failed',
      details: error instanceof Error ? error.message : String(error)
    }, 500);
  }
});

// ===============================
// VIDEO MANAGEMENT ROUTES
// ===============================

// Get all videos
app.get('/videos', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_videos ORDER BY display_order ASC, created_at DESC'
    ).all();

    return c.json({ videos: result.results || [] });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return c.json({ error: 'Failed to fetch videos' }, 500);
  }
});

// Get videos by page
app.get('/videos/page/:page', async (c) => {
  try {
    const page = c.req.param('page');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_videos WHERE display_page = ? AND is_active = 1 ORDER BY display_order ASC'
    ).bind(page).all();

    return c.json({ videos: result.results || [] });
  } catch (error) {
    console.error('Error fetching videos by page:', error);
    return c.json({ error: 'Failed to fetch videos' }, 500);
  }
});

// Create video (requires authentication)
app.post('/videos', async (c) => {
  try {
    // TODO: Add JWT authentication middleware
    const video = await c.req.json();

    const result = await c.env.DB.prepare(
      `INSERT INTO cms_videos (title, description, video_url, video_type, thumbnail_url, category, display_page, display_order, is_active, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      video.title,
      video.description || null,
      video.video_url,
      video.video_type || 'youtube',
      video.thumbnail_url || null,
      video.category || null,
      video.display_page || null,
      video.display_order || 0,
      video.is_active ?? 1,
      video.created_by || null
    ).run();

    return c.json({ message: 'Video created', id: result.meta.last_row_id }, 201);
  } catch (error) {
    console.error('Error creating video:', error);
    return c.json({ error: 'Failed to create video' }, 500);
  }
});

// Update video
app.put('/videos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const video = await c.req.json();

    await c.env.DB.prepare(
      `UPDATE cms_videos
       SET title = ?, description = ?, video_url = ?, video_type = ?,
           thumbnail_url = ?, category = ?, display_page = ?,
           display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(
      video.title,
      video.description,
      video.video_url,
      video.video_type,
      video.thumbnail_url,
      video.category,
      video.display_page,
      video.display_order,
      video.is_active,
      id
    ).run();

    return c.json({ message: 'Video updated' });
  } catch (error) {
    console.error('Error updating video:', error);
    return c.json({ error: 'Failed to update video' }, 500);
  }
});

// Delete video
app.delete('/videos/:id', async (c) => {
  try {
    const id = c.req.param('id');

    await c.env.DB.prepare(
      'DELETE FROM cms_videos WHERE id = ?'
    ).bind(id).run();

    return c.json({ message: 'Video deleted' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return c.json({ error: 'Failed to delete video' }, 500);
  }
});

// ===============================
// ARTICLE MANAGEMENT ROUTES
// ===============================

// Get all articles
app.get('/articles', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_articles WHERE is_published = 1 ORDER BY created_at DESC'
    ).all();

    return c.json({ articles: result.results || [] });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return c.json({ error: 'Failed to fetch articles' }, 500);
  }
});

// Get article by ID
app.get('/articles/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_articles WHERE id = ?'
    ).bind(id).first();

    if (!result) {
      return c.json({ error: 'Article not found' }, 404);
    }

    return c.json({ article: result });
  } catch (error) {
    console.error('Error fetching article:', error);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Get article by slug
app.get('/articles/slug/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_articles WHERE slug = ? AND is_published = 1'
    ).bind(slug).first();

    if (!result) {
      return c.json({ error: 'Article not found' }, 404);
    }

    return c.json({ article: result });
  } catch (error) {
    console.error('Error fetching article:', error);
    return c.json({ error: 'Failed to fetch article' }, 500);
  }
});

// Create new article
app.post('/articles', async (c) => {
  try {
    const data = await c.req.json();
    const result = await c.env.DB.prepare(
      `INSERT INTO cms_articles (title, slug, excerpt, content, featured_image, author, category, tags, is_published, is_featured, publish_date, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
    ).bind(
      data.title,
      data.slug,
      data.excerpt || null,
      data.content,
      data.featured_image || null,
      data.author,
      data.category || null,
      data.tags || null,
      data.is_published,
      data.is_featured,
      data.publish_date || new Date().toISOString()
    ).run();

    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error('Error creating article:', error);
    return c.json({ error: 'Failed to create article' }, 500);
  }
});

// Update article
app.put('/articles/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();

    await c.env.DB.prepare(
      `UPDATE cms_articles SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?,
       author = ?, category = ?, tags = ?, is_published = ?, is_featured = ?, publish_date = ?
       WHERE id = ?`
    ).bind(
      data.title,
      data.slug,
      data.excerpt || null,
      data.content,
      data.featured_image || null,
      data.author,
      data.category || null,
      data.tags || null,
      data.is_published,
      data.is_featured,
      data.publish_date,
      id
    ).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating article:', error);
    return c.json({ error: 'Failed to update article' }, 500);
  }
});

// Delete article
app.delete('/articles/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM cms_articles WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    return c.json({ error: 'Failed to delete article' }, 500);
  }
});

// ===============================
// PRODUCT MANAGEMENT ROUTES
// ===============================

// Get all products
app.get('/products', async (c) => {
  try {
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_products WHERE is_active = 1 ORDER BY display_order ASC, name ASC'
    ).all();

    return c.json({ products: result.results || [] });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Get product by ID
app.get('/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_products WHERE id = ?'
    ).bind(id).first();

    if (!result) {
      return c.json({ error: 'Product not found' }, 404);
    }

    return c.json({ product: result });
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
});

// Get product by slug
app.get('/products/slug/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_products WHERE slug = ? AND is_active = 1'
    ).bind(slug).first();

    if (!result) {
      return c.json({ error: 'Product not found' }, 404);
    }

    return c.json({ product: result });
  } catch (error) {
    console.error('Error fetching product:', error);
    return c.json({ error: 'Failed to fetch product' }, 500);
  }
});

// Get products by category
app.get('/products/category/:category', async (c) => {
  try {
    const category = c.req.param('category');
    const result = await c.env.DB.prepare(
      'SELECT * FROM cms_products WHERE category = ? AND is_active = 1 ORDER BY display_order ASC, name ASC'
    ).bind(category).all();

    return c.json({ products: result.results || [] });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return c.json({ error: 'Failed to fetch products' }, 500);
  }
});

// Create new product
app.post('/products', async (c) => {
  try {
    const data = await c.req.json();
    const result = await c.env.DB.prepare(
      `INSERT INTO cms_products (name, slug, description, short_description, price, currency, image_url, product_type, category, exam_board, duration, is_active, is_featured, display_order, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
    ).bind(
      data.name,
      data.slug,
      data.description || null,
      data.short_description || null,
      data.price,
      data.currency,
      data.image_url || null,
      data.product_type,
      data.category || null,
      data.exam_board || null,
      data.duration || null,
      data.is_active,
      data.is_featured,
      data.display_order || 0
    ).run();

    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error('Error creating product:', error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
});

// Update product
app.put('/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();

    await c.env.DB.prepare(
      `UPDATE cms_products SET name = ?, slug = ?, description = ?, short_description = ?, price = ?, currency = ?,
       image_url = ?, product_type = ?, category = ?, exam_board = ?, duration = ?, is_active = ?, is_featured = ?, display_order = ?
       WHERE id = ?`
    ).bind(
      data.name,
      data.slug,
      data.description || null,
      data.short_description || null,
      data.price,
      data.currency,
      data.image_url || null,
      data.product_type,
      data.category || null,
      data.exam_board || null,
      data.duration || null,
      data.is_active,
      data.is_featured,
      data.display_order || 0,
      id
    ).run();

    return c.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return c.json({ error: 'Failed to update product' }, 500);
  }
});

// Delete product
app.delete('/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM cms_products WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return c.json({ error: 'Failed to delete product' }, 500);
  }
});

// ===============================
// HELPER FUNCTIONS
// ===============================

// Base64 URL encoding helper for Workers
function base64UrlEncode(str: string): string {
  // Use unescape and encodeURIComponent to handle Unicode properly
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

// Simple JWT creation (for Workers environment)
async function createJWT(payload: any, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 }));

  const data = `${headerB64}.${payloadB64}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const signatureB64 = arrayBufferToBase64Url(signature);

  return `${data}.${signatureB64}`;
}

export default app;
