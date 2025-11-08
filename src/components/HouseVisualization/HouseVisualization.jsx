
import React from 'react'

const HouseVisualization = ({ houseConfig, selections }) => {
  const renderElement = (type, id) => {
    const section = houseConfig.options[type]
    if (!section) return null

    let option
    
    if (type === 'kolor') {
      const mainTynk = selections.tynk
      const colorOptions = section[mainTynk]
      if (colorOptions) {
        option = colorOptions.find(opt => opt.id === id)
      }
    } else {
      option = Array.isArray(section) 
        ? section.find(opt => opt.id === id)
        : null
    }



    if (!option?.image) return null

    return (
      <div className={`element-pickable ${type}`}>
    
        <img src={option.image} alt={option.name} />
      </div>
    )
  }

  return (
    <div className="vis-overlay">
      <div className='element-pickable light'>
        <img src={houseConfig.overlayImages.light} alt="Light" />
      </div>
      <div className='element-pickable dach'>
        <img src={houseConfig.overlayImages.dach} alt="Dach" />
      </div>
      
      {selections.roletyEnabled ? selections.rolety && selections.rolety !== 0 && renderElement('rolety', selections.rolety) : null}
      {selections.okna && selections.okna !== 0 && renderElement('okna', selections.okna)}
      {selections.drzwi && selections.drzwi !== 0 && renderElement('drzwi', selections.drzwi)}
      {selections.tynk && selections.tynk !== 0 && renderElement('tynk', selections.tynk)}
      {selections.kolor && selections.kolor !== null && renderElement('kolor', selections.kolor)}
      {selections.elewacja && selections.elewacja !== 0 && renderElement('elewacja', selections.elewacja)}
    </div>
  )
}

export default HouseVisualization