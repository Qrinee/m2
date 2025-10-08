// src/components/AdminPanel/sections/Properties.js
import React, { useState, useEffect } from 'react';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  useEffect(() => {
    fetchProperties();
  }, [filter]);

  const fetchProperties = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/properties?limit=100', {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Filtrujemy nieruchomości po stronie klienta
          let filteredProperties = result.properties;
          
          if (filter === 'active') {
            filteredProperties = result.properties.filter(prop => prop.isActive !== false);
          } else if (filter === 'inactive') {
            filteredProperties = result.properties.filter(prop => prop.isActive === false);
          }
          
          setProperties(filteredProperties);
        }
      }
    } catch (error) {
      console.error('Błąd pobierania ofert:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePropertyStatus = async (propertyId, isActive) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/properties/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          isActive: isActive,
          // Dodaj inne pola które mogą być potrzebne do aktualizacji
          ...properties.find(p => p._id === propertyId)
        })
      });

      if (response.ok) {
        fetchProperties();
      } else {
        console.error('Błąd aktualizacji oferty');
      }
    } catch (error) {
      console.error('Błąd aktualizacji oferty:', error);
    }
  };

  const deleteProperty = async (propertyId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę ofertę?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        fetchProperties();
      } else {
        console.error('Błąd usuwania oferty');
      }
    } catch (error) {
      console.error('Błąd usuwania oferty:', error);
    }
  };

  const getStatusBadge = (property) => {
    if (property.isActive === false) {
      return { label: 'Nieaktywna', class: 'danger' };
    }
    
    const statuses = {
      'na_sprzedaz': { label: 'Na sprzedaż', class: 'success' },
      'do_wynajecia': { label: 'Do wynajęcia', class: 'warning' },
      'sprzedane': { label: 'Sprzedane', class: 'default' }
    };
    
    return statuses[property.status] || { label: property.status, class: 'default' };
  };

  const getCategoryLabel = (kategoria) => {
    const categories = {
      'dom': 'Dom',
      'mieszkanie': 'Mieszkanie',
      'dzialka': 'Działka',
      'lokal': 'Lokal'
    };
    return categories[kategoria] || kategoria;
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price || 0);
  };

  if (loading) {
    return <div className="loading">Ładowanie ofert...</div>;
  }

  return (
    <div className="properties-section">
      <div className="section-header">
        <h2>Zarządzanie ofertami</h2>
        <p>Przeglądaj i zarządzaj ofertami nieruchomości</p>
      </div>

      <div className="properties-stats">
        <div className="stat-card">
          <div className="stat-number">{properties.length}</div>
          <div className="stat-label">Wszystkie oferty</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {properties.filter(p => p.isActive !== false).length}
          </div>
          <div className="stat-label">Aktywne</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {properties.filter(p => p.isActive === false).length}
          </div>
          <div className="stat-label">Nieaktywne</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {properties.filter(p => p.status === 'na_sprzedaz').length}
          </div>
          <div className="stat-label">Na sprzedaż</div>
        </div>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Wszystkie ({properties.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Aktywne ({properties.filter(p => p.isActive !== false).length})
        </button>
        <button 
          className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
          onClick={() => setFilter('inactive')}
        >
          Nieaktywne ({properties.filter(p => p.isActive === false).length})
        </button>
      </div>

      <div className="properties-grid">
        {properties.length === 0 ? (
          <div className="empty-state">
            <p>Brak ofert do wyświetlenia</p>
          </div>
        ) : (
          properties.map(property => {
            const status = getStatusBadge(property);
            const coverImage = property.files?.find(f => f.isCover) || property.files?.[0];

            return (
              <div key={property._id} className="property-card">
                <div className="property-image">
                  {coverImage ? (
                    <img 
                      src={coverImage.path} 
                      alt={property.nazwa}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <div className="no-image" style={{display: coverImage ? 'none' : 'block'}}>
                    Brak zdjęcia
                  </div>
                  <div className={`status-badge ${status.class}`}>
                    {status.label}
                  </div>
                  <div className="category-badge">
                    {getCategoryLabel(property.kategoria)}
                  </div>
                </div>

                <div className="property-content">
                  <h3>{property.nazwa || 'Brak nazwy'}</h3>
                  <p className="property-location">
                    {property.lokalizacja?.miasto || 'Brak miasta'}, {property.lokalizacja?.wojewodztwo || 'Brak województwa'}
                  </p>
                  <p className="property-price">{formatPrice(property.cena)}</p>
                  <p className="property-description">
                    {property.opis?.substring(0, 100) || 'Brak opisu'}...
                  </p>

                  <div className="property-details">
                    <span>📐 {property.szczegoly?.rozmiar_m2 || '?'} m²</span>
                    <span>🛏️ {property.szczegoly?.pokoje || '?'} pokoi</span>
                    {property.szczegoly?.sypialnie && (
                      <span>🛌 {property.szczegoly.sypialnie} sypialni</span>
                    )}
                  </div>

                  <div className="property-meta">
                    <span className="property-date">
                      Dodano: {new Date(property.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                    {property.user && (
                      <span className="property-owner">
                        Właściciel: {property.user.name} {property.user.surname}
                      </span>
                    )}
                  </div>

                  <div className="property-actions">
                    {property.isActive !== false ? (
                      <button 
                        className="btn-warning"
                        onClick={() => updatePropertyStatus(property._id, false)}
                      >
                        Deaktywuj
                      </button>
                    ) : (
                      <button 
                        className="btn-success"
                        onClick={() => updatePropertyStatus(property._id, true)}
                      >
                        Aktywuj
                      </button>
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