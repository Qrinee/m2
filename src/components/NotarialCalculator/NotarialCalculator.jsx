import React, { useState } from "react";
import "./NotarialCalculator.css";

const NotarialCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(520000);
  const [ownContribution, setOwnContribution] = useState(24);
  const [repaymentMonths, setRepaymentMonths] = useState(60);

  const loanAmount = propertyPrice * (1 - ownContribution / 100);
  const monthlyRate = loanAmount / repaymentMonths;

  // Format currency with proper spacing
  const formatCurrency = (value) => {
    return value.toLocaleString('pl-PL') + ' zł';
  };

  // Format percentage
  const formatPercentage = (value) => {
    return value + '%';
  };

  // Format months to years and months
  const formatMonths = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} miesięcy`;
    if (remainingMonths === 0) return `${years} lat`;
    return `${years} lat ${remainingMonths} miesięcy`;
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h2>Kalkulator rat notarialnych</h2>
        <p>Oblicz swoją miesięczną ratę kredytu</p>
      </div>

      <div className="calculator-body">
        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="propertyPrice">Cena nieruchomości</label>
            <span className="value-display">{formatCurrency(propertyPrice)}</span>
          </div>
          <input
            id="propertyPrice"
            type="range"
            min="100000"
            max="2000000"
            step="10000"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>100 000 zł</span>
            <span>2 000 000 zł</span>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="ownContribution">Wkład własny</label>
            <span className="value-display">{formatPercentage(ownContribution)}</span>
          </div>
          <input
            id="ownContribution"
            type="range"
            min="0"
            max="100"
            step="1"
            value={ownContribution}
            onChange={(e) => setOwnContribution(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="repaymentMonths">Okres spłaty</label>
            <span className="value-display">{formatMonths(repaymentMonths)}</span>
          </div>
          <input
            id="repaymentMonths"
            type="range"
            min="12"
            max="360"
            step="12"
            value={repaymentMonths}
            onChange={(e) => setRepaymentMonths(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>1 rok</span>
            <span>30 lat</span>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-label">Wysokość kredytu</div>
            <div className="card-value">{formatCurrency(loanAmount)}</div>
          </div>
          <div className="summary-card">
            <div className="card-label">Wkład własny</div>
            <div className="card-value">{formatCurrency(propertyPrice * ownContribution / 100)}</div>
          </div>
        </div>

        <div className="result-container">
          <div className="result-label">Twoja miesięczna rata wyniesie:</div>
          <div className="result-amount">{formatCurrency(Math.round(monthlyRate))}</div>
          <div className="result-note">* Symulacja ma charakter poglądowy i nie stanowi oferty kredytowej</div>
        </div>
      </div>
    </div>
  );
};

export default NotarialCalculator;