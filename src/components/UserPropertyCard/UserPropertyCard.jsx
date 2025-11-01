// src/components/MojProfil/components/PropertyCard.js
import React from 'react';
import { 
  FaHome, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaCalendar,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

export default function PropertyCard({ property, onStatusChange, onDelete }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  return (
    <div className="mp-property-card">
      <div className="mp-property-card__image">
        {property.multimedia?.zdjecia?.[0] ? (
          <img 
            src={`${import.meta.env.VITE_BACKEND}/${property.multimedia.zdjecia[0].path}`} 
            alt={property.tytul}
            className="mp-property-card__img"
          />
        ) : (
          <div className="mp-property-card__no-image">
            <FaHome className="mp-property-card__no-image-icon" />
          </div>
        )}
        <div className={`mp-property-card__status mp-property-card__status--${property.status}`}>
          {property.status === 'aktywne' ? 'AKTYWNE' : 'NIEAKTYWNE'}
        </div>
      </div>

      <div className="mp-property-card__content">
        <h3 className="mp-property-card__title">{property.tytul}</h3>
        
        <div className="mp-property-card__details">
          <div className="mp-property-card__detail">
            <FaMoneyBillWave className="mp-property-card__detail-icon" />
            <span>{formatPrice(property.cena?.calkowita || 0)}</span>
          </div>
          
          <div className="mp-property-card__detail">
            <FaMapMarkerAlt className="mp-property-card__detail-icon" />
            <span>
              {property.lokalizacja?.miasto}
              {property.lokalizacja?.dzielnica && `, ${property.lokalizacja.dzielnica}`}
            </span>
          </div>
          
          <div className="mp-property-card__detail">
            <FaCalendar className="mp-property-card__detail-icon" />
            <span>Dodano: {formatDate(property.daty?.dataPublikacji)}</span>
          </div>
        </div>

        <div className="mp-property-card__type">
          <span className="mp-property-card__type-badge">
            {property.rodzajOferty?.typ} • {property.rodzajOferty?.rynek}
          </span>
        </div>

        <div className="mp-property-card__actions">
          <button 
            className={`mp-property-card__btn ${
              property.status === 'aktywne' 
                ? 'mp-property-card__btn--warning' 
                : 'mp-property-card__btn--success'
            }`}
            onClick={() => onStatusChange(property._id, property.status)}
          >
            {property.status === 'aktywne' ? (
              <>
                <FaEyeSlash className="mp-property-card__btn-icon" />
                Ukryj
              </>
            ) : (
              <>
                <FaEye className="mp-property-card__btn-icon" />
                Aktywuj
              </>
            )}
          </button>
          
          <button 
            className="mp-property-card__btn mp-property-card__btn--secondary"
            onClick={() => window.open(`/ogloszenie/${property._id}`, '_blank')}
          >
            Podgląd
          </button>
          
          <button 
            className="mp-property-card__btn mp-property-card__btn--danger"
            onClick={() => onDelete(property._id)}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}