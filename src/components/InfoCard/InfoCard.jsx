import React from "react";
import "./InfoCard.css";

export default function InfoCard({
  icon,             // np. ścieżka do SVG lub JSX ikony
  title,            // nagłówek karty
  description,      // krótki opis
  features = [],    // lista punktów
  buttonText,       // tekst przycisku
  onButtonClick     // callback po kliknięciu
}) {
  return (
    <div className="info-card">
      <div className="info-card__icon">{icon}</div>
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__description">{description}</p>

      <ul className="info-card__features">
        {features.map((feature, i) => (
          <li key={i}>
            <span className="info-card__check">✔</span>
            {feature}
          </li>
        ))}
      </ul>
        {buttonText && (
      <button className="info-card__button" onClick={onButtonClick}>
        {buttonText}
      </button>
        )}

    </div>
  );
}
