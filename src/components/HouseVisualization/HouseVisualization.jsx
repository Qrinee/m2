import React, { useState, useEffect } from 'react';

const HouseVisualization = ({ houseConfig, selections, onImagesLoad }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = reject;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadAllImages = async () => {
      try {
        const imagesToLoad = [];
        
        // Base image
        if (houseConfig.baseImage) {
          imagesToLoad.push(preloadImage(houseConfig.baseImage));
        }
        
        // Overlay images
        if (houseConfig.overlayImages?.light) {
          imagesToLoad.push(preloadImage(houseConfig.overlayImages.light));
        }
        if (houseConfig.overlayImages?.dach) {
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

        await Promise.all(imagesToLoad);
        
        if (isMounted) {
          setAllImagesLoaded(true);
          // Wywołaj callback jeśli został przekazany
          if (onImagesLoad) {
            onImagesLoad();
          }
        }
      } catch (error) {
        console.error('Błąd ładowania obrazów:', error);
        if (isMounted) {
          setAllImagesLoaded(true);
          if (onImagesLoad) {
            onImagesLoad();
          }
        }
      }
    };

    setAllImagesLoaded(false);
    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, [houseConfig, selections, onImagesLoad]);

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
  } else if (type === 'kolorDachu') {
    const typDachu = selections.typDachu;
    const colorOptions = section[typDachu];
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
const renderElement = (type, id, className = type) => {
  const option = getOptionImage(type, id);
  if (!option?.image) return null;

  return (
    <div className={`element-pickable ${className}`}>
      <img 
        src={option.image} 
        alt={option.name}
        style={{ 
          opacity: allImagesLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
};

  return (
    <div className="vis-overlay">
      {/* Base image */}
      <div className='element-pickable base' style={{ opacity: allImagesLoaded ? 1 : 0 }}>
        <img src={houseConfig.baseImage} alt="Base" />
      </div>
      
      <div className='element-pickable light'>
        <img 
          src={houseConfig.overlayImages?.light} 
          alt="Light" 
          style={{ opacity: allImagesLoaded ? 1 : 0 }}
        />
      </div>
      
      {/* <div className='element-pickable dach'>
        <img 
          src={houseConfig.overlayImages?.dach} 
          alt="Dach" 
          style={{ opacity: allImagesLoaded ? 1 : 0 }}
        />
      </div> */}
{selections.typDachu && selections.typDachu !== 0 && selections.kolorDachu && renderElement('kolorDachu', selections.kolorDachu, 'dach')}
      {selections.roletyEnabled && selections.rolety && selections.rolety !== 0 && renderElement('rolety', selections.rolety)}
      {selections.okna && selections.okna !== 0 && renderElement('okna', selections.okna)}
      {selections.drzwi && selections.drzwi !== 0 && renderElement('drzwi', selections.drzwi)}
      {selections.tynk && selections.tynk !== 0 && renderElement('tynk', selections.tynk)}
      {selections.kolor && selections.kolor !== null && renderElement('kolor', selections.kolor)}
    </div>
  );
};

export default HouseVisualization;