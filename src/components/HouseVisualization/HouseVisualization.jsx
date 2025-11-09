import React, { useState, useEffect } from 'react';

const HouseVisualization = ({ houseConfig, selections }) => {
  const [loadedImages, setLoadedImages] = useState({});

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
      img.onerror = reject;
    });
  };

  useEffect(() => {
    // Preload tylko aktualnie wybranych obrazów
    const imagesToLoad = [];
    
    // Base image
    if (houseConfig.baseImage) {
      imagesToLoad.push(preloadImage(houseConfig.baseImage));
    }
    
    // Overlay images
    if (houseConfig.overlayImages.light) {
      imagesToLoad.push(preloadImage(houseConfig.overlayImages.light));
    }
    if (houseConfig.overlayImages.dach) {
      imagesToLoad.push(preloadImage(houseConfig.overlayImages.dach));
    }
    
    // Aktualnie wybrane elementy
    Object.entries(selections).forEach(([section, id]) => {
      if (id && id !== 0) {
        const option = getOptionImage(section, id);
        if (option?.image) {
          imagesToLoad.push(preloadImage(option.image));
        }
      }
    });

    Promise.all(imagesToLoad)
      .then(() => {
        setLoadedImages(prev => ({ ...prev, all: true }));
      })
      .catch(console.error);
  }, [houseConfig, selections]);

  const getOptionImage = (type, id) => {
    const section = houseConfig.options[type];
    if (!section) return null;

    let option;
    
    if (type === 'kolor') {
      const mainTynk = selections.tynk;
      const colorOptions = section[mainTynk];
      if (colorOptions) {
        option = colorOptions.find(opt => opt.id === id);
      }
    } else {
      option = Array.isArray(section) 
        ? section.find(opt => opt.id === id)
        : null;
    }
    return option;
  };

  const renderElement = (type, id) => {
    const option = getOptionImage(type, id);
    if (!option?.image) return null;

    return (
      <div className={`element-pickable ${type}`}>
        <img 
          src={option.image} 
          alt={option.name}
          style={{ 
            opacity: loadedImages.all ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </div>
    );
  };

  return (
    <div className="vis-overlay">
      {/* Base image z opacity 0 gdy ładujemy */}
      <div className='element-pickable base' style={{ opacity: loadedImages.all ? 1 : 0 }}>
        <img src={houseConfig.baseImage} alt="Base" />
      </div>
      
      <div className='element-pickable light'>
        <img 
          src={houseConfig.overlayImages.light} 
          alt="Light" 
          style={{ opacity: loadedImages.all ? 1 : 0 }}
        />
      </div>
      
      <div className='element-pickable dach'>
        <img 
          src={houseConfig.overlayImages.dach} 
          alt="Dach" 
          style={{ opacity: loadedImages.all ? 1 : 0 }}
        />
      </div>
      
      {selections.roletyEnabled && selections.rolety && selections.rolety !== 0 && renderElement('rolety', selections.rolety)}
      {selections.okna && selections.okna !== 0 && renderElement('okna', selections.okna)}
      {selections.drzwi && selections.drzwi !== 0 && renderElement('drzwi', selections.drzwi)}
      {selections.tynk && selections.tynk !== 0 && renderElement('tynk', selections.tynk)}
      {selections.kolor && selections.kolor !== null && renderElement('kolor', selections.kolor)}
    </div>
  );
};

export default HouseVisualization;