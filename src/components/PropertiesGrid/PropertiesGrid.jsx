// src/components/AdminPanel/sections/PropertiesGrid.js
import React from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertiesGrid = ({ properties, onUpdateStatus, onDeleteProperty }) => {
  if (properties.length === 0) {
    return (
      <div className="adm-prop-empty">
        <p>Brak ofert do wyświetlenia</p>
      </div>
    );
  }

  return (
    <div className="adm-prop-grid">
      {properties.map(property => (
        <PropertyCard
          key={property._id}
          property={property}
          onUpdateStatus={onUpdateStatus}
          onDeleteProperty={onDeleteProperty}
        />
      ))}
    </div>
  );
};

export default PropertiesGrid;