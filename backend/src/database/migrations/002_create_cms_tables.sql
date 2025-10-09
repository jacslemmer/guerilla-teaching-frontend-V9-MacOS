-- CMS Tables Migration
-- This creates all tables needed for the Content Management System

-- Super Users / Admin Users Table
CREATE TABLE IF NOT EXISTS cms_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin', -- admin, editor, viewer
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);

-- Videos Table (YouTube embeds and other video sources)
CREATE TABLE IF NOT EXISTS cms_videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL, -- YouTube URL or other video URL
    video_type TEXT DEFAULT 'youtube', -- youtube, vimeo, direct
    thumbnail_url TEXT, -- Custom thumbnail or auto-generated
    category TEXT, -- ceo_message, tutorial, webinar, etc.
    display_page TEXT, -- homepage, about, learning-portal, etc.
    display_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES cms_users(id)
);

-- Articles/Blog Posts Table
CREATE TABLE IF NOT EXISTS cms_articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE, -- URL-friendly version of title
    excerpt TEXT, -- Short description
    content TEXT NOT NULL, -- Full article content (HTML/Markdown)
    featured_image TEXT, -- Image URL or path
    author TEXT NOT NULL,
    category TEXT, -- TEACHING METHODOLOGY, NEWS, etc.
    tags TEXT, -- JSON array of tags
    is_published INTEGER DEFAULT 0,
    is_featured INTEGER DEFAULT 0,
    publish_date DATETIME,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES cms_users(id)
);

-- Products/Courses Table
CREATE TABLE IF NOT EXISTS cms_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    price REAL NOT NULL,
    currency TEXT DEFAULT 'R',
    image_url TEXT,
    product_type TEXT NOT NULL, -- course, program, tutoring, bundle
    category TEXT, -- IGCSE, AS Level, etc.
    exam_board TEXT, -- Pearson, Cambridge
    duration TEXT, -- 1 year, 2 years
    subjects_count INTEGER DEFAULT 1,
    service_tier TEXT, -- Standard, Premium
    features TEXT, -- JSON array of features
    is_active INTEGER DEFAULT 1,
    is_featured INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES cms_users(id)
);

-- Webinars/Live Sessions Table
CREATE TABLE IF NOT EXISTS cms_webinars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    host_name TEXT,
    webinar_url TEXT, -- Zoom link, YouTube Live, etc.
    thumbnail_url TEXT,
    scheduled_date DATETIME,
    duration_minutes INTEGER,
    category TEXT,
    is_active INTEGER DEFAULT 1,
    is_past INTEGER DEFAULT 0,
    recording_url TEXT, -- URL to recording after event
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES cms_users(id)
);

-- Media/Asset Library Table (for images, files, etc.)
CREATE TABLE IF NOT EXISTS cms_media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT, -- image, video, document, etc.
    mime_type TEXT,
    file_size INTEGER,
    alt_text TEXT,
    caption TEXT,
    uploaded_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES cms_users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_active ON cms_videos(is_active);
CREATE INDEX IF NOT EXISTS idx_videos_category ON cms_videos(category);
CREATE INDEX IF NOT EXISTS idx_videos_page ON cms_videos(display_page);

CREATE INDEX IF NOT EXISTS idx_articles_published ON cms_articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON cms_articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON cms_articles(category);

CREATE INDEX IF NOT EXISTS idx_products_active ON cms_products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_type ON cms_products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON cms_products(category);

CREATE INDEX IF NOT EXISTS idx_webinars_active ON cms_webinars(is_active);
CREATE INDEX IF NOT EXISTS idx_webinars_scheduled ON cms_webinars(scheduled_date);

CREATE INDEX IF NOT EXISTS idx_media_type ON cms_media(file_type);

-- Insert default admin user (password: Admin123! - should be changed immediately)
-- Password hash is bcrypt hash of "Admin123!"
INSERT OR IGNORE INTO cms_users (email, password_hash, full_name, role, is_active)
VALUES ('admin@guerillateaching.com', '$2a$10$rZ6YvqJGfEgvN8EhEPZKHuEHAYOKhJf4Lp7fZQvKvXhQYOhP8KZ9e', 'System Administrator', 'admin', 1);
