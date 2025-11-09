import React, { useState } from "react";
import "./PromoBanner.css";

const PromoBanner = ({ imageSrc, closable = true }) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const handleContactClick = () => {
    window.location.href = "/kontakt"; // ← przekierowanie do strony kontaktowej
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
        <p className="promo-sub">Zadzwoń: <a href="tel:+48123456789" className="promo-phone">+48 123 456 789</a></p>
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
          onClick={() => setVisible(false)}
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
