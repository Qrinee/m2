// ConfigPanel.js
import React from 'react'
import RoletySection from '../RoletySection/RoletySection'
import ConfigSection from '../ConfigSection/ConfigSection'

const ConfigPanel = ({ houseConfig, selections, onSelectionChange }) => {
  const shouldShowColorSection = () => {
    const tynkOption = houseConfig.options.tynk?.find(t => t.id === selections.tynk)
    return tynkOption?.hasColors && houseConfig.options.kolor
  }

  const shouldShowKolorDachuSection = () => {
    return selections.typDachu && selections.typDachu !== 0 && houseConfig.options.kolorDachu
  }

  // Funkcja do filtrowania opcji typu dachu
const getFilteredTypDachuOptions = () => {
  const allOptions = houseConfig.options.typDachu || [];
  
  // Jeśli chcesz zawsze pokazywać wszystkie opcje dachu:
  return allOptions;
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
            title="Kolor elewacji"
            options={section[selections.tynk] || []}
            activeId={selections.kolor}
            onSelect={(id) => onSelectionChange('kolor', id)}
          />
        )

      case 'kolorDachu':
        if (!shouldShowKolorDachuSection()) return null
        return (
          <ConfigSection
            title="Kolor dachu"
            options={section[selections.typDachu] || []}
            activeId={selections.kolorDachu}
            onSelect={(id) => onSelectionChange('kolorDachu', id)}
          />
        )

      case 'typDachu':
        const filteredOptions = getFilteredTypDachuOptions();
        // Jeśli nie ma dostępnych opcji po filtrowaniu, nie renderuj sekcji
        if (filteredOptions.length === 0) return null;
        
        return (
          <ConfigSection
            title="Typ dachu"
            options={filteredOptions}
            activeId={selections.typDachu}
            onSelect={(id) => onSelectionChange('typDachu', id)}
          />
        )

      default:
        return (
          <ConfigSection
            title={getSectionTitle(sectionKey)}
            options={Array.isArray(section) ? section : []}
            activeId={selections[sectionKey]}
            onSelect={(id) => onSelectionChange(sectionKey, id)}
          />
        )
    }
  }

  const getSectionTitle = (sectionKey) => {
    const titles = {
      typDachu: 'Typ dachu',
      kolorDachu: 'Kolor dachu',
      tynk: 'Typ elewacji',
      okna: 'Kolor okien',
      drzwi: 'Drzwi wejściowe'
    }
    return titles[sectionKey] || sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
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