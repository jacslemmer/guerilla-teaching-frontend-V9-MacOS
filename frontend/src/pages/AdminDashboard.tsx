import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('cms_token');
    const userData = localStorage.getItem('cms_user');

    if (!token || !userData) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>GT CMS</h2>
          <p>Content Management</p>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`nav-item ${isActive('/admin/dashboard') && location.pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </Link>

          <Link
            to="/admin/dashboard/videos"
            className={`nav-item ${isActive('/admin/dashboard/videos') ? 'active' : ''}`}
          >
            <span className="nav-icon">🎥</span>
            <span className="nav-label">Videos</span>
          </Link>

          <Link
            to="/admin/dashboard/articles"
            className={`nav-item ${isActive('/admin/dashboard/articles') ? 'active' : ''}`}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-label">Articles</span>
          </Link>

          <Link
            to="/admin/dashboard/products"
            className={`nav-item ${isActive('/admin/dashboard/products') ? 'active' : ''}`}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Products</span>
          </Link>

          <Link
            to="/admin/dashboard/webinars"
            className={`nav-item ${isActive('/admin/dashboard/webinars') ? 'active' : ''}`}
          >
            <span className="nav-icon">📹</span>
            <span className="nav-label">Webinars</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user.full_name.charAt(0)}</div>
            <div className="user-details">
              <div className="user-name">{user.full_name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className="header-title">
            <h1>Admin Dashboard</h1>
          </div>
          <div className="header-actions">
            <Link to="/" className="view-site-btn">View Site</Link>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
