// src/components/AdminPanel/sections/PropertiesStats.js
import React from 'react';

const PropertiesStats = ({ properties }) => {
  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'aktywne').length,
    inactive: properties.filter(p => p.status !== 'aktywne').length,
    forSale: properties.filter(p => p.rodzajOferty?.typ === 'sprzedaz').length
  };

  return (
    <div className="adm-prop-stats">
      <div className="adm-prop-stat">
        <div className="adm-prop-stat__number">{stats.total}</div>
        <div className="adm-prop-stat__label">Wszystkie oferty</div>
      </div>
      <div className="adm-prop-stat">
        <div className="adm-prop-stat__number">{stats.active}</div>
        <div className="adm-prop-stat__label">Aktywne</div>
      </div>
      <div className="adm-prop-stat">
        <div className="adm-prop-stat__number">{stats.inactive}</div>
        <div className="adm-prop-stat__label">Nieaktywne</div>
      </div>
      <div className="adm-prop-stat">
        <div className="adm-prop-stat__number">{stats.forSale}</div>
        <div className="adm-prop-stat__label">Na sprzedaż</div>
      </div>
    </div>
  );
};

export default PropertiesStats;