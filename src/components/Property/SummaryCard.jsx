import React from 'react';
import { FaShower, FaSquarespace, FaArrowCircleDown } from 'react-icons/fa';
import { formatPLN } from '../../utils/propertyUtils';
import { FaHouse } from 'react-icons/fa6';

const SummaryCard = ({ property, price, updated }) => {
  return (
    <div className="prop-card prop-summary-aside">
      <div className="summary-price">{formatPLN(price)}</div>
      <div className="summary-details">
        <div className="detail-item">
          <span className="detail-icon"><FaHouse/></span>
          <span>{property.rooms} pokoje • {property.bedrooms} sypialnie</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaShower/></span>
          <span>{property.bathrooms} łazienki</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaSquarespace/></span>
          <span>Powierzchnia: {property.area} m²</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaArrowCircleDown/></span>
          <span>Aktualizacja: {updated}</span>
        </div>
      </div>

      <div className="summary-actions">
        <button className="prop-btn primary full-width">
          Poproś o informację
        </button>
        <button className="prop-btn secondary full-width">
          Zaplanuj wycieczkę
        </button>
      </div>
    </div>
  );
};

export default SummaryCard;