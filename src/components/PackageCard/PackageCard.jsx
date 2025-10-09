import React from "react";
import "./PackageCard.css";
import { FaInfo } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

const PackageCard = ({
  title,
  vat,
  options = [],
  image,
  backgroundColor = "#165f5c",
  selectedPackage,
  onSelect,
  category
}) => {
  return (
    <div className="package-card" style={{ backgroundColor }}>
      <div className="package-gradient-overlay"></div>

      {image && (
        <div className="package-image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="package-content">
        <div className="package-header">
          <h3>{title}</h3>
          {vat && <span className="vat">({vat})</span>}
        </div>

        <div className="package-options">
          {options.map((opt, index) => (
            <div 
              key={opt.id || index} 
              className={`package-option ${selectedPackage === opt.id ? 'selected' : ''}`}
              onClick={() => onSelect && onSelect(opt.id, category)}
            >
              <div className="option-header">
                <div className="radio-indicator">
                  <div className={`radio-dot ${selectedPackage === opt.id ? 'selected' : ''}`} />
                </div>
                <h4>{opt.name}</h4>
              </div>
              <p className="info"><FaCircleInfo style={{marginRight: 10}}/> Informacje</p>
              <p className="prices">{opt.price} zł</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;