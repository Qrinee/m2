import React, { useState } from 'react'
import './VisualConfigurator.css'

// Import base images
import vis from '../../assets/konfigurator/stock.png'
import light from '../../assets/light.png'
import dach from '../../assets/konfigurator/dach.png'
import roletyImg from '../../assets/konfigurator/rolety/rolety.png'

// Import tynk images
import blachanarabek from '../../assets/konfigurator/tynk/blachanarabek.png'
import tynkiblacha from '../../assets/konfigurator/tynk/tynkiblacha.png'
import tynkmineralny from '../../assets/konfigurator/tynk/tynkmineralny.png'
import lamele from '../../assets/konfigurator/tynk/lamele.png'
import tynkantracyt from '../../assets/konfigurator/tynk/antracytelewacja.png'
import lameleciemne from '../../assets/konfigurator/tynk/lamele-ciemne.png'

// Import okna images
import oknoAntracyt from '../../assets/konfigurator/okna/antracyt.png'
import oknoSzary from '../../assets/konfigurator/okna/szary.png'
import oknoDab from '../../assets/konfigurator/okna/dab.png'
import oknoOrzech from '../../assets/konfigurator/okna/orzech.png'
import oknoBiale from '../../assets/konfigurator/okna/biale.png'

// Import drzwi images
import wlasne from '../../assets/konfigurator/drzwi/dzrwi0.png'
import drzwi11S3 from '../../assets/konfigurator/drzwi/dzrwi11s3.png'
import drzwiP9 from '../../assets/konfigurator/drzwi/dzrwip9.png'
import drzwi14A from '../../assets/konfigurator/drzwi/dzrwi14a.png'

// Import thumbnails
import stockthumb from '../../assets/konfigurator/thumbnails/stock.jpg'
import blachanarabekthumb from '../../assets/konfigurator/thumbnails/blachanarabek.jpg'
import tynkiblachathumb from '../../assets/konfigurator/thumbnails/tynkiblacha.jpg'
import tynkmineralnythumb from '../../assets/konfigurator/thumbnails/tynkmineralny.jpg'
import lamelethumb from '../../assets/konfigurator/thumbnails/lamele.png'
import ciemnelamelethumb from '../../assets/konfigurator/thumbnails/Bez nazwy-2.png'
import antracytthumb from '../../assets/konfigurator/thumbnails/antracyt.jpg'
import bialythumb from '../../assets/konfigurator/thumbnails/bialy.jpg'

// Import rolety thumbnails
import roletySzara from '../../assets/konfigurator/thumbnails/drutex_rolety_szare_62_t.jpg'
import roletyBiala from '../../assets/konfigurator/thumbnails/drutex_rolety_bialy_2_t.jpg'
import roletyCzarna from '../../assets/konfigurator/thumbnails/drutex_rolety_antracyt_23_t.jpg'
import roletyBrazowa from '../../assets/konfigurator/thumbnails/drutex_rolety_orzech_28_t.jpg'

// Configuration data - łatwe do rozszerzania
const CONFIG_OPTIONS = {
  tynk: [
    { id: 0, name: 'Elewacja surowa', thumb: stockthumb, image: null },
    { id: 1, name: 'Blacha na rąbek', thumb: blachanarabekthumb, image: blachanarabek },
    { id: 2, name: 'Tynk + blacha', thumb: tynkiblachathumb, image: tynkiblacha },
    { id: 3, name: 'Tynk mineralny', thumb: tynkmineralnythumb, image: tynkmineralny, hasColors: true },
    { id: 4, name: 'Lamele', thumb: lamelethumb, image: lamele, hasColors: true },
    { id: 5, name: 'Antracyt', thumb: antracytthumb, image: tynkantracyt },
    { id: 6, name: 'Lamele ciemne', thumb: ciemnelamelethumb, image: lameleciemne }
  ],
  
  kolor: {
    3: [ // Tynk mineralny - kolory
      { id: 3, name: 'Biała', thumb: bialythumb },
      { id: 5, name: 'Antracyt', thumb: antracytthumb }
    ],
    4: [ // Lamele - kolory
      { id: 4, name: 'Jasne', thumb: lamelethumb },
      { id: 6, name: 'Ciemne', thumb: ciemnelamelethumb }
    ]
  },

  rolety: [
    { id: 1, name: 'Szare', thumb: roletySzara, image: roletyImg },
    { id: 2, name: 'Białe', thumb: roletyBiala, image: roletyImg },
    { id: 3, name: 'Czarne', thumb: roletyCzarna, image: roletyImg },
    { id: 4, name: 'Brązowe', thumb: roletyBrazowa, image: roletyImg }
  ],

  okna: [
    { id: 1, name: 'Antracyt', image: oknoAntracyt },
    { id: 2, name: 'Szary', image: oknoSzary },
    { id: 3, name: 'Dąb', image: oknoDab },
    { id: 4, name: 'Orzech', image: oknoOrzech },
    { id: 5, name: 'Biały', image: oknoBiale }
  ],

  drzwi: [
    { id: 1, name: 'Model 11S3', image: drzwi11S3 },
    { id: 2, name: 'Model P9', image: drzwiP9 },
    { id: 3, name: 'Model 14A', image: drzwi14A },
    { id: 4, name: 'Własne', image: wlasne }
  ]
}

// Komponent dla pojedynczej sekcji konfiguracji
const ConfigSection = ({ title, options, activeId, onSelect, renderThumbnail }) => (
  <div className="config-section">
    <h3>{title}</h3>
    <div className="option-grid">
      {options.map((option) => (
        <div 
          key={option.id}
          className={`option-tile ${activeId === option.id ? 'active' : ''}`}
          onClick={() => onSelect(option.id)}
        >
          {renderThumbnail(option)}
          <span>{option.name}</span>
        </div>
      ))}
    </div>
  </div>
)

