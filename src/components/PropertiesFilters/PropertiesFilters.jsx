
import React from 'react';

const PropertiesFilters = ({ filter, onFilterChange, properties }) => {
  const filterCounts = {
    all: properties.length,
    active: properties.filter(p => p.status === 'aktywne').length,
    inactive: properties.filter(p => p.status !== 'aktywne').length
  };

  return (
    <div className="adm-prop-filters">
      <button 
        className={`adm-prop-filter ${filter === 'all' ? 'adm-prop-filter--active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Wszystkie ({filterCounts.all})
      </button>
      <button 
        className={`adm-prop-filter ${filter === 'active' ? 'adm-prop-filter--active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Aktywne ({filterCounts.active})
      </button>
      <button 
        className={`adm-prop-filter ${filter === 'inactive' ? 'adm-prop-filter--active' : ''}`}
        onClick={() => onFilterChange('inactive')}
      >
        Nieaktywne ({filterCounts.inactive})
      </button>
    </div>
  );
};

export default PropertiesFilters;