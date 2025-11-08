
import React from 'react';
import { FaHome } from 'react-icons/fa';


import UserPropertyCard from '../UserPropertyCard/UserPropertyCard'
export default function UserProperties({ 
  userProperties, 
  loading, 
  onStatusChange, 
  onDelete, 
  onRefresh 
}) {
  if (loading) {
    return (
      <div className="mp-loading">
        <div className="mp-loading__spinner"></div>
        <p>Ładowanie nieruchomości...</p>
      </div>
    );
  }

  if (userProperties.length === 0) {
    return (
      <div className="mp-empty-state">
        <FaHome className="mp-empty-state__icon" />
        <h3>Brak nieruchomości</h3>
        <p>Nie dodałeś jeszcze żadnych nieruchomości.</p>
        <button 
          className="mp-btn mp-btn--primary"
          onClick={() => window.open('/zglos-nieruchomosc', '_blank')}
        >
          Dodaj pierwszą nieruchomość
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mp-properties-header">
        <h2 className="mp-tab-title">Moje nieruchomości</h2>
        <button 
          className="mp-btn mp-btn--primary"
          onClick={() => window.open('/zglos-nieruchomosc', '_blank')}
        >
          + Dodaj nieruchomość
        </button>
      </div>

      <div className="mp-properties-grid">
        {userProperties.map(property => (
          <UserPropertyCard
            key={property._id}
            property={property}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}