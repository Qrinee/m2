import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import './VisualConfigurator.css'
import { HOUSE_CONFIGS } from '../../utils/houseConfigs'
import HouseVisualization from '../HouseVisualization/HouseVisualization.jsx'
import ConfigPanel from '../ConfigPanel/ConfigPanel.jsx'

export default function VisualConfigurator({onVisualPriceChange }) {
  const { id } = useParams()
  const [houseConfig, setHouseConfig] = useState(null)
  const [selections, setSelections] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [totalVisualPrice, setTotalVisualPrice] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

useLayoutEffect(() => {
  const config = HOUSE_CONFIGS[id] || HOUSE_CONFIGS.default
  setHouseConfig(config)
  
  const initialSelections = {}
  Object.keys(config.options).forEach(section => {
    if (section === 'typDachu') {
      initialSelections[section] = config.options[section][0]?.id || 0
    } else if (section === 'kolorDachu') {
      const defaultRoofType = config.options.typDachu?.[0]?.id || 0
      initialSelections[section] = config.options.kolorDachu?.[defaultRoofType]?.[0]?.id || 0
    } else if (section === 'kolorDrzwi') {
      // Dla koloru drzwi ustaw pierwszą opcję
      initialSelections[section] = config.options.kolorDrzwi[0]?.id || 0
    } else if (section === 'drzwi') {
      // Dla konkretnych drzwi ustaw pierwszy model z pierwszego koloru
      const firstColorId = config.options.kolorDrzwi[0]?.id || 0
      initialSelections[section] = config.options.drzwi[firstColorId]?.[0]?.id || 0
    } else {
      initialSelections[section] = config.options[section][0]?.id || 0
    }
  })
  setSelections(initialSelections)
}, [id])

  useEffect(() => {
    if (!houseConfig) return

    let total = 0
    Object.entries(selections).forEach(([section, selectedId]) => {
      const sectionOptions = houseConfig.options[section]
      if (Array.isArray(sectionOptions)) {
        const selectedOption = sectionOptions.find(opt => opt.id === selectedId)
        if (selectedOption && selectedOption.price) {
          total += selectedOption.price
        }
      } else if (typeof sectionOptions === 'object' && section === 'kolor') {
        // Obsługa kolorów (specjalna struktura)
        const mainTynk = selections.tynk
        const colorOptions = sectionOptions[mainTynk]
        if (colorOptions) {
          const selectedColor = colorOptions.find(opt => opt.id === selectedId)
          if (selectedColor && selectedColor.price) {
            total += selectedColor.price
          }
        }
      }
    })

    setTotalVisualPrice(total)
    
    // Przekaż cenę i wybrane opcje do komponentu nadrzędnego
    if (onVisualPriceChange) {
      onVisualPriceChange(total, selections)
    }
  }, [selections, houseConfig, onVisualPriceChange])

  if (!houseConfig) {
    return <div className="loading">Ładowanie konfiguratora...</div>
  }

  const handleSelectionChange = (section, value) => {
    setSelections(prev => ({
      ...prev,
      [section]: value
    }))
  }

  // Wersja desktop - oryginalny layout
  if (!isMobile) {
    return (
      <div className="visual-configurator-page">
        <div className="sticky-visualization">
          <HouseVisualization 
            houseConfig={houseConfig}
            selections={selections}
          />
          <div  
            className="base-image" 
          ></div>
        </div>

        <ConfigPanel
          houseConfig={houseConfig}
          selections={selections}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    )
  }
  
    const handleImagesLoad = () => {
    setImagesLoaded(true);
  };

  if (!houseConfig) {
    return <div className="loading">Ładowanie konfiguratora...</div>
  }

  return (
    <div className="visual-configurator-page">
      {!imagesLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner">Ładowanie konfiguratora...</div>
        </div>
      )}
      
      <div style={{ 
        width: '100%', 
        overflowX: 'hidden',
      }}>
        <div className="sticky-visualization">
          <HouseVisualization 
            houseConfig={houseConfig}
            selections={selections}
            onImagesLoad={handleImagesLoad}
          />
        </div>
      </div>
      
      <ConfigPanel
        houseConfig={houseConfig}
        selections={selections}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}