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
        </div>
      ))}
    </div>
  </div>
)

export default ConfigSection