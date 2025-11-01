// src/components/PropertiesGrid/PropertiesGrid.js
import React from 'react';
const PropertiesGrid = ({ properties, onUpdateStatus, onDeleteProperty }) => {
  const getSurfaceArea = (property) => {
    // Jeśli property ma nową strukturę z obiektem powierzchnia
    if (property.powierzchnia && typeof property.powierzchnia === 'object') {
      return property.powierzchnia.calkowita || '0';
    }
    // Jeśli property ma starą strukturę
    return property.szczegoly?.rozmiar_m2 || '0';
  };

  const getPrice = (property) => {
    // Jeśli property ma nową strukturę z obiektem cena
    if (property.cena && typeof property.cena === 'object') {
      return property.cena.calkowita || property.cenaNum || '0';
    }
    // Jeśli property ma starą strukturę
    return property.cenaNum || '0';
  };

  const getLocation = (property) => {
    // Jeśli property ma nową strukturę z obiektem lokalizacja
    if (property.lokalizacja && typeof property.lokalizacja === 'object') {
      return property.lokalizacja.miasto || property.lokalizacja.wojewodztwo || 'Brak danych';
    }
    // Jeśli property ma starą strukturę - możesz dodać logikę dla starej struktury
    return property.szczegoly?.lokalizacja || 'Brak danych';
  };

  return (
    <div className="properties-grid">
      <table className="properties-table">
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th>Tytuł</th>
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
              <td>{property.nazwa || property.tytul}</td>
              <td>{getLocation(property)}</td>
              <td>{getSurfaceArea(property)} m²</td>
              <td>{getPrice(property)} zł</td>
              <td>
                <span className={`status-badge ${property.status === 'aktywne' ? 'active' : 'inactive'}`}>
                  {property.status}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onUpdateStatus(property._id, property.status === 'aktywne' ? 'weryfikacja' : 'aktywne')}
                    className={`btn-toggle ${property.status === 'aktywne' ? 'btn-inactive' : 'btn-active'}`}
                  >
                    {property.status === 'aktywne' ? 'Deaktywuj' : 'Aktywuj'}
                  </button>
                  <button
                    onClick={() => onDeleteProperty(property._id)}
                    className="btn-delete"
                  >
                    Usuń
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