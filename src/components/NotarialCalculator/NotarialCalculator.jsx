import React, { useState } from "react";
import "./NotarialCalculator.css";

const NotarialCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(520000);
  const [ownContribution, setOwnContribution] = useState(24);
  const [repaymentMonths, setRepaymentMonths] = useState(60);

  const loanAmount = propertyPrice * (1 - ownContribution / 100);
  const monthlyRate = loanAmount / repaymentMonths;

  return (
    <div className="calculator-container">
      <h2>Kalkulator rat notarialnych</h2>

      <div className="slider-group">
        <label>Cena nieruchomości</label>
        <input
          type="range"
          min="100000"
          max="2000000"
          step="1000"
          value={propertyPrice}
          onChange={(e) => setPropertyPrice(Number(e.target.value))}
        />
        <span>{propertyPrice.toLocaleString()} zł</span>
      </div>

      <div className="slider-group">
        <label>Wkład własny (%)</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={ownContribution}
          onChange={(e) => setOwnContribution(Number(e.target.value))}
        />
        <span>{ownContribution}%</span>
      </div>

      <div className="slider-group">
        <label>Okres spłaty (miesiące)</label>
        <input
          type="range"
          min="1"
          max="360"
          step="1"
          value={repaymentMonths}
          onChange={(e) => setRepaymentMonths(Number(e.target.value))}
        />
        <span>{repaymentMonths} miesięcy</span>
      </div>

      <div className="result">
        Twoja rata wyniesie: <b>{Math.round(monthlyRate).toLocaleString()} zł</b> miesięcznie.
      </div>
    </div>
  );
};

export default NotarialCalculator;
