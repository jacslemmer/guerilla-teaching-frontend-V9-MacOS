import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { getApiUrl } from '../config/api';
import './VideoManagement.css';

interface Video {
  id: number;
  title: string;
  description?: string;
  video_url: string;
  video_type: string;
  thumbnail_url?: string;
  category?: string;
  display_page?: string;
  display_order: number;
  is_active: number;
  created_at?: string;
}

const VideoManagement: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    video_type: 'youtube',
    thumbnail_url: '',
    category: 'general',
    display_page: 'homepage',
    display_order: 0,
    is_active: 1
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('cms_token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(getApiUrl('/api/cms/videos'), getAuthHeaders());
      setVideos(response.data.videos || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      // For now, use empty array
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVideo) {
        await axios.put(
          `getApiUrl('/api/cms/videos')/${editingVideo.id}`,
          formData,
          getAuthHeaders()
        );
      } else {
        await axios.post(getApiUrl('/api/cms/videos'), formData, getAuthHeaders());
      }
      fetchVideos();
      resetForm();
    } catch (error) {
      console.error('Error saving video:', error);
      alert('Error saving video. Please try again.');
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      video_url: video.video_url,
      video_type: video.video_type,
      thumbnail_url: video.thumbnail_url || '',
      category: video.category || 'general',
      display_page: video.display_page || 'homepage',
      display_order: video.display_order,
      is_active: video.is_active
    });
    setPreviewUrl(video.video_url);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      await axios.delete(`getApiUrl('/api/cms/videos')/${id}`, getAuthHeaders());
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      video_url: '',
      video_type: 'youtube',
      thumbnail_url: '',
      category: 'general',
      display_page: 'homepage',
      display_order: 0,
      is_active: 1
    });
    setEditingVideo(null);
    setShowForm(false);
    setPreviewUrl('');
  };

  const handlePreview = () => {
    if (formData.video_url) {
      setPreviewUrl(formData.video_url);
    }
  };

  return (
    <div className="video-management">
      <div className="page-header">
        <h2>Video Management</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Video'}
        </button>
      </div>

      {showForm && (
        <div className="video-form-card">
          <h3>{editingVideo ? 'Edit Video' : 'Add New Video'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="CEO Message - Welcome Video"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="general">General</option>
                  <option value="ceo_message">CEO Message</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="testimonial">Testimonial</option>
                  <option value="webinar">Webinar</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of the video content..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Video URL * (YouTube, Vimeo, etc.)</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="form-group">
                <label>Video Type</label>
                <select
                  value={formData.video_type}
                  onChange={(e) => setFormData({ ...formData, video_type: e.target.value })}
                >
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="direct">Direct URL</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Display Page</label>
                <select
                  value={formData.display_page}
                  onChange={(e) => setFormData({ ...formData, display_page: e.target.value })}
                >
                  <option value="homepage">Homepage</option>
                  <option value="about">About Us</option>
                  <option value="learning-portal">Learning Portal</option>
                  <option value="resources">Resources</option>
                </select>
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: parseInt(e.target.value) })}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePreview}>
                Preview Video
              </button>
              <button type="submit" className="btn-primary">
                {editingVideo ? 'Update Video' : 'Add Video'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>

          {previewUrl && (
            <div className="video-preview">
              <h4>Video Preview:</h4>
              <div className="player-wrapper">
                <ReactPlayer
                  url={previewUrl}
                  controls
                  width="100%"
                  height="400px"
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="videos-list">
        <h3>All Videos ({videos.length})</h3>
        {loading ? (
          <div className="loading">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="empty-state">
            <p>No videos yet. Click "Add New Video" to get started!</p>
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        // If thumbnail fails to load, show placeholder
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="no-thumbnail">Video Thumbnail</div>';
                      }}
                    />
                  ) : (
                    <div className="no-thumbnail">No Thumbnail</div>
                  )}
                </div>
                <div className="video-info">
                  <h4>{video.title}</h4>
                  {video.description && <p className="video-description">{video.description}</p>}
                  <div className="video-meta">
                    <span className="badge">{video.category}</span>
                    <span className="badge">{video.display_page}</span>
                    <span className={`badge ${video.is_active ? 'active' : 'inactive'}`}>
                      {video.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="video-actions">
                  <button className="btn-edit" onClick={() => handleEdit(video)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(video.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManagement;
