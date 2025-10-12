import React from 'react';
import { FaArrowCircleDown, FaBed, FaShower, FaSquarespace } from 'react-icons/fa';

const InfoBar = ({ property }) => {
  return (
    <div className="prop-info-bar">
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaArrowCircleDown/></div>
        <div className="prop-info-value">{property.updated}</div>
        <div className="prop-info-label">Ostatnia aktualizacja</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaBed/></div>
        <div className="prop-info-value">{property.bedrooms}</div>
        <div className="prop-info-label">Sypialnie</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaShower/></div>
        <div className="prop-info-value">{property.bathrooms}</div>
        <div className="prop-info-label">Łazienki</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaSquarespace/></div>
        <div className="prop-info-value">{property.area} m²</div>
        <div className="prop-info-label">Powierzchnia</div>
      </div>
    </div>
  );
};

export default InfoBar;