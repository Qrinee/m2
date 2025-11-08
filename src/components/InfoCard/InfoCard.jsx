import React from "react";
import "./InfoCard.css";
import { FaCheck } from "react-icons/fa";

export default function InfoCard({
  icon,             
  title,            
  description,      
  features = [],    
  buttonText,       
  onButtonClick     
}) {
  return (
    <div className="info-card">
      <div className="info-card__icon">{icon}</div>
      <h3 className="info-card__title">{title}</h3>
      <p className="info-card__description">{description}</p>
      <div className="sm-separate"></div>
      <ul className="info-card__features">
        {features.map((feature, i) => (
          <li key={i}>
            <span className="info-card__check"><FaCheck style={{marginRight: '8px'}}/></span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="sm-separate"></div>
        {buttonText && (
      <button className="info-card__button" onClick={onButtonClick}>
        {buttonText}
      </button>
        )}

    </div>
  );
}
