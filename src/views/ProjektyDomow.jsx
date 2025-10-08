import React, { useState, useEffect } from 'react';
import './ProjektyDomow.css';
import Header from '../components/Header/Header';
import { 
  FaRulerCombined, 
  FaBed, 
  FaBath, 
  FaBolt, 
  FaFilePdf, 
  FaHeart, 
  FaExchangeAlt,
  FaEye,
  FaHome,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import { 
  GiFamilyHouse, 
  GiModernCity 
} from 'react-icons/gi';


export default function ProjektyDomow() {
  const [activeFilter, setActiveFilter] = useState("Wszystkie");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const houseProjects = [
    {
      id: 1,
      name: "Modułowy DOM 84",
      area: "84 m²",
      thumbnail: "",
      shortDesc: "Dom parterowy, 3 sypialnie, 1 łazienka",
      initialPrice: "299 000 zł",
      tags: ["Dla rodziny", "Energooszczędny"],
      features: ["Taras", "Garaż", "Ogród"],
      bedrooms: 3,
      bathrooms: 1
    },

  ];

  const handleProjectClick = (projectId) => {
    window.location.href = `/konfigurator/${projectId}`;
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <Header black red />
      <div className='separate'></div>
      <div className={`projekty-domow-container ${isVisible ? 'page-loaded' : ''}`}>
        <header className="projekty-header">
          <div className="header-content">
            <h1 className="title-animate">Skonfiguruj dom szyty na miarę</h1>
            <p className="subtitle-animate">Wybierz jeden z naszych gotowych projektów i dostosuj go do swoich potrzeb</p>
            <div className="header-stats">
              <div className="stat stat-animate" style={{animationDelay: '0.1s'}}>
                <GiModernCity className="stat-icon" />
                <span className="stat-number">24</span>
                <span className="stat-label">Gotowe projekty</span>
              </div>
              <div className="stat stat-animate" style={{animationDelay: '0.2s'}}>
                <GiFamilyHouse className="stat-icon" />
                <span className="stat-number">100+</span>
                <span className="stat-label">Zrealizowanych inwestycji</span>
              </div>
              <div className="stat stat-animate" style={{animationDelay: '0.3s'}}>
                <FaHome className="stat-icon" />
                <span className="stat-number">15</span>
                <span className="stat-label">Lat doświadczenia</span>
              </div>
            </div>
          </div>
        </header>

        <div className="projects-filter filter-animate">
          <button 
            className={`filter-btn ${activeFilter === "Wszystkie" ? 'active' : ''} pulse-on-hover`}
            onClick={() => handleFilterClick("Wszystkie")}
          >
            Wszystkie
          </button>
          <button 
            className={`filter-btn ${activeFilter === "Parterowe" ? 'active' : ''} pulse-on-hover`}
            onClick={() => handleFilterClick("Parterowe")}
          >
            Parterowe
          </button>
          <button 
            className={`filter-btn ${activeFilter === "Piętrowe" ? 'active' : ''} pulse-on-hover`}
            onClick={() => handleFilterClick("Piętrowe")}
          >
            Piętrowe
          </button>
          <button 
            className={`filter-btn ${activeFilter === "Energooszczędne" ? 'active' : ''} pulse-on-hover`}
            onClick={() => handleFilterClick("Energooszczędne")}
          >
            Energooszczędne
          </button>
          <button 
            className={`filter-btn ${activeFilter === "Nowoczesne" ? 'active' : ''} pulse-on-hover`}
            onClick={() => handleFilterClick("Nowoczesne")}
          >
            Nowoczesne
          </button>
        </div>

        <div className="projects-grid">
          {houseProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card card-animate"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="project-image">
                <img src={project.thumbnail} alt={project.name} />
                <div className="project-badge floating-badge">Popularny</div>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag tag-animate">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="image-overlay">
                  <button className="quick-view-btn slide-in-btn">
                    <FaEye className="btn-icon" />
                    Szybki podgląd
                  </button>
                </div>
              </div>
              
              <div className="project-info">
                <div className="project-header">
                  <h3 className="title-hover">{project.name}</h3>
                  <div className="price-tag price-pulse">{project.initialPrice}</div>
                </div>
                
                <div className="project-specs">
                  <div className="spec-grid">
                    <div className="spec-item bounce-on-hover">
                      <FaRulerCombined className="spec-icon" />
                      <span className="spec-value">{project.area}</span>
                    </div>
                    <div className="spec-item bounce-on-hover">
                      <FaBed className="spec-icon" />
                      <span className="spec-value">{project.bedrooms} sypialnie</span>
                    </div>
                    <div className="spec-item bounce-on-hover">
                      <FaBath className="spec-icon" />
                      <span className="spec-value">{project.bathrooms} łazienka{project.bathrooms > 1 ? 'i' : ''}</span>
                    </div>
                  </div>
                  
                  <p className="project-desc fade-in-text">{project.shortDesc}</p>
                  
                  <div className="project-features">
                    {project.features.map((feature, index) => (
                      <span key={index} className="feature-tag feature-animate">
                        <FaCheck className="feature-icon" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="project-actions">
                  <button 
                    className="btn-primaryd glow-on-hover"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <FaBolt className="btn-icon" />
                    Spersonalizuj ten projekt
                    <FaArrowRight className="btn-arrow" />
                  </button>
                  <div className="action-buttons">
                    <button className="btn-secondary bounce-on-hover">
                      <FaFilePdf className="btn-icon" />
                      PDF
                    </button>
                    <button className="btn-secondary bounce-on-hover">
                      <FaHeart className="btn-icon" />
                      Zapisz
                    </button>
                    <button className="btn-secondary bounce-on-hover">
                      <FaExchangeAlt className="btn-icon" />
                      Porównaj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}