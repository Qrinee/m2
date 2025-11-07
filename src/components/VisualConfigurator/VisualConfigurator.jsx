import React, { useState } from 'react'
import './VisualConfigurator.css'

// Asset imports organized by category
const ASSETS = {
  base: {
    vis: require('../../assets/konfigurator/stock.png'),
    light: require('../../assets/light.png'),
    dach: require('../../assets/konfigurator/dach.png'),
    rolety: require('../../assets/konfigurator/rolety/rolety.png')
  },
  tynk: {
    blachanarabek: require('../../assets/konfigurator/tynk/blachanarabek.png'),
    tynkiblacha: require('../../assets/konfigurator/tynk/tynkiblacha.png'),
    tynkmineralny: require('../../assets/konfigurator/tynk/tynkmineralny.png'),
    tynkantracyt: require('../../assets/konfigurator/tynk/antracytelewacja.png'),
    lamele: require('../../assets/konfigurator/tynk/lamele.png'),
    lameleciemne: require('../../assets/konfigurator/tynk/lamele-ciemne.png')
  },
  okna: {
    antracyt: require('../../assets/konfigurator/okna/antracyt.png'),
    biale: require('../../assets/konfigurator/okna/biale.png'),
    dab: require('../../assets/konfigurator/okna/dab.png'),
    orzech: require('../../assets/konfigurator/okna/orzech.png'),
    szary: require('../../assets/konfigurator/okna/szary.png')
  },
  drzwi: {
    wlasne: require('../../assets/konfigurator/drzwi/dzrwi0.png'),
    drzwi11S3: require('../../assets/konfigurator/drzwi/dzrwi11s3.png'),
    drzwiP9: require('../../assets/konfigurator/drzwi/dzrwip9.png'),
    drzwi14A: require('../../assets/konfigurator/drzwi/dzrwi14a.png')
  }
}

// Configuration options
const CONFIG_OPTIONS = {
  tynk: [
    { id: 0, label: 'Elewacja surowa' },
    { id: 1, label: 'Blacha na rąbek' },
    { id: 2, label: 'Tynk + blacha' },
    { id: 3, label: 'Tynk mineralny' },
    { id: 4, label: 'Lamele' }
  ],
  kolor: {
    mineralny: [
      { id: 3, label: 'Biała' },
      { id: 5, label: 'Antracyt' }
    ],
    lamele: [
      { id: 4, label: 'Jasne' },
      { id: 6, label: 'Ciemne' }
    ]
  },
  rolety: [
    { id: 0, label: 'Brak' },
    { id: 1, label: 'Standardowe' }
  ],
  okna: [
    { id: 1, label: 'Antracyt' },
    { id: 2, label: 'Szary' },
    { id: 3, label: 'Dąb' },
    { id: 4, label: 'Orzech' },
    { id: 5, label: 'Biały' }
  ],
  drzwi: [
    { id: 1, label: 'Model 11S3' },
    { id: 2, label: 'Model P9' },
    { id: 3, label: 'Model 14A' },
    { id: 4, label: 'Własne' }
  ]
}

export default function VisualConfigurator() {
  const [selections, setSelections] = useState({
    tynk: 0,
    rolety: 0,
    okna: 0,
    drzwi: 0
  })

  const handleSelection = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }))
  }

  const { tynk, rolety, okna, drzwi } = selections

  // Render conditionally based on selections
  const renderVisualizationElements = () => {
    const elements = []

    // Always render light and roof
    elements.push(
      <div key="light" className='element-pickable rolety'>
        <img src={ASSETS.base.light} alt="Light" />
      </div>
    )
    elements.push(
      <div key="dach" className='element-pickable rolety'>
        <img src={ASSETS.base.dach} alt="Dach" />
      </div>
    )

    // Roller blinds
    if (rolety === 1) {
      elements.push(
        <div key="rolety" className='element-pickable rolety'>
          <img src={ASSETS.base.rolety} alt="Rolety" />
        </div>
      )
    }

    // Windows
    if (okna >= 1 && okna <= 5) {
      const windowAssets = [
        ASSETS.okna.antracyt,
        ASSETS.okna.szary,
        ASSETS.okna.dab,
        ASSETS.okna.orzech,
        ASSETS.okna.biale
      ]
      elements.push(
        <div key="okna" className='element-pickable'>
          <img src={windowAssets[okna - 1]} alt={`Okna ${CONFIG_OPTIONS.okna[okna - 1].label}`} />
        </div>
      )
    }

    // Doors
    if (drzwi >= 1 && drzwi <= 4) {
      const doorAssets = [
        ASSETS.drzwi.drzwi11S3,
        ASSETS.drzwi.drzwiP9,
        ASSETS.drzwi.drzwi14A,
        ASSETS.drzwi.wlasne
      ]
      elements.push(
        <div key="drzwi" className='element-pickable'>
          <img src={doorAssets[drzwi - 1]} alt={`Drzwi ${CONFIG_OPTIONS.drzwi[drzwi - 1].label}`} />
        </div>
      )
    }

    // Plaster/Finish
    if (tynk >= 1 && tynk <= 6) {
      const plasterAssets = {
        1: ASSETS.tynk.blachanarabek,
        2: ASSETS.tynk.tynkiblacha,
        3: ASSETS.tynk.tynkmineralny,
        4: ASSETS.tynk.lamele,
        5: ASSETS.tynk.tynkantracyt,
        6: ASSETS.tynk.lameleciemne
      }
      if (plasterAssets[tynk]) {
        elements.push(
          <div key="tynk" className='element-pickable'>
            <img src={plasterAssets[tynk]} alt={`Tynk ${tynk}`} />
          </div>
        )
      }
    }

    return elements
  }

  // Configuration section component
  const ConfigSection = ({ title, options, selected, onSelect, category }) => (
    <div className="config-section">
      <h3>{title}</h3>
      <div className="option-grid">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-tile ${selected === option.id ? 'active' : ''}`}
            onClick={() => onSelect(category, option.id)}
          >
            <div className="tile-preview"></div>
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="visual-configurator-page">
      {/* Visualization Section */}
      <div className="sticky-visualization">
        <div className='vis-overlay'>
          {renderVisualizationElements()}
        </div>
        <img src={ASSETS.base.vis} alt="Visual Configurator" className="base-image" />
      </div>

      <div className="config-container">
        <div className="config-content">
          <ConfigSection
            title="Tynk"
            options={CONFIG_OPTIONS.tynk}
            selected={tynk}
            onSelect={handleSelection}
            category="tynk"
          />

          {(tynk === 3 || tynk === 5) && (
            <ConfigSection
              title="Kolor"
              options={CONFIG_OPTIONS.kolor.mineralny}
              selected={tynk}
              onSelect={handleSelection}
              category="tynk"
            />
          )}
          
          {(tynk === 4 || tynk === 6) && (
            <ConfigSection
              title="Kolor"
              options={CONFIG_OPTIONS.kolor.lamele}
              selected={tynk}
              onSelect={handleSelection}
              category="tynk"
            />
          )}


          <ConfigSection
            title="Rolety"
            options={CONFIG_OPTIONS.rolety}
            selected={rolety}
            onSelect={handleSelection}
            category="rolety"
          />

          <ConfigSection
            title="Okna"
            options={CONFIG_OPTIONS.okna}
            selected={okna}
            onSelect={handleSelection}
            category="okna"
          />

          <ConfigSection
            title="Drzwi"
            options={CONFIG_OPTIONS.drzwi}
            selected={drzwi}
            onSelect={handleSelection}
            category="drzwi"
          />

          <div className="config-end">
            <p>Koniec konfiguracji</p>
          </div>
        </div>
      </div>
    </div>
  )
}