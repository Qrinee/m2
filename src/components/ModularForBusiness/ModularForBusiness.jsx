import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ModularForBusiness.css";

const ModularForBusiness = ({ cards }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isThumbDragging, setIsThumbDragging] = useState(false);
  const [thumbStartX, setThumbStartX] = useState(0);
  const [thumbScrollStart, setThumbScrollStart] = useState(0);
  
  const scrollContainerRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const openVideo = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  // Aktualizacja pozycji scrollbara
  const updateScrollBar = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollLeft = container.scrollLeft;
    const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    setScrollProgress(progress);
  };

  // Drag to scroll - luźne przeciąganie podczas trzymania
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = (e) => {
    if (e.button !== 0) return;
    
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.scrollBehavior = 'smooth';
    snapToNearestCard();
  };

  // Snap to nearest card - efekt magnesu
  const snapToNearestCard = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const scrollPos = container.scrollLeft + containerWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    Array.from(container.children).forEach((card, index) => {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const cardCenter = cardLeft + cardWidth / 2;
      const distance = Math.abs(cardCenter - scrollPos);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    const card = container.children[closestIndex];
    if (card) {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const scrollPosition = cardLeft - (containerWidth - cardWidth) / 2;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Touch events dla mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.scrollBehavior = 'auto';
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.scrollBehavior = 'smooth';
    snapToNearestCard();
  };

  // Custom scrollbar events
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    setIsThumbDragging(true);
    setThumbStartX(e.clientX);
    setThumbScrollStart(scrollContainerRef.current.scrollLeft);
    document.addEventListener('mousemove', handleThumbMouseMove);
    document.addEventListener('mouseup', handleThumbMouseUp);
  };

  const handleThumbMouseMove = (e) => {
    if (!isThumbDragging) return;
    
    const deltaX = e.clientX - thumbStartX;
    const container = scrollContainerRef.current;
    const track = scrollTrackRef.current;
    
    if (container && track) {
      const thumbWidth = scrollThumbRef.current.offsetWidth;
      const trackWidth = track.offsetWidth;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const thumbMoveRatio = scrollWidth / (trackWidth - thumbWidth);
      
      const newScrollLeft = thumbScrollStart + deltaX * thumbMoveRatio;
      container.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollWidth));
    }
  };

  const handleThumbMouseUp = () => {
    setIsThumbDragging(false);
    document.removeEventListener('mousemove', handleThumbMouseMove);
    document.removeEventListener('mouseup', handleThumbMouseUp);
  };

  const handleTrackClick = (e) => {
    const container = scrollContainerRef.current;
    const track = scrollTrackRef.current;
    
    if (container && track) {
      const trackRect = track.getBoundingClientRect();
      const clickPosition = e.clientX - trackRect.left;
      const trackWidth = track.offsetWidth;
      const thumbWidth = scrollThumbRef.current.offsetWidth;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      
      const thumbPosition = (clickPosition - thumbWidth / 2) / (trackWidth - thumbWidth);
      const newScrollLeft = thumbPosition * scrollWidth;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Strzałki nawigacyjne
  const scrollToNext = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const containerWidth = container.offsetWidth;
    const cardWidth = 450; // Stała szerokość karty
    const scrollAmount = cardWidth + 20; // cardWidth + gap
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToPrev = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const cardWidth = 450;
    const scrollAmount = cardWidth + 20;
    
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  };

  // Nasłuchiwanie scrolla
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollBar);
      updateScrollBar(); // Inicjalna aktualizacja
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollBar);
      }
    };
  }, []);

  return (
    <section className="modular-business">
      <div className="m-container">
        <h2 className="section-titled">Budynki modułowe dla Twojej branży</h2>
        
        <div className="business-carousel-container">
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={scrollToPrev}
            aria-label="Poprzednia karta"
          >
            <FaChevronLeft />
          </button>
          
          <div 
            className="business-carousel"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {cards.map((card, index) => (
              <div 
                key={card.id || index} 
                className="business-card"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <button 
                  className="circular-video-btn"
                  onClick={() => openVideo(card.videoId)}
                  aria-label={`Obejrzyj wideo o ${card.title}`}
                >
                  <div className="circular-text">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                      <defs>
                        <path
                          id={`circlePath-${card.id || index}`}
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text fontSize="12" fill="#141414ff" fontWeight="bold">
                        <textPath href={`#circlePath-${card.id || index}`} startOffset="0%">
                          OBEJRZYJ VIDEO • OBEJRZYJ VIDEO •
                        </textPath>
                      </text>
                    </svg>
                  </div>
                  <div className="play-icon-center">
                    <FaPlay className="play-icon" />
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={scrollToNext}
            aria-label="Następna karta"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Custom Scrollbar */}
        <div 
          className="custom-scrollbar"
          ref={scrollTrackRef}
        >
          <div className="scrollbar-track">
            <div 
              className="scrollbar-thumb"
              ref={scrollThumbRef}
              style={{ width: `${100 / cards.length}%`, left: `${scrollProgress * (1 - 1/cards.length)}%` }}
            />
          </div>
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeVideo} aria-label="Zamknij wideo">
              ×
            </button>
            <div className="video-wrapper">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModularForBusiness;