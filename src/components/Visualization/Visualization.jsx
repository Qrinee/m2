import React, { useState, useEffect } from 'react';
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Visualization = ({ houseImages, activeImage, setActiveImage }) => {
  const [transitionDirection, setTransitionDirection] = useState('next');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextImage = () => {
    if (isTransitioning) return;
    setTransitionDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImage(prev => prev < houseImages.length - 1 ? prev + 1 : 0);
      setIsTransitioning(false);
    }, 300);
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setTransitionDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImage(prev => prev > 0 ? prev - 1 : houseImages.length - 1);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="visualization">
      <div className="containerd">
        <div className="visualization-grid">
          <div className="image-section">
            <div className="main-image-container">
              <div className={`main-image ${transitionDirection} ${isTransitioning ? 'transitioning' : ''}`}>
                <img 
                  src={houseImages[activeImage]} 
                  alt={`Wizualizacja domu - widok ${activeImage + 1}`}
                />
              </div>
              <button 
                onClick={prevImage}
                className="control-btn control-btn-prev"
                disabled={isTransitioning}
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextImage}
                className="control-btn control-btn-next"
                disabled={isTransitioning}
              >
                <FaChevronRight />
              </button>
            </div>
            <div className="image-counter">
              ZDJĘCIE {activeImage + 1} z {houseImages.length}
            </div>
          </div>

          <div className="description-section">
            <h2 className="section-title">OPIS PROJEKTU</h2>
            <p className="description-text">
              Modułowy DOM 84 to nowoczesny, energooszczędny dom parterowy zaprojektowany 
              z myślą o komforcie rodziny. Przestronny salon połączony z kuchnią, 
              3 słoneczne sypialnie oraz funkcjonalna łazienka tworzą idealną przestrzeń 
              do życia.
            </p>
            
            <div className="features">
              <h3 className="features-title">GŁÓWNE ZALETY:</h3>
              <div className="features-list">
                <div className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>Energooszczędna konstrukcja</span>
                </div>
                <div className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>Nowoczesne materiały</span>
                </div>
                <div className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>Gotowy do zamieszkania w 90 dni</span>
                </div>
                <div className="feature-item">
                  <FaCheck className="feature-icon" />
                  <span>Gwarancja 10 lat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visualization;