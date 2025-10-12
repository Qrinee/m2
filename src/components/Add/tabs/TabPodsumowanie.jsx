import React from 'react';

const TabPodsumowanie = ({ formData, files, onBack, onSubmit, isSubmitting, submitError }) => {
  return (
    <div className="tab-content">
      <h3 className="section-title">Podsumowanie</h3>

      {submitError && (
        <div className="error-message">
          <strong>Błąd podczas wysyłania:</strong> {submitError}
          <p>Proszę spróbować ponownie lub skontaktować się z administratorem.</p>
        </div>
      )}

      <div className="summary">
        <h4>Podstawowe informacje</h4>
        <p><strong>Tytuł:</strong> {formData.tytul || "-"}</p>
        <p><strong>Typ oferty:</strong> {formData.rodzajOferty.typ === 'sprzedaz' ? 'Sprzedaż' : 'Wynajem'}</p>
        <p><strong>Rynek:</strong> {formData.rodzajOferty.rynek === 'pierwotny' ? 'Pierwotny' : 'Wtórny'}</p>
        <p><strong>Typ nieruchomości:</strong> {formData.typNieruchomosci}</p>
        <p><strong>Cena:</strong> {formData.cena.calkowita} {formData.cena.waluta}</p>

        <h4>Opis</h4>
        <p>{formData.opis || "-"}</p>

        <h4>Lokalizacja</h4>
        <p>{formData.lokalizacja.ulica || "-"}, {formData.lokalizacja.miasto || "-"} {formData.lokalizacja.wojewodztwo || "-"}</p>

        <h4>Szczegóły</h4>
        <p><strong>Powierzchnia:</strong> {formData.powierzchnia.calkowita} m²</p>
        <p><strong>Pokoje:</strong> {formData.pomieszczenia.pokoje}</p>
        <p><strong>Łazienki:</strong> {formData.pomieszczenia.lazienki}</p>
        <p><strong>Rok budowy:</strong> {formData.budynek.rokBudowy || "-"}</p>

        <h4>Zdjęcia</h4>
        <p>{files.length} plik(ów)</p>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack} disabled={isSubmitting}>
            Wstecz
          </button>
        </div>
        <div>
          <button 
            className="btn" 
            onClick={onSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Zgłoś nieruchomość"}
          </button>
        </div>
      </div>

      {isSubmitting && (
        <div className="submission-progress">
          <p>Trwa wysyłanie danych nieruchomości...</p>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabPodsumowanie;