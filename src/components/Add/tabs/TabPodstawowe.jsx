import React from 'react';

const TabPodstawowe = ({ value, updateField, onNext }) => {
  return (
    <div className="tab-content">
      <h3 className="section-title">Podstawowe informacje</h3>

      <label className="field">
        <div className="field-label">*Tytuł ogłoszenia (wymagane)</div>
        <input 
          className="input" 
          required 
          value={value.tytul} 
          onChange={(e) => updateField('tytul', e.target.value)} 
          placeholder="np. Przestronne 3-pokojowe mieszkanie w centrum"
        />
      </label>

      <label className="field">
        <div className="field-label">*Opis nieruchomości (wymagane)</div>
        <textarea 
          rows="6" 
          value={value.opis} 
          onChange={(e) => updateField('opis', e.target.value)}
          placeholder="Opisz szczegółowo nieruchomość, jej zalety i cechy charakterystyczne..."
        />
      </label>

      <h4 className="sub-title">Cena nieruchomości</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">*Cena całkowita (PLN)</div>
                  <input
                    className="input"
                    type="number"
                    min="0"
                    step="0.01"
                    value={value.cena.calkowita}
                    onChange={(e) => updateField('cena.calkowita', parseFloat(e.target.value) || 0)}
                    placeholder="np. 500000"
                  />
        </label>

        <label className="field">
          <div className="field-label">Waluta</div>
          <select 
            className="input" 
            value={value.cena.waluta}
            onChange={(e) => updateField('cena.waluta', e.target.value)}
          >
            <option value="PLN">PLN</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </label>
      </div>

      <h4 className="sub-title">Rodzaj oferty</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">*Typ oferty</div>
          <select 
            className="input" 
            value={value.rodzajOferty.typ}
            onChange={(e) => updateField('rodzajOferty.typ', e.target.value)}
          >
            <option value="sprzedaz">Sprzedaż</option>
            <option value="wynajem">Wynajem</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">*Rynek</div>
          <select 
            className="input" 
            value={value.rodzajOferty.rynek}
            onChange={(e) => updateField('rodzajOferty.rynek', e.target.value)}
          >
            <option value="pierwotny">Pierwotny</option>
            <option value="wtorny">Wtórny</option>
          </select>
        </label>
      </div>

      <label className="field">
        <div className="field-label">*Typ nieruchomości</div>
        <select 
          className="input" 
          value={value.typNieruchomosci}
          onChange={(e) => updateField('typNieruchomosci', e.target.value)}
        >
          <option value="mieszkanie">Mieszkanie</option>
          <option value="dom">Dom</option>
          <option value="lokal_uzytkowy">Lokal użytkowy</option>
          <option value="dzialka">Działka</option>
          <option value="hala_magazyn">Hala/Magazyn</option>
          <option value="biuro">Biuro</option>
          <option value="komercyjne">Komercyjne</option>
          <option value="inne">Inne</option>
        </select>
      </label>

      <div className="nav-row">
        <div />
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabPodstawowe;