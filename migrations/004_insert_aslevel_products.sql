-- Migration 004: Insert AS-Level Products
-- This migration adds all AS-Level courses to the cms_products table

INSERT INTO cms_products (name, slug, description, price, currency, category, product_type, image_url, exam_board, duration, is_active, is_featured, created_by)
VALUES
-- AS Biology
('International AS Biology', 'as-biology', 'Advanced study of biological systems, from molecular biology to ecology. Essential preparation for medical and life science careers.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/AS Biology.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS Business
('International AS Business', 'as-business', 'Study business concepts, management principles, and economic theory. Perfect foundation for business and economics degrees.', 350.00, 'ZAR', 'Business', 'course', '/assets/AS Business.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS Chemistry
('International AS Chemistry', 'as-chemistry', 'Advanced chemistry covering organic, inorganic, and physical chemistry. Critical for science and engineering pathways.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/AS Chemistry.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS English Language
('International AS English Language', 'as-english', 'Develop advanced language analysis, critical reading, and academic writing skills for university success.', 350.00, 'ZAR', 'Languages', 'course', '/assets/AS English.jpeg', 'Cambridge', '1 year', 1, 1, 1),

-- AS Geography (Pearson)
('International AS Geography', 'as-geography-pearson', 'Study physical and human geography, climate change, and sustainable development with Pearson curriculum.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/AS Geography Pearson.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS Geography (Cambridge)
('International AS Geography', 'as-geography-cambridge', 'Explore geographical processes, environmental challenges, and spatial analysis with Cambridge curriculum.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/AS Geography.jpeg', 'Cambridge', '1 year', 1, 1, 1),

-- AS Environmental Management
('International AS Environmental Management', 'as-environment-management', 'Study environmental sustainability, conservation, and resource management for global challenges.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/AS Environment Management.jpeg', 'Cambridge', '1 year', 1, 1, 1),

-- AS Mathematics
('International AS Mathematics', 'as-math', 'Advanced mathematics including calculus, mechanics, and statistics. Essential for STEM degrees.', 350.00, 'ZAR', 'Mathematics', 'course', '/assets/AS Math.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS Physics
('International AS Physics', 'as-physics', 'Advanced physics covering mechanics, quantum theory, and electromagnetism. Gateway to engineering and physics degrees.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/AS Physics.jpeg', 'Pearson', '1 year', 1, 1, 1),

-- AS Religious Studies
('International AS Religious Studies', 'as-religious-studies', 'Explore philosophy of religion, ethics, and comparative religious studies with critical analysis.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/AS Relgious Studies.png', 'Pearson', '1 year', 1, 1, 1);
