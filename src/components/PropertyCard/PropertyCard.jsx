// src/components/AdminPanel/sections/PropertyCard.js
import React from 'react';

const PropertyCard = ({ property, onUpdateStatus, onDeleteProperty }) => {
  const getStatusBadge = (property) => {
    // Mapowanie statusów z backendu na nasze komponenty
    const statusMap = {
      'na_sprzedaz': { label: 'Na sprzedaż', class: 'adm-prop-status--active' },
      'aktywne': { label: 'Aktywna', class: 'adm-prop-status--active' },
      'nieaktywne': { label: 'Nieaktywna', class: 'adm-prop-status--inactive' },
      'weryfikacja': { label: 'Weryfikacja', class: 'adm-prop-status--pending' },
      'zarchiwizowane': { label: 'Zarchiwizowana', class: 'adm-prop-status--archived' },
      'sprzedane': { label: 'Sprzedana', class: 'adm-prop-status--sold' },
      'wynajete': { label: 'Wynajęta', class: 'adm-prop-status--rented' }
    };
    
    // Używamy isActive z backendu lub status
    if (property.isActive === false) {
      return { label: 'Nieaktywna', class: 'adm-prop-status--inactive' };
    }
    if (property.isActive === true) {
      return { label: 'Aktywna', class: 'adm-prop-status--active' };
    }
    
    return statusMap[property.status] || { label: property.status || 'Nieznany', class: 'adm-prop-status--default' };
  };

  const getCategoryLabel = (kategoria) => {
    const categories = {
      'mieszkanie': 'Mieszkanie',
      'dom': 'Dom',
      'lokal_uzytkowy': 'Lokal użytkowy',
      'dzialka': 'Działka',
      'hala_magazyn': 'Hala/Magazyn',
      'biuro': 'Biuro',
      'komercyjne': 'Komercyjne',
      'inne': 'Inne'
    };
    return categories[kategoria] || kategoria || 'Inne';
  };

  const getOfferTypeLabel = (status) => {
    const types = {
      'na_sprzedaz': 'Sprzedaż',
      'sprzedaz': 'Sprzedaż',
      'wynajem': 'Wynajem'
    };
    return types[status] || 'Sprzedaż'; // Domyślnie sprzedaż
  };

  const formatPrice = (cena) => {
    // Obsługa różnych formatów cen z backendu
    let priceValue;
    
    if (typeof cena === 'object' && cena !== null) {
      priceValue = cena.calkowita;
    } else if (typeof cena === 'string') {
      priceValue = parseFloat(cena);
    } else if (typeof cena === 'number') {
      priceValue = cena;
    } else {
      priceValue = property.cenaNum; // Fallback na cenaNum z backendu
    }
    
    if (!priceValue || priceValue === 0) return 'Brak ceny';
    
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(priceValue);
  };

  const status = getStatusBadge(property);
  
  // Znajdź zdjęcie cover lub pierwsze zdjęcie - BEZPOŚREDNIO z property.files
  const coverImage = property.files?.find(f => f.isCover) || property.files?.[0];

  return (
    <div className="adm-prop-card">
      <div className="adm-prop-card__image">
        {coverImage ? (
          <img 
            src={coverImage.path || coverImage.sourceUrl} 
            alt={property.nazwa}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div className="adm-prop-card__no-image" style={{display: coverImage ? 'none' : 'block'}}>
          Brak zdjęcia
        </div>
        <div className={`adm-prop-card__status ${status.class}`}>
          {status.label}
        </div>
        <div className="adm-prop-card__category">
          {getCategoryLabel(property.kategoria)}
        </div>
        <div className="adm-prop-card__offer-type">
          {getOfferTypeLabel(property.status)}
        </div>
      </div>

      <div className="adm-prop-card__content">
        <h3>{property.nazwa || 'Brak tytułu'}</h3>
        <p className="adm-prop-card__location">
          {property.lokalizacja?.miasto || 'Brak miasta'}, {property.lokalizacja?.wojewodztwo || 'Brak województwa'}
        </p>
        
        {/* CENA - użyjemy bezpośrednio property.cena lub property.cenaNum */}
        <p className="adm-prop-card__price">{formatPrice(property.cena)}</p>
        
        <p className="adm-prop-card__description">
          {property.opis?.substring(0, 100) || 'Brak opisu'}...
        </p>

        <div className="adm-prop-card__details">
          <span>📐 {property.szczegoly?.rozmiar_m2 || property.powierzchnia || '?'} m²</span>
          <span>🛏️ {property.szczegoly?.pokoje || property.pokoje || '?'} pokoi</span>
          <span>🚿 {property.szczegoly?.lazienki || '?'} łazienek</span>
        </div>

        <div className="adm-prop-card__meta">
          <span className="adm-prop-card__date">
            Dodano: {new Date(property.createdAt).toLocaleDateString('pl-PL')}
          </span>
          {property.user && (
            <span className="adm-prop-card__owner">
              Właściciel: {property.user.name} {property.user.surname}
            </span>
          )}
        </div>

        <div className="adm-prop-card__actions">
          {property.isActive ? (
            <button 
              className="adm-prop-card__btn--warning"
              onClick={() => onUpdateStatus(property._id, 'nieaktywne')}
            >
              Deaktywuj
            </button>
          ) : (
            <button 
              className="adm-prop-card__btn--success"
              onClick={() => onUpdateStatus(property._id, 'aktywne')}
            >
              Aktywuj
            </button>
          )}
          
          <button 
            className="adm-prop-card__btn--secondary"
            onClick={() => window.open(`/ogloszenie/${property._id}`, '_blank')}
          >
            Podgląd
          </button>
          
          <button 
            className="adm-prop-card__btn--danger"
            onClick={() => onDeleteProperty(property._id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;