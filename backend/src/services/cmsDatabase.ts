/**
 * CMS Database Service
 * Handles all CMS-related database operations
 */

// Global D1 database reference (will be initialized in server)
let d1Database: any = null;

export const initializeCMSDatabase = (database: any) => {
  d1Database = database;
};

// Helper function to get database
const getDB = () => {
  if (!d1Database) {
    throw new Error('Database not initialized');
  }
  return d1Database;
};

// =====================
// USER MANAGEMENT
// =====================

export interface CMSUser {
  id?: number;
  email: string;
  password_hash?: string;
  full_name: string;
  role: string;
  is_active?: number;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

export const createUser = async (user: CMSUser): Promise<any> => {
  const db = getDB();
  const result = await db.prepare(
    `INSERT INTO cms_users (email, password_hash, full_name, role, is_active)
     VALUES (?, ?, ?, ?, 1)`
  ).bind(user.email, user.password_hash, user.full_name, user.role).run();
  return result;
};

export const findUserByEmail = async (email: string): Promise<CMSUser | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_users WHERE email = ? AND is_active = 1'
  ).bind(email).first();
  return result;
};

export const findUserById = async (id: number): Promise<CMSUser | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT id, email, full_name, role, created_at, last_login FROM cms_users WHERE id = ?'
  ).bind(id).first();
  return result;
};

export const updateUserLastLogin = async (id: number): Promise<void> => {
  const db = getDB();
  await db.prepare(
    'UPDATE cms_users SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(id).run();
};

export const updateUserPassword = async (id: number, passwordHash: string): Promise<void> => {
  const db = getDB();
  await db.prepare(
    'UPDATE cms_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(passwordHash, id).run();
};

// =====================
// VIDEO MANAGEMENT
// =====================

export interface CMSVideo {
  id?: number;
  title: string;
  description?: string;
  video_url: string;
  video_type?: string;
  thumbnail_url?: string;
  category?: string;
  display_page?: string;
  display_order?: number;
  is_active?: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export const createVideo = async (video: CMSVideo): Promise<any> => {
  const db = getDB();
  const result = await db.prepare(
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
  return result;
};

export const getAllVideos = async (): Promise<CMSVideo[]> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_videos ORDER BY display_order ASC, created_at DESC'
  ).all();
  return result.results || [];
};

export const getVideosByPage = async (page: string): Promise<CMSVideo[]> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_videos WHERE display_page = ? AND is_active = 1 ORDER BY display_order ASC'
  ).bind(page).all();
  return result.results || [];
};

export const getVideoById = async (id: number): Promise<CMSVideo | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_videos WHERE id = ?'
  ).bind(id).first();
  return result;
};

export const updateVideo = async (id: number, video: Partial<CMSVideo>): Promise<void> => {
  const db = getDB();
  const fields = [];
  const values = [];

  if (video.title) { fields.push('title = ?'); values.push(video.title); }
  if (video.description !== undefined) { fields.push('description = ?'); values.push(video.description); }
  if (video.video_url) { fields.push('video_url = ?'); values.push(video.video_url); }
  if (video.video_type) { fields.push('video_type = ?'); values.push(video.video_type); }
  if (video.thumbnail_url !== undefined) { fields.push('thumbnail_url = ?'); values.push(video.thumbnail_url); }
  if (video.category !== undefined) { fields.push('category = ?'); values.push(video.category); }
  if (video.display_page !== undefined) { fields.push('display_page = ?'); values.push(video.display_page); }
  if (video.display_order !== undefined) { fields.push('display_order = ?'); values.push(video.display_order); }
  if (video.is_active !== undefined) { fields.push('is_active = ?'); values.push(video.is_active); }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await db.prepare(
    `UPDATE cms_videos SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
};

export const deleteVideo = async (id: number): Promise<void> => {
  const db = getDB();
  await db.prepare('DELETE FROM cms_videos WHERE id = ?').bind(id).run();
};

// =====================
// ARTICLE MANAGEMENT
// =====================

export interface CMSArticle {
  id?: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category?: string;
  tags?: string;
  is_published?: number;
  is_featured?: number;
  publish_date?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export const createArticle = async (article: CMSArticle): Promise<any> => {
  const db = getDB();
  const result = await db.prepare(
    `INSERT INTO cms_articles (title, slug, excerpt, content, featured_image, author, category, tags, is_published, is_featured, publish_date, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    article.title,
    article.slug,
    article.excerpt || null,
    article.content,
    article.featured_image || null,
    article.author,
    article.category || null,
    article.tags || null,
    article.is_published ?? 0,
    article.is_featured ?? 0,
    article.publish_date || null,
    article.created_by || null
  ).run();
  return result;
};

export const getAllArticles = async (publishedOnly = false): Promise<CMSArticle[]> => {
  const db = getDB();
  const query = publishedOnly
    ? 'SELECT * FROM cms_articles WHERE is_published = 1 ORDER BY publish_date DESC'
    : 'SELECT * FROM cms_articles ORDER BY created_at DESC';
  const result = await db.prepare(query).all();
  return result.results || [];
};

export const getArticleById = async (id: number): Promise<CMSArticle | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_articles WHERE id = ?'
  ).bind(id).first();
  return result;
};

