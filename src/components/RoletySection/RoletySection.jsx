// RoletySection.jsx
import React from 'react'

const RoletySection = ({ options, enabled, color, onToggle, onColorSelect }) => {
  return (
    <div className="config-section">
      <h3>Rolety</h3>
      
      <div className="option-grid">
        <div 
          className={`option-tiler ${enabled ? 'active' : ''}`}
          onClick={onToggle}
        >
          <div className="tile-preview rolety-toggle">
            <div className={`rolety-indicator ${enabled ? 'enabled' : 'disabled'}`}>
              {enabled ? '✓' : '✕'}
            </div>
          </div>
          <span>{enabled ? 'Włączone' : 'Wyłączone'}</span>
        </div>
      </div>

      {enabled && (
        <>
          <h4>Kolor rolet</h4>
          <div className="option-grid">
            {options.map((option) => (
              <div 
                key={option.id}
                className={`option-tiler ${color === option.id ? 'active' : ''}`}
                onClick={() => onColorSelect(option.id)}
              >
                {option.thumb ? (
                  <img className="tile-preview" src={option.thumb} alt={option.name} />
                ) : (
                  <div className="tile-preview no-image">
                    <span>Brak podglądu</span>
                  </div>
                )}
                <span>{option.name}</span>
                {/* Wyświetlanie ceny tak jak w ConfigSection */}
                {option.price !== undefined && option.price > 0 && (
                  <div className="option-price">+{option.price.toLocaleString('pl-PL')} zł</div>
                )}
                {option.price === 0 && (
                  <div className="option-price-included">W cenie</div>
                )}
                {option.price === undefined && (
                  <div className="option-price-included">W cenie</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RoletySection