// Specjalny komponent dla sekcji rolet
const RoletySection = ({ roletyEnabled, roletyColor, onToggle, onColorSelect }) => {
  return (
    <div className="config-section">
      <h3>Rolety</h3>
      
      {/* Przełącznik włącz/wyłącz rolety */}
      <div className="option-grid">
        <div 
          className={`option-tile ${roletyEnabled ? 'active' : ''}`}
          onClick={onToggle}
        >
          <div className="tile-preview rolety-toggle">
            <div className={`rolety-indicator ${roletyEnabled ? 'enabled' : 'disabled'}`}>
              {roletyEnabled ? '✓' : '✕'}
            </div>
          </div>
          <span>{roletyEnabled ? 'Włączone' : 'Wyłączone'}</span>
        </div>
      </div>

      {/* Wybór koloru rolet - pokazuje się tylko gdy rolety są włączone */}
      {roletyEnabled && (
        <>
          <h4>Kolor rolet</h4>
          <div className="option-grid">
            {CONFIG_OPTIONS.rolety.map((option) => (
              <div 
                key={option.id}
                className={`option-tile ${roletyColor === option.id ? 'active' : ''}`}
                onClick={() => onColorSelect(option.id)}
              >
                <img className="tile-preview" src={option.thumb} alt={option.name} />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Komponent dla wizualizacji
const Visualization = ({ tynk, rolety, okna, drzwi }) => {
  const renderElement = (type, id) => {
    const option = CONFIG_OPTIONS[type]?.find(opt => opt.id === id);
    return option?.image && (
      <div className={`element-pickable ${type}`}>
        <img src={option.image} alt={option.name} />
      </div>
    );
  };

  return (
    <div className="vis-overlay">
      <div className='element-pickable rolety'>
        <img src={light} alt="Light" />
      </div>
      <div className='element-pickable rolety'>
        <img src={dach} alt="Dach" />
      </div>
      
      {rolety !== 0 && renderElement('rolety', rolety)}
      {okna !== 0 && renderElement('okna', okna)}
      {drzwi !== 0 && renderElement('drzwi', drzwi)}
      {tynk !== 0 && renderElement('tynk', tynk)}
    </div>
  );
};

export default function VisualConfigurator() {
    const [mainTynk, setMainTynk] = useState(0) // Główny wybór tynku (np. Lamele)
    const [colorTynk, setColorTynk] = useState(null) // Wybór koloru (np. Ciemne Lamele)
    const [roletyEnabled, setRoletyEnabled] = useState(false) // Czy rolety są włączone
    const [roletyColor, setRoletyColor] = useState(1) // Domyślny kolor rolet (Szare)
    const [okna, setOkna] = useState(0)
    const [drzwi, setDrzwi] = useState(0)

    // Aktualny wyświetlany tynk - preferuj kolor jeśli wybrany, w przeciwnym razie główny
    const currentTynk = colorTynk !== null ? colorTynk : mainTynk;

    // Aktualny stan rolet do wizualizacji
    const currentRolety = roletyEnabled ? roletyColor : 0;

    // Sprawdza czy pokazać sekcję kolorów
    const shouldShowColorSection = CONFIG_OPTIONS.tynk.find(t => t.id === mainTynk)?.hasColors;

    // Główne opcje tynku (bez wariantów kolorystycznych)
    const mainTynkOptions = CONFIG_OPTIONS.tynk.filter(opt => ![5, 6].includes(opt.id));

    // Obsługa wyboru głównego tynku
    const handleMainTynkSelect = (id) => {
        setMainTynk(id);
        // Resetuj wybór koloru gdy zmieniamy główny typ
        setColorTynk(null);
    }

    // Obsługa wyboru koloru
    const handleColorSelect = (id) => {
        setColorTynk(id);
    }

    // Obsługa przełączania rolet
    const handleRoletyToggle = () => {
        setRoletyEnabled(!roletyEnabled);
    }

    // Obsługa wyboru koloru rolet
    const handleRoletyColorSelect = (id) => {
        setRoletyColor(id);
    }

    return (
        <div className="visual-configurator-page">
            <div className="sticky-visualization">
                <Visualization 
                    tynk={currentTynk}
                    rolety={currentRolety}
                    okna={okna}
                    drzwi={drzwi}
                />
                <img src={vis} alt="Visual Configurator" className="base-image" />
            </div>

            <div className="config-container">
                <div className="config-content">
                    {/* Sekcja Tynk - główne typy */}
                    <ConfigSection
                        title="Tynk"
                        options={mainTynkOptions}
                        activeId={mainTynk}
                        onSelect={handleMainTynkSelect}
                        renderThumbnail={(option) => 
                            <img className="tile-preview" src={option.thumb} alt={option.name} />
                        }
                    />

                    {/* Sekcja Kolor - pokazuje się tylko dla określonych tynków */}
                    {shouldShowColorSection && (
                        <ConfigSection
                            title="Kolor"
                            options={CONFIG_OPTIONS.kolor[mainTynk]}
                            activeId={colorTynk !== null ? colorTynk : mainTynk}
                            onSelect={handleColorSelect}
                            renderThumbnail={(option) => 
                                option.thumb ? (
                                    <img className="tile-preview" src={option.thumb} alt={option.name} />
                                ) : (
                                    <div className="tile-preview" />
                                )
                            }
                        />
                    )}

                    {/* Sekcja Rolety - specjalny komponent */}
                    <RoletySection
                        roletyEnabled={roletyEnabled}
                        roletyColor={roletyColor}
                        onToggle={handleRoletyToggle}
                        onColorSelect={handleRoletyColorSelect}
                    />

                    {/* Sekcja Okna */}
                    <ConfigSection
                        title="Okna"
                        options={CONFIG_OPTIONS.okna}
                        activeId={okna}
                        onSelect={setOkna}
                        renderThumbnail={() => <div className="tile-preview" />}
                    />

                    {/* Sekcja Drzwi */}
                    <ConfigSection
                        title="Drzwi"
                        options={CONFIG_OPTIONS.drzwi}
                        activeId={drzwi}
                        onSelect={setDrzwi}
                        renderThumbnail={() => <div className="tile-preview" />}
                    />

                    <div className="config-end">
                        <p>Koniec konfiguracji</p>
                    </div>
                </div>
            </div>
        </div>
    )
}