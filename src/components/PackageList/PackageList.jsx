import React from 'react';
import p1 from '../../assets/pexels-pixabay-48148.jpg';
import p2 from '../../assets/plytafundamentowa.jpg';
import p3 from '../../assets/image.webp';
import p4 from '../../assets/maxresdefault.jpg';
import p5 from '../../assets/pexels-asphotography-101808.jpg';
import p6 from '../../assets/Tarasola_Essential_high_res-29.webp';
import p7 from '../../assets/gf-ZQ3b-fUVu-vFmq_szambo-1920x1080-nocrop.jpg';
import PackageCard from '../PackageCard/PackageCard';

import { PACKAGE_CONFIGS } from '../../utils/packageConfigs';

const PackageList = ({ selectedOptions, selectOption, houseId }) => {
  const housePackages = PACKAGE_CONFIGS[houseId] || [];
  const packageImages = [p1, p2, p3, p4, p5, p6, p7];

  return (
    <div className="packages-section">
      <div className="packages-container">
        {housePackages.map((packageConfig, index) => (
          <PackageCard
            key={index}
            title={packageConfig.title || null}
            vat={packageConfig.vat || "VAT 23%"}
            image={packageImages[index] || p1}
            packageIndex={index} // Przekazujemy index pakietu
            options={packageConfig.options.map((option, optionIndex) => ({
              id: `${houseId}-${index}-${optionIndex}`,
              name: option.name,
              price: option.price.toLocaleString('pl-PL')
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