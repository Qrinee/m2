import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { 
  FaRulerCombined, FaBed, FaBath, FaBolt, FaFilePdf, 
  FaHeart, FaExchangeAlt, FaEye, FaHome, FaCheck, FaArrowRight 
} from 'react-icons/fa';
import { GiFamilyHouse, GiModernCity } from 'react-icons/gi';

// Upewnij się że ścieżka do thumbnail jest poprawna
import thumbnail from '../assets/ex/2-5.jpg';

export default function ProjektyDomow() {
  const [activeFilter, setActiveFilter] = useState("Wszystkie");

  const houseProjects = [
    {
      id: 1,
      name: "Modułowy DOM 84",
      area: "84 m²",
      thumbnail: thumbnail,
      shortDesc: "Dom parterowy, 3 sypialnie, 1 łazienka",
      initialPrice: "299 000 zł",
      tags: ["Dla rodziny", "Energooszczędny"],
      features: ["Taras", "Garaż", "Ogród"],
      bedrooms: 3,
      bathrooms: 1
    },
    // ... reszta projektów
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
      <div style={separatorStyle}></div>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <div style={headerContentStyle}>
            <h1 style={titleStyle}>Skonfiguruj dom szyty na miarę</h1>
            <p style={subtitleStyle}>Wybierz jeden z naszych gotowych projektów i dostosuj go do swoich potrzeb</p>
          </div>
        </header>

        <div style={filterContainerStyle}>
          {["Wszystkie", "Parterowe", "Piętrowe", "Energooszczędne", "Nowoczesne"].map(filter => (
            <button
              key={filter}
              style={{
                ...filterButtonStyle,
                ...(activeFilter === filter ? activeFilterButtonStyle : {})
              }}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div style={gridStyle}>
          {houseProjects.map((project) => (
            <div key={project.id} style={cardStyle}>
              <div style={imageContainerStyle}>
                <img 
                  src={project.thumbnail} 
                  alt={project.name} 
                  style={imageStyle}
                />
                <div style={badgeStyle}>Popularny</div>
              </div>
              
              <div style={infoStyle}>
                <div style={headerRowStyle}>
                  <h3 style={projectTitleStyle}>{project.name}</h3>
                  <div style={priceStyle}>{project.initialPrice}</div>
                </div>
                
                <div style={specsStyle}>
                  <div style={specGridStyle}>
                    <div style={specItemStyle}>
                      <FaRulerCombined style={specIconStyle} />
                      <span>{project.area}</span>
                    </div>
                    <div style={specItemStyle}>
                      <FaBed style={specIconStyle} />
                      <span>{project.bedrooms} sypialnie</span>
                    </div>
                    <div style={specItemStyle}>
                      <FaBath style={specIconStyle} />
                      <span>{project.bathrooms} łazienka{project.bathrooms > 1 ? 'i' : ''}</span>
                    </div>
                  </div>
                  
                  <p style={descStyle}>{project.shortDesc}</p>
                  
                  <div style={featuresStyle}>
                    {project.features.map((feature, index) => (
                      <span key={index} style={featureStyle}>
                        <FaCheck style={featureIconStyle} />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={actionsStyle}>
                  <button 
                    style={primaryButtonStyle}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <FaBolt style={buttonIconStyle} />
                    Spersonalizuj ten projekt
                    <FaArrowRight style={buttonArrowStyle} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Podstawowe style inline
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  fontFamily: 'Arial, sans-serif',
  padding: '20px'
};

const separatorStyle = {
  height: '80px'
};

const headerStyle = {
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: '60px 20px',
  textAlign: 'center',
  marginBottom: '40px'
};

const headerContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto'
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem',
  fontWeight: 'bold'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  opacity: 0.9,
  marginBottom: '2rem'
};

const filterContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '40px',
  flexWrap: 'wrap'
};

const filterButtonStyle = {
  padding: '10px 20px',
  border: '2px solid #667eea',
  backgroundColor: 'transparent',
  color: '#667eea',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s ease'
};

const activeFilterButtonStyle = {
  backgroundColor: '#667eea',
  color: 'white'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '30px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease'
};

const imageContainerStyle = {
  position: 'relative',
  height: '250px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const badgeStyle = {
  position: 'absolute',
  top: '15px',
  left: '15px',
  backgroundColor: '#ff4757',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '12px',
  fontWeight: 'bold'
};

const infoStyle = {
  padding: '25px'
};

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '15px'
};

const projectTitleStyle = {
  margin: '0',
  fontSize: '1.4rem',
  color: '#333'
};

const priceStyle = {
  backgroundColor: '#667eea',
  color: 'white',
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '14px',
  fontWeight: 'bold'
};

const specsStyle = {
  marginBottom: '20px'
};

const specGridStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '15px'
};

const specItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontSize: '14px',
  color: '#666'
};

const specIconStyle = {
  color: '#667eea'
};

const descStyle = {
  color: '#666',
  marginBottom: '15px',
  lineHeight: '1.5'
};

const featuresStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px'
};

const featureStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  backgroundColor: '#f1f3f4',
  padding: '5px 10px',
  borderRadius: '15px',
  fontSize: '12px'
};

const featureIconStyle = {
  color: '#4CAF50',
  fontSize: '10px'
};

const actionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const primaryButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  backgroundColor: '#667eea',
  color: 'white',
  border: 'none',
  padding: '12px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

const buttonIconStyle = {
  fontSize: '16px'
};

const buttonArrowStyle = {
  fontSize: '14px',
  marginLeft: 'auto'
};