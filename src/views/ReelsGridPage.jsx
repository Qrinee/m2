// src/pages/ReelsGridPage/ReelsGridPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReelsGridPage.css';
import Header from '../components/Header/Header';

const ReelsGridPage = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pobierz reels z backendu
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/reels?isPublished=true`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setReels(result.reels);
          }
        }
      } catch (error) {
        console.error('Błąd pobierania reelów:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleReelClick = (reelId) => {
    navigate(`/reel/${reelId}`);
  };

  if (loading) {
    return (
      <div className="reels-grid-loading">
        <div className="loading-spinner"></div>
        <p>Ładowanie reelów...</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="reels-grid-empty">
              <Header black/>
      <div className='separate'></div>
        <div className="empty-icon">🎬</div>
        <h2>Brak dostępnych reelów</h2>
        <p>Wróć później, aby zobaczyć nowe treści</p>
      </div>
    );
  }

  return (
    <div>
      <Header black/>
      <div className='separate'></div>
    <div className="reels-grid-page">

      <div className="reels-grid-header">
        <h1>Reels</h1>
        <p>Rolki od zesołu M2Notarialnie.pl</p>
      </div>

      <div className="reels-grid-container">
        {reels.map((reel) => (
          <div
            key={reel._id}
            className="reel-grid-item"
            onClick={() => handleReelClick(reel._id)}
          >
            <div className="reel-thumbnail-container">
              <video
                className="reel-thumbnail-video"
                muted
                playsInline
                webkit-playsinline="true"
                preload="metadata"
              >
                <source src={`${import.meta.env.VITE_BACKEND}/${reel.videoUrl}#t=0.5`} type="video/mp4" />
              </video>
              <div className="reel-overlay">
                <div className="reel-play-icon">
                  <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="reel-duration">
                {reel.duration || '0:15'}
              </div>
            </div>

            <div className="reel-grid-info">
              <div className="reel-author-grid">
                <div className="author-avatar-grid">
                  {reel.user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="author-info-grid">
                  <span className="author-name-grid">
                    {reel.user?.name || 'Użytkownik'}
                  </span>
                  <span className="reel-date">
                    {new Date(reel.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                </div>
              </div>
              
              <h3 className="reel-title-grid">{reel.title}</h3>
              
              {reel.description && (
                <p className="reel-description-grid">
                  {reel.description.length > 120 
                    ? `${reel.description.substring(0, 120)}...` 
                    : reel.description
                  }
                </p>
              )}

              <div className="reel-tags">
                {reel.tags && reel.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="reel-tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ReelsGridPage;