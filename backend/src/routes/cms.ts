import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

// =====================
// AUTHENTICATION ROUTES
// =====================

// Login
router.post('/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], authController.login);

// Register (Only admins can create new users)
router.post('/auth/register', [
  authenticateToken,
  requireRole(['admin']),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('full_name').notEmpty(),
  body('role').optional().isIn(['admin', 'editor', 'viewer'])
], authController.register);

// Get current user
router.get('/auth/me', authenticateToken, authController.getCurrentUser);

// Change password
router.post('/auth/change-password', [
  authenticateToken,
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 })
], authController.changePassword);

// =====================
// VIDEO ROUTES
// =====================

import {
  getAllVideos,
  getVideosByPage,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo
} from '../services/cmsDatabase';

// Get all videos (admin)
router.get('/videos', authenticateToken, async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.json({ videos });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get videos by page (public)
router.get('/videos/page/:page', async (req, res) => {
  try {
    const { page } = req.params;
    const videos = await getVideosByPage(page);
    res.json({ videos });
  } catch (error) {
    console.error('Get videos by page error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get video by ID
router.get('/videos/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const video = await getVideoById(id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ video });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create video (admin/editor)
router.post('/videos', [
  authenticateToken,
  requireRole(['admin', 'editor']),
  body('title').notEmpty(),
  body('video_url').notEmpty().isURL()
], async (req, res) => {
  try {
    const video = req.body;
    video.created_by = (req as any).user.id;
    const result = await createVideo(video);
    res.status(201).json({ message: 'Video created', id: result.meta.last_row_id });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update video (admin/editor)
router.put('/videos/:id', [
  authenticateToken,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await updateVideo(id, req.body);
    res.json({ message: 'Video updated' });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete video (admin only)
router.delete('/videos/:id', [
  authenticateToken,
  requireRole(['admin'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteVideo(id);
    res.json({ message: 'Video deleted' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================
// ARTICLE ROUTES
// =====================

import {
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle
} from '../services/cmsDatabase';

// Get all articles
router.get('/articles', async (req, res) => {
  try {
    const publishedOnly = req.query.published === 'true';
    const articles = await getAllArticles(publishedOnly);
    res.json({ articles });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get article by ID
router.get('/articles/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const article = await getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ article });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get article by slug
router.get('/articles/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await getArticleBySlug(slug);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ article });
  } catch (error) {
    console.error('Get article by slug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create article (admin/editor)
router.post('/articles', [
  authenticateToken,
  requireRole(['admin', 'editor']),
  body('title').notEmpty(),
  body('slug').notEmpty(),
  body('content').notEmpty(),
  body('author').notEmpty()
], async (req, res) => {
  try {
    const article = req.body;
    article.created_by = (req as any).user.id;
    const result = await createArticle(article);
    res.status(201).json({ message: 'Article created', id: result.meta.last_row_id });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update article (admin/editor)
router.put('/articles/:id', [
  authenticateToken,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await updateArticle(id, req.body);
    res.json({ message: 'Article updated' });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete article (admin only)
router.delete('/articles/:id', [
  authenticateToken,
  requireRole(['admin'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteArticle(id);
    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================
// PRODUCT ROUTES
// =====================

import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/cmsDatabase';

// Get all products
router.get('/products', async (req, res) => {
  try {
    const activeOnly = req.query.active === 'true';
    const products = await getAllProducts(activeOnly);
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products by category
router.get('/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await getProductsByCategory(category);
    res.json({ products });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create product (admin/editor)
router.post('/products', [
  authenticateToken,
  requireRole(['admin', 'editor']),
  body('name').notEmpty(),
  body('slug').notEmpty(),
  body('price').isNumeric(),
  body('product_type').notEmpty()
], async (req, res) => {
  try {
    const product = req.body;
    product.created_by = (req as any).user.id;
    const result = await createProduct(product);
    res.status(201).json({ message: 'Product created', id: result.meta.last_row_id });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update product (admin/editor)
router.put('/products/:id', [
  authenticateToken,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await updateProduct(id, req.body);
    res.json({ message: 'Product updated' });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete product (admin only)
router.delete('/products/:id', [
  authenticateToken,
  requireRole(['admin'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================
// WEBINAR ROUTES
// =====================

import {
  getAllWebinars,
  getUpcomingWebinars,
  getWebinarById,
  createWebinar,
  updateWebinar,
  deleteWebinar
} from '../services/cmsDatabase';

// Get all webinars
router.get('/webinars', async (req, res) => {
  try {
    const webinars = await getAllWebinars();
    res.json({ webinars });
  } catch (error) {
    console.error('Get webinars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get upcoming webinars
router.get('/webinars/upcoming', async (req, res) => {
  try {
    const webinars = await getUpcomingWebinars();
    res.json({ webinars });
  } catch (error) {
    console.error('Get upcoming webinars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get webinar by ID
router.get('/webinars/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const webinar = await getWebinarById(id);
    if (!webinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    res.json({ webinar });
  } catch (error) {
    console.error('Get webinar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create webinar (admin/editor)
router.post('/webinars', [
  authenticateToken,
  requireRole(['admin', 'editor']),
  body('title').notEmpty()
], async (req, res) => {
  try {
    const webinar = req.body;
    webinar.created_by = (req as any).user.id;
    const result = await createWebinar(webinar);
    res.status(201).json({ message: 'Webinar created', id: result.meta.last_row_id });
  } catch (error) {
    console.error('Create webinar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update webinar (admin/editor)
router.put('/webinars/:id', [
  authenticateToken,
  requireRole(['admin', 'editor'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await updateWebinar(id, req.body);
    res.json({ message: 'Webinar updated' });
  } catch (error) {
    console.error('Update webinar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete webinar (admin only)
router.delete('/webinars/:id', [
  authenticateToken,
  requireRole(['admin'])
], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteWebinar(id);
    res.json({ message: 'Webinar deleted' });
  } catch (error) {
    console.error('Delete webinar error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
