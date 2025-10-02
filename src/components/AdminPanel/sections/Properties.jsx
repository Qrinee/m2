// src/components/AdminPanel/sections/Properties.js
import React, { useState, useEffect } from 'react';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = filter === 'all' 
        ? 'http://localhost:5000/api/admin/properties'
        : `http://localhost:5000/api/admin/properties?status=${filter}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProperties(data.data);
      }
    } catch (error) {
      console.error('Błąd pobierania ofert:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyStatus = async (propertyId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/properties/${propertyId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchProperties();
      }
    } catch (error) {
      console.error('Błąd aktualizacji oferty:', error);
    }
  };

  const deleteProperty = async (propertyId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę ofertę?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/admin/properties/${propertyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchProperties();
    } catch (error) {
      console.error('Błąd usuwania oferty:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statuses = {
      pending: { label: 'Oczekuje', class: 'warning' },
      approved: { label: 'Zaakceptowana', class: 'success' },
      rejected: { label: 'Odrzucona', class: 'danger' }
    };
    return statuses[status] || { label: status, class: 'default' };
  };

  if (loading) {
    return <div className="loading">Ładowanie ofert...</div>;
  }

  return (
    <div className="properties-section">
      <div className="section-header">
        <h2>Zarządzanie ofertami</h2>
        <p>Przeglądaj i akceptuj oferty nieruchomości</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Wszystkie ({properties.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Oczekujące
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Zaakceptowane
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Odrzucone
        </button>
      </div>

      <div className="properties-grid">
        {properties.length === 0 ? (
          <div className="empty-state">
            <p>Brak ofert do wyświetlenia</p>
          </div>
        ) : (
          properties.map(property => {
            const status = getStatusBadge(property.status);
            const coverImage = property.files?.find(f => f.isCover) || property.files?.[0];

            return (
              <div key={property._id} className="property-card">
                <div className="property-image">
                  {coverImage ? (
                    <img 
                      src={`http://localhost:5000/${coverImage.path}`} 
                      alt={property.nazwa}
                    />
                  ) : (
                    <div className="no-image">Brak zdjęcia</div>
                  )}
                  <div className={`status-badge ${status.class}`}>
                    {status.label}
                  </div>
                </div>

                <div className="property-content">
                  <h3>{property.nazwa}</h3>
                  <p className="property-location">
                    {property.lokalizacja?.miasto}, {property.lokalizacja?.wojewodztwo}
                  </p>
                  <p className="property-price">{property.cena} PLN</p>
                  <p className="property-description">
                    {property.opis?.substring(0, 100)}...
                  </p>

                  <div className="property-details">
                    <span>📐 {property.szczegoly?.rozmiar_m2} m²</span>
                    <span>🛏️ {property.szczegoly?.pokoje} pokoi</span>
                  </div>

                  <div className="property-actions">
                    {property.status === 'pending' && (
                      <>
                        <button 
                          className="btn-success"
                          onClick={() => updatePropertyStatus(property._id, 'approved')}
                        >
                          Akceptuj
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => updatePropertyStatus(property._id, 'rejected')}
                        >
                          Odrzuć
                        </button>
                      </>
                    )}
                    <button 
                      className="btn-secondary"
                      onClick={() => window.open(`/ogloszenie/${property._id}`, '_blank')}
                    >
                      Podgląd
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => deleteProperty(property._id)}
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Properties;