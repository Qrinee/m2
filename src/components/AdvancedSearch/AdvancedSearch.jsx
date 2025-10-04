import React, { useState } from 'react';
import './AdvancedSearch.css';

const AdvancedSearch = ({ filters, filterOptions, onFilterChange, onResetFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    onResetFilters();
  };

  return (
    <div className="advanced-search">
      <div className="advanced-search-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h3>Zaawansowane wyszukiwanie</h3>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </div>

      {isExpanded && (
        <div className="advanced-search-content">
          <div className="search-row">
            <div className="search-group">
              <label>Szukaj po nazwie lub opisie</label>
              <input
                type="text"
                placeholder="Wpisz nazwę nieruchomości, miasto..."
                value={filters.search}
                onChange={(e) => handleFilterUpdate('search', e.target.value)}
              />
            </div>
          </div>

          <div className="search-row">
            <div className="search-group">
              <label>Cena od (PLN)</label>
              <input
                type="number"
                placeholder="Minimalna cena"
                value={filters.cenaMin}
                onChange={(e) => handleFilterUpdate('cenaMin', e.target.value)}
              />
            </div>

            <div className="search-group">
              <label>Cena do (PLN)</label>
              <input
                type="number"
                placeholder="Maksymalna cena"
                value={filters.cenaMax}
                onChange={(e) => handleFilterUpdate('cenaMax', e.target.value)}
              />
            </div>
          </div>

          <div className="search-row">
            <div className="search-group">
              <label>Powierzchnia od (m²)</label>
              <input
                type="number"
                placeholder="Minimalna powierzchnia"
                value={filters.powierzchniaMin}
                onChange={(e) => handleFilterUpdate('powierzchniaMin', e.target.value)}
              />
            </div>

            <div className="search-group">
              <label>Powierzchnia do (m²)</label>
              <input
                type="number"
                placeholder="Maksymalna powierzchnia"
                value={filters.powierzchniaMax}
                onChange={(e) => handleFilterUpdate('powierzchniaMax', e.target.value)}
              />
            </div>
          </div>

          <div className="search-actions">
            <button className="btn-primary" onClick={() => setIsExpanded(false)}>
              Zastosuj filtry
            </button>
            <button className="btn-secondary" onClick={handleReset}>
              Wyczyść wszystkie
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;