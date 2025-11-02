import React from 'react';

const TabSzczegoly = ({ value, updateField, onNext, onBack }) => {
  return (
    <div className="tab-content">
      <h3 className="section-title" style={{fontSize: '35px', marginBottom: '40px'}}>Szczegóły nieruchomości</h3>

      <h4 className="sub-title">Powierzchnie</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">*Powierzchnia całkowita (m²)</div>
<input 
  className="input" 
  type="number"
  min="0"
  step="0.01"
  value={value.powierzchnia.calkowita} 
  onChange={(e) => updateField('powierzchnia.calkowita', parseFloat(e.target.value) || 0)} 
/>
        </label>

        <label className="field">
          <div className="field-label">Powierzchnia użytkowa (m²)</div>
          <input 
            className="input" 
            type="number"
            value={value.powierzchnia.uzytkowa} 
            onChange={(e) => updateField('powierzchnia.uzytkowa', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Balkon (m²)</div>
          <input 
            className="input" 
            type="number"
            value={value.powierzchnia.dodatkowe.balkon} 
            onChange={(e) => updateField('powierzchnia.dodatkowe.balkon', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Taras (m²)</div>
          <input 
            className="input" 
            type="number"
            value={value.powierzchnia.dodatkowe.taras} 
            onChange={(e) => updateField('powierzchnia.dodatkowe.taras', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Piwnica (m²)</div>
          <input 
            className="input" 
            type="number"
            value={value.powierzchnia.dodatkowe.piwnica} 
            onChange={(e) => updateField('powierzchnia.dodatkowe.piwnica', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Komórka (m²)</div>
          <input 
            className="input" 
            type="number"
            value={value.powierzchnia.dodatkowe.komorka} 
            onChange={(e) => updateField('powierzchnia.dodatkowe.komorka', e.target.value)} 
          />
        </label>
      </div>

      <h4 className="sub-title">Pomieszczenia</h4>
      <div className="grid-3">
        <label className="field">
          <div className="field-label">*Liczba pokoi</div>
          <input 
            className="input" 
            type="number"
            value={value.pomieszczenia.pokoje} 
            onChange={(e) => updateField('pomieszczenia.pokoje', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">*Liczba łazienek</div>
          <input 
            className="input" 
            type="number"
            value={value.pomieszczenia.lazienki} 
            onChange={(e) => updateField('pomieszczenia.lazienki', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Typ kuchni</div>
          <select 
            className="input" 
            value={value.pomieszczenia.kuchnia}
            onChange={(e) => updateField('pomieszczenia.kuchnia', e.target.value)}
          >
            <option value="osobna">Osobna</option>
            <option value="otwarta">Otwarta</option>
            <option value="brak">Brak</option>
          </select>
        </label>
      </div>

      <h4 className="sub-title">Piętro</h4>
      <div className="grid-3">
        <label className="field">
          <div className="field-label">Piętro nieruchomości</div>
          <input 
            className="input" 
            type="number"
            value={value.pietro.pietroNieruchomosci} 
            onChange={(e) => updateField('pietro.pietroNieruchomosci', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Liczba pięter w budynku</div>
          <input 
            className="input" 
            type="number"
            value={value.pietro.liczbaPieter} 
            onChange={(e) => updateField('pietro.liczbaPieter', e.target.value)} 
          />
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.pietro.winda} 
            onChange={(e) => updateField('pietro.winda', e.target.checked)} 
          />
          <span className="field-label">Winda</span>
        </label>
      </div>

      <h4 className="sub-title">Budynek</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">Rok budowy</div>
          <input 
            className="input" 
            type="number"
            value={value.budynek.rokBudowy} 
            onChange={(e) => updateField('budynek.rokBudowy', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Stan techniczny</div>
          <select 
            className="input" 
            value={value.budynek.stanTechniczny}
            onChange={(e) => updateField('budynek.stanTechniczny', e.target.value)}
          >
            <option value="do_remontu">Do remontu</option>
            <option value="stan_developer">Stan deweloperski</option>
            <option value="bardzo_dobry">Bardzo dobry</option>
            <option value="dobry">Dobry</option>
            <option value="do_odswiezenia">Do odświeżenia</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Materiał budynku</div>
          <input 
            className="input" 
            value={value.budynek.material} 
            onChange={(e) => updateField('budynek.material', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Stan wykończenia</div>
          <input 
            className="input" 
            value={value.budynek.stanWykonczenia} 
            onChange={(e) => updateField('budynek.stanWykonczenia', e.target.value)} 
          />
        </label>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack}>
            Wstecz
          </button>
        </div>
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabSzczegoly;