import React from 'react'
import RoletySection from '../RoletySection/RoletySection'
import ConfigSection from '../ConfigSection/ConfigSection'

const ConfigPanel = ({ houseConfig, selections, onSelectionChange }) => {
  const shouldShowColorSection = () => {
    const tynkOption = houseConfig.options.tynk?.find(t => t.id === selections.tynk)
    return tynkOption?.hasColors && houseConfig.options.kolor
  }

  const renderSection = (sectionKey) => {
    const section = houseConfig.options[sectionKey]
    if (!section) return null

    switch (sectionKey) {
      case 'rolety':
        return (
          <RoletySection
            options={section}
            enabled={selections.roletyEnabled}
            color={selections.rolety}
            onToggle={() => onSelectionChange(
              'roletyEnabled', 
              !selections.roletyEnabled
            )}
            onColorSelect={(colorId) => onSelectionChange('rolety', colorId)}
          />
        )

      case 'kolor':
        if (!shouldShowColorSection()) return null
        return (
          <ConfigSection
            title="Kolor"
            options={section[selections.tynk] || []}
            activeId={selections.kolor}
            onSelect={(id) => onSelectionChange('kolor', id)}
          />
        )

      default:
        return (
          <ConfigSection
            title={sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)}
            options={Array.isArray(section) ? section : []}
            activeId={selections[sectionKey]}
            onSelect={(id) => onSelectionChange(sectionKey, id)}
          />
        )
    }
  }

  return (
    <div className="config-container">
      <div className="config-content">
        <h2>{houseConfig.name}</h2>
        
        {/* Renderuj wszystkie dostępne sekcje */}
        {Object.keys(houseConfig.options).map(sectionKey => 
          renderSection(sectionKey)
        )}

        <div className="config-end">
          <p>Koniec konfiguracji</p>
        </div>
      </div>
    </div>
  )
}

export default ConfigPanel