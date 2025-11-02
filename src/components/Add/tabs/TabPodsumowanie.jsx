import React from 'react';
import { 
  FaHome, 
  FaMapMarkerAlt, 
  FaRulerCombined, 
  FaBed, 
  FaBath, 
  FaCalendarAlt,
  FaImages,
  FaMoneyBillWave,
  FaBuilding,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt
} from 'react-icons/fa';

const SummarySection = ({ icon, title, children, className = '' }) => (
  <div className={`summary-section ${className}`}>
    <div className="summary-section-header">
      <div className="summary-section-icon">{icon}</div>
      <h4 className="summary-section-title">{title}</h4>
    </div>
    <div className="summary-section-content">
      {children}
    </div>
  </div>
);

const SummaryItem = ({ label, value, important = false }) => (
  <div className={`summary-item ${important ? 'important' : ''}`}>
    <span className="summary-item-label">{label}:</span>
    <span className="summary-item-value">{value || "-"}</span>
  </div>
);

const TabPodsumowanie = ({ formData, files, onBack, onSubmit, isSubmitting, submitError }) => {
  // Funkcje pomocnicze do formatowania danych
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getOfferTypeText = (type) => {
    return type === 'sprzedaz' ? 'Sprzedaż' : 'Wynajem';
  };

  const getMarketTypeText = (type) => {
    return type === 'pierwotny' ? 'Pierwotny' : 'Wtórny';
  };

  const getPropertyTypeText = (type) => {
    const types = {
      mieszkanie: 'Mieszkanie',
      dom: 'Dom',
      lokal_uzytkowy: 'Lokal użytkowy',
      dzialka: 'Działka',
      hala_magazyn: 'Hala/Magazyn',
      biuro: 'Biuro',
      komercyjne: 'Komercyjne',
      inne: 'Inne'
    };
    return types[type] || type;
  };

  return (
    <div className="tab-content">
      <div className="summary-header">
        <h3 className="section-title">Podsumowanie oferty</h3>
        <p className="summary-subtitle">Sprawdź poprawność wszystkich informacji przed wysłaniem</p>
      </div>

      {submitError && (
        <div className="error-message">
          <div className="error-message-header">
            <FaExclamationTriangle />
            <strong>Błąd podczas wysyłania</strong>
          </div>
          <p>{submitError}</p>
          <p className="error-message-hint">Proszę spróbować ponownie lub skontaktować się z administratorem.</p>
        </div>
      )}

      <div className="summary-grid">
        {/* Podstawowe informacje */}
        <SummarySection 
          icon={<FaHome />} 
          title="Podstawowe informacje"
          className="highlight"
        >
          <div className="summary-items-grid">
            <SummaryItem 
              label="Tytuł" 
              value={formData.tytul} 
              important 
            />
            <SummaryItem 
              label="Typ oferty" 
              value={getOfferTypeText(formData.rodzajOferty.typ)} 
            />
            <SummaryItem 
              label="Rynek" 
              value={getMarketTypeText(formData.rodzajOferty.rynek)} 
            />
            <SummaryItem 
              label="Typ nieruchomości" 
              value={getPropertyTypeText(formData.typNieruchomosci)} 
            />
            <SummaryItem 
              label="Cena" 
              value={formatCurrency(formData.cena.calkowita, formData.cena.waluta)} 
              important 
            />
          </div>
        </SummarySection>

        {/* Lokalizacja */}
        <SummarySection 
          icon={<FaMapMarkerAlt />} 
          title="Lokalizacja"
        >
          <div className="summary-items-grid">
            <SummaryItem 
              label="Ulica" 
              value={formData.lokalizacja.ulica} 
            />
            <SummaryItem 
              label="Miasto" 
              value={formData.lokalizacja.miasto} 
            />
            <SummaryItem 
              label="Województwo" 
              value={formData.lokalizacja.wojewodztwo} 
            />
            <SummaryItem 
              label="Kod pocztowy" 
              value={formData.lokalizacja.kodPocztowy} 
            />
          </div>
        </SummarySection>

        {/* Szczegóły techniczne */}
        <SummarySection 
          icon={<FaRulerCombined />} 
          title="Szczegóły techniczne"
        >
          <div className="summary-items-grid">
            <SummaryItem 
              label="Powierzchnia całkowita" 
              value={formData.powierzchnia.calkowita ? `${formData.powierzchnia.calkowita} m²` : ''} 
            />
            <SummaryItem 
              label="Powierzchnia użytkowa" 
              value={formData.powierzchnia.uzytkowa ? `${formData.powierzchnia.uzytkowa} m²` : ''} 
            />
            <SummaryItem 
              label="Liczba pokoi" 
              value={formData.pomieszczenia.pokoje} 
            />
            <SummaryItem 
              label="Liczba łazienek" 
              value={formData.pomieszczenia.lazienki} 
            />
            <SummaryItem 
              label="Rok budowy" 
              value={formData.budynek.rokBudowy} 
            />
            <SummaryItem 
              label="Stan nieruchomości" 
              value={formData.budynek.stanNieruchomosci} 
            />
          </div>
        </SummarySection>

        {/* Wyposażenie i media */}
        {(formData.media || formData.wyposazenie || formData.udogodnienia) && (
          <SummarySection 
            icon={<FaBuilding />} 
            title="Wyposażenie i udogodnienia"
          >
            <div className="tags-container">
              {/* Media */}
              {formData.media && Object.entries(formData.media).map(([key, value]) => {
                if (typeof value === 'boolean' && value) {
                  const mediaLabels = {
                    kanalizacja: 'Kanalizacja',
                    prad: 'Prąd',
                    gaz: 'Gaz',
                    klimatyzacja: 'Klimatyzacja',
                    alarm: 'Alarm',
                    domofon: 'Domofon',
                    internet: 'Internet'
                  };
                  return (
                    <span key={key} className="tag">
                      {mediaLabels[key] || key}
                    </span>
                  );
                }
                return null;
              }).filter(Boolean)}

              {/* Udogodnienia */}
              {formData.udogodnienia && Object.entries(formData.udogodnienia).map(([key, value]) => {
                if (typeof value === 'boolean' && value) {
                  const facilityLabels = {
                    balkon: 'Balkon',
                    taras: 'Taras',
                    garaz: 'Garaż',
                    parking: 'Parking',
                    piwnica: 'Piwnica',
                    ogrod: 'Ogród',
                    komorka: 'Komórka',
                    basen: 'Basen',
                    silownia: 'Siłownia',
                    monitoringOsiedla: 'Monitoring osiedla',
                    ochrona: 'Ochrona'
                  };
                  return (
                    <span key={key} className="tag">
                      {facilityLabels[key] || key}
                    </span>
                  );
                }
                return null;
              }).filter(Boolean)}
            </div>
          </SummarySection>
        )}

        {/* Informacje prawne */}
        {formData.informacjePrawne && (
          <SummarySection 
            icon={<FaShieldAlt />} 
            title="Informacje prawne"
          >
            <div className="summary-items-grid">
              <SummaryItem 
                label="Forma własności" 
                value={formData.informacjePrawne.formaWlasnosci} 
              />
              <SummaryItem 
                label="Klasa energetyczna" 
                value={formData.informacjePrawne.charakterystykaEnergetyczna?.klasa} 
              />
              <SummaryItem 
                label="Wskaźnik energetyczny" 
                value={formData.informacjePrawne.charakterystykaEnergetyczna?.wskaznik} 
              />
              {formData.informacjePrawne.hipoteka && (
                <span className="tag warning">Hipoteka</span>
              )}
              {formData.informacjePrawne.pozwolenieNaBudowe && (
                <span className="tag success">Pozwolenie na budowę</span>
              )}
            </div>
          </SummarySection>
        )}

        {/* Opis */}
        {formData.opis && (
          <SummarySection 
            icon={<FaCheckCircle />} 
            title="Opis nieruchomości"
          >
            <div className="description-content">
              <p>{formData.opis}</p>
            </div>
          </SummarySection>
        )}

        {/* Zdjęcia */}
        <SummarySection 
          icon={<FaImages />} 
          title="Materiały wizualne"
        >
          <div className="files-summary">
            <div className="files-count">
              <FaImages className="files-icon" />
              <span>{files.length} zdjęć</span>
            </div>
          </div>
        </SummarySection>
      </div>

      <div className="summary-actions">
        <div className="action-buttons">
          <button 
            className="btn ghost" 
            onClick={onBack} 
            disabled={isSubmitting}
          >
            Wstecz
          </button>
          <button 
            className="btn primary" 
            onClick={onSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Wysyłanie...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Opublikuj ofertę
              </>
            )}
          </button>
        </div>

        {isSubmitting && (
          <div className="submission-progress">
            <p>Trwa publikowanie oferty...</p>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPodsumowanie;