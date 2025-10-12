import React from 'react';

const TabDodatkowe = ({ value, updateField, onNext, onBack }) => {
  return (
    <div className="tab-content">
      <h3 className="section-title">Dodatkowe informacje</h3>

      <h4 className="sub-title">Media i instalacje</h4>
      <div className="grid-3">
        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.kanalizacja} 
            onChange={(e) => updateField('media.kanalizacja', e.target.checked)} 
          />
          <span className="field-label">Kanalizacja</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.prad} 
            onChange={(e) => updateField('media.prad', e.target.checked)} 
          />
          <span className="field-label">Prąd</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.gaz} 
            onChange={(e) => updateField('media.gaz', e.target.checked)} 
          />
          <span className="field-label">Gaz</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.klimatyzacja} 
            onChange={(e) => updateField('media.klimatyzacja', e.target.checked)} 
          />
          <span className="field-label">Klimatyzacja</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.alarm} 
            onChange={(e) => updateField('media.alarm', e.target.checked)} 
          />
          <span className="field-label">Alarm</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.domofon} 
            onChange={(e) => updateField('media.domofon', e.target.checked)} 
          />
          <span className="field-label">Domofon</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.media.internet} 
            onChange={(e) => updateField('media.internet', e.target.checked)} 
          />
          <span className="field-label">Internet</span>
        </label>
      </div>

      <div className="grid-3">
        <label className="field">
          <div className="field-label">Ogrzewanie</div>
          <select 
            className="input" 
            value={value.media.ogrzewanie}
            onChange={(e) => updateField('media.ogrzewanie', e.target.value)}
          >
            <option value="">Wybierz rodzaj ogrzewania</option>
            <option value="gazowe">Gazowe</option>
            <option value="elektryczne">Elektryczne</option>
            <option value="miejska">Miejska</option>
            <option value="olejowe">Olejowe</option>
            <option value="pompa_ciepla">Pompa ciepła</option>
            <option value="kominek">Kominek</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Ciepła woda</div>
          <select 
            className="input" 
            value={value.media.cieplaWoda}
            onChange={(e) => updateField('media.cieplaWoda', e.target.value)}
          >
            <option value="">Wybierz źródło ciepłej wody</option>
            <option value="gaz">Gaz</option>
            <option value="prad">Prąd</option>
            <option value="miejska">Miejska</option>
            <option value="pompa_ciepla">Pompa ciepła</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Wentylacja</div>
          <select 
            className="input" 
            value={value.media.wentylacja}
            onChange={(e) => updateField('media.wentylacja', e.target.value)}
          >
            <option value="">Wybierz rodzaj wentylacji</option>
            <option value="grawitacyjna">Grawitacyjna</option>
            <option value="mechaniczna">Mechaniczna</option>
            <option value="rekuperacja">Rekuperacja</option>
          </select>
        </label>
      </div>

      <h4 className="sub-title">Wyposażenie</h4>
      <div className="grid-3">
        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.wyposazenie.meble} 
            onChange={(e) => updateField('wyposazenie.meble', e.target.checked)} 
          />
          <span className="field-label">Meble</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.wyposazenie.rolety} 
            onChange={(e) => updateField('wyposazenie.rolety', e.target.checked)} 
          />
          <span className="field-label">Rolety</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.wyposazenie.systemAlarmowy} 
            onChange={(e) => updateField('wyposazenie.systemAlarmowy', e.target.checked)} 
          />
          <span className="field-label">System alarmowy</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.wyposazenie.monitoring} 
            onChange={(e) => updateField('wyposazenie.monitoring', e.target.checked)} 
          />
          <span className="field-label">Monitoring</span>
        </label>
      </div>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Okna</div>
          <input 
            className="input" 
            value={value.wyposazenie.okna} 
            onChange={(e) => updateField('wyposazenie.okna', e.target.value)} 
            placeholder="np. plastikowe, drewniane"
          />
        </label>

        <label className="field">
          <div className="field-label">Podłogi</div>
          <input 
            className="input" 
            value={value.wyposazenie.podlogi} 
            onChange={(e) => updateField('wyposazenie.podlogi', e.target.value)} 
            placeholder="np. panele, terakota"
          />
        </label>
      </div>

      <label className="field">
        <div className="field-label">Wyposażenie AGD</div>
        <input 
          className="input" 
          value={value.wyposazenie.agd ? value.wyposazenie.agd.join(', ') : ''} 
          onChange={(e) => {
            const agdArray = e.target.value.split(',').map(item => item.trim()).filter(item => item);
            updateField('wyposazenie.agd', agdArray);
          }} 
          placeholder="np. lodówka, pralka, zmywarka (oddziel przecinkami)"
        />
        <div className="field-hint">Wpisz urządzenia AGD oddzielone przecinkami</div>
      </label>

      <h4 className="sub-title">Udogodnienia</h4>
      <div className="grid-3">
        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.balkon} 
            onChange={(e) => updateField('udogodnienia.balkon', e.target.checked)} 
          />
          <span className="field-label">Balkon</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.taras} 
            onChange={(e) => updateField('udogodnienia.taras', e.target.checked)} 
          />
          <span className="field-label">Taras</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.garaz} 
            onChange={(e) => updateField('udogodnienia.garaz', e.target.checked)} 
          />
          <span className="field-label">Garaż</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.parking} 
            onChange={(e) => updateField('udogodnienia.parking', e.target.checked)} 
          />
          <span className="field-label">Parking</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.piwnica} 
            onChange={(e) => updateField('udogodnienia.piwnica', e.target.checked)} 
          />
          <span className="field-label">Piwnica</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.ogrod} 
            onChange={(e) => updateField('udogodnienia.ogrod', e.target.checked)} 
          />
          <span className="field-label">Ogród</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.komorka} 
            onChange={(e) => updateField('udogodnienia.komorka', e.target.checked)} 
          />
          <span className="field-label">Komórka lokatorska</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.basen} 
            onChange={(e) => updateField('udogodnienia.basen', e.target.checked)} 
          />
          <span className="field-label">Basen</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.silownia} 
            onChange={(e) => updateField('udogodnienia.silownia', e.target.checked)} 
          />
          <span className="field-label">Siłownia</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.monitoringOsiedla} 
            onChange={(e) => updateField('udogodnienia.monitoringOsiedla', e.target.checked)} 
          />
          <span className="field-label">Monitoring osiedla</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.udogodnienia.ochrona} 
            onChange={(e) => updateField('udogodnienia.ochrona', e.target.checked)} 
          />
          <span className="field-label">Ochrona</span>
        </label>
      </div>

      <h4 className="sub-title">Informacje prawne</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">Forma własności</div>
          <select 
            className="input" 
            value={value.informacjePrawne.formaWlasnosci}
            onChange={(e) => updateField('informacjePrawne.formaWlasnosci', e.target.value)}
          >
            <option value="">Wybierz formę własności</option>
            <option value="wlasnosc">Własność</option>
            <option value="spoldzielcze_wlasnosciowe">Spółdzielcze własnościowe</option>
            <option value="uzytkowanie_wieczyste">Użytkowanie wieczyste</option>
            <option value="inne">Inne</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Klasa energetyczna</div>
          <select 
            className="input" 
            value={value.informacjePrawne.charakterystykaEnergetyczna.klasa}
            onChange={(e) => updateField('informacjePrawne.charakterystykaEnergetyczna.klasa', e.target.value)}
          >
            <option value="">Wybierz klasę energetyczną</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </label>
      </div>

      <div className="grid-3">
        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.informacjePrawne.hipoteka} 
            onChange={(e) => updateField('informacjePrawne.hipoteka', e.target.checked)} 
          />
          <span className="field-label">Hipoteka</span>
        </label>

        <label className="field checkbox-field">
          <input 
            type="checkbox" 
            checked={value.informacjePrawne.pozwolenieNaBudowe} 
            onChange={(e) => updateField('informacjePrawne.pozwolenieNaBudowe', e.target.checked)} 
          />
          <span className="field-label">Pozwolenie na budowę</span>
        </label>
      </div>

      <label className="field">
        <div className="field-label">Wskaźnik energetyczny</div>
        <input 
          className="input" 
          value={value.informacjePrawne.charakterystykaEnergetyczna.wskaznik} 
          onChange={(e) => updateField('informacjePrawne.charakterystykaEnergetyczna.wskaznik', e.target.value)} 
          placeholder="np. 120 kWh/m²/rok"
        />
      </label>

      <label className="field">
        <div className="field-label">Obciążenia nieruchomości</div>
        <textarea 
          className="input textarea" 
          value={value.informacjePrawne.obciazenia} 
          onChange={(e) => updateField('informacjePrawne.obciazenia', e.target.value)} 
          placeholder="Opisz ewentualne obciążenia nieruchomości..."
          rows="3"
        />
      </label>

      <label className="field">
        <div className="field-label">Księga wieczysta</div>
        <input 
          className="input" 
          value={value.informacjePrawne.ksiegWieczysty} 
          onChange={(e) => updateField('informacjePrawne.ksiegWieczysty', e.target.value)} 
          placeholder="Numer księgi wieczystej"
        />
      </label>

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

export default TabDodatkowe;