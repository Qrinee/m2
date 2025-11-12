import React, { useState } from "react";
import "./ModularHouseCalculator.css";

const ModularHouseCalculator = ({ 
  maxRepaymentMonths = 120, 
  minOwnContribution = 20,
  defaultPropertyPrice = 299000 
}) => {
  const [propertyPrice, setPropertyPrice] = useState(defaultPropertyPrice);
  const [ownContribution, setOwnContribution] = useState(minOwnContribution);
  const [repaymentMonths, setRepaymentMonths] = useState(Math.min(maxRepaymentMonths, 120));

  // Stopy procentowe
  const annualInterestRateFirst5 = 0.10;
  const annualInterestRateAfter5 = 0.15;
  
  // Obliczenia kwot
  const loanAmount = propertyPrice * (1 - ownContribution / 100);
  const ownContributionAmount = propertyPrice * ownContribution / 100;
  
  // Obliczenie miesięcznej raty
  const calculateMonthlyRate = () => {
    if (loanAmount <= 0) {
      return { monthlyRate: 0, interestRate: annualInterestRateFirst5 };
    }

    const annualInterestRate = repaymentMonths <= 60 ? annualInterestRateFirst5 : annualInterestRateAfter5;
    const monthlyInterestRate = annualInterestRate / 12;
    
    const monthlyRate = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, repaymentMonths)) / 
      (Math.pow(1 + monthlyInterestRate, repaymentMonths) - 1);
    
    return {
      monthlyRate: monthlyRate,
      interestRate: annualInterestRate
    };
  };

  const monthlyRateData = calculateMonthlyRate();

  // Formatowanie waluty
  const formatCurrency = (value) => {
    if (isNaN(value) || value === Infinity) return '0 zł';
    return Math.round(value).toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' zł';
  };

  // Formatowanie procentów
  const formatPercentage = (value) => {
    return Math.round(value * 100) + '%';
  };

  // Formatowanie miesięcy
  const formatMonths = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${months} miesięcy`;
    if (remainingMonths === 0) {
      if (years === 1) return '1 rok';
      if (years < 5) return `${years} lata`;
      return `${years} lat`;
    }
    
    let result = '';
    if (years === 1) result += '1 rok';
    else if (years < 5) result += `${years} lata`;
    else result += `${years} lat`;
    
    if (remainingMonths > 0) {
      result += ` ${remainingMonths} miesięcy`;
    }
    
    return result;
  };

  // Obliczenie maksymalnej ceny (150% ceny domyślnej)
  const maxPropertyPrice = Math.round(defaultPropertyPrice * 1.5);
  const minPropertyPrice = Math.round(defaultPropertyPrice * 0.5);

  return (
    <div className="modular-calculator-container">
      <div className="calculator-header">
        <h2>Kalkulator rat dla domu modułowego</h2>
        <p>Oblicz swoją miesięczną ratę</p>
      </div>

      <div className="calculator-body">

        {/* Suwak wkładu własnego */}
        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="ownContribution">Wkład własny</label>
            <span className="value-display">
              {ownContribution}% - {formatCurrency(ownContributionAmount)}
            </span>
          </div>
          <input
            id="ownContribution"
            type="range"
            min={minOwnContribution}
            max="100"
            step="1"
            value={ownContribution}
            onChange={(e) => setOwnContribution(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>{minOwnContribution}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Suwak okresu spłaty */}
        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="repaymentMonths">Okres spłaty</label>
            <span className="value-display">{formatMonths(repaymentMonths)}</span>
          </div>
          <input
            id="repaymentMonths"
            type="range"
            min="12"
            max={maxRepaymentMonths}
            step="12"
            value={repaymentMonths}
            onChange={(e) => setRepaymentMonths(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>1 rok</span>
            <span>{formatMonths(maxRepaymentMonths)}</span>
          </div>
        </div>

        {/* Karty podsumowania */}
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-label">Wysokość</div>
            <div className="card-value">{formatCurrency(loanAmount)}</div>
          </div>
          <div className="summary-card">
            <div className="card-label">Wkład własny</div>
            <div className="card-value">{formatCurrency(ownContributionAmount)}</div>
          </div>
        </div>

        {/* Wynik główny */}
        <div className="result-container">
          <div className="result-section">
            <div className="result-label">Twoja miesięczna rata wyniesie:</div>
            <div className={`result-amount ${repaymentMonths <= 60 ? 'low-rate' : 'low-rate'}`}>
              {formatCurrency(monthlyRateData.monthlyRate)}
            </div>
            <div className="result-interest">
              Przy oprocentowaniu: {formatPercentage(monthlyRateData.interestRate)}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ModularHouseCalculator;