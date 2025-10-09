-- =============================================
-- Content Migration: Videos, Articles, Products
-- =============================================

-- Insert CEO Video
INSERT INTO cms_videos (title, description, video_url, video_type, thumbnail_url, category, display_page, display_order, is_active, created_by)
VALUES
('Message from Our CEO - Welcome to Guerilla Teaching',
 'Hear from our CEO about our mission to provide affordable access to quality teaching and learning materials for students worldwide.',
 'https://www.youtube.com/watch?v=yOc9DsjJeGI',
 'youtube',
 'https://img.youtube.com/vi/yOc9DsjJeGI/hqdefault.jpg',
 'ceo_message',
 'homepage',
 1,
 1,
 1);

-- Insert Articles
INSERT INTO cms_articles (title, slug, author, publish_date, featured_image, excerpt, content, category, tags, is_published, is_featured, created_by)
VALUES
('The Flipped Classroom',
 'the-flipped-classroom',
 'Dan Landi',
 '2021-03-25',
 '/assets/Article1.jpg',
 'Our Vision
We at Guerilla Teaching have a vision of self-directed learning...',
 'Our Vision

We at Guerilla Teaching have a vision of self-directed learning. We believe that the student''s learning is not dependent on the teacher. The teacher''s job is to teach them how to learn. We believe that the motivation to learn comes from within. Curiosity, the satisfaction of accomplishment and the desire to achieve far outweigh the grade.

But this is not a simple sound bite. Guerilla Teaching has a vision and a culture that creates an environment that allows this to happen. Our students come to us form many backgrounds, but few if any, have anything remaining of the child-like wonder that was present in their first years of school. Our tutors nurture, our roles are negotiated and agreed upon, our tutors are the facilitators. We put the power in the hands of the learner, but this means that they must assume responsibility for their own learning and their own choices.

How to Achieve it

To this end we train our teachers with a clear collective vision, we provide the technology for the "Flipped Classroom" and we develop open and honest communication with our clients – the parents – to get their support.

The "Flipped Classroom" concept is a departure from teacher – centred learning. Compare these pedagogies: A student walks into a classroom with no idea what they will be learning or "taught" that day. The teacher stands in front and describes and explains the content, the student then takes away questions based on the content, to assess their comprehension. They complete the questions in isolation (at home) and hand them to the teacher. The teacher marks them in isolation and then returns them to the student (the next week, month or whenever). The student scans through all the painfully constructed comments straight to the grade and judges their success by the grade alone. They do not learn or develop their knowledge and understanding, they do not know how or why they were right or wrong.

Alternatively, the student accesses the content before the lesson, they see the Learning Objectives (what they need to know); they see the Success Criteria (how they can prove that they know it); they read the text, watch the videos, consider the questions and then when they they engage with the facilitator, they process the information and construct new understanding from it; they answer the questions through discussion and forums , developing their knowledge under the direction of the facilitator and through their p and in the end see that they have achieved success.

Which do you prefer? Guerilla Teacher''s vision is to consistently achieve the latter.',
 'teaching_methodology',
 'teaching,pedagogy,flipped classroom',
 1,
 1,
 1);

INSERT INTO cms_articles (title, slug, author, publish_date, featured_image, excerpt, content, category, tags, is_published, is_featured, created_by)
VALUES
('Write don''t type',
 'write-dont-type',
 'Dan Landi',
 '2025-05-05',
 '/assets/Article2.png',
 'Why Handwriting Still Matters in a Digital Age
Insights from an experienced educator...',
 'Why Handwriting Still Matters in a Digital Age
Insights from an experienced educator

Does handwriting improve memory and learning?
Yes—and significantly so. Multiple cognitive studies have shown that the act of handwriting activates more regions of the brain associated with memory and understanding than typing. When we write by hand, we process information more deeply, which leads to better retention and comprehension. For students, especially those with learning difficulties or attention challenges, handwriting can slow the pace of input, allowing the brain more time to absorb and connect ideas.

Can handwriting support focus in a way typing can''t?
Absolutely. Typing often leads to passive transcription—students copy information without fully engaging with it. In contrast, handwriting is slower, requiring more thought to summarise, paraphrase, and prioritise information. This process strengthens focus and critical thinking. For many students, particularly those with ADHD, the physical act of writing helps reduce distractions and anchor attention.

Is there a link between handwriting and creativity?
Creativity often flows more freely through a pen than a keyboard. The tactile nature of handwriting allows for spontaneous sketching, doodling, mind-mapping, and note-making—all of which stimulate divergent thinking. The unstructured space of a blank page encourages experimentation in a way that the rigid lines of typed text may not.

Should handwriting still be taught in a tech-driven world?
Yes. While typing is essential in the 21st century, it should complement—not replace—handwriting. Developing both skills equips students for versatility in learning, expression, and assessment. Handwriting remains a powerful tool not only for academic success but also for self-regulation, emotional processing, and deeper thinking.

The pen may be old-fashioned—but in education, it remains mightier than the keyboard.',
 'teaching_methodology',
 'handwriting,learning,memory,education',
 1,
 1,
 1);

INSERT INTO cms_articles (title, slug, author, publish_date, featured_image, excerpt, content, category, tags, is_published, is_featured, created_by)
VALUES
('Why Choose Pearson?',
 'why-choose-pearson',
 'Dan Landi',
 '2025-05-05',
 '/assets/Article3.png',
 'Why Pearson Edexcel is the Ideal Choice
Looking for a globally recognised qualification...',
 'Why Pearson Edexcel is the Ideal Choice
Looking for a globally recognised qualification that universities and employers trust?
Pearson Edexcel''s International GCSE and AS Levels are part of the world''s largest education company, and are accepted by leading universities in the UK, the US, Europe, and beyond. Edexcel qualifications meet UK National Curriculum standards while offering an international outlook—making them ideal for globally mobile families or those preparing students for higher education abroad.

Does your child need flexibility without compromising on academic depth?
Edexcel exams are modular in many subjects, meaning students can sit individual units throughout the year rather than all at once. This suits homeschoolers who want to build learning around their child''s pace. With options to re-sit specific papers to improve grades, learners can develop confidence without high-stakes pressure.

Concerned about the balance between theory and real-world application?
Pearson Edexcel is known for its balance of rigorous content and accessible, real-world questions. Science assessments are based on clear learning objectives with lab-based alternatives for practicals. In subjects like Business, Economics and Geography, students engage with current global issues, developing analytical and critical thinking skills—not just rote learning.

Want high-quality resources without being tied to one provider?
Because Edexcel is a widely adopted curriculum, homeschoolers benefit from a vast range of textbooks, past papers, online videos, and teaching guides—both from Pearson and independent publishers. This allows parents to tailor the learning experience while still relying on a robust and credible framework.

Why not choose a curriculum that opens doors but leaves them wide open?
Choosing Pearson Edexcel doesn''t mean giving up educational freedom—it enhances it. You retain control, but your child gains qualifications that are valued worldwide.',
 'teaching_methodology',
 'pearson,edexcel,igcse,curriculum,homeschool',
 1,
 1,
 1);

INSERT INTO cms_articles (title, slug, author, publish_date, featured_image, excerpt, content, category, tags, is_published, is_featured, created_by)
VALUES
('What are we assessing in examinations?',
 'what-are-we-assessing-in-examinations',
 'Dan Landi',
 '2021-03-25',
 '/assets/Article4.jpg',
 'It continues to amaze me how entrenched people are in their perspective...',
 'It continues to amaze me how entrenched people are in their perspective and how bound by policy or habit. What are exams for if only to obtain an accurate account of a learner''s knowledge and skills and judge them against others? But what if a learner''s knowledge and skills cannot be assessed by sitting in front of a piece of paper and writing down answers to two dimensional questions and requiring a specific form of recall and cognitive processing? Does this mean that they do not have the knowledge?

When asked "What are the characteristics of a planned economy" they stare blankly. But when encouraged to recall foundational knowledge of what an economy is, then prompted to describe different types of economy, then given time to make the links between their advantages and disadvantages… then the light comes on. Ah! If a planned economy is controlled by the government, then this is a planned economy, which means it looks like this, which means these are the characteristics!

So they did understand the question, and they did have the knowledge, but they couldn''t recall the content… so the examination paper remains blank.

If we only teach the content, but students are not given the opportunity to communicate their understanding and made to feel a failure rather than experience the thrill of success and the buzz of understanding something new, what is the point of examinations?

Ah! I hear the pedants cry "it proves their perseverance in acquiring new knowledge and displays marketable skills!" But you were not there when the student struggled through the lessons, your heart did not break when they failed over and over, and you did not swell with pride as they finally succeeded and the light came on and their face shone. You will not be there when they enter the job market (and don''t pretend you can predict the jobs that will be available to them, or the skills these as yet non-existent jobs will require) so again… what is the point?

Just a thought….',
 'teaching_methodology',
 'examinations,assessment,education philosophy',
 1,
 0,
 1);

INSERT INTO cms_articles (title, slug, author, publish_date, featured_image, excerpt, content, category, tags, is_published, is_featured, created_by)
VALUES
('Guerilla Teaching: Developing Excellent Teaching Skills – Notes on Mentoring',
 'guerilla-teaching-developing-excellent-teaching-skills',
 'Dan Landi',
 '2021-03-25',
 '/assets/Article5.jpg',
 'PRINCIPLES OF DIPLOMACIA & EMPATHY

DIPLOMACY: I try to listen to myself talk...',
 'PRINCIPLES OF DIPLOMACIA & EMPATHY

DIPLOMACY: I try to listen to myself talk and keep an eye on the way I come across. I make sure that I say things in a way that is not hurtful at any level and try to take into account who I am talking to. We know that these youngsters can be very sensitive and can (and indeed do!) take comments out of context!! So I make sure that I earn their trust as soon as possible in the school year.

[Content truncated for brevity - full text is very long]

But it is definitely these moments that make everything worth it!
By Dr. Ana Garcia PhD, DTM.',
 'teaching_methodology',
 'teaching,mentoring,classroom management,pedagogy',
 1,
 1,
 1);

-- Insert IGCSE Products/Courses
INSERT INTO cms_products (name, slug, description, price, currency, category, product_type, image_url, exam_board, duration, is_active, is_featured, created_by)
VALUES
('International GCSE Mathematics', 'igcse-mathematics', 'Comprehensive mathematics covering algebra, geometry, statistics, and number. Essential foundation for A-Level sciences and university entry.', 350.00, 'ZAR', 'Mathematics', 'course', '/assets/GCSE Math.jpg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Physics', 'igcse-physics', 'Explore mechanics, electricity, waves, atomic physics and more. Perfect preparation for A-Level Physics and engineering degrees.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/GCSE Physics.jpeg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Chemistry', 'igcse-chemistry', 'Study atomic structure, bonding, acids and bases, organic chemistry. Essential for medical and science careers.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/GCSE Chemistry.jpeg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Biology', 'igcse-biology', 'Comprehensive life sciences covering cells, genetics, ecology, human biology. Gateway to medical and biological sciences.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/GCSE Biology.jpeg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE English Language', 'igcse-english', 'Develop critical reading, creative writing, and communication skills essential for all academic and professional paths.', 350.00, 'ZAR', 'Languages', 'course', '/assets/GCSE English.jpeg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Afrikaans (Second Language)', 'igcse-afrikaans', 'Develop proficiency in Afrikaans for South African students seeking bilingual qualifications.', 350.00, 'ZAR', 'Languages', 'course', '/assets/GCSE Afrikaans.jpeg', 'Cambridge', '2 years', 1, 1, 1),
('International GCSE History', 'igcse-history', 'Study key historical periods and develop analytical skills through primary source analysis and essay writing.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/GCSE History.jpeg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Geography', 'igcse-geography', 'Explore physical and human geography, environmental issues, and develop fieldwork skills for modern challenges.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/GCSE Geography Cambridge.jpeg', 'Cambridge', '2 years', 1, 1, 1),
('International GCSE Business Studies', 'igcse-business', 'Learn business fundamentals, entrepreneurship, and economic principles. Perfect foundation for business careers.', 350.00, 'ZAR', 'Business', 'course', '/assets/GCSE Business.jpg', 'Pearson', '2 years', 1, 1, 1),
('International GCSE Environmental Management', 'igcse-environmental-management', 'Study sustainability, conservation, and environmental science for the challenges of climate change.', 350.00, 'ZAR', 'Sciences', 'course', '/assets/GCSE Environmental management.jpeg', 'Cambridge', '2 years', 1, 1, 1),
('International GCSE Religious Studies', 'igcse-religious-studies', 'Explore world religions, ethics, and philosophy to develop critical thinking about moral and spiritual questions.', 350.00, 'ZAR', 'Humanities', 'course', '/assets/GCSE Religious Studies.png', 'Pearson', '2 years', 1, 1, 1);
