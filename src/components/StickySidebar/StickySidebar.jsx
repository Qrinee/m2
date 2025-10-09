import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const StickySidebar = ({ 
  selectedPackages, 
  totalPrice, 
  priceWithVAT, 
  basePrice, 
  getPackageName, 
  getPackagePrice,
  formData,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <div className="sticky-sidebar">
      <div className="configuration-summary">
        
        <div className="price-display">
          <div className="main-price">{totalPrice.toLocaleString('pl-PL')} zł</div>
          <div className="vat-price">{priceWithVAT.toLocaleString('pl-PL')} zł z VAT</div>
        </div>

        <div className="configuration-list">
          <div className="list-title">Aktualna konfiguracja:</div>
          <div className="base-configuration">
            <div className="config-item">
              <span>Dom bazowy 84m²</span>
              <span>{basePrice.toLocaleString('pl-PL')} zł</span>
            </div>
          </div>
          
          {Object.entries(selectedPackages).map(([category, packageId]) => {
            if (packageId) {
              const packageName = getPackageName(packageId);
              const packagePrice = getPackagePrice(packageId);
              
              return (
                <div key={packageId} className="config-item">
                  <span>+ {packageName}</span>
                  <span>+ {packagePrice.toLocaleString('pl-PL')} zł</span>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="total-section">
          <div className="total-price">
            <span>Cena całkowita:</span>
            <span>{priceWithVAT.toLocaleString('pl-PL')} zł</span>
          </div>
        </div>
      </div>

      <div className="sidebar-contact-form">
        <h4 className="form-title">Wyślij do nas konfiguracje</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Imię i nazwisko"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Twój adres e-mail"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Telefon"
            />
          </div>

          <button type="submit" className="submit-btn">
            <span>Wyślij konfigurację</span>
            <FaArrowRight className="btn-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default StickySidebar;