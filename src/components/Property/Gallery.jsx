import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaTimes } from 'react-icons/fa';

const Gallery = ({ images, index, setIndex }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const changeImage = (newIndex, newDirection) => {
    if (isTransitioning || newIndex === index) return;
    
    setIsTransitioning(true);
    setDirection(newDirection);
    setIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setDirection(0);
    }, 300);
  };

  const nextImage = () => {
    const newIndex = (index + 1) % images.length;
    changeImage(newIndex, 1);
  };

  const prevImage = () => {
    const newIndex = (index - 1 + images.length) % images.length;
    changeImage(newIndex, -1);
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, index, images.length]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    setTouchStart(null);
  };

  return (
    <>
      <div className={`prop-gallery ${isFullscreen ? 'fullscreen' : ''}`}>
        <div 
          className="prop-main-photo"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`image-container ${direction === 1 ? 'slide-left' : direction === -1 ? 'slide-right' : ''}`}>
            <img 
              src={images[index]} 
              alt={`photo-${index}`}
              onClick={() => setIsFullscreen(true)}
            />
          </div>
          
          <div className="gallery-counter">{index + 1} / {images.length}</div>

          {images.length > 1 && (
            <>
              <button 
                className="gallery-arrow gallery-arrow-left" 
                onClick={prevImage}
                aria-label="Poprzednie zdjęcie"
              >
                <FaChevronLeft size={20} />
              </button>
              <button 
                className="gallery-arrow gallery-arrow-right" 
                onClick={nextImage}
                aria-label="Następne zdjęcie"
              >
                <FaChevronRight size={20} />
              </button>
            </>
          )}

          <button 
            className="gallery-fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? "Zamknij pełny ekran" : "Otwórz pełny ekran"}
          >
            {isFullscreen ? (
              <FaCompress size={16} />
            ) : (
              <FaExpand size={16} />
            )}
          </button>
        </div>

        {!isFullscreen && images.length > 1 && (
          <div className="prop-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`prop-thumb-btn ${i === index ? "active" : ""}`}
                onClick={() => changeImage(i, 0)}
              >
                <img src={src} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div 
          className="gallery-overlay"
          onClick={() => setIsFullscreen(false)}
        >
          <div 
            className="gallery-fullscreen-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`image-container ${direction === 1 ? 'slide-left' : direction === -1 ? 'slide-right' : ''}`}>
              <img 
                src={images[index]} 
                alt={`photo-${index}`}
              />
            </div>
            
            <div className="gallery-fullscreen-counter">{index + 1} / {images.length}</div>

            {images.length > 1 && (
              <>
                <button 
                  className="gallery-arrow gallery-arrow-left" 
                  onClick={prevImage}
                  aria-label="Poprzednie zdjęcie"
                >
                  <FaChevronLeft size={24} />
                </button>
                <button 
                  className="gallery-arrow gallery-arrow-right" 
                  onClick={nextImage}
                  aria-label="Następne zdjęcie"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}

            <button 
              className="gallery-close-fullscreen"
              onClick={() => setIsFullscreen(false)}
              aria-label="Zamknij pełny ekran"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;