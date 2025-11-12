// ConfigSection.js - zaktualizowany komponent do wyświetlania cen
import React from 'react'

const ConfigSection = ({ title, options, activeId, onSelect }) => (
  <div className="config-section">
    <h3>{title}</h3>
    <div className="option-grid">
      {options.map((option) => (
        <div 
          key={option.id}
          className={`option-tiler ${activeId === option.id ? 'active' : ''}`}
          onClick={() => onSelect(option.id)}
        >
          {option.thumb ? (
            <img className="tile-preview" src={option.thumb} alt={option.name} />
          ) : (
            <div className="tile-preview no-image">
              <span>Brak podglądu</span>
            </div>
          )}
          <span>{option.name}</span>
          {option.price !== undefined && option.price > 0 && (
            <div className="option-price">+{option.price.toLocaleString('pl-PL')} zł</div>
          )}
          {option.price === 0 && (
            <div className="option-price-included">W cenie</div>
          )}
        </div>
      ))}
    </div>
  </div>
)

export default ConfigSection