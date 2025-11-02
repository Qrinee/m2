import React from 'react';
import { 
  FaHome, 
  FaBuilding, 
  FaStore, 
  FaTree, 
  FaWarehouse, 
  FaBriefcase, 
  FaShoppingCart,
  FaQuestion,
  FaMoneyBillWave,
  FaHandHoldingUsd,
  FaCity,
  FaHistory
} from 'react-icons/fa';

const OptionTile = ({ icon, label, selected, onClick, description }) => (
  <div 
    className={`option-tile ${selected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <div className="option-tile-icon">{icon}</div>
    <div className="option-tile-content">
      <div className="option-tile-label">{label}</div>
      {description && <div className="option-tile-desc">{description}</div>}
    </div>
  </div>
);

const TabPodstawowe = ({ value, updateField, onNext }) => {
  // Opcje dla typu oferty
  const typOfertyOptions = [
    {
      value: 'sprzedaz',
      label: 'Sprzedaż',
      icon: <FaMoneyBillWave />,
      description: 'Oferta sprzedaży nieruchomości'
    },
    {
      value: 'wynajem',
      label: 'Wynajem',
      icon: <FaHandHoldingUsd />,
      description: 'Oferta wynajmu nieruchomości'
    }
  ];

  // Opcje dla rynku
  const rynekOptions = [
    {
      value: 'pierwotny',
      label: 'Pierwotny',
      icon: <FaCity />,
      description: 'Nowe budownictwo, pierwszy właściciel'
    },
    {
      value: 'wtorny',
      label: 'Wtórny',
      icon: <FaHistory />,
      description: 'Nieruchomość używana'
    }
  ];

  // Opcje dla typu nieruchomości
  const typNieruchomosciOptions = [
    {
      value: 'mieszkanie',
      label: 'Mieszkanie',
      icon: <FaHome />,
      description: 'Mieszkanie w bloku lub kamienicy'
    },
    {
      value: 'dom',
      label: 'Dom',
      icon: <FaBuilding />,
      description: 'Dom wolnostojący, bliźniak lub szeregowiec'
    },
    {
      value: 'lokal_uzytkowy',
      label: 'Lokal użytkowy',
      icon: <FaStore />,
      description: 'Sklep, restauracja, usługi'
    },
    {
      value: 'dzialka',
      label: 'Działka',
      icon: <FaTree />,
      description: 'Działka budowlana lub inwestycyjna'
    },
    {
      value: 'hala_magazyn',
      label: 'Hala/Magazyn',
      icon: <FaWarehouse />,
      description: 'Powierzchnie magazynowe lub przemysłowe'
    },
    {
      value: 'biuro',
      label: 'Biuro',
      icon: <FaBriefcase />,
      description: 'Powierzchnie biurowe'
    },
    {
      value: 'komercyjne',
      label: 'Komercyjne',
      icon: <FaShoppingCart />,
      description: 'Centra handlowe, galerie'
    },
    {
      value: 'inne',
      label: 'Inne',
      icon: <FaQuestion />,
      description: 'Inny typ nieruchomości'
    }
  ];

  return (
    <div className="tab-content">
      <h3 className="section-title" style={{fontSize: '35px', marginBottom: '40px'}}>Dodaj nieruchomość</h3>

      <label className="field">
        <div className="field-label">*Tytuł ogłoszenia (wymagane)</div>
        <input 
          className="input" 
          required 
          style={{width: '100%'}}
          value={value.tytul} 
          onChange={(e) => updateField('tytul', e.target.value)} 
          placeholder="np. Przestronne 3-pokojowe mieszkanie w centrum"
        />
      </label>

      <label className="field">
        <div className="field-label" style={{marginBottom: '10px'}}>*Opis nieruchomości (wymagane)</div>
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
      <div className="options-grid-2">
        {typOfertyOptions.map((option) => (
          <OptionTile
            key={option.value}
            icon={option.icon}
            label={option.label}
            description={option.description}
            selected={value.rodzajOferty.typ === option.value}
            onClick={() => updateField('rodzajOferty.typ', option.value)}
          />
        ))}
      </div>

      <h4 className="sub-title">Rynek</h4>
      <div className="options-grid-2">
        {rynekOptions.map((option) => (
          <OptionTile
            key={option.value}
            icon={option.icon}
            label={option.label}
            description={option.description}
            selected={value.rodzajOferty.rynek === option.value}
            onClick={() => updateField('rodzajOferty.rynek', option.value)}
          />
        ))}
      </div>

      <h4 className="sub-title">Typ nieruchomości</h4>
      <div className="options-grid-3">
        {typNieruchomosciOptions.map((option) => (
          <OptionTile
            key={option.value}
            icon={option.icon}
            label={option.label}
            description={option.description}
            selected={value.typNieruchomosci === option.value}
            onClick={() => updateField('typNieruchomosci', option.value)}
          />
        ))}
      </div>

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