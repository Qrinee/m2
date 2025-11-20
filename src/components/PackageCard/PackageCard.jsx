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
  packageIndex,
  allowMultiple = false // Nowy prop - pozwala na wielokrotny wybór
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
            {allowMultiple && <span className="multiple-info">(możesz wybrać kilka opcji)</span>}
          </div>
        )}

        <div className="package-options">
          {options.map((opt, index) => (
            <div 
              key={opt.id} 
              className={`package-option ${selectedOptions[opt.id] ? 'selected' : ''}`}
              onClick={() => onSelect && onSelect(opt.id, packageIndex, allowMultiple)}
            >
              <div className="option-header">
                <div className="radio-indicator">
                  {/* Dla wielu opcji - checkbox dla allowMultiple, radio dla pojedynczego wyboru */}
                  {hasMultipleOptions ? (
                    allowMultiple ? (
                      <input 
                        type="checkbox"
                        checked={!!selectedOptions[opt.id]}
                        readOnly
                        className="checkbox-input"
                      />
                    ) : (
                      <input 
                        type="radio"
                        name={`package-${packageIndex}`}
                        checked={!!selectedOptions[opt.id]}
                        readOnly
                        className="radio-input"
                      />
                    )
                  ) : (
                    <div className={`radio-dot ${selectedOptions[opt.id] ? 'selected' : ''}`} />
                  )}
                </div>
                <h4>{opt.name}</h4>
              </div>
              <p className="info"><FaCircleInfo style={{marginRight: 10}}/> Informacje</p>

              <p className="prices">
                {opt.price == 0 && opt.name != 'Montaż i transport' 
                  ? 'Wycena indywidualna' 
                  : opt.price == 0 && opt.name == 'Montaż i transport' 
                    ? 'W cenie' 
                    : opt.price + " zł"
                }
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;