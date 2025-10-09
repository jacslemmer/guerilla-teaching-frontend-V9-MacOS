/**
 * Content Migration Script
 * Extracts hardcoded content from React components and migrates to D1 database
 */

// Video Data (from Home.tsx)
const videos = [
  {
    title: 'Message from Our CEO - Welcome to Guerilla Teaching',
    description: 'Hear from our CEO about our mission to provide affordable access to quality teaching and learning materials for students worldwide.',
    video_url: 'https://www.youtube.com/watch?v=yOc9DsjJeGI',
    video_type: 'youtube',
    thumbnail_url: 'https://img.youtube.com/vi/yOc9DsjJeGI/hqdefault.jpg',
    category: 'ceo_message',
    display_page: 'homepage',
    display_order: 1,
    is_active: 1
  }
];

// Article Data (from Articles.tsx and BlogDetail.tsx)
const articles = [
  {
    title: 'The Flipped Classroom',
    slug: 'the-flipped-classroom',
    author: 'Dan Landi',
    publish_date: '2021-03-25',
    featured_image: '/assets/Article1.jpg',
    excerpt: 'Our Vision\nWe at Guerilla Teaching have a vision of self-directed learning...',
    content: `Our Vision\n\nWe at Guerilla Teaching have a vision of self-directed learning. We believe that the student's learning is not dependent on the teacher. The teacher's job is to teach them how to learn. We believe that the motivation to learn comes from within. Curiosity, the satisfaction of accomplishment and the desire to achieve far outweigh the grade.\n\nBut this is not a simple sound bite. Guerilla Teaching has a vision and a culture that creates an environment that allows this to happen. Our students come to us form many backgrounds, but few if any, have anything remaining of the child-like wonder that was present in their first years of school. Our tutors nurture, our roles are negotiated and agreed upon, our tutors are the facilitators. We put the power in the hands of the learner, but this means that they must assume responsibility for their own learning and their own choices.\n\nHow to Achieve it\n\nTo this end we train our teachers with a clear collective vision, we provide the technology for the "Flipped Classroom" and we develop open and honest communication with our clients – the parents – to get their support.\n\nThe "Flipped Classroom" concept is a departure from teacher – centred learning. Compare these pedagogies: A student walks into a classroom with no idea what they will be learning or "taught" that day. The teacher stands in front and describes and explains the content, the student then takes away questions based on the content, to assess their comprehension. They complete the questions in isolation (at home) and hand them to the teacher. The teacher marks them in isolation and then returns them to the student (the next week, month or whenever). The student scans through all the painfully constructed comments straight to the grade and judges their success by the grade alone. They do not learn or develop their knowledge and understanding, they do not know how or why they were right or wrong.\n\nAlternatively, the student accesses the content before the lesson, they see the Learning Objectives (what they need to know); they see the Success Criteria (how they can prove that they know it); they read the text, watch the videos, consider the questions and then when they they engage with the facilitator, they process the information and construct new understanding from it; they answer the questions through discussion and forums , developing their knowledge under the direction of the facilitator and through their p and in the end see that they have achieved success.\n\nWhich do you prefer? Guerilla Teacher's vision is to consistently achieve the latter.`,
    category: 'teaching_methodology',
    tags: 'teaching,pedagogy,flipped classroom',
    is_published: 1,
    is_featured: 1,
    display_order: 1
  },
  {
    title: "Write don't type",
    slug: 'write-dont-type',
    author: 'Dan Landi',
    publish_date: '2025-05-05',
    featured_image: '/assets/Article2.png',
    excerpt: 'Why Handwriting Still Matters in a Digital Age\nInsights from an experienced educator...',
    content: `Why Handwriting Still Matters in a Digital Age\nInsights from an experienced educator\n\nDoes handwriting improve memory and learning?\nYes—and significantly so. Multiple cognitive studies have shown that the act of handwriting activates more regions of the brain associated with memory and understanding than typing. When we write by hand, we process information more deeply, which leads to better retention and comprehension. For students, especially those with learning difficulties or attention challenges, handwriting can slow the pace of input, allowing the brain more time to absorb and connect ideas.\n\nCan handwriting support focus in a way typing can't?\nAbsolutely. Typing often leads to passive transcription—students copy information without fully engaging with it. In contrast, handwriting is slower, requiring more thought to summarise, paraphrase, and prioritise information. This process strengthens focus and critical thinking. For many students, particularly those with ADHD, the physical act of writing helps reduce distractions and anchor attention.\n\nIs there a link between handwriting and creativity?\nCreativity often flows more freely through a pen than a keyboard. The tactile nature of handwriting allows for spontaneous sketching, doodling, mind-mapping, and note-making—all of which stimulate divergent thinking. The unstructured space of a blank page encourages experimentation in a way that the rigid lines of typed text may not.\n\nShould handwriting still be taught in a tech-driven world?\nYes. While typing is essential in the 21st century, it should complement—not replace—handwriting. Developing both skills equips students for versatility in learning, expression, and assessment. Handwriting remains a powerful tool not only for academic success but also for self-regulation, emotional processing, and deeper thinking.\n\nThe pen may be old-fashioned—but in education, it remains mightier than the keyboard.`,
    category: 'teaching_methodology',
    tags: 'handwriting,learning,memory,education',
    is_published: 1,
    is_featured: 1,
    display_order: 2
  },
  {
    title: 'Why Choose Pearson?',
    slug: 'why-choose-pearson',
    author: 'Dan Landi',
    publish_date: '2025-05-05',
    featured_image: '/assets/Article3.png',
    excerpt: 'Why Pearson Edexcel is the Ideal Choice\nLooking for a globally recognised qualification...',
    content: `Why Pearson Edexcel is the Ideal Choice\nLooking for a globally recognised qualification that universities and employers trust?\nPearson Edexcel's International GCSE and AS Levels are part of the world's largest education company, and are accepted by leading universities in the UK, the US, Europe, and beyond. Edexcel qualifications meet UK National Curriculum standards while offering an international outlook—making them ideal for globally mobile families or those preparing students for higher education abroad.\n\nDoes your child need flexibility without compromising on academic depth?\nEdexcel exams are modular in many subjects, meaning students can sit individual units throughout the year rather than all at once. This suits homeschoolers who want to build learning around their child's pace. With options to re-sit specific papers to improve grades, learners can develop confidence without high-stakes pressure.\n\nConcerned about the balance between theory and real-world application?\nPearson Edexcel is known for its balance of rigorous content and accessible, real-world questions. Science assessments are based on clear learning objectives with lab-based alternatives for practicals. In subjects like Business, Economics and Geography, students engage with current global issues, developing analytical and critical thinking skills—not just rote learning.\n\nWant high-quality resources without being tied to one provider?\nBecause Edexcel is a widely adopted curriculum, homeschoolers benefit from a vast range of textbooks, past papers, online videos, and teaching guides—both from Pearson and independent publishers. This allows parents to tailor the learning experience while still relying on a robust and credible framework.\n\nWhy not choose a curriculum that opens doors but leaves them wide open?\nChoosing Pearson Edexcel doesn't mean giving up educational freedom—it enhances it. You retain control, but your child gains qualifications that are valued worldwide.`,
    category: 'teaching_methodology',
    tags: 'pearson,edexcel,igcse,curriculum,homeschool',
    is_published: 1,
    is_featured: 1,
    display_order: 3
  },
  {
    title: 'What are we assessing in examinations?',
    slug: 'what-are-we-assessing-in-examinations',
    author: 'Dan Landi',
    publish_date: '2021-03-25',
    featured_image: '/assets/Article4.jpg',
    excerpt: 'It continues to amaze me how entrenched people are in their perspective...',
    content: `It continues to amaze me how entrenched people are in their perspective and how bound by policy or habit. What are exams for if only to obtain an accurate account of a learner's knowledge and skills and judge them against others? But what if a learner's knowledge and skills cannot be assessed by sitting in front of a piece of paper and writing down answers to two dimensional questions and requiring a specific form of recall and cognitive processing? Does this mean that they do not have the knowledge?\n\nWhen asked "What are the characteristics of a planned economy" they stare blankly. But when encouraged to recall foundational knowledge of what an economy is, then prompted to describe different types of economy, then given time to make the links between their advantages and disadvantages… then the light comes on. Ah! If a planned economy is controlled by the government, then this is a planned economy, which means it looks like this, which means these are the characteristics!\n\nSo they did understand the question, and they did have the knowledge, but they couldn't recall the content… so the examination paper remains blank.\n\nIf we only teach the content, but students are not given the opportunity to communicate their understanding and made to feel a failure rather than experience the thrill of success and the buzz of understanding something new, what is the point of examinations?\n\nAh! I hear the pedants cry "it proves their perseverance in acquiring new knowledge and displays marketable skills!" But you were not there when the student struggled through the lessons, your heart did not break when they failed over and over, and you did not swell with pride as they finally succeeded and the light came on and their face shone. You will not be there when they enter the job market (and don't pretend you can predict the jobs that will be available to them, or the skills these as yet non-existent jobs will require) so again… what is the point?\n\nJust a thought….`,
    category: 'teaching_methodology',
    tags: 'examinations,assessment,education philosophy',
    is_published: 1,
    is_featured: 0,
    display_order: 4
  },
  {
    title: 'Guerilla Teaching: Developing Excellent Teaching Skills – Notes on Mentoring',
    slug: 'guerilla-teaching-developing-excellent-teaching-skills',
    author: 'Dan Landi',
    publish_date: '2021-03-25',
    featured_image: '/assets/Article5.jpg',
    excerpt: 'PRINCIPLES OF DIPLOMACIA & EMPATHY\n\nDIPLOMACY: I try to listen to myself talk...',
    content: `PRINCIPLES OF DIPLOMACIA & EMPATHY\n\nDIPLOMACY: I try to listen to myself talk and keep an eye on the way I come across. I make sure that I say things in a way that is not hurtful at any level and try to take into account who I am talking to. We know that these youngsters can be very sensitive and can (and indeed do!) take comments out of context!! So I make sure that I earn their trust as soon as possible in the school year.\nI check their reaction when I say something and have to decide what reactions they are entitled to (e.g. part of their stage of growth) and what reactions are my projections (e.g. making them accountable for something that they shouldn't be).\nWhen the interactions are clean and the boundaries preserved, there is no damage When there is an abuse of power at any level, there is backslash of some sort at some point in the future. Then you know that your integrity and their integrity was not preserved. It takes a keen eye to walk on the neat line of responsibility.\nEMPATHY: If I don't know / sense / understand where my students are coming from, I can't go down where they are at and bring them where I want them to go.\nI need to adjust my understanding to what they know and to their level of growth before I can help them learn more / grow more.\nIt is about preparing their mind and heart for learning and for making the long-term commitment to succeed, rather than simply teaching them facts and figures.\nSTAYING CENTRED: I can't give my power away so I can't let them press my buttons. I diffuse, in many more occasions than I can count, the energies on the moment.\nI don't take everything to heart and I don't take everything literally. They try to take control by breaking the rules: e.g. swearing, making noise, doing anything inappropriate…And they will do it again and again if I lose it. So if I make a joke instead: "Are you OK? I was worried about you for a minute…". This diffusing strategy tends to make them laugh so they lose the grip on that particular trick at that particular moment, and the group moves on.\nWhen they realise that a trick doesn't work with me, they may take it to the next level and try to disrupt the lesson by finding something else that may be more effective. The problem with this is that they escalate their misbehaviour… At some point, I may see that they simply refuse to be called to order, an open sabotage of the class, then I step up and I use my voice to make this point: a) I summon all my authority, b) I look at them in the eye and hold their gaze and c) I give them a choice and finally, d) I make sure that I say the last word.\nIt is at that point where I allow no excuse to step over that boundary. I don't need to reason and I don't need to concede – I imply: "I am in charge here, this is my classroom, you will do as you are told". Normally that curbs the behaviour of the most rebellious at that point.\nThis is a point of making them submit. However, I make sure that in my next interaction I show that I don't hold a grudge = it is not personal, I don't hate that individual student: I talk to them normal, I give them praise on anything that they do well… They soon learn that the line between what is acceptable and is not acceptable is very clear indeed and that I don't like or dislike them based on their behaviour. By being neutral and not projecting, they soon go back to the right side of the line.\nI make sure that in these interactions I make it very unpleasant for them to be on the wrong side of the boundary line of acceptable behaviour. And bit by bit by bit, with a lot of patience, love, compassion and empathy, they align themselves with the right direction of things.\nNOT FALLING FOR "THE DRAMA": which would allow our students to drive the lessons. There is an emotional response to everything that happens in life and it is usually quite\nBecause their energies are not fully anchored (not that many adults' are either!), it is easy to feel for them. But feeling sorry for them puts us at their level and sucks us into their game. For me it is simply a manipulation technique that buys them some time before they actually get on with their responsibilities at the school.\nSo I ask them what's up, then listen briefly to their pains and sorrows but take it with a pinch of salt. If they need a moment to compose themselves, that is fine.\nI do realise that they may feel under duress but I always try to quickly give them a fresh and neutral perspective of what life is about: a different outlook of the issue, which usually has the effect to get them off the emotional hook, at least for a brief moment.\nThis brief moment is usually enough to allow the lesson to continue with a certain level of harmony; the effect is usually that of bringing them back to reality and to re-grounding When they realise that they don't need to feel sorry for themselves, they get out of their victim mentality.\nNOT "PROJECTING" YOUR OWN LIMITATIONS: I have to be very clear whether the issues in the classroom are mine or them. I can't be projecting my negative emotions, limitations, frustrations, etc, on them because this would be the beginning of the end!\nI need to keep my house in order at all times and be centred. If I make a mistake, if I get upset because they have pressed a button, a weak point of mine, then I quickly must recover and say something along the line: "yes, this is something I still need to work on".\nNormally, this kills the emotionally charged moment and the imbalance in the class is quickly corrected. They understand that we are all imperfect and we are all human. When this happens, they tend to quickly forget the issue and move on, continuing with their work.\nThis can be a very sensitive and touchy state of being for a teacher who may not want to admit that the students are not always wrong; but nevertheless, it is totally necessary in order to keep a good-will / balanced atmosphere in the classroom.\nOPEN-MINDNESS: I can't come to the classroom knowing everything and deciding what is going to happen at all times. I have to come to the classroom with an attitude of allowing the energies of the moment to guide me where we all need to get to as a group that day.\nI don't know everything about them and I don't know what will trigger them that day, so I have to be open-minded. Life is bigger than me and these children have their own destinies. Deep inside they know what is a good or bad path for them, so when you align yourself with them, they will follow your lead without friction, and this feels like effortlessness.\nI also need to realise that their language is different from that of the previous generation so I have to be open to what they mean rather than how they say things, otherwise I might get upset about something that was not even intended!\nALLOWING FOR THE MIRACLE OF "BEING SURPRISED": When students go further and faster that you expected, you acknowledge that they are ready to take the responsibility and follow your guidance.\nI must always stay open to the expectation that you never know when this can take place. When they do take place, I acknowledge it and make sure I sound positive and encouraging, but I don't make a fuss. That would give them power to manipulate you in the future.\nBut it is definitely these moments that make everything worth it!\nBy Dr. Ana Garcia PhD, DTM.`,
    category: 'teaching_methodology',
    tags: 'teaching,mentoring,classroom management,pedagogy',
    is_published: 1,
    is_featured: 1,
    display_order: 5
  }
];

// Product/Course Data (from IGCSECoursesGrid.tsx)
const products = [
  {
    name: 'International GCSE Mathematics',
    slug: 'igcse-mathematics',
    description: 'Comprehensive mathematics covering algebra, geometry, statistics, and number. Essential foundation for A-Level sciences and university entry.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Mathematics',
    product_type: 'course',
    image_url: '/assets/GCSE Math.jpg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null, // Digital product
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers'
    })
  },
  {
    name: 'International GCSE Physics',
    slug: 'igcse-physics',
    description: 'Explore mechanics, electricity, waves, atomic physics and more. Perfect preparation for A-Level Physics and engineering degrees.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Sciences',
    product_type: 'course',
    image_url: '/assets/GCSE Physics.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers + practical'
    })
  },
  {
    name: 'International GCSE Chemistry',
    slug: 'igcse-chemistry',
    description: 'Study atomic structure, bonding, acids and bases, organic chemistry. Essential for medical and science careers.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Sciences',
    product_type: 'course',
    image_url: '/assets/GCSE Chemistry.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers + practical'
    })
  },
  {
    name: 'International GCSE Biology',
    slug: 'igcse-biology',
    description: 'Comprehensive life sciences covering cells, genetics, ecology, human biology. Gateway to medical and biological sciences.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Sciences',
    product_type: 'course',
    image_url: '/assets/GCSE Biology.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers + practical'
    })
  },
  {
    name: 'International GCSE English Language',
    slug: 'igcse-english',
    description: 'Develop critical reading, creative writing, and communication skills essential for all academic and professional paths.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Languages',
    product_type: 'course',
    image_url: '/assets/GCSE English.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Reading and writing papers'
    })
  },
  {
    name: 'International GCSE Afrikaans (Second Language)',
    slug: 'igcse-afrikaans',
    description: 'Develop proficiency in Afrikaans for South African students seeking bilingual qualifications.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Languages',
    product_type: 'course',
    image_url: '/assets/GCSE Afrikaans.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Cambridge',
      duration: '2 years',
      assessment: 'Reading, writing, listening, speaking'
    })
  },
  {
    name: 'International GCSE History',
    slug: 'igcse-history',
    description: 'Study key historical periods and develop analytical skills through primary source analysis and essay writing.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Humanities',
    product_type: 'course',
    image_url: '/assets/GCSE History.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers'
    })
  },
  {
    name: 'International GCSE Geography',
    slug: 'igcse-geography',
    description: 'Explore physical and human geography, environmental issues, and develop fieldwork skills for modern challenges.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Humanities',
    product_type: 'course',
    image_url: '/assets/GCSE Geography Cambridge.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Cambridge',
      duration: '2 years',
      assessment: 'Written papers + coursework'
    })
  },
  {
    name: 'International GCSE Business Studies',
    slug: 'igcse-business',
    description: 'Learn business fundamentals, entrepreneurship, and economic principles. Perfect foundation for business careers.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Business',
    product_type: 'course',
    image_url: '/assets/GCSE Business.jpg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers'
    })
  },
  {
    name: 'International GCSE Environmental Management',
    slug: 'igcse-environmental-management',
    description: 'Study sustainability, conservation, and environmental science for the challenges of climate change.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Sciences',
    product_type: 'course',
    image_url: '/assets/GCSE Environmental management.jpeg',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Cambridge',
      duration: '2 years',
      assessment: 'Written papers + coursework'
    })
  },
  {
    name: 'International GCSE Religious Studies',
    slug: 'igcse-religious-studies',
    description: 'Explore world religions, ethics, and philosophy to develop critical thinking about moral and spiritual questions.',
    price: 350.00,
    currency: 'ZAR',
    category: 'igcse',
    subcategory: 'Humanities',
    product_type: 'course',
    image_url: '/assets/GCSE Religious Studies.png',
    is_active: 1,
    is_featured: 1,
    stock_quantity: null,
    metadata: JSON.stringify({
      examBoard: 'Pearson',
      duration: '2 years',
      assessment: 'Two written papers'
    })
  }
];

console.log('Videos:', videos.length);
console.log('Articles:', articles.length);
console.log('Products:', products.length);

export { videos, articles, products };
