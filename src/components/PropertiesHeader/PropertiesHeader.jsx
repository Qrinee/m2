// src/components/AdminPanel/sections/PropertiesHeader.js
import React from 'react';

const PropertiesHeader = ({ onAddProperty }) => {
  return (
    <div className="adm-prop-header">
      <div className="adm-prop-header__text">
        <h2>Zarządzanie ofertami</h2>
        <p>Przeglądaj i zarządzaj ofertami nieruchomości</p>
      </div>
      <button 
        className="adm-prop-btn--primary"
        onClick={onAddProperty}
      >
        + Dodaj nową nieruchomość
      </button>
    </div>
  );
};

export default PropertiesHeader;