import React from 'react';
import { FaRulerCombined, FaBed, FaBath, FaHome } from 'react-icons/fa';

const ProjectHeader = ({ basePrice }) => {
  return (
    <section className="project-header">
      <div className="container">
        <h1 className="project-title">Modułowy DOM 84</h1>
        <p className="project-subtitle">Nowoczesny dom parterowy dla wymagającej rodziny</p>
        
        <div className="price-highlight">
          <span className="price-label">CENA BAZOWA:</span>
          <span className="price-value">{basePrice.toLocaleString('pl-PL')} zł</span>
        </div>

        <div className="highlights-grid">
          <div className="highlight-item">
            <FaRulerCombined className="highlight-icon" />
            <span>84 m²</span>
          </div>
          <div className="highlight-item">
            <FaBed className="highlight-icon" />
            <span>3 sypialnie</span>
          </div>
          <div className="highlight-item">
            <FaBath className="highlight-icon" />
            <span>1 łazienka</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectHeader;