import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaBolt, 
  FaLeaf, 
  FaTools, 
  FaStore,
  FaBuilding,
  FaHome,
  FaSearch,
  FaArrowRight
} from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("domy");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="modern-hero-section">
      {/* Diagonal Background Container */}
      <div className="modern-hero-diagonal-bg">
        {/* Left background - Domy */}
        <div 
          className="modern-hero-bg left-bg"
          style={{ backgroundImage: `url(dom.jpg)` }}
        >
          <div className="modern-hero-overlay left-overlay"></div>
        </div>
        
        {/* Right background - Marketplace */}
        <div 
          className="modern-hero-bg right-bg"
          style={{ backgroundImage: `url(nieruchomosci.jpg)` }}
        >
          <div className="modern-hero-overlay right-overlay"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="modern-hero-container">
        <div className={`modern-hero-content ${isVisible ? 'modern-visible' : ''}`}>
          
          {/* Left side - Domy i Pawilony */}
          <div className="modern-hero-column left-column">
            <div className="modern-hero-text">
              <div className="modern-hero-badge">
                <span>BUDOWNICTWO MODUŁOWE</span>
              </div>
              
              <h1 className="modern-hero-title">
                Nowoczesne <span className="modern-hero-accent">Rozwiązania</span>
              </h1>
              
              {/* Tab navigation */}
              <div className="modern-tab-navigation">
                <button 
                  className={`modern-tab-button ${activeTab === "domy" ? "modern-tab-active" : ""}`}
                  onClick={() => setActiveTab("domy")}
                >
                  <FaHome className="modern-tab-icon" />
                  <span>Domy Mieszkalne</span>
                </button>
                <button 
                  className={`modern-tab-button ${activeTab === "biznes" ? "modern-tab-active" : ""}`}
                  onClick={() => setActiveTab("biznes")}
                >
                  <FaStore className="modern-tab-icon" />
                  <span>Rozwiązania Biznesowe</span>
                </button>
              </div>

              {/* Tab content */}
              <div className="modern-tab-content">
                {activeTab === "domy" ? (
                  <>
                    <div className="modern-hero-features">
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaBolt /></span>
                        <span>Szybka realizacja (6-8 tygodni)</span>
                      </div>
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaLeaf /></span>
                        <span>Energooszczędne rozwiązania</span>
                      </div>
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaTools /></span>
                        <span>Nowoczesne technologie</span>
                      </div>
                    </div>

                    <div className="modern-hero-actions">
                      <Link to="/projekty-domow" className="modern-cta-primary">
                        <span>Zobacz projekty domów</span>
                        <div className="modern-cta-arrow"><FaArrowRight /></div>
                      </Link>
                      <Link to="/konfigurator" className="modern-cta-secondary">
                        <span>Skorzystaj z konfiguratora</span>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>

                    <div className="modern-hero-features">
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaStore /></span>
                        <span>Pawilony handlowe</span>
                      </div>
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaBuilding /></span>
                        <span>Biura modułowe</span>
                      </div>
                      <div className="modern-feature-item">
                        <span className="modern-feature-icon"><FaTools /></span>
                        <span>Obiekty usługowe</span>
                      </div>
                    </div>

                    <div className="modern-hero-actions">
                      <Link to="/rozwiazania-biznesowe" className="modern-cta-primary">
                        <span>Poznaj ofertę biznesową</span>
                        <div className="modern-cta-arrow"><FaArrowRight /></div>
                      </Link>
                      <Link to="/kontakt" className="modern-cta-secondary">
                        <span>Zamów konsultację</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Marketplace */}
          <div className="modern-hero-column right-column">
            <div className="modern-marketplace-text">
              <div className="modern-marketplace-badge">
                <span>RYNEK NIERUCHOMOŚCI</span>
              </div>
              
              <h2 className="modern-marketplace-title">
                Wystaw lub Znajdź <span className="modern-marketplace-accent">Idealną Ofertę</span>
              </h2>
              

              {/* Marketplace features */}
              <div className="modern-marketplace-features">
                <div className="modern-marketplace-item">
                  <span className="modern-marketplace-icon"><FaSearch /></span>
                  <div className="modern-marketplace-text-content">
                    <h4>Znajdź dla siebie</h4>
                    <p>Skorzystaj z wyszukiwarki nieruchomości dla siebie</p>
                  </div>
                </div>
                <div className="modern-marketplace-item">
                  <span className="modern-marketplace-icon"><FaStore /></span>
                  <div className="modern-marketplace-text-content">
                    <h4>Wystaw ofertę</h4>
                    <p>Skutecznie zaprezentuj swoją nieruchomość potencjalnym klientom</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="modern-marketplace-actions">
                <Link to="/znajdz-oferte" className="modern-marketplace-cta primary">
                  <span>Znajdź ofertę</span>
                  <div className="modern-cta-arrow"><FaArrowRight /></div>
                </Link>
                <Link to="/wystaw-oferte" className="modern-marketplace-cta secondary">
                  <span>Wystaw ofertę</span>
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