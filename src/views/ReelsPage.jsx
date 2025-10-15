// src/pages/ReelsPage/ReelsPage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaPause, 
  FaPlay, 
  FaVolumeUp, 
  FaVolumeMute,
  FaSpinner
} from 'react-icons/fa';
import './ReelsPage.css';

const ReelsPage = () => {
  const [reels, setReels] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const progressIntervalRef = useRef(null);

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

  // Aktualny reel
  const currentReel = reels[currentReelIndex];

  // Obsługa odtwarzania wideo
  const setupVideo = useCallback(() => {
    if (!videoRef.current || !currentReel) return;

    const video = videoRef.current;
    
    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleLoadedData = () => {
      if (isPlaying && hasInteracted) {
        video.play().catch(console.error);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadeddata', handleLoadedData);

    // Ustaw źródło wideo
    video.src = `${import.meta.env.VITE_BACKEND}/${currentReel.videoUrl}`;
    video.muted = isMuted;
    video.loop = false;

    // Automatyczne odtwarzanie po interakcji użytkownika
    if (hasInteracted && isPlaying) {
      video.play().catch(console.error);
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [currentReel, isPlaying, isMuted, hasInteracted]);

  useEffect(() => {
    const cleanup = setupVideo();
    return cleanup;
  }, [setupVideo]);

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
  const handleNext = () => {
    setCurrentReelIndex(prev => (prev + 1) % reels.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentReelIndex(prev => (prev - 1 + reels.length) % reels.length);
    setProgress(0);
    setIsPlaying(true);
  };

  // Obsługa kliknięć
  const handleVideoClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    setIsPlaying(prev => !prev);
    setShowControls(true);
  };

  const handleContainerClick = (e) => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPlaying(true);
    }
    setShowControls(true);
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
  }, [reels.length]);

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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [reels.length]);

  // Kontrola odtwarzania
  useEffect(() => {
    if (!videoRef.current || !hasInteracted) return;

    if (isPlaying) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, hasInteracted]);

  if (loading) {
    return (
      <div className="reels-loading">
        <FaSpinner className="loading-spinner" />
        <p>Ładowanie reelów...</p>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="reels-empty">
        <div className="empty-icon">🎬</div>
        <h2>Brak dostępnych reelów</h2>
        <p>Wróć później, aby zobaczyć nowe treści</p>
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

      {/* Główne wideo */}
      <div className="reel-video-container">
        <video
          ref={videoRef}
          className="reel-video"
          onClick={handleVideoClick}
          playsInline
          webkit-playsinline="true"
        />
        
        {/* Overlay z informacjami */}
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

        {/* Kontrolki */}
        <div className={`reel-controls ${showControls ? 'visible' : 'hidden'}`}>
          {/* Lewa strona - nawigacja */}
          <div className="controls-left">
            <button 
              className="control-btn nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
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
              {isPlaying ? <FaPause /> : <FaPlay />}
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
              className="control-btn nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
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
      <div className="reels-counter">
        <span className="current-reel">{currentReelIndex + 1}</span>
        <span className="reels-divider">/</span>
        <span className="total-reels">{reels.length}</span>
      </div>
    </div>
  );
};

export default ReelsPage;