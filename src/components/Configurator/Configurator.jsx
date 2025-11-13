import React from 'react';
import PackageList from '../PackageList/PackageList';
import StickySidebar from '../StickySidebar/StickySidebar';

const Configurator = ({ 
  selectedOptions, 
  selectOption, 
  totalPrice, 
  priceWithVAT, 
  basePrice,
  visualOptionsPrice,
  selectedPackagesSummary,
  visualOptionsSummary,
  houseId,
  formData,
  handleInputChange,
  handleSubmit 
}) => {
  return (
    <section className="configurator-section">
      <div className="containerd">
        <div className="configurator-header">
          <h2 className="section-title">KONFIGURATOR DOMU</h2>
          <p className="section-subtitle">Wybierz pakiety dodatkowe i dostosuj dom do swoich potrzeb</p>
        </div>

        <div className="configurator-layout">
          <PackageList 
            houseId={houseId}
            selectedOptions={selectedOptions} 
            selectOption={selectOption} 
          />
          <StickySidebar
            selectedPackagesSummary={selectedPackagesSummary}
            totalPrice={totalPrice}
            priceWithVAT={priceWithVAT}
            basePrice={basePrice}
            visualOptionsPrice={visualOptionsPrice}
            visualOptionsSummary={visualOptionsSummary}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </section>
  );
};

export default Configurator;