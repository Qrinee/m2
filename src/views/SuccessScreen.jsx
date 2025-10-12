import React from 'react';

const SuccessScreen = ({ submittedProperty, onAddAnother, onViewMyProperties, onViewProperty }) => {
  return (
    <div className="success-screen">
      <div className="success-icon">✓</div>
      <h2>Nieruchomość została pomyślnie zgłoszona!</h2>
      
      {submittedProperty && (
        <div className="submitted-property-info">
          <h3>Szczegóły zgłoszenia:</h3>
          <div className="property-details">
            <p><strong>Tytuł:</strong> {submittedProperty.tytul}</p>
            <p><strong>Lokalizacja:</strong> {submittedProperty.lokalizacja}</p>
            <p><strong>Cena:</strong> {submittedProperty.cena} PLN</p>
            {submittedProperty.id && (
              <p><strong>ID nieruchomości:</strong> {submittedProperty.id}</p>
            )}
          </div>
        </div>
      )}

      <div className="success-actions">
        <button className="btn btn-primary" onClick={onAddAnother}>
          Dodaj kolejną nieruchomość
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onViewMyProperties}
        >
          Przejdź do moich nieruchomości
        </button>
        {submittedProperty?.id && (
          <button 
            className="btn btn-outline" 
            onClick={() => onViewProperty(submittedProperty.id)}
          >
            Zobacz ogłoszenie
          </button>
        )}
      </div>

      <div className="success-note">
        <p>Twoja nieruchomość została przekazana do weryfikacji. Po zaakceptowaniu będzie widoczna w serwisie.</p>
      </div>
    </div>
  );
};

export default SuccessScreen;