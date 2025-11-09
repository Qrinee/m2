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

  // Wersja mobile - nowy layout
  return (
    <div className="visual-configurator-page">
      {/* Wizualizacja na górze */}
      <div style={{width: '100%', overflowX: 'hidden'}}>
      <div className="sticky-visualization">
        <img 
          src={houseConfig.baseImage} 
          alt="Visual Configurator" 
          className="base-image" 
        />
        <HouseVisualization 
          houseConfig={houseConfig}
          selections={selections}
        />
      </div>
      </div>
      {/* Konfigurator na dole */}
      <ConfigPanel
        houseConfig={houseConfig}
        selections={selections}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}