import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const StickySidebar = ({ 
  selectedPackagesSummary, 
  totalPrice, 
  priceWithVAT, 
  basePrice, 
  total,
  visualOptionsPrice,
  visualOptionsSummary,
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
              <span>Dom bazowy</span>
              <span>{basePrice.toLocaleString('pl-PL')} zł</span>
            </div>
          </div>
          
          {/* Sekcja opcji wizualnych */}
          {visualOptionsPrice > 0 && (
            <div className="visual-options-section">
              <div className="section-label">Opcje wizualne:</div>
              {visualOptionsSummary.map((option, index) => (
                <div key={index} className="config-item visual-option">
                  <span>+ {option.name}</span>
                  <span>+ {option.price.toLocaleString('pl-PL')} zł</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Sekcja pakietów dodatkowych */}
          {selectedPackagesSummary.length > 0 && (
            <div className="packages-section">
              <div className="section-label">Pakiety dodatkowe:</div>
              {selectedPackagesSummary.map((pkg) => (
                <div key={pkg.id} className="config-item">
                  <span>+ {pkg.name}</span>
                  <span>+ {pkg.price.toLocaleString('pl-PL')} zł</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="total-section">
          <div className="total-price">
            <span>Cena całkowita:</span>
            <span>{total.toLocaleString('pl-PL')} zł</span>
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
          
          
      <p style={{maxWidth: '700px', margin: '50px auto', color: 'gray', fontSize: '14px'}}>
"Informacje i kwoty mają charakter orientacyjny i nie stanowią oferty w rozumieniu art. 66 §1 i art. 71 k.c. ani oferty handlowej lub porady prawnej."
      </p>
        </form>
      </div>
    </div>
  );
};

export default StickySidebar;