export const getArticleBySlug = async (slug: string): Promise<CMSArticle | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_articles WHERE slug = ?'
  ).bind(slug).first();
  return result;
};

export const updateArticle = async (id: number, article: Partial<CMSArticle>): Promise<void> => {
  const db = getDB();
  const fields = [];
  const values = [];

  if (article.title) { fields.push('title = ?'); values.push(article.title); }
  if (article.slug) { fields.push('slug = ?'); values.push(article.slug); }
  if (article.excerpt !== undefined) { fields.push('excerpt = ?'); values.push(article.excerpt); }
  if (article.content) { fields.push('content = ?'); values.push(article.content); }
  if (article.featured_image !== undefined) { fields.push('featured_image = ?'); values.push(article.featured_image); }
  if (article.author) { fields.push('author = ?'); values.push(article.author); }
  if (article.category !== undefined) { fields.push('category = ?'); values.push(article.category); }
  if (article.tags !== undefined) { fields.push('tags = ?'); values.push(article.tags); }
  if (article.is_published !== undefined) { fields.push('is_published = ?'); values.push(article.is_published); }
  if (article.is_featured !== undefined) { fields.push('is_featured = ?'); values.push(article.is_featured); }
  if (article.publish_date !== undefined) { fields.push('publish_date = ?'); values.push(article.publish_date); }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await db.prepare(
    `UPDATE cms_articles SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
};

export const deleteArticle = async (id: number): Promise<void> => {
  const db = getDB();
  await db.prepare('DELETE FROM cms_articles WHERE id = ?').bind(id).run();
};

// =====================
// PRODUCT MANAGEMENT
// =====================

export interface CMSProduct {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  currency?: string;
  image_url?: string;
  product_type: string;
  category?: string;
  exam_board?: string;
  duration?: string;
  subjects_count?: number;
  service_tier?: string;
  features?: string;
  is_active?: number;
  is_featured?: number;
  display_order?: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export const createProduct = async (product: CMSProduct): Promise<any> => {
  const db = getDB();
  const result = await db.prepare(
    `INSERT INTO cms_products (name, slug, description, short_description, price, currency, image_url, product_type, category, exam_board, duration, subjects_count, service_tier, features, is_active, is_featured, display_order, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    product.name,
    product.slug,
    product.description || null,
    product.short_description || null,
    product.price,
    product.currency || 'R',
    product.image_url || null,
    product.product_type,
    product.category || null,
    product.exam_board || null,
    product.duration || null,
    product.subjects_count || 1,
    product.service_tier || null,
    product.features || null,
    product.is_active ?? 1,
    product.is_featured ?? 0,
    product.display_order || 0,
    product.created_by || null
  ).run();
  return result;
};

export const getAllProducts = async (activeOnly = false): Promise<CMSProduct[]> => {
  const db = getDB();
  const query = activeOnly
    ? 'SELECT * FROM cms_products WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC'
    : 'SELECT * FROM cms_products ORDER BY display_order ASC, created_at DESC';
  const result = await db.prepare(query).all();
  return result.results || [];
};

export const getProductById = async (id: number): Promise<CMSProduct | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_products WHERE id = ?'
  ).bind(id).first();
  return result;
};

export const getProductsByCategory = async (category: string): Promise<CMSProduct[]> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_products WHERE category = ? AND is_active = 1 ORDER BY display_order ASC'
  ).bind(category).all();
  return result.results || [];
};

export const updateProduct = async (id: number, product: Partial<CMSProduct>): Promise<void> => {
  const db = getDB();
  const fields = [];
  const values = [];

  if (product.name) { fields.push('name = ?'); values.push(product.name); }
  if (product.slug) { fields.push('slug = ?'); values.push(product.slug); }
  if (product.description !== undefined) { fields.push('description = ?'); values.push(product.description); }
  if (product.short_description !== undefined) { fields.push('short_description = ?'); values.push(product.short_description); }
  if (product.price !== undefined) { fields.push('price = ?'); values.push(product.price); }
  if (product.currency) { fields.push('currency = ?'); values.push(product.currency); }
  if (product.image_url !== undefined) { fields.push('image_url = ?'); values.push(product.image_url); }
  if (product.product_type) { fields.push('product_type = ?'); values.push(product.product_type); }
  if (product.category !== undefined) { fields.push('category = ?'); values.push(product.category); }
  if (product.exam_board !== undefined) { fields.push('exam_board = ?'); values.push(product.exam_board); }
  if (product.duration !== undefined) { fields.push('duration = ?'); values.push(product.duration); }
  if (product.subjects_count !== undefined) { fields.push('subjects_count = ?'); values.push(product.subjects_count); }
  if (product.service_tier !== undefined) { fields.push('service_tier = ?'); values.push(product.service_tier); }
  if (product.features !== undefined) { fields.push('features = ?'); values.push(product.features); }
  if (product.is_active !== undefined) { fields.push('is_active = ?'); values.push(product.is_active); }
  if (product.is_featured !== undefined) { fields.push('is_featured = ?'); values.push(product.is_featured); }
  if (product.display_order !== undefined) { fields.push('display_order = ?'); values.push(product.display_order); }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await db.prepare(
    `UPDATE cms_products SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const db = getDB();
  await db.prepare('DELETE FROM cms_products WHERE id = ?').bind(id).run();
};

// =====================
// WEBINAR MANAGEMENT
// =====================

export interface CMSWebinar {
  id?: number;
  title: string;
  description?: string;
  host_name?: string;
  webinar_url?: string;
  thumbnail_url?: string;
  scheduled_date?: string;
  duration_minutes?: number;
  category?: string;
  is_active?: number;
  is_past?: number;
  recording_url?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export const createWebinar = async (webinar: CMSWebinar): Promise<any> => {
  const db = getDB();
  const result = await db.prepare(
    `INSERT INTO cms_webinars (title, description, host_name, webinar_url, thumbnail_url, scheduled_date, duration_minutes, category, is_active, is_past, recording_url, created_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    webinar.title,
    webinar.description || null,
    webinar.host_name || null,
    webinar.webinar_url || null,
    webinar.thumbnail_url || null,
    webinar.scheduled_date || null,
    webinar.duration_minutes || null,
    webinar.category || null,
    webinar.is_active ?? 1,
    webinar.is_past ?? 0,
    webinar.recording_url || null,
    webinar.created_by || null
  ).run();
  return result;
};

export const getAllWebinars = async (): Promise<CMSWebinar[]> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_webinars ORDER BY scheduled_date DESC, created_at DESC'
  ).all();
  return result.results || [];
};

export const getUpcomingWebinars = async (): Promise<CMSWebinar[]> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_webinars WHERE is_active = 1 AND is_past = 0 AND scheduled_date > datetime("now") ORDER BY scheduled_date ASC'
  ).all();
  return result.results || [];
};

export const getWebinarById = async (id: number): Promise<CMSWebinar | null> => {
  const db = getDB();
  const result = await db.prepare(
    'SELECT * FROM cms_webinars WHERE id = ?'
  ).bind(id).first();
  return result;
};

export const updateWebinar = async (id: number, webinar: Partial<CMSWebinar>): Promise<void> => {
  const db = getDB();
  const fields = [];
  const values = [];

  if (webinar.title) { fields.push('title = ?'); values.push(webinar.title); }
  if (webinar.description !== undefined) { fields.push('description = ?'); values.push(webinar.description); }
  if (webinar.host_name !== undefined) { fields.push('host_name = ?'); values.push(webinar.host_name); }
  if (webinar.webinar_url !== undefined) { fields.push('webinar_url = ?'); values.push(webinar.webinar_url); }
  if (webinar.thumbnail_url !== undefined) { fields.push('thumbnail_url = ?'); values.push(webinar.thumbnail_url); }
  if (webinar.scheduled_date !== undefined) { fields.push('scheduled_date = ?'); values.push(webinar.scheduled_date); }
  if (webinar.duration_minutes !== undefined) { fields.push('duration_minutes = ?'); values.push(webinar.duration_minutes); }
  if (webinar.category !== undefined) { fields.push('category = ?'); values.push(webinar.category); }
  if (webinar.is_active !== undefined) { fields.push('is_active = ?'); values.push(webinar.is_active); }
  if (webinar.is_past !== undefined) { fields.push('is_past = ?'); values.push(webinar.is_past); }
  if (webinar.recording_url !== undefined) { fields.push('recording_url = ?'); values.push(webinar.recording_url); }

  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  await db.prepare(
    `UPDATE cms_webinars SET ${fields.join(', ')} WHERE id = ?`
  ).bind(...values).run();
};

export const deleteWebinar = async (id: number): Promise<void> => {
  const db = getDB();
  await db.prepare('DELETE FROM cms_webinars WHERE id = ?').bind(id).run();
};
