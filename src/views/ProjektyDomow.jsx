import React, { useState, useEffect } from 'react';

import Header from '../components/Header/Header';
import et from '../assets/konfigurator/thumbnails/1.png';
import et2 from '../assets/konfigurator/thumbnails/2.png';
import et3 from '../assets/konfigurator/thumbnails/3.png';
import './ProjektyDomow.css';
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
  FaArrowRight,
  FaPen
} from 'react-icons/fa';
import { 
  GiFamilyHouse, 
  GiModernCity 
} from 'react-icons/gi';
import { Link } from 'react-router-dom';


export default function ProjektyDomow() {
  const [activeFilter, setActiveFilter] = useState("Wszystkie");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const houseProjects = [
    {
      id: 'd126',
      name: "Model D-126",
      area: "126 m²",
      thumbnail: et,
      shortDesc: "Dom całoroczny dla rodziny 2+3",
      initialPrice: "od 309 000 zł netto",
      tags: ["Dla rodziny", "Energooszczędny"],
      bedrooms: 4,
      bathrooms: 3
    },
    {
      id: 'd115',
      name: "Model D-115",
      area: "84 m²",
      thumbnail: et2,
      shortDesc: "Dom parterowy, 3 sypialnie, 1 łazienka",
      initialPrice: "od 289 000 zł netto",
      tags: ["Dla rodziny", "Energooszczędny"],
      bedrooms: 3,
      bathrooms: 1
    },
        {
      id: 'd70',
      name: "Model D-70",
      area: "70 m²",
      thumbnail: et3,
      shortDesc: "Dom całoroczny dla rodziny 2+1",
      initialPrice: "od 209 000 zł netto",
      tags: ["Dla rodziny", "Energooszczędny"],
      bedrooms: 2,
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
                    <FaPen className="btn-icon" />
                    KONFIGURATOR
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
                    <div className="spec-item">
                      <FaRulerCombined className="spec-icon" />
                      <span className="spec-value">{project.area}</span>
                    </div>
                    <div className="spec-item">
                      <FaBed className="spec-icon" />
                      <span className="spec-value">{project.bedrooms} sypialnie</span>
                    </div>
                    <div className="spec-item">
                      <FaBath className="spec-icon" />
                      <span className="spec-value">{project.bathrooms} łazienka{project.bathrooms > 1 ? 'i' : ''}</span>
                    </div>
                  </div>
                  
                  <p className="project-desc fade-in-text">{project.shortDesc}</p>

                </div>
                
                <div className="project-actions">
                  <Link to={`/konfigurator/${project.id}`}>
                  <button 
                    className="btn-primaryd glow-on-hover"
                  >
                    <FaBolt className="btn-icon" />
                    Spersonalizuj ten projekt
                    <FaArrowRight className="btn-arrow" />
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}