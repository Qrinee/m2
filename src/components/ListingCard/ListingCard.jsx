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
  return (
    <div className="listing-card">
      {/* Image Section */}
      <div className="listing-image">
        <img src={image} alt={title} />
        <div className="badge-container">
          {badges.map((badge, index) => (
            <span key={index} className={`badge ${badge.color}`}>
              {badge.text}
            </span>
          ))}
        </div>
        <span className="location">
          <FaMapMarkerAlt /> {location}
        </span>
      </div>

      {/* Content Section */}
      <div className="listing-content">
        <h3 className="title">{title}</h3>
        <p className="price">{price}</p>
        <p className="description">{description}</p>

        <div className="icons">
          <div>
            <FaBath /> {baths}
          </div>
          <div>
            <FaBed /> {beds}
          </div>
          <div>
            <FaRulerCombined /> {area} m²
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="listing-footer">
        {
          role != 'user' ? (
            <img src={import.meta.env.VITE_BACKEND + agentImage} alt={agentName} className="agent-avatar" />
          ) : <></>
        }

        <span className="agent-name">{role === 'agent' ? companyName : role === 'admin' ? agentName : 'Osoba prywatna'}</span>
      </div>
    </div>
  );
};

export default ListingCard;
