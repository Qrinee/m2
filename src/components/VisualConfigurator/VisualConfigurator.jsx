import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './VisualConfigurator.css'
import { HOUSE_CONFIGS } from '../../utils/houseConfigs'
import HouseVisualization from '../HouseVisualization/HouseVisualization.jsx'
import ConfigPanel from '../ConfigPanel/ConfigPanel.jsx'

export default function VisualConfigurator() {
  const { id } = useParams()
  const [houseConfig, setHouseConfig] = useState(null)
  const [selections, setSelections] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [imagesLoaded, setImagesLoaded] = useState(false)

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
      initialSelections[section] = config.options[section][0]?.id || 0
    })
    setSelections(initialSelections)
  }, [id])

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
          <img 
            src={houseConfig.baseImage} 
            alt="Visual Configurator" 
            className="base-image" 
          />
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
        opacity: imagesLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
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