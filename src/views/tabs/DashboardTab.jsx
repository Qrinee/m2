// src/components/MojProfil/tabs/DashboardTab.js
import React from 'react';
import { FaUser, FaHome, FaInbox } from 'react-icons/fa';

export default function DashboardTab({ displayUser, userProperties }) {
  return (
    <div className="mp-tab-content">
      <h2 className="mp-tab-title">Panel informacyjny</h2>
      <div className="mp-stats-grid">
        <div className="mp-stat-card">
          <div className="mp-stat-card__icon mp-stat-card__icon--primary">
            <FaUser />
          </div>
          <div className="mp-stat-card__content">
            <h3>Aktywność profilu</h3>
            <p>Konto aktywne od: {new Date(displayUser.createdAt).toLocaleDateString('pl-PL')}</p>
          </div>
        </div>
        
        <div className="mp-stat-card">
          <div className="mp-stat-card__icon mp-stat-card__icon--success">
            <FaHome />
          </div>
          <div className="mp-stat-card__content">
            <h3>Moje nieruchomości</h3>
            <p>{userProperties.length} nieruchomości</p>
          </div>
        </div>
        
        <div className="mp-stat-card">
          <div className="mp-stat-card__icon mp-stat-card__icon--info">
            <FaInbox />
          </div>
          <div className="mp-stat-card__content">
            <h3>Wiadomości</h3>
            <p>0 nieprzeczytanych wiadomości</p>
          </div>
        </div>
      </div>
    </div>
  );
}