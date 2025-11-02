// src/components/AdminPanel/sections/News.js
import React, { useState, useEffect } from 'react';
import './News.css';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';

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
  });

  useEffect(() => {
    fetchNews();
  }, []);

const fetchNews = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND + '/api/blog', {
      credentials: 'include'
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        setNews(result.data); // używaj result.data zamiast result.data
      }
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
  submitData.append('content', formData.content); // backend mapuje to na 'text'
  submitData.append('excerpt', formData.excerpt); // backend mapuje to na 'shortText'
  
  if (formData.image) {
    submitData.append('image', formData.image);
  }

  try {
    const url = editingNews 
      ? `${import.meta.env.VITE_BACKEND}/api/blog/${editingNews._id}`
      : import.meta.env.VITE_BACKEND + '/api/blog';
    
    const method = editingNews ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: submitData
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        fetchNews();
        resetForm();
      }
    } else {
      console.error('Błąd zapisywania:', await response.text());
    }
  } catch (error) {
    console.error('Błąd zapisywania aktualności:', error);
  }
};

  const deleteNews = async (newsId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten wpis?')) return;

    try {
      await fetch(`${import.meta.env.VITE_BACKEND}/api/blog/${newsId}`, {
        method: 'DELETE',
        credentials: 'include'
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
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      image: null,
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
        {news && news.length === 0 ? (
          <div className="empty-state">
            <p>Brak aktualności</p>
          </div>
        ) : (
          news.map(item => (
            <div key={item._id} className="news-carda">
                <div className="news-image">
                  {item.image ? (
                    <img 
                      src={`${import.meta.env.VITE_BACKEND}${item.image}`} // używaj item.image zamiast item.imageSrc
                      alt={item.title}
                    />
                  ) : (
                    <div className="no-image">Brak obrazu</div>
                  )}
                </div>

              <div className="news-content">
                <h3 className='newsa-content-title'>{item.title}</h3>
                <p className="news-excerpt">{item.excerpt}</p>
                <div className="news-meta">
                  <span className="news-date">
                    {new Date(item.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>

                <div className="news-actions">
                  <button 
                    className="btn-primary-news-actions"
                    onClick={() => window.open(`/wpis/${item._id}`, '_blank')}
                  >
                    <FaEye style={{marginRight: '5px'}}/> Podgląd
                  </button>
                  <button 
                    className="btn-secondary-news-actions"
                    onClick={() => editNews(item)}
                  >
                    <FaPencil  style={{marginRight: '5px'}}/> Edytuj
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => deleteNews(item._id)}
                  >
                    <FaTrash  style={{marginRight: '5px'}}/> Usuń
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