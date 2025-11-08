
import React from 'react';
import './PropertiesGrid.css'
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const PropertiesGrid = ({ properties, onUpdateStatus, onDeleteProperty }) => {
  const getSurfaceArea = (property) => {
    
    if (property.powierzchnia && typeof property.powierzchnia === 'object') {
      return property.powierzchnia.calkowita || '0';
    }
    
    return property.szczegoly?.rozmiar_m2 || '0';
  };

  const getPrice = (property) => {
    
    if (property.cena && typeof property.cena === 'object') {
      return property.cena.calkowita || property.cenaNum || '0';
    }
    
    return property.cenaNum || '0';
  };

  const getLocation = (property) => {
    
    if (property.lokalizacja && typeof property.lokalizacja === 'object') {
      return property.lokalizacja.miasto || property.lokalizacja.wojewodztwo || 'Brak danych';
    }
    
    return property.szczegoly?.lokalizacja || 'Brak danych';
  };

  return (
    <div className="properties-grid">
      <table className="properties-table">
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th className='property-title'>Tytuł</th>
            <th>Lokalizacja</th>
            <th>Powierzchnia</th>
            <th>Cena</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>
                {property.files && property.files[0] && (
                  <img 
                    src={property.files[0].path} 
                    alt={property.nazwa}
                    className="property-thumbnail"
                  />
                )}
              </td>
              <td className='property-title'><Link to={`/ogloszenie/${property._id}`}>{property.nazwa || property.tytul}</Link></td>
              <td>{getLocation(property)}</td>
              <td>{getSurfaceArea(property)} m²</td>
              <td>{getPrice(property)} zł</td>
              <td>
                <span className={`status-badge ${property.status === 'aktywne' ? 'actvr' : 'inactive'}`}>
                  {property.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onUpdateStatus(property._id, property.status === 'aktywne' ? 'weryfikacja' : 'aktywne')}
                    className={`btn-toggle ${property.status === 'aktywne' ? 'btn-inactive' : 'btn-active'} btn-tgl-active`}
                  >
                    {property.status === 'aktywne' ? 'Deaktywuj' : 'Aktywuj'}
                  </button>
                  <button
                    onClick={() => onDeleteProperty(property._id)}
                    className="btn-delete btn-tgl-active"
                  >
                    <FaTrash style={{marginRight: 5, marginBottom: "-2px"}}/> Usuń
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesGrid;