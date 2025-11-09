import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="modern-hero-section">
      {/* Background with gradient overlay */}
      <div 
        className="modern-hero-bg"
        style={{ backgroundImage: `url(dom.jpg)` }}
      >
        <div className="modern-hero-overlay"></div>
      </div>

      {/* Main content container */}
      <div className="modern-hero-container">
        <div className={`modern-hero-content ${isVisible ? 'modern-visible' : ''}`}>
          
          {/* Text content */}
          <div className="modern-hero-text">
            <div className="modern-hero-badge">
              <span>DOMY SZKIELETOWE</span>
            </div>
            
            <h1 className="modern-hero-title">
              Modułowe <span className="modern-hero-accent">Rozwiązania</span>
            </h1>
            
            <p className="modern-hero-description">
              Innowacyjne budownictwo modułowe dla Twojego biznesu. 
              Szybkie w realizacji, energooszczędne i w pełni dostosowane 
              do Twoich potrzeb.
            </p>

            {/* Feature highlights */}
            <div className="modern-hero-features">
              <div className="modern-feature-item">
                <span className="modern-feature-icon">⚡</span>
                <span>Szybka realizacja</span>
              </div>
              <div className="modern-feature-item">
                <span className="modern-feature-icon">🌱</span>
                <span>Ekologiczne</span>
              </div>
              <div className="modern-feature-item">
                <span className="modern-feature-icon">🔧</span>
                <span>Nowoczesne technologie</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="modern-hero-actions">
              <Link to="/projekty-domow" className="modern-cta-primary">
                <span>Poznaj ofertę</span>
                <div className="modern-cta-arrow">→</div>
              </Link>
              
              <Link to="/kontakt" className="modern-cta-secondary">
                Bezpłatna wycena
              </Link>
            </div>
          </div>

          {/* Property card */}
          <div className={`modern-property-card ${isVisible ? 'modern-visible' : ''}`}>
            <div className="modern-card-visual">
              <div className="modern-card-badge">Zakup nieruchomość na raty notarialne</div>
            </div>
            <div className="modern-card-content">
              <h3 className="modern-card-title">Nieruchomości</h3>
              <p className="modern-card-description">
                Kompleksowe rozwiązania nieruchomościowe dopasowane do Twoich potrzeb
              </p>
              <Link to="/nieruchomosci" className="modern-card-button">
                <span>Przeglądaj oferty</span>
                <div className="modern-button-arrow">→</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="modern-scroll-indicator">
          <div className="modern-scroll-text">Przewiń w dół</div>
          <div className="modern-scroll-arrow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;