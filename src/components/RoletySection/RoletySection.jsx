// RoletySection.jsx
import React from 'react'

const RoletySection = ({ options, enabled, color, onToggle, onColorSelect }) => {
  return (
    <div className="config-section">
      <h3>Rolety</h3>
      
      <div className="option-grid">
        <div 
          className={`option-tile ${enabled ? 'active' : ''}`}
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
                className={`option-tile ${color === option.id ? 'active' : ''}`}
                onClick={() => onColorSelect(option.id)}
              >
                <img className="tile-preview" src={option.thumb} alt={option.name} />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default RoletySection