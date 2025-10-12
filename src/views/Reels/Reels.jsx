// src/components/AdminPanel/sections/Reels.js
import React, { useState, useEffect, useRef } from 'react';
import './Reels.css';

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReel, setNewReel] = useState({
    title: '',
    description: '',
    isPublished: false,
    featured: false
  });
  const [previewVideo, setPreviewVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [playingReel, setPlayingReel] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'published', 'draft', 'featured'
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    fetchReels();
  }, [filter]);

  const fetchReels = async () => {
    try {
      let url = import.meta.env.VITE_BACKEND + '/api/reels';
      
      // Dodaj parametry filtrowania dla admina
      if (filter !== 'all') {
        const params = new URLSearchParams();
        switch (filter) {
          case 'published':
            params.append('isPublished', 'true');
            break;
          case 'draft':
            params.append('isPublished', 'false');
            break;
          case 'featured':
            params.append('featured', 'true');
            break;
          default:
            break;
        }
        url += '?' + params.toString();
      }

      const response = await fetch(url, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setReels(result.reels);
          setIsAdmin(result.isAdmin || false);
        }
      } else {
        console.error('Błąd pobierania reelów');
      }
    } catch (error) {
      console.error('Błąd pobierania reelów:', error);
    } finally {
      setLoading(false);
    }
  };

  // Funkcje do odtwarzania wideo (bez zmian)
  const handlePlayReel = (reelId) => {
    Object.keys(videoRefs.current).forEach(id => {
      if (id !== reelId && videoRefs.current[id]) {
        videoRefs.current[id].pause();
        videoRefs.current[id].currentTime = 0;
      }
    });

    setPlayingReel(reelId);
    const video = videoRefs.current[reelId];
    if (video) {
      video.play().catch(error => {
        console.error('Błąd odtwarzania wideo:', error);
      });
    }
  };

  const handlePauseReel = (reelId) => {
    setPlayingReel(null);
    const video = videoRefs.current[reelId];
    if (video) {
      video.pause();
    }
  };

  const handleVideoTimeUpdate = (reelId, event) => {
    const video = event.target;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(prev => ({
      ...prev,
      [reelId]: progress
    }));
  };

  const handleVideoEnd = (reelId) => {
    setPlayingReel(null);
    setVideoProgress(prev => ({
      ...prev,
      [reelId]: 0
    }));
  };

  const handleSeek = (reelId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * (videoRefs.current[reelId]?.duration || 0);
    
    if (videoRefs.current[reelId]) {
      videoRefs.current[reelId].currentTime = seekTime;
    }
  };

  // Funkcje do drag & drop (bez zmian)
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setPreviewVideo(videoUrl);
      
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }

      generateThumbnail(file);
    } else {
      alert('Proszę wybrać plik wideo');
    }
  };

  const generateThumbnail = (file) => {
    const video = document.createElement('video');
    const videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;
    
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const duration = formatDuration(video.duration);
      setNewReel(prev => ({ ...prev, duration }));
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddReel = async (e) => {
    e.preventDefault();
    
    if (!fileInputRef.current?.files[0]) {
      alert('Proszę wybrać plik wideo');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newReel.title);
      formData.append('description', newReel.description);
      formData.append('isPublished', newReel.isPublished.toString());
      formData.append('featured', newReel.featured.toString());
      formData.append('video', fileInputRef.current.files[0]);

      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/reels', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setShowAddForm(false);
          setNewReel({
            title: '',
            description: '',
            isPublished: false,
            featured: false
          });
          setPreviewVideo(null);
          setUploadProgress(0);
          fetchReels();
        }
      } else {
        const error = await response.json();
        alert(`Błąd: ${error.error}`);
      }
    } catch (error) {
      console.error('Błąd dodawania reel:', error);
      alert('Wystąpił błąd podczas dodawania reel');
    }
  };

  const deleteReel = async (reelId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten reel?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/reels/${reelId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        if (playingReel === reelId) {
          setPlayingReel(null);
        }
        fetchReels();
      }
    } catch (error) {
      console.error('Błąd usuwania reel:', error);
    }
  };

  const toggleReelStatus = async (reelId, currentStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/reels/${reelId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isPublished: !currentStatus })
      });

      if (response.ok) {
        fetchReels();
      }
    } catch (error) {
      console.error('Błąd zmiany statusu:', error);
    }
  };

  const toggleFeaturedStatus = async (reelId, currentFeatured) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/reels/${reelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ featured: !currentFeatured })
      });

      if (response.ok) {
        fetchReels();
      }
    } catch (error) {
      console.error('Błąd zmiany statusu wyróżnienia:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setNewReel(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Statystyki z uwzględnieniem statusów
  const getStats = () => {
    const total = reels.length;
    const published = reels.filter(r => r.isPublished).length;
    const drafts = reels.filter(r => !r.isPublished).length;
    const featured = reels.filter(r => r.featured).length;

    return { total, published, drafts, featured };
  };

  const stats = getStats();

  if (loading) {
    return <div className="reels-loading">Ładowanie reelów...</div>;
  }

  return (
    <div className="reels-section">
      <div className="reels-header">
        <div className="reels-header__text">
          <h2>🎬 Zarządzanie Reels</h2>
          <p>
            {isAdmin 
              ? 'Zarządzaj wszystkimi reelami - opublikowanymi i szkicami' 
              : 'Przeglądaj opublikowane reels'
            }
          </p>
        </div>
        {isAdmin && (
          <button 
            className="reels-btn--primary"
            onClick={() => setShowAddForm(true)}
          >
            + Dodaj nowy reel
          </button>
        )}
      </div>

      {/* Filtry dla admina */}
      {isAdmin && (
        <div className="reels-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Wszystkie
          </button>
          <button 
            className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
            onClick={() => setFilter('published')}
          >
            Opublikowane
          </button>
          <button 
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Szkice
          </button>
          <button 
            className={`filter-btn ${filter === 'featured' ? 'active' : ''}`}
            onClick={() => setFilter('featured')}
          >
            Wyróżnione
          </button>
        </div>
      )}

      <div className="reels-stats">
        <div className="reels-stat">
          <div className="reels-stat__number">{stats.total}</div>
          <div className="reels-stat__label">Wszystkie reels</div>
        </div>
        {isAdmin && (
          <>
            <div className="reels-stat">
              <div className="reels-stat__number">{stats.published}</div>
              <div className="reels-stat__label">Opublikowane</div>
            </div>
            <div className="reels-stat">
              <div className="reels-stat__number">{stats.drafts}</div>
              <div className="reels-stat__label">Szkice</div>
            </div>
          </>
        )}
        <div className="reels-stat">
          <div className="reels-stat__number">{stats.featured}</div>
          <div className="reels-stat__label">Wyróżnione</div>
        </div>
      </div>

      {/* Formularz dodawania nowego reel - tylko dla admina */}
      {showAddForm && isAdmin && (
        <div className="reels-modal">
          <div className="reels-modal__content">
            <div className="reels-modal__header">
              <h3>Dodaj nowy reel</h3>
              <button 
                className="reels-modal__close"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddReel} className="reels-form">
              <div className="reels-form__grid">
                <div className="reels-form__group full-width">
                  <label>Film wideo *</label>
                  <div 
                    ref={dropAreaRef}
                    className={`video-upload-area ${isDragging ? 'dragging' : ''} ${previewVideo ? 'has-video' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleAreaClick}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="video/*"
                      onChange={handleFileInputChange}
                      className="video-upload-input"
                    />
                    {previewVideo ? (
                      <div className="video-preview">
                        <video src={previewVideo} controls className="preview-player" />
                        <div className="video-info">
                          <p>Wybrano plik wideo</p>
                          <button 
                            type="button"
                            className="change-video-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                          >
                            Zmień wideo
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="upload-icon">🎬</div>
                        <p>Kliknij lub przeciągnij plik wideo tutaj</p>
                        <small>Obsługiwane formaty: MP4, MOV, AVI (max 50MB)</small>
                      </div>
                    )}
                  </div>
                </div>

                <div className="reels-form__group full-width">
                  <label>Tytuł *</label>
                  <input
                    type="text"
                    value={newReel.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    maxLength="60"
                    placeholder="Wprowadź tytuł reel..."
                  />
                  <div className="char-counter">{newReel.title.length}/60</div>
                </div>

                <div className="reels-form__group full-width">
                  <label>Opis</label>
                  <textarea
                    value={newReel.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="3"
                    maxLength="150"
                    placeholder="Krótki opis filmu..."
                  />
                  <div className="char-counter">{newReel.description.length}/150</div>
                </div>

                <div className="reels-form__checkboxes">
                  <label className="reels-form__checkbox">
                    <input
                      type="checkbox"
                      checked={newReel.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                    />
                    Opublikowany od razu
                  </label>
                  <label className="reels-form__checkbox">
                    <input
                      type="checkbox"
                      checked={newReel.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                    />
                    Wyróżniony
                  </label>
                </div>
              </div>

              <div className="reels-form__actions">
                <button 
                  type="button" 
                  className="reels-form__btn--secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setPreviewVideo(null);
                    setNewReel({
                      title: '',
                      description: '',
                      isPublished: false,
                      featured: false
                    });
                  }}
                >
                  Anuluj
                </button>
                <button 
                  type="submit" 
                  className="reels-form__btn--primary"
                  disabled={!previewVideo || !newReel.title.trim()}
                >
                  Dodaj reel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Siatka reelów */}
      <div className="reels-grid">
        {reels.length === 0 ? (
          <div className="reels-empty">
            <div className="empty-icon">🎬</div>
            <p>
              {filter !== 'all' 
                ? `Brak reelów w kategorii: ${filter}`
                : 'Brak reelów do wyświetlenia'
              }
            </p>
            {isAdmin && (
              <button 
                className="reels-btn--primary"
                onClick={() => setShowAddForm(true)}
              >
                Dodaj pierwszy reel
              </button>
            )}
          </div>
        ) : (
          reels.map(reel => (
            <div key={reel._id} className="reel-card">
              <div className="reel-card__video">
                <div className="reel-card__video-container">
                  <video 
                    ref={el => videoRefs.current[reel._id] = el}
                    src={import.meta.env.VITE_BACKEND + '/' + reel.videoUrl}
                    className="reel-video"
                    muted={playingReel !== reel._id}
                    loop={playingReel !== reel._id}
                    onTimeUpdate={(e) => handleVideoTimeUpdate(reel._id, e)}
                    onEnded={() => handleVideoEnd(reel._id)}
                    onClick={() => playingReel === reel._id ? handlePauseReel(reel._id) : handlePlayReel(reel._id)}
                  />
                  
                  {/* Progress bar */}
                  <div 
                    className="video-progress-container"
                    onClick={(e) => handleSeek(reel._id, e)}
                  >
                    <div 
                      className="video-progress-bar"
                      style={{ width: `${videoProgress[reel._id] || 0}%` }}
                    />
                  </div>

                  <div className="reel-card__overlay">
                    <div className={`reel-card__status ${reel.isPublished ? 'published' : 'draft'}`}>
                      {reel.isPublished ? 'OPUBLIKOWANY' : 'SZKIC'}
                    </div>
                    {reel.featured && (
                      <div className="reel-card__featured-badge">
                        ⭐ WYRÓŻNIONY
                      </div>
                    )}
                  </div>

                  {/* Play/Pause button */}
                  {playingReel !== reel._id && (
                    <div 
                      className="reel-card__play-btn"
                      onClick={() => handlePlayReel(reel._id)}
                    >
                      ▶
                    </div>
                  )}

                  {/* Pause button when playing */}
                  {playingReel === reel._id && (
                    <div 
                      className="reel-card__pause-btn"
                      onClick={() => handlePauseReel(reel._id)}
                    >
                      ❚❚
                    </div>
                  )}
                </div>
              </div>

              <div className="reel-card__content">
                <h3 className="reel-card__title">{reel.title}</h3>
                <p className="reel-card__description">{reel.description}</p>
                
                <div className="reel-card__meta">
                  <span className="reel-card__date">
                    {new Date(reel.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>

                <div className="reel-card__actions">
                  {/* Przyciski tylko dla admina */}
                  {isAdmin && (
                    <>
                      {reel.isPublished ? (
                        <button 
                          className="reel-card__btn--warning"
                          onClick={() => toggleReelStatus(reel._id, reel.isPublished)}
                        >
                          Cofnij publikację
                        </button>
                      ) : (
                        <button 
                          className="reel-card__btn--success"
                          onClick={() => toggleReelStatus(reel._id, reel.isPublished)}
                        >
                          Opublikuj
                        </button>
                      )}
                      
                      {reel.featured ? (
                        <button 
                          className="reel-card__btn--secondary"
                          onClick={() => toggleFeaturedStatus(reel._id, reel.featured)}
                        >
                          Usuń wyróżnienie
                        </button>
                      ) : (
                        <button 
                          className="reel-card__btn--primary"
                          onClick={() => toggleFeaturedStatus(reel._id, reel.featured)}
                        >
                          Wyróżnij
                        </button>
                      )}
                      
                      <button 
                        className="reel-card__btn--danger"
                        onClick={() => deleteReel(reel._id)}
                      >
                        Usuń
                      </button>
                    </>
                  )}
                  
                  {/* Dla zwykłych użytkowników tylko podgląd */}
                  {!isAdmin && (
                    <button 
                      className="reel-card__btn--secondary"
                      onClick={() => window.open(`/reels/${reel._id}`, '_blank')}
                    >
                      Obejrzyj
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reels;