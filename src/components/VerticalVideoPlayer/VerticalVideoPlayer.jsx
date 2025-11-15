import React, { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaExpand, 
  FaCompress,
  FaStepForward,
  FaStepBackward
} from 'react-icons/fa';

import vid1 from '../../assets/rolki/1.mov';
import vid2 from '../../assets/rolki/2.mov';
import vid3 from '../../assets/rolki/3.mov';
import vid4 from '../../assets/rolki/4.mov';
import vid5 from '../../assets/rolki/5.mov';
import vid6 from '../../assets/rolki/6.mov';
import vid7 from '../../assets/rolki/7.mov';

import './VerticalVideoPlayer.css';

const VerticalVideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [thumbnails, setThumbnails] = useState({});

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const thumbnailCanvasRef = useRef(null);

  const videos = [
    {
      id: 1,
      title: "Czym są raty notarialne? - Dawid Frey",
      src: vid1,
      duration: "0:31"
    },
    {
      id: 2,
      title: "Czy raty notarialne są legalne?",
      src: vid2,
      duration: "0:48"
    },
    {
      id: 3,
      title: "Czym są raty notarialne? - Wiktoria Kisio",
      src: vid3,
      duration: "0:38"
    },
    {
      id: 4,
      title: "Nieruchomości",
      src: vid4,
      duration: "0:31"
    },
    {
      id: 5,
      title: "Procedura rat notarialnych",
      src: vid5,
      duration: "0:38"
    },
    {
      id: 6,
      title: "Wyróżniamy się na rynku?",
      src: vid6,
      duration: "3:30"
    },
    {
      id: 7,
      title: "Czy raty notarialne są dla ciebie?",
      src: vid7,
      duration: "2:55"
    }
  ];

  // Funkcja do generowania miniaturek
  const generateThumbnail = (videoSrc, videoId) => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = thumbnailCanvasRef.current || document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.crossOrigin = 'anonymous';
      video.src = videoSrc;
      
      video.addEventListener('loadeddata', () => {
        // Ustaw czas na 10% długości wideo lub 2 sekundy (co jest mniejsze)
        const seekTime = Math.min(video.duration * 0.1, 2);
        video.currentTime = seekTime;
      });

      video.addEventListener('seeked', () => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          // Dostosuj rozmiar canvas do wideo
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          // Narysuj klatkę wideo na canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Konwertuj do URL danych
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          resolve(thumbnailUrl);
        } else {
          // Fallback - pusta miniaturka
          resolve('');
        }
      });

      video.addEventListener('error', () => {
        console.warn(`Nie udało się wygenerować miniatury dla wideo ${videoId}`);
        resolve('');
      });

      // Timeout na wypadek problemów z ładowaniem
      setTimeout(() => {
        if (!canvas.width) {
          resolve('');
        }
      }, 5000);
    });
  };

  // Efekt do generowania miniaturek przy pierwszym renderowaniu
  useEffect(() => {
    const generateAllThumbnails = async () => {
      const newThumbnails = {};
      
      for (const video of videos) {
        if (!thumbnails[video.id]) {
          try {
            const thumbnail = await generateThumbnail(video.src, video.id);
            newThumbnails[video.id] = thumbnail;
          } catch (error) {
            console.error('Błąd generowania miniatury:', error);
            newThumbnails[video.id] = '';
          }
        }
      }
      
      setThumbnails(prev => ({ ...prev, ...newThumbnails }));
    };

    generateAllThumbnails();
  }, []);

  // Efekt do aktualizacji postępu i czasu
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const updateDuration = () => {
      setVideoDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentVideoIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const selectVideo = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setIsPlaying(true);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(true);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Ukryty canvas do generowania miniaturek
  return (
    <div 
      className={`vertical-video-player ${isFullscreen ? 'fullscreen' : ''}`}
      ref={containerRef}
    >
      <canvas 
        ref={thumbnailCanvasRef} 
        style={{ display: 'none' }} 
      />
      
      <div className="video-player-container">
        {/* Główne okno wideo */}
        <div className="main-video-section">
          <div className="video-wrapper">
            <video
              ref={videoRef}
              src={videos[currentVideoIndex].src}
              poster={thumbnails[videos[currentVideoIndex].id] || ''}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
            />
            
            {/* Overlay z kontrolkami */}
            <div className="video-controls-overlay">
              <div className="progress-bara" onClick={handleProgressClick}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="controls-bottom">
                <div className="controls-lefta">
                  <button className="control-btna" onClick={togglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  
                  <button className="control-btna" onClick={prevVideo}>
                    <FaStepBackward />
                  </button>
                  
                  <button className="control-btna" onClick={nextVideo}>
                    <FaStepForward />
                  </button>
                  
                  <div className="volume-controla">
                    <button className="control-btna" onClick={toggleMute}>
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>
                  
                  <span className="time-display">
                    {formatTime(currentTime)} / {formatTime(videoDuration)}
                  </span>
                </div>
                
                <div className="controls-righta">
                  <button className="control-btna" onClick={toggleFullscreen}>
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="video-info">
            <h3>{videos[currentVideoIndex].title}</h3>
            <span className="video-duration">{videos[currentVideoIndex].duration}</span>
          </div>
        </div>

        {/* Lista wideo po prawej stronie */}
        <div className="video-playlist">
          <div className="playlist-header">
            <h3>Poznaj raty notarialne</h3>
            <span>{currentVideoIndex + 1} / {videos.length}</span>
          </div>
          
          <div className="playlist-items">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`playlist-item ${index === currentVideoIndex ? 'active' : ''}`}
                onClick={() => selectVideo(index)}
              >
                <div className="item-thumbnail">
                  {thumbnails[video.id] ? (
                    <img src={thumbnails[video.id]} alt={video.title} />
                  ) : (
                    <div className="thumbnail-placeholder">
                      <FaPlay />
                    </div>
                  )}
                  <div className="item-play-icon">
                    <FaPlay />
                  </div>
                  <span className="item-duration">{video.duration}</span>
                </div>
                
                <div className="item-info">
                  <h4>{video.title}</h4>
                  <div className="item-progress">
                    <div 
                      className="item-progress-fill" 
                      style={{ 
                        width: index === currentVideoIndex ? `${progress}%` : '0%' 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalVideoPlayer;