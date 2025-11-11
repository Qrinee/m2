// PromoBanner.js
import React from "react";
import "./PromoBanner.css";
import { usePromoBanner } from "../../context/PromoBannerContext";

const PromoBanner = ({ imageSrc, closable = true }) => {
  const { isBannerVisible, hideBanner } = usePromoBanner();
  
  if (!isBannerVisible) return null;

  const handleContactClick = () => {
    window.location.href = "/kontakt";
  };

  return (
    <div className="promo-banner" role="region" aria-label="Pasek promocyjny">
      <div className="promo-left">
        <img
          src={imageSrc}
          alt="Kontakt - nasz zespół"
          className="promo-image"
        />
      </div>

      <div className="promo-center">
        <p className="promo-main">
          <strong>Skontaktuj się z nami!</strong>
        </p>
        <p className="promo-sub">
          <a href="tel:+48728866825" className="promo-phone">
          DAWID FREY +48 728 866 825 
          </a>
          <a href="tel:+48728866825"  className="promo-phone">
                WIKTORIA KISIO +48 696 266 381
          </a>
 
        </p>
      </div>

      <div className="promo-actions">
        <button
          className="promo-button"
          type="button"
          onClick={handleContactClick}
        >
          WYPEŁNIJ FORMULARZ KONTAKTOWY
        </button>
      </div>

      {closable && (
        <button
          className="promo-close"
          onClick={hideBanner}
          aria-label="Zamknij pasek"
          title="Zamknij"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default PromoBanner;