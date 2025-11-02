import React from 'react';

const TabLokalizacja = ({ value, updateField, onNext, onBack }) => {
  return (
    <div className="tab-content">
      <h3 className="section-title"  style={{fontSize: '35px', marginBottom: '40px'}}>Lokalizacja</h3>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">*Województwo</div>
          <input 
            className="input" 
            placeholder='Mazowieckie'
            value={value.lokalizacja.wojewodztwo} 
            onChange={(e) => updateField('lokalizacja.wojewodztwo', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">*Miasto</div>
          <input 
          placeholder='Warszawa'
            className="input" 
            value={value.lokalizacja.miasto} 
            onChange={(e) => updateField('lokalizacja.miasto', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Powiat</div>
          <input 
            className="input" 
            placeholder='Powiat Jarosławski'
            value={value.lokalizacja.powiat} 
            onChange={(e) => updateField('lokalizacja.powiat', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Gmina</div>
          <input 
            className="input" 
            placeholder='Gmina Skawina'
            value={value.lokalizacja.gmina} 
            onChange={(e) => updateField('lokalizacja.gmina', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label" >Dzielnica/Osiedle</div>
          <input 
            className="input" 
            placeholder="Borowiczki"
            value={value.lokalizacja.dzielnica} 
            onChange={(e) => updateField('lokalizacja.dzielnica', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Ulica</div>
          <input 
            className="input" 
            placeholder='Jana Pawła ||'
            value={value.lokalizacja.ulica} 
            onChange={(e) => updateField('lokalizacja.ulica', e.target.value)} 
          />
        </label>

        <label className="field">
          <div className="field-label">Kod pocztowy</div>
          <input 
            className="input" 
            placeholder='00-000'
            value={value.lokalizacja.kodPocztowy} 
            onChange={(e) => updateField('lokalizacja.kodPocztowy', e.target.value)} 
          />
        </label>
      </div>

      <div className="grid-2" style={{marginTop: '40px'}}>
        <label className="field">
          <div className="field-label">Szerokość geograficzna</div>
<input 
  className="input" 
  step="0.000001"
  value={value.lokalizacja.lat} 
  onChange={(e) => updateField('lokalizacja.lat', parseFloat(e.target.value) || '')} 
  placeholder="np. 50.06143" 
/>
        </label>
        <label className="field">
          <div className="field-label">Długość geograficzna</div>
          <input 
            className="input" 
            value={value.lokalizacja.lon} 
            onChange={(e) => updateField('lokalizacja.lon', e.target.value)} 
            placeholder="np. 19.93658" 
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

export default TabLokalizacja;