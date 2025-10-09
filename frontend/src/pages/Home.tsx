import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import homeHero from '../assets/Banners & Images/Home_Hero1.png';
import serviceRemoteLearning from '../assets/service-remote-learning-svg.png';
import serviceExamPrep from '../assets/service-exam-prep-svg.jpg';
import serviceCurriculumDesign from '../assets/service-curriculum-design-svg.jpg';
import serviceConsultancy from '../assets/service-consultancy-svg.jpg';

// Import article images
import Article1 from '../assets/Article1.jpg';
import Article2 from '../assets/Article2.png';
import Article3 from '../assets/Article3.png';
import Article5 from '../assets/Article5.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="home">
              <div className="hero-section student-hero">
                <img
                  src={homeHero}
                  alt="Guerilla Teaching Home Hero"
                  className="hero-background-image"
                />
                {/* Left Text Box */}
                <div className="hero-left-text-box">
                  <h2>Learn. Anywhere. Anytime.</h2>
                  <h3>Our Mission:</h3>
                  <p>
                    To provide affordable access to quality teaching and learning materials, supporting individuals and institutions, homeschoolers and cottage schools in their educational journeys.
                  </p>
                  <button className="enroll-btn" onClick={() => navigate('/can-we-help')}>
                    Enroll Now
                  </button>
                </div>
              </div>

      {/* Simple Contact Link */}
      <section className="contact-link-section">
        <div className="container">
          <Link to="/can-we-help" className="contact-us-link">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Enroll modal removed - now redirects to Can We Help page */}

      {/* CEO Video Section */}
      <section className="ceo-video-section">
        <div className="container">
          <h2>Message from Our CEO</h2>
          <div className="video-container">
            {!showVideoPlayer ? (
              <div className="video-placeholder" onClick={() => {
                setShowVideoPlayer(true);
                setTimeout(() => setShowMessage(true), 2000); // Show message after 2 seconds
              }}>
                <img
                  src="https://img.youtube.com/vi/yOc9DsjJeGI/hqdefault.jpg"
                  alt="CEO Video - Guerilla Teaching"
                  className="video-thumbnail"
                  onError={(e) => {
                    e.currentTarget.src = 'https://img.youtube.com/vi/yOc9DsjJeGI/mqdefault.jpg';
                  }}
                />
                <div className="play-button">
                  <div className="play-icon">▶</div>
                </div>
              </div>
            ) : (
              <div className="video-player">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/yOc9DsjJeGI?autoplay=1&controls=1&modestbranding=1&rel=0"
                  title="CEO Message - Guerilla Teaching"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: '15px' }}
                />
              </div>
            )}
            <div className="video-info">
              <h3>Welcome to Guerilla Teaching</h3>
              <p>Hear from our CEO about our mission to provide affordable access to quality teaching and learning materials for students worldwide.</p>
              {showMessage && (
                <p style={{
                  fontSize: '0.95rem',
                  color: '#e74c3c',
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#fff3cd',
                  borderLeft: '4px solid #e74c3c',
                  borderRadius: '4px',
                  lineHeight: '1.6'
                }}>
                  <strong>Note:</strong> If the video doesn't play, your browser's privacy settings may be blocking embedded content.
                  You can watch it directly on <a href="https://www.youtube.com/watch?v=yOc9DsjJeGI" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'underline' }}>YouTube</a>.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h2>OUR SERVICES</h2>
        <div className="services-grid">
          <Link to="/learning-portal" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={serviceRemoteLearning} alt="Remote Learning Icon" className="service-icon remote-learning" />
            <h3>Remote Learning</h3>
            <p>Learn from anywhere in the world on desktop, tablet or mobile phone with an Internet connection. Our Learning Portal provides Pearson Edexcel IGCSE and IAS courses for examination success. Available on subscription to individuals, or by license to Tutors.</p>
            <div className="service-highlight">Teach or Learn from Anywhere</div>
          </Link>

          <Link to="/learning-portal" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={serviceExamPrep} alt="Examination Preparation Icon" className="service-icon" />
            <h3>Examination Preparation</h3>
            <p>Expert teaching and assessment, including MOCK examinations for International GCSE and AS Levels, accepted by local and International Universities world wide.</p>
            <div className="service-highlight">Boost Grades with Expert Help</div>
          </Link>

          <Link to="/start-here/elearning" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={serviceCurriculumDesign} alt="Curriculum Design Icon" className="service-icon curriculum-design" />
            <h3>Curriculum Design</h3>
            <p>Bespoke Learning Resources and Virtual Learning Environments tailored for your specific needs. Moodle experts will design your schools VLE improving learning outcomes for your high school students.</p>
            <div className="service-highlight">Virtual Classrooms Built for You</div>
          </Link>

          <Link to="/start-here/routes" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={serviceConsultancy} alt="Consultancy Icon" className="service-icon consultancy" />
            <h3>Consultancy</h3>
            <p>Navigating the challenges of international examinations, Matric Exemption, the Two sitting Rule and University entrance requirements.</p>
            <div className="service-highlight">Get Expert Guidance Now</div>
          </Link>
        </div>
      </section>

      {/* Articles Section */}
      <section className="articles-section">
        <div className="container">
          <div className="articles-header">
            <p className="articles-intro">
              <span className="brand-text">GUERILLA TEACHING</span> provides an affordable and flexible support 
              for all your learning needs. <Link to="/about-us/our-clients" className="meet-clients-link">Meet our Clients →</Link>
            </p>
            <p className="articles-subtext">MORE HELP WITH PLANNING YOUR HOME SCHOOLING JOURNEY</p>
            <h2>Secrets of learning revealed in articles</h2>
          </div>
          
          <div className="articles-grid">
            <Link to="/resources/articles/1" className="article-card">
              <div className="article-image">
                <img src={Article1} alt="The Flipped Classroom" className="article-img" />
              </div>
              <div className="article-content">
                <div className="article-category">TEACHING METHODOLOGY</div>
                <h3>The Flipped Classroom</h3>
                <div className="article-date">📅 Mar 25, 2021</div>
              </div>
            </Link>

            <Link to="/resources/articles/3" className="article-card large-article">
              <div className="article-image large">
                <img src={Article3} alt="Why Choose Pearson" className="article-img" />
              </div>
              <div className="article-content">
                <div className="article-category">TEACHING METHODOLOGY</div>
                <h3>Why Choose Pearson?</h3>
                <div className="article-date">📅 May 05, 2025</div>
              </div>
            </Link>

            <Link to="/resources/articles/2" className="article-card">
              <div className="article-image">
                <img src={Article2} alt="Write don't type" className="article-img" />
              </div>
              <div className="article-content">
                <div className="article-category">TEACHING METHODOLOGY</div>
                <h3>Write don't type</h3>
                <div className="article-date">📅 May 05, 2025</div>
              </div>
            </Link>

            <Link to="/resources/articles/5" className="article-card">
              <div className="article-image">
                <img src={Article5} alt="Guerilla Teaching Skills" className="article-img" />
              </div>
              <div className="article-content">
                <div className="article-category">TEACHING METHODOLOGY</div>
                <h3>Guerilla Teaching: Developing Excellent Teaching Skills</h3>
                <div className="article-date">📅 Mar 25, 2021</div>
              </div>
            </Link>
          </div>

          <div className="articles-footer">
            <p>Get into details now? <Link to="/resources/articles" className="view-articles-link">View all articles →</Link></p>
          </div>
        </div>
      </section>

      {/* Contact section removed - now using simple link above */}
    </div>
  );
};

export default Home; 