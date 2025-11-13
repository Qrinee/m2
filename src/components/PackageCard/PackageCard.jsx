import React from "react";
import "./PackageCard.css";
import { FaCircleInfo } from "react-icons/fa6";

const PackageCard = ({
  title,
  vat,
  options = [],
  image,
  backgroundColor = "#165f5c",
  selectedOptions,
  onSelect,
  packageIndex // Nowy prop - index pakietu
}) => {
  // Sprawdź czy pakiet ma więcej niż jedną opcję
  const hasMultipleOptions = options.length > 1;

  return (
    <div className="package-card" style={{ backgroundColor }}>
      <div className="package-gradient-overlay"></div>

      {image && (
        <div className="package-image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="package-content">
        {title && (
          <div className="package-header">
            <h3>{title}</h3>
            {vat && <span className="vat">({vat})</span>}
          </div>
        )}

        <div className="package-options">
          {options.map((opt, index) => (
            <div 
              key={opt.id || index} 
              className={`package-option ${selectedOptions[opt.id] ? 'selected' : ''}`}
              onClick={() => onSelect && onSelect(opt.id, packageIndex)}
            >
              <div className="option-header">
                <div className="radio-indicator">
                  {/* Zmiana na prawdziwy radio button dla wielu opcji */}
                  {hasMultipleOptions ? (
                    <input 
                      type="radio"
                      name={`package-${packageIndex}`}
                      checked={!!selectedOptions[opt.id]}
                      readOnly
                      className="radio-input"
                    />
                  ) : (
                    <div className={`radio-dot ${selectedOptions[opt.id] ? 'selected' : ''}`} />
                  )}
                </div>
                <h4>{opt.name}</h4>
              </div>
              <p className="info"><FaCircleInfo style={{marginRight: 10}}/> Informacje</p>
              <p className="prices">{opt.price == 0 ? "Wycena indywidualna": opt.price + " zł"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;