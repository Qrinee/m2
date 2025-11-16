import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './VisualConfigurator.css'
import { HOUSE_CONFIGS } from '../../utils/houseConfigs'
import HouseVisualization from '../HouseVisualization/HouseVisualization.jsx'
import ConfigPanel from '../ConfigPanel/ConfigPanel.jsx'

export default function VisualConfigurator({ onVisualPriceChange }) {
  const { id } = useParams()
  const [houseConfig, setHouseConfig] = useState(null)
  const [selections, setSelections] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [totalVisualPrice, setTotalVisualPrice] = useState(0)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const config = HOUSE_CONFIGS[id] || HOUSE_CONFIGS.default
    setHouseConfig(config)
    
    const initialSelections = {}
    Object.keys(config.options).forEach(section => {
      if (section === 'typDachu') {
        // Dla typu dachu ustaw pierwszą dostępną opcję
        initialSelections[section] = config.options[section][0]?.id || 0
      } else if (section === 'kolorDachu') {
        // Dla koloru dachu ustaw pierwszy kolor dla domyślnego typu dachu
        const defaultRoofType = config.options.typDachu?.[0]?.id || 0
        initialSelections[section] = config.options.kolorDachu?.[defaultRoofType]?.[0]?.id || 0
      } else {
        initialSelections[section] = config.options[section][0]?.id || 0
      }
    })
    setSelections(initialSelections)
  }, [id])

  // Funkcja walidująca wybrane opcje
  const validateSelections = (currentSelections) => {
    const errors = {}
    
    // Lista wymaganych kategorii
    const requiredCategories = ['tynk', 'typDachu', 'kolorDachu', 'kolorOkien', 'drzwi']
    
    requiredCategories.forEach(category => {
      if (!currentSelections[category] && currentSelections[category] !== 0) {
        errors[category] = `Wybierz ${getCategoryDisplayName(category)}`
      }
    })
    
    return errors
  }

  // Funkcja pomocnicza do uzyskania przyjaznych nazw kategorii
  const getCategoryDisplayName = (category) => {
    const names = {
      'tynk': 'tynk',
      'typDachu': 'typ dachu',
      'kolorDachu': 'kolor dachu', 
      'kolorOkien': 'kolor okien',
      'drzwi': 'drzwi',
      'rolety': 'rolety'
    }
    return names[category] || category
  }

  useEffect(() => {
    if (!houseConfig) return

    // Waliduj przy każdej zmianie selekcji
    const errors = validateSelections(selections)
    setValidationErrors(errors)

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
    
    // Przekaż cenę, wybrane opcje i status walidacji do komponentu nadrzędnego
    if (onVisualPriceChange) {
      onVisualPriceChange(total, selections, errors)
    }
  }, [selections, houseConfig, onVisualPriceChange])

  const handleSelectionChange = (section, value) => {
    setSelections(prev => {
      const newSelections = {
        ...prev,
        [section]: value
      }
      
      // Automatyczna aktualizacja zależnych opcji
      if (section === 'typDachu') {
        // Po zmianie typu dachu, zresetuj kolor dachu do pierwszej dostępnej opcji
        const newRoofType = value
        const roofColorOptions = houseConfig.options.kolorDachu?.[newRoofType]
        if (roofColorOptions && roofColorOptions.length > 0) {
          newSelections.kolorDachu = roofColorOptions[0].id
        }
      } else if (section === 'tynk') {
        // Po zmianie tynku, zresetuj kolor do pierwszej dostępnej opcji
        const newTynk = value
        const colorOptions = houseConfig.options.kolor?.[newTynk]
        if (colorOptions && colorOptions.length > 0) {
          newSelections.kolor = colorOptions[0].id
        }
      }
      
      return newSelections
    })
  }

  // Funkcja sprawdzająca czy konfiguracja jest kompletna
  const isConfigurationValid = () => {
    return Object.keys(validationErrors).length === 0
  }

  // Funkcja do uzyskania statusu walidacji dla konkretnej kategorii
  const getCategoryValidationStatus = (category) => {
    return {
      isValid: !validationErrors[category],
      errorMessage: validationErrors[category]
    }
  }

  if (!houseConfig) {
    return <div className="loading">Ładowanie konfiguratora...</div>
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
          <div className="base-image"></div>
          
          {/* Wyświetlanie błędów walidacji */}
          {!isConfigurationValid() && (
            <div className="validation-warning">
              <h4>⚠️ Uzupełnij wymagane opcje:</h4>
              <ul>
                {Object.entries(validationErrors).map(([category, error]) => (
                  <li key={category}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <ConfigPanel
          houseConfig={houseConfig}
          selections={selections}
          onSelectionChange={handleSelectionChange}
          validationStatus={getCategoryValidationStatus}
        />
      </div>
    )
  }

  const handleImagesLoad = () => {
    setImagesLoaded(true)
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
        opacity: imagesLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <div className="sticky-visualization">
          <HouseVisualization 
            houseConfig={houseConfig}
            selections={selections}
            onImagesLoad={handleImagesLoad}
          />
          
          {/* Wyświetlanie błędów walidacji */}
          {!isConfigurationValid() && (
            <div className="validation-warning">
              <h4>⚠️ Uzupełnij wymagane opcje:</h4>
              <ul>
                {Object.entries(validationErrors).map(([category, error]) => (
                  <li key={category}>{error}</li>
                ))}
              </ul>
            </div>
          )}
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