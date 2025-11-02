import React, { useState, useEffect } from 'react';
import { 
  FaShower, 
  FaBolt, 
  FaFire, 
  FaSnowflake, 
  FaBell, 
  FaDoorClosed,
  FaWifi,
  FaThermometerHalf,
  FaTint,
  FaWind,
  FaCouch,
  FaStore,
  FaShieldAlt,
  FaVideo,
  FaHome,
  FaUmbrellaBeach,
  FaCar,
  FaParking,
  FaMountain,
  FaTree,
  FaBox,
  FaSwimmingPool,
  FaDumbbell,
  FaCamera,
  FaUserShield,
  FaFileContract,
  FaChartBar,
  FaBalanceScale,
  FaFileAlt,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';

const CheckboxTile = ({ icon, label, checked, onChange, description }) => (
  <div 
    className={`checkbox-tile ${checked ? 'selected' : ''}`}
    onClick={() => onChange(!checked)}
  >
    <div className="checkbox-tile-icon">{icon}</div>
    <div className="checkbox-tile-content">
      <div className="checkbox-tile-label">{label}</div>
      {description && <div className="checkbox-tile-desc">{description}</div>}
    </div>
    {checked && <FaCheckCircle className="checkbox-tile-check" />}
  </div>
);

const StepIndicator = ({ currentStep, totalSteps, stepTitles }) => (
  <div className="step-indicator">
    {stepTitles.map((title, index) => (
      <div key={index} className={`step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}>
        <div className="step-number">
          {index + 1 < currentStep ? <FaCheckCircle /> : index + 1}
        </div>
        <div className="step-title">{title}</div>
        {index < totalSteps - 1 && <div className="step-connector" />}
      </div>
    ))}
  </div>
);

const TabDodatkowe = ({ value, updateField, onNext, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Media', field: 'media' },
    { id: 2, title: 'Wyposażenie', field: 'wyposazenie' },
    { id: 3, title: 'Udogodnienia', field: 'udogodnienia' },
    { id: 4, title: 'Informacje prawne', field: 'informacjePrawne' }
  ];

  // Opcje dla mediów
  const mediaOptions = [
    {
      field: 'kanalizacja',
      label: 'Kanalizacja',
      icon: <FaShower />,
      description: 'Podłączenie do kanalizacji'
    },
    {
      field: 'prad',
      label: 'Prąd',
      icon: <FaBolt />,
      description: 'Dostęp do energii elektrycznej'
    },
    {
      field: 'gaz',
      label: 'Gaz',
      icon: <FaFire />,
      description: 'Instalacja gazowa'
    },
    {
      field: 'klimatyzacja',
      label: 'Klimatyzacja',
      icon: <FaSnowflake />,
      description: 'Klimatyzacja w pomieszczeniach'
    },
    {
      field: 'alarm',
      label: 'Alarm',
      icon: <FaBell />,
      description: 'System alarmowy'
    },
    {
      field: 'domofon',
      label: 'Domofon',
      icon: <FaDoorClosed />,
      description: 'System domofonowy'
    },
    {
      field: 'internet',
      label: 'Internet',
      icon: <FaWifi />,
      description: 'Dostęp do internetu'
    }
  ];

  // Opcje dla wyposażenia
  const wyposazenieOptions = [
    {
      field: 'meble',
      label: 'Meble',
      icon: <FaCouch />,
      description: 'Umeblowane pomieszczenia'
    },
    {
      field: 'rolety',
      label: 'Rolety',
      icon: <FaStore />,
      description: 'Rolety antywłamaniowe'
    },
    {
      field: 'systemAlarmowy',
      label: 'System alarmowy',
      icon: <FaShieldAlt />,
      description: 'Zabezpieczenie alarmowe'
    },
    {
      field: 'monitoring',
      label: 'Monitoring',
      icon: <FaVideo />,
      description: 'Monitoring wizyjny'
    }
  ];

  // Opcje dla udogodnień
  const udogodnieniaOptions = [
    {
      field: 'balkon',
      label: 'Balkon',
      icon: <FaHome />,
      description: 'Balkon lub loggia'
    },
    {
      field: 'taras',
      label: 'Taras',
      icon: <FaUmbrellaBeach />,
      description: 'Taras rekreacyjny'
    },
    {
      field: 'garaz',
      label: 'Garaż',
      icon: <FaCar />,
      description: 'Garaż samochodowy'
    },
    {
      field: 'parking',
      label: 'Parking',
      icon: <FaParking />,
      description: 'Miejsce parkingowe'
    },
    {
      field: 'piwnica',
      label: 'Piwnica',
      icon: <FaMountain />,
      description: 'Pomieszczenie piwniczne'
    },
    {
      field: 'ogrod',
      label: 'Ogród',
      icon: <FaTree />,
      description: 'Ogród przydomowy'
    },
    {
      field: 'komorka',
      label: 'Komórka',
      icon: <FaBox />,
      description: 'Komórka lokatorska'
    },
    {
      field: 'basen',
      label: 'Basen',
      icon: <FaSwimmingPool />,
      description: 'Basen prywatny'
    },
    {
      field: 'silownia',
      label: 'Siłownia',
      icon: <FaDumbbell />,
      description: 'Dostęp do siłowni'
    },
    {
      field: 'monitoringOsiedla',
      label: 'Monitoring osiedla',
      icon: <FaCamera />,
      description: 'Monitoring wspólnoty'
    },
    {
      field: 'ochrona',
      label: 'Ochrona',
      icon: <FaUserShield />,
      description: 'Ochrona terenu'
    }
  ];

  // Opcje dla ogrzewania
  const ogrzewanieOptions = [
    { value: 'gazowe', label: 'Gazowe', icon: <FaFire /> },
    { value: 'elektryczne', label: 'Elektryczne', icon: <FaBolt /> },
    { value: 'miejska', label: 'Miejska', icon: <FaThermometerHalf /> },
    { value: 'olejowe', label: 'Olejowe', icon: <FaTint /> },
    { value: 'pompa_ciepla', label: 'Pompa ciepła', icon: <FaWind /> },
    { value: 'kominek', label: 'Kominek', icon: <FaFire /> }
  ];

  // Opcje dla ciepłej wody
  const cieplaWodaOptions = [
    { value: 'gaz', label: 'Gaz', icon: <FaFire /> },
    { value: 'prad', label: 'Prąd', icon: <FaBolt /> },
    { value: 'miejska', label: 'Miejska', icon: <FaTint /> },
    { value: 'pompa_ciepla', label: 'Pompa ciepła', icon: <FaWind /> }
  ];

  // Opcje dla wentylacji
  const wentylacjaOptions = [
    { value: 'grawitacyjna', label: 'Grawitacyjna', icon: <FaWind /> },
    { value: 'mechaniczna', label: 'Mechaniczna', icon: <FaWind /> },
    { value: 'rekuperacja', label: 'Rekuperacja', icon: <FaWind /> }
  ];

  // Opcje dla formy własności
  const formaWlasnosciOptions = [
    { value: 'wlasnosc', label: 'Własność', icon: <FaFileContract /> },
    { value: 'spoldzielcze_wlasnosciowe', label: 'Spółdzielcze własnościowe', icon: <FaFileContract /> },
    { value: 'uzytkowanie_wieczyste', label: 'Użytkowanie wieczyste', icon: <FaFileContract /> },
    { value: 'inne', label: 'Inne', icon: <FaFileContract /> }
  ];

  // Opcje dla klasy energetycznej
  const klasaEnergetycznaOptions = [
    { value: 'A+', label: 'A+', icon: <FaChartBar /> },
    { value: 'A', label: 'A', icon: <FaChartBar /> },
    { value: 'B', label: 'B', icon: <FaChartBar /> },
    { value: 'C', label: 'C', icon: <FaChartBar /> },
    { value: 'D', label: 'D', icon: <FaChartBar /> },
    { value: 'E', label: 'E', icon: <FaChartBar /> },
    { value: 'F', label: 'F', icon: <FaChartBar /> },
    { value: 'G', label: 'G', icon: <FaChartBar /> }
  ];

  const handleCheckboxChange = (section, field, checked) => {
    updateField(`${section}.${field}`, checked);
  };

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return true; // Media są opcjonalne
      case 2:
        return true; // Wyposażenie jest opcjonalne
      case 3:
        return true; // Udogodnienia są opcjonalne
      case 4:
        return value.informacjePrawne.formaWlasnosci; // Forma własności jest wymagana
      default:
        return false;
    }
  };

  return (
    <div className="tab-content">

      <div className="step-content">
        {/* Krok 1: Media i instalacje */}
        {currentStep === 1 && (
          <div className="step-panel">
            <h3 className="section-title" style={{fontSize: '35px'}}>Media i instalacje</h3>
            <p className="step-description">
              Wybierz dostępne media i instalacje w nieruchomości
            </p>

            <h4 className="sub-title">Podstawowe media</h4>
            <div className="options-grid-3">
              {mediaOptions.map((option) => (
                <CheckboxTile
                  key={option.field}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  checked={value.media[option.field]}
                  onChange={(checked) => handleCheckboxChange('media', option.field, checked)}
                />
              ))}
            </div>

            <h4 className="sub-title"  style={{fontSize: '35px'}}>Systemy</h4>
            <div className="options-grid-3">
              <div className="select-tile-group">
                <div className="field-label">Ogrzewanie</div>
                <select 
                  className="input" 
                  value={value.media.ogrzewanie}
                  onChange={(e) => updateField('media.ogrzewanie', e.target.value)}
                >
                  <option value="">Wybierz rodzaj ogrzewania</option>
                  {ogrzewanieOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="select-tile-group">
                <div className="field-label">Ciepła woda</div>
                <select 
                  className="input" 
                  value={value.media.cieplaWoda}
                  onChange={(e) => updateField('media.cieplaWoda', e.target.value)}
                >
                  <option value="">Wybierz źródło ciepłej wody</option>
                  {cieplaWodaOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="select-tile-group">
                <div className="field-label">Wentylacja</div>
                <select 
                  className="input" 
                  value={value.media.wentylacja}
                  onChange={(e) => updateField('media.wentylacja', e.target.value)}
                >
                  <option value="">Wybierz rodzaj wentylacji</option>
                  {wentylacjaOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn ghost" onClick={onBack}>
                <FaArrowLeft /> Wstecz
              </button>
              <button 
                className="btn next-btn"
                onClick={() => setCurrentStep(2)}
              >
                Dalej <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Krok 2: Wyposażenie */}
        {currentStep === 2 && (
          <div className="step-panel">
            <h3 className="section-title"  style={{fontSize: '35px'}}>Wyposażenie nieruchomości</h3>
            <p className="step-description">
              Określ standard wykończenia i wyposażenia
            </p>

            <h4 className="sub-title">Elementy wyposażenia</h4>
            <div className="options-grid-3">
              {wyposazenieOptions.map((option) => (
                <CheckboxTile
                  key={option.field}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  checked={value.wyposazenie[option.field]}
                  onChange={(checked) => handleCheckboxChange('wyposazenie', option.field, checked)}
                />
              ))}
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

            <div className="step-actions">
              <button className="btn ghost" onClick={() => setCurrentStep(1)}>
                <FaArrowLeft /> Wstecz
              </button>
              <button 
                className="btn next-btn"
                onClick={() => setCurrentStep(3)}
              >
                Dalej <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Krok 3: Udogodnienia */}
        {currentStep === 3 && (
          <div className="step-panel">
            <h3 className="section-title"  style={{fontSize: '35px'}}>Udogodnienia</h3>
            <p className="step-description">
              Wybierz dodatkowe udogodnienia dostępne w nieruchomości
            </p>

            <div className="options-grid-3">
              {udogodnieniaOptions.map((option) => (
                <CheckboxTile
                  key={option.field}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                  checked={value.udogodnienia[option.field]}
                  onChange={(checked) => handleCheckboxChange('udogodnienia', option.field, checked)}
                />
              ))}
            </div>

            <div className="step-actions">
              <button className="btn ghost" onClick={() => setCurrentStep(2)}>
                <FaArrowLeft /> Wstecz
              </button>
              <button 
                className="btn next-btn"
                onClick={() => setCurrentStep(4)}
              >
                Dalej <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* Krok 4: Informacje prawne */}
        {currentStep === 4 && (
          <div className="step-panel">
            <h3 className="section-title"  style={{fontSize: '35px'}}>Informacje prawne</h3>
            <p className="step-description">
              Uzupełnij informacje prawne i charakterystykę energetyczną
            </p>

            <div className="options-grid-2">
              <div className="select-tile-group">
                <div className="field-label">Forma własności</div>
                <select 
                  className="input" 
                  value={value.informacjePrawne.formaWlasnosci}
                  onChange={(e) => updateField('informacjePrawne.formaWlasnosci', e.target.value)}
                >
                  <option value="">Wybierz formę własności</option>
                  {formaWlasnosciOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div className="select-tile-group">
                <div className="field-label">Klasa energetyczna</div>
                <select 
                  className="input" 
                  value={value.informacjePrawne.charakterystykaEnergetyczna.klasa}
                  onChange={(e) => updateField('informacjePrawne.charakterystykaEnergetyczna.klasa', e.target.value)}
                >
                  <option value="">Wybierz klasę energetyczną</option>
                  {klasaEnergetycznaOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="options-grid-2">
              <CheckboxTile
                icon={<FaBalanceScale />}
                label="Hipoteka"
                description="Nieruchomość obciążona hipoteką"
                checked={value.informacjePrawne.hipoteka}
                onChange={(checked) => handleCheckboxChange('informacjePrawne', 'hipoteka', checked)}
              />

              <CheckboxTile
                icon={<FaFileAlt />}
                label="Pozwolenie na budowę"
                description="Posiada ważne pozwolenie"
                checked={value.informacjePrawne.pozwolenieNaBudowe}
                onChange={(checked) => handleCheckboxChange('informacjePrawne', 'pozwolenieNaBudowe', checked)}
              />
            </div>

            <div className="grid-2">
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
                <div className="field-label">Księga wieczysta</div>
                <input 
                  className="input" 
                  value={value.informacjePrawne.ksiegWieczysty} 
                  onChange={(e) => updateField('informacjePrawne.ksiegWieczysty', e.target.value)} 
                  placeholder="Numer księgi wieczystej"
                />
              </label>
            </div>

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

            <div className="step-actions">
              <button className="btn ghost" onClick={() => setCurrentStep(3)}>
                <FaArrowLeft /> Wstecz
              </button>
              <button 
                className="btn next-btn"
                onClick={onNext}
                disabled={!isStepComplete(4)}
              >
                Dalej <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabDodatkowe;