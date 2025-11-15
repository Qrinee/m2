import React from "react";
import "./ListingCard.css";
import { FaBath, FaBed, FaRulerCombined, FaMapMarkerAlt, FaEye } from "react-icons/fa";

const ListingCard = ({
  image,
  badges = [],
  location,
  views,
  title,
  price,
  role,
  companyName,
  description,
  baths,
  beds,
  area,
  agentImage,
  agentName,
}) => {
  const getAgentType = () => {
    switch (role) {
      case 'agent':
        return companyName || 'Agent nieruchomości';
      case 'admin':
        return agentName || 'Administrator';
      default:
        return 'Osoba prywatna';
    }
  };

  const getDisplayName = () => {
    switch (role) {
      case 'agent':
        return companyName || 'Firma';
      case 'admin':
        return agentName || 'Admin';
      default:
        return 'Osoba prywatna';
    }
  };

  const formatPrice = (price) => {
    return price.replace('€', '€ ');
  };

  return (
    <div className="listing-card">

      <div className="listing-image">
        <img src={image } alt={title} />
        <div className="badge-container">

        </div>
        <div className="image-overlay">
          <span className="location">
            <FaMapMarkerAlt size={12} /> {location}
          </span>
          {views && (
            <span className="views">
              <FaEye size={11} /> {views}
            </span>
          )}
        </div>
      </div>

      <div className="listing-content">
        <h3 className="title">{title}</h3>
        <p className="price">{formatPrice(price)}</p>
        <p className="description">{description}</p>

        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">
              <FaBed size={14} />
            </div>
            <div className="feature-value">{beds}</div>
            <div className="feature-label">Sypialnie</div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FaBath size={14} />
            </div>
            <div className="feature-value">{baths}</div>
            <div className="feature-label">Łazienki</div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FaRulerCombined size={14} />
            </div>
            <div className="feature-value">{area}</div>
            <div className="feature-label">m²</div>
          </div>
        </div>
      </div>

      <div className="listing-footer">
        {role !== 'user' && agentImage && (
          <img 
            src={`${import.meta.env.VITE_BACKEND}${agentImage}`} 
            alt={getDisplayName()} 
            className="agent-avatar" 
          />
        )}
        {(!agentImage || role === 'user') && (
          <div className="agent-avatar" style={{ background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
            {getDisplayName().charAt(0)}
          </div>
        )}
        <div className="agent-info">
          <div className="agent-name">{getDisplayName()}</div>
          <div className="agent-type">{getAgentType()}</div>
        </div>
        <div className="status-dot" />
      </div>
    </div>
  );
};

export default ListingCard;