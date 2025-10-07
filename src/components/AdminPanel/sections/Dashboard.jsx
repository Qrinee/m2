// src/components/AdminPanel/sections/Dashboard.js
import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    pendingProperties: 0,
    totalUsers: 0,
    totalForms: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Błąd pobierania statystyk:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-info">
            <h3>{stats.totalProperties}</h3>
            <p>Wszystkie oferty</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingProperties}</h3>
            <p>Oczekujące oferty</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Użytkownicy</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.totalForms}</h3>
            <p>Formularze</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <div className="action-card">
          <h3>Szybkie akcje</h3>
          <div className="action-buttons">
            <button className="btn-primary" onClick={() => window.location.href = '/admin/properties'}>
              Przejrzyj oferty
            </button>
            <button className="btn-secondary" onClick={() => window.location.href = '/admin/news'}>
              Dodaj aktualność
            </button>
            <button className="btn-secondary" onClick={() => window.location.href = '/admin/faq'}>
              Zarządzaj FAQ
            </button>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Ostatnia aktywność</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">➕</span>
              <div className="activity-content">
                <p>Nowa oferta nieruchomości</p>
                <span className="activity-time">2 minuty temu</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <div className="activity-content">
                <p>Formularz kontaktowy</p>
                <span className="activity-time">5 minut temu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;