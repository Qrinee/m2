import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBolt, 
  FaLeaf, 
  FaTools, 
  FaMapMarkerAlt, 
  FaChartLine, 
  FaBalanceScale,
  FaArrowRight
} from "react-icons/fa";
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
          
          {/* Left side - Modular Homes */}
          <div className="modern-hero-column">
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
                  <span className="modern-feature-icon"><FaBolt /></span>
                  <span>Szybka realizacja</span>
                </div>
                <div className="modern-feature-item">
                  <span className="modern-feature-icon"><FaLeaf /></span>
                  <span>Ekologiczne</span>
                </div>
                <div className="modern-feature-item">
                  <span className="modern-feature-icon"><FaTools /></span>
                  <span>Nowoczesne technologie</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="modern-hero-actions">
                <Link to="/projekty-domow" className="modern-cta-primary">
                  <span>Poznaj ofertę</span>
                  <div className="modern-cta-arrow"><FaArrowRight /></div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Real Estate for Developers */}
          <div className="modern-hero-column">
            <div className={`modern-investment-section ${isVisible ? 'modern-visible' : ''}`}>
              <div className="modern-investment-badge">
                <span>INWESTYCJE I DEVELOPMENT</span>
              </div>
              
              <h2 className="modern-investment-title">
                Nieruchomości dla <span className="modern-investment-accent">Inwestorów</span>
              </h2>
              
              <p className="modern-investment-description">
                Atrakcyjne lokalizacje inwestycyjne i kompleksowe wsparcie 
                dla deweloperów. Znajdź idealne tereny pod swoją kolejną inwestycję.
              </p>

              {/* Investment features */}
              <div className="modern-investment-features">
                <div className="modern-investment-item">
                  <span className="modern-investment-icon"><FaMapMarkerAlt /></span>
                  <span>Strategiczne lokalizacje</span>
                </div>
                <div className="modern-investment-item">
                  <span className="modern-investment-icon"><FaChartLine /></span>
                  <span>Wysoki potencjał wzrostu</span>
                </div>
                <div className="modern-investment-item">
                  <span className="modern-investment-icon"><FaBalanceScale /></span>
                  <span>Pełne wsparcie prawne</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="modern-investment-actions">
                <Link to="/nieruchomosci" className="modern-investment-cta">
                  <span>Zobacz oferty inwestycyjne</span>
                  <div className="modern-cta-arrow"><FaArrowRight /></div>
                </Link>
              </div>
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