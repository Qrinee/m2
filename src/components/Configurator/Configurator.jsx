import React from 'react';
import PackageList from '../PackageList/PackageList';
import StickySidebar from '../StickySidebar/StickySidebar';

const Configurator = ({ 
  selectedOptions, 
  selectOption, 
  totalPrice, 
  priceWithVAT, 
  total,
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
          <p className="section-subtitle">Personalizuj dom według własnych oczekiwań — dodaj elementy, które zwiększą komfort i funkcjonalność</p>
        </div>
     <div className="configurator-header">
        <p className='section-subtitle' style={{marginTop: '100px'}}>
         <b> Aby dodać wybrany pakiet do wyceny, kliknij na interesującą Cię opcję.
Po jej zaznaczeniu pakiet automatycznie pojawi się po prawej stronie w podsumowaniu i zwiększy wartość ceny domu.

W każdej chwili możesz usunąć wybrany pakiet lub zamienić go na inny — konfigurator natychmiast zaktualizuje cenę.
        </b></p>
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
            total={total}
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