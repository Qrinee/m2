// src/pages/ReelsPage/ReelsPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPause, 
  FaPlay, 
  FaVolumeUp, 
  FaVolumeMute,
  FaSpinner,
  FaTimes
} from 'react-icons/fa';
import './ReelsPage.css';

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Pobierz reels z backendu
  useEffect(() => {
    const fetchReels = async () => {
      try {
        setError(null);
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/reels/public/all`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            const fetchedReels = result.reels;
            setReels(fetchedReels);
            
            // Znajdź index reela na podstawie ID z URL
            if (id && fetchedReels.length > 0) {
              const reelIndex = fetchedReels.findIndex(reel => reel._id === id);
              if (reelIndex !== -1) {
                setCurrentReelIndex(reelIndex);
              } else {
                // Jeśli nie znaleziono reela z tym ID, pokaż pierwszy
                console.warn('Reel not found with ID:', id, 'showing first available');
                setCurrentReelIndex(0);
              }
            }
          } else {
            setError('Failed to load reels');
          }
        } else {
          setError('Failed to fetch reels: ' + response.status);
        }
      } catch (error) {
        console.error('Błąd pobierania reelów:', error);
        setError('Connection error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [id]);

  // Aktualny reel
  const currentReel = reels[currentReelIndex];

  // Obsługa odtwarzania wideo
  const setupVideo = useCallback(() => {
    if (!videoRef.current || !currentReel) return;

    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadedData = () => {
      console.log('Video loaded, auto-playing:', isPlaying && hasInteracted);
      if (isPlaying && hasInteracted) {
        video.play().catch(error => {
          console.error('Auto-play failed:', error);
          setIsPlaying(false);
        });
      }
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      setError('Error loading video');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    const videoUrl = `${import.meta.env.VITE_BACKEND}/${currentReel.videoUrl}`;
    console.log('Setting video source:', videoUrl);
    video.src = videoUrl;
    video.muted = isMuted;
    video.loop = false;
    video.preload = "metadata";

    // Spróbuj załadować wideo
    video.load();

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [currentReel, isPlaying, isMuted, hasInteracted]);

  useEffect(() => {
    const cleanup = setupVideo();
    return cleanup;
  }, [setupVideo]);

  // Aktualizuj URL gdy zmienia się current reel
  useEffect(() => {
    if (currentReel && currentReel._id && currentReel._id !== id) {
      navigate(`/reel/${currentReel._id}`, { replace: true });
    }
  }, [currentReel, id, navigate]);

  // Ukrywanie kontrolek po 3 sekundach
  useEffect(() => {
    if (showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls]);

  // Nawigacja
  const handleNext = useCallback(() => {
    if (reels.length > 0) {
      setCurrentReelIndex(prev => (prev + 1) % reels.length);
      setProgress(0);
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [reels.length]);

  const handlePrev = useCallback(() => {
    if (reels.length > 0) {
      setCurrentReelIndex(prev => (prev - 1 + reels.length) % reels.length);
      setProgress(0);
      setIsPlaying(true);
      setHasInteracted(true);
    }
  }, [reels.length]);

  // Zamknij i wróć do siatki
  const handleClose = () => {
    navigate('/reels');
  };

  // Obsługa kliknięć
  const handleVideoClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    setShowControls(true);
  };

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current) {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
      setShowControls(true);
    }
  };

  const handlePlayPause = () => {
    if (!hasInteracted) setHasInteracted(true);
    setIsPlaying(prev => !prev);
    setShowControls(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
    setShowControls(true);
  };

  // Obsługa scrollowania
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleNext, handlePrev]);

  // Obsługa klawiszy
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          handlePrev();
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          handleNext();
          break;
        case 'Space':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'KeyM':
          e.preventDefault();
          handleMuteToggle();
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNext, handlePrev, handlePlayPause, handleMuteToggle]);

  // Kontrola odtwarzania
  useEffect(() => {
    if (!videoRef.current || !currentReel) return;

    const video = videoRef.current;
    
    if (isPlaying && hasInteracted) {
      video.play().catch(error => {
        console.error('Play failed:', error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, hasInteracted, currentReel]);

  if (loading) {
    return (
      <div className="reels-loading">
        <FaSpinner className="loading-spinner" />
        <p>Ładowanie reelów...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reels-empty">
        <div className="empty-icon">❌</div>
        <h2>Wystąpił błąd</h2>
        <p>{error}</p>
        <button 
          className="back-button"
          onClick={() => navigate('/reels')}
        >
          Wróć do siatki
        </button>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="reels-empty">
        <div className="empty-icon">🎬</div>
        <h2>Brak dostępnych reelów</h2>
        <p>Wróć później, aby zobaczyć nowe treści</p>
        <button 
          className="back-button"
          onClick={() => navigate('/reels')}
        >
          Wróć do siatki
        </button>
      </div>
    );
  }

  if (!currentReel) {
    return (
      <div className="reels-empty">
        <div className="empty-icon">❌</div>
        <h2>Reel nie został znaleziony</h2>
        <p>Ten reel może być niedostępny lub został usunięty</p>
        <button 
          className="back-button"
          onClick={() => navigate('/reels')}
        >
          Wróć do siatki
        </button>
      </div>
    );
  }

  return (
    <div 
      className="reels-page"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Progress indicator */}
      <div className="reels-progress-container">
        {reels.map((_, index) => (
          <div 
            key={index}
            className="reel-progress-track"
          >
            <div 
              className={`reel-progress-fill ${
                index === currentReelIndex ? 'active' : ''
              } ${
                index < currentReelIndex ? 'completed' : ''
              }`}
              style={{
                width: index === currentReelIndex ? `${progress}%` : 
                       index < currentReelIndex ? '100%' : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Przycisk zamknięcia */}
      <button 
        className="reels-close-btn"
        onClick={handleClose}
      >
        <FaTimes />
      </button>

      {/* Główne wideo */}
      <div className="reel-video-container">
        <video
          ref={videoRef}
          className="reel-video"
          onClick={handleVideoClick}
          playsInline
          muted={false}
          webkit-playsinline="true"
          preload="metadata"
        />
        
        {/* Overlay z informacjami */}
        {currentReel && (
          <div className="reel-info-overlay">
            <div className="reel-author">
              <div className="author-avatar">
                {currentReel.user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="author-info">
                <span className="author-name">
                  {currentReel.user?.name || 'Użytkownik'}
                </span>
              </div>
            </div>

            <div className="reel-content">
              <h3 className="reel-title">{currentReel.title}</h3>
              {currentReel.description && (
                <p className="reel-description">{currentReel.description}</p>
              )}
            </div>
          </div>
        )}

        {/* Kontrolki */}
        <div className={`reel-controls ${showControls ? 'visible' : 'hidden'}`}>
          {/* Lewa strona - nawigacja */}
          <div className="controls-left">
            <button 
              className="control-btn"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              disabled={reels.length <= 1}
            >
              <FaChevronLeft />
            </button>
          </div>

          {/* Środek - play/pause */}
          <div className="controls-center">

            <button 
              className="control-btn play-pause-btn"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause();
              }}
            >
              {isPlaying ? <FaPause fill='white' style={{fontSize: '30px', position: 'absolute'}} /> : <FaPlay fill='white' style={{fontSize: '30px', position: 'absolute'}} />}
            </button>
          </div>

          {/* Prawa strona - mute i nawigacja */}
          <div className="controls-right">
            <button 
              className="control-btn mute-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleMuteToggle();
              }}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button 
              className="control-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={reels.length <= 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Wskazówki dla użytkownika */}
        {!hasInteracted && (
          <div className="reel-interaction-hint">
            <div className="hint-content">
              <p>Kliknij, aby odtworzyć</p>
              <div className="hint-arrows">
                <span>↑↓</span>
                <span>Przewijaj</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Licznik reelów */}
      {reels.length > 1 && (
        <div className="reels-counter">
          <span className="current-reel">{currentReelIndex + 1}</span>
          <span className="reels-divider">/</span>
          <span className="total-reels">{reels.length}</span>
        </div>
      )}
    </div>
  );
};

export default ReelsPage;