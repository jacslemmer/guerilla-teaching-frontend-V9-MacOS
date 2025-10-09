import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  return (
    <div className="dashboard-home">
      <h2>Welcome to Guerilla Teaching CMS</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎥</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Total Videos</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">5</div>
          <div className="stat-label">Published Articles</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-value">21</div>
          <div className="stat-label">Active Products</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📹</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Upcoming Webinars</div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/admin/dashboard/videos" className="action-btn">
            <span>🎥</span>
            <span>Manage Videos</span>
          </Link>
          <Link to="/admin/dashboard/articles" className="action-btn">
            <span>📝</span>
            <span>Manage Articles</span>
          </Link>
          <Link to="/admin/dashboard/products" className="action-btn">
            <span>📦</span>
            <span>Manage Products</span>
          </Link>
          <Link to="/admin/dashboard/webinars" className="action-btn">
            <span>📹</span>
            <span>Manage Webinars</span>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3>Getting Started</h3>
        <ul style={{ lineHeight: '2', color: '#666' }}>
          <li><strong>Videos:</strong> Add YouTube video URLs to display on your website pages</li>
          <li><strong>Articles:</strong> Create and manage blog posts and articles</li>
          <li><strong>Products:</strong> Manage courses, programs, and tutoring services</li>
          <li><strong>Webinars:</strong> Schedule and manage upcoming webinars and live sessions</li>
        </ul>
        <p style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderLeft: '4px solid #ffc107', borderRadius: '4px' }}>
          <strong>Note:</strong> All changes are saved to the database and will be reflected on the public website immediately.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
