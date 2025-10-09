import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8787/api/cms/auth/login', {
        email,
        password
      });

      // Store token and user info
      localStorage.setItem('cms_token', response.data.token);
      localStorage.setItem('cms_user', JSON.stringify(response.data.user));

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>CMS Login</h1>
            <p>Guerilla Teaching Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@guerillateaching.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            <p>Default credentials: admin@guerillateaching.com / Admin123!</p>
            <p className="warning-text">Please change the default password after first login</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
