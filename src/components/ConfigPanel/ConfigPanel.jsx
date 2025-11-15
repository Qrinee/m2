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
  return selections.typDachu !== undefined && selections.typDachu !== null && houseConfig.options.kolorDachu
}

  const shouldShowDrzwiSection = () => {
    return selections.kolorDrzwi && selections.kolorDrzwi !== 0 && houseConfig.options.drzwi
  }

  // Funkcja do filtrowania opcji typu dachu
  const getFilteredTypDachuOptions = () => {
    const allOptions = houseConfig.options.typDachu || [];
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
        if (filteredOptions.length === 0) return null;
        
        return (
          <ConfigSection
            title="Typ dachu"
            options={filteredOptions}
            activeId={selections.typDachu}
            onSelect={(id) => onSelectionChange('typDachu', id)}
          />
        )

      case 'kolorDrzwi':
        // Sekcja wyboru koloru drzwi
        return (
          <ConfigSection
            title="Kolor drzwi"
            options={Array.isArray(section) ? section : []}
            activeId={selections.kolorDrzwi}
            onSelect={(id) => {
              // Resetuj wybór modelu drzwi przy zmianie koloru
              onSelectionChange('drzwi', 0);
              onSelectionChange('kolorDrzwi', id);
            }}
          />
        )

      case 'drzwi':
        // Sekcja wyboru modelu drzwi - pokazuj tylko jeśli wybrano kolor
        if (!shouldShowDrzwiSection()) return null;
        
        const drzwiOptions = section[selections.kolorDrzwi] || [];
        return (
          <ConfigSection
            title="Model drzwi"
            options={drzwiOptions}
            activeId={selections.drzwi}
            onSelect={(id) => onSelectionChange('drzwi', id)}
          />
        )

      default:
        // Dla pozostałych sekcji, które są tablicami
        if (!Array.isArray(section)) return null;
        
        return (
          <ConfigSection
            title={getSectionTitle(sectionKey)}
            options={section}
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
      kolorDrzwi: 'Kolor drzwi',
      drzwi: 'Model drzwi'
    }
    return titles[sectionKey] || sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
  }

  // Funkcja do określania kolejności sekcji
  const getSectionOrder = (sectionKey) => {
    const order = {
      tynk: 1,
      kolor: 2,
      typDachu: 3,
      kolorDachu: 4,
      okna: 5,
      rolety: 6,
      kolorDrzwi: 7,
      drzwi: 8
    };
    return order[sectionKey] || 99;
  }

  return (
    <div className="config-container">
      <div className="config-content">
        <h2>{houseConfig.name}</h2>
        
        {/* Renderuj sekcje w określonej kolejności */}
        {Object.keys(houseConfig.options)
          .sort((a, b) => getSectionOrder(a) - getSectionOrder(b))
          .map(sectionKey => 
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