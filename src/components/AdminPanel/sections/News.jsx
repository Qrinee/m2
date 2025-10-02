// src/components/AdminPanel/sections/News.js
import React, { useState, useEffect } from 'react';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: null,
    status: 'draft',
    category: 'news'
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/news', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNews(data.data);
      }
    } catch (error) {
      console.error('Błąd pobierania aktualności:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('status', formData.status);
    submitData.append('category', formData.category);
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      const url = editingNews 
        ? `http://localhost:5000/api/admin/news/${editingNews._id}`
        : 'http://localhost:5000/api/admin/news';
      
      const method = editingNews ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (response.ok) {
        fetchNews();
        resetForm();
      }
    } catch (error) {
      console.error('Błąd zapisywania aktualności:', error);
    }
  };

  const deleteNews = async (newsId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten wpis?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/admin/news/${newsId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchNews();
    } catch (error) {
      console.error('Błąd usuwania aktualności:', error);
    }
  };

  const editNews = (newsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      excerpt: newsItem.excerpt,
      image: null,
      status: newsItem.status,
      category: newsItem.category
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image: null,
      status: 'draft',
      category: 'news'
    });
    setEditingNews(null);
    setShowForm(false);
  };

  const handleImageChange = (e) => {
    setFormData({...formData, image: e.target.files[0]});
  };

  if (loading) {
    return <div className="loading">Ładowanie aktualności...</div>;
  }

  return (
    <div className="news-section">
      <div className="section-header">
        <h2>Zarządzanie aktualnościami</h2>
        <p>Twórz i edytuj wpisy na stronie</p>
      </div>

      <div className="news-actions">
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Nowy wpis
        </button>
      </div>

      {showForm && (
        <div className="news-form">
          <h3>{editingNews ? 'Edytuj wpis' : 'Nowy wpis'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tytuł:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Krótki opis:</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label>Treść:</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows="10"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kategoria:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="news">Aktualności</option>
                  <option value="tips">Porady</option>
                  <option value="market">Rynek nieruchomości</option>
                  <option value="company">Firma</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="draft">Szkic</option>
                  <option value="published">Opublikowany</option>
                </select>
              </div>

              <div className="form-group">
                <label>Obraz:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingNews ? 'Zaktualizuj' : 'Opublikuj'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="news-grid">
        {news.length === 0 ? (
          <div className="empty-state">
            <p>Brak aktualności</p>
          </div>
        ) : (
          news.map(item => (
            <div key={item._id} className="news-card">
              <div className="news-image">
                {item.image ? (
                  <img 
                    src={`http://localhost:5000/${item.image}`} 
                    alt={item.title}
                  />
                ) : (
                  <div className="no-image">Brak obrazu</div>
                )}
                <div className={`status-badge ${item.status}`}>
                  {item.status === 'published' ? 'Opublikowany' : 'Szkic'}
                </div>
              </div>

              <div className="news-content">
                <h3>{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-meta">
                  <span className="news-category">{item.category}</span>
                  <span className="news-date">
                    {new Date(item.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>

                <div className="news-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => editNews(item)}
                  >
                    Edytuj
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteNews(item._id)}
                  >
                    Usuń
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => window.open(`/aktualnosci/${item.slug}`, '_blank')}
                  >
                    Podgląd
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;