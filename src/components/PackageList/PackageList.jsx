import React from 'react';
import p1 from '../../assets/p1.jpg';
import p2 from '../../assets/plytafundamentowa.jpg';
import p3 from '../../assets/image.webp';
import p4 from '../../assets/maxresdefault.jpg';
import p5 from '../../assets/pexels-asphotography-101808.jpg';
import p6 from '../../assets/close-up-shot-hand-trowel.jpg';
import p7 from '../../assets/gf-ZQ3b-fUVu-vFmq_szambo-1920x1080-nocrop.jpg';
import p8 from '../../assets/photovoltaic-2814504_1280.jpg'
import p9 from '../../assets/p9.jpg'
import p10 from '../../assets/podklucz.jpg'
import rekuperacja from '../../assets/pakiety/2.jpg'
import transport from '../../assets/pakiety/1.jpg'
import PackageCard from '../PackageCard/PackageCard';

import { PACKAGE_CONFIGS } from '../../utils/packageConfigs';

const PackageList = ({ selectedOptions, selectOption, houseId }) => {
  const housePackages = PACKAGE_CONFIGS[houseId] || [];
  const packageImages = [p1, p2, p3, p6, p4, p7, p8, rekuperacja, p9,p10,transport];

  return (
    <div className="packages-section">
      <div className="packages-container">
        {housePackages.map((packageConfig, index) => (
          <PackageCard
            key={index}
            title={packageConfig.title || null}
            vat={packageConfig.vat || "VAT 23%"}
            image={packageImages[index] || p1}
            packageIndex={index}
            allowMultiple={packageConfig.allowMultiple || false} // Przekazujemy informację o wielokrotnym wyborze
            options={packageConfig.options.map((option, optionIndex) => ({
              id: `${houseId}-${index}-${optionIndex}`, // Zachowujemy obecny format ID
              name: option.name,
              price: option.price // Nie formatujemy tutaj, bo potrzebujemy liczby do obliczeń
            }))}
            selectedOptions={selectedOptions}
            onSelect={selectOption}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageList;