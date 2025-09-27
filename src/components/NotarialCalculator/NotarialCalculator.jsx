import React, { useState } from "react";
import "./NotarialCalculator.css";

const NotarialCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [ownContribution, setOwnContribution] = useState(50);
  const [repaymentMonths, setRepaymentMonths] = useState(120);

  // Stałe oprocentowanie - 10% do 5 lat, 15% od 6 roku
  const annualInterestRateFirst5 = 0.10;
  const annualInterestRateAfter5 = 0.15;
  
  const loanAmount = propertyPrice * (1 - ownContribution / 100);
  const ownContributionAmount = propertyPrice * ownContribution / 100;
  
  // Funkcja do obliczania raty z uwzględnieniem zmiennego oprocentowania
  const calculateMonthlyRate = () => {
    if (loanAmount <= 0) {
      return { monthlyRate: 0, interestRate: annualInterestRateFirst5, hasTwoRates: false };
    }

    const monthlyRateFirst5 = annualInterestRateFirst5 / 12;
    const monthlyRateAfter5 = annualInterestRateAfter5 / 12;
    
    if (repaymentMonths <= 60) {
      // Okres spłaty do 5 lat - tylko oprocentowanie 10%
      const monthlyRate = loanAmount * 
        (monthlyRateFirst5 * Math.pow(1 + monthlyRateFirst5, repaymentMonths)) / 
        (Math.pow(1 + monthlyRateFirst5, repaymentMonths) - 1);
      
      return {
        monthlyRate: monthlyRate,
        interestRate: annualInterestRateFirst5,
        hasTwoRates: false
      };
    } else {
      // Okres spłaty powyżej 5 lat - oprocentowanie zmienne
      const monthsFirstPeriod = 60; // 5 lat
      const monthsSecondPeriod = repaymentMonths - 60;
      
      // POPRAWIONE OBLICZENIA:
      // 1. Najpierw obliczamy ratę dla całego okresu przy oprocentowaniu 10%
      const rateForWholePeriodAt10 = loanAmount * 
        (monthlyRateFirst5 * Math.pow(1 + monthlyRateFirst5, repaymentMonths)) / 
        (Math.pow(1 + monthlyRateFirst5, repaymentMonths) - 1);
      
      // 2. Obliczamy saldo po 5 latach spłacania tej raty
      let remainingBalance = loanAmount;
      for (let i = 0; i < monthsFirstPeriod; i++) {
        const interest = remainingBalance * monthlyRateFirst5;
        const principal = rateForWholePeriodAt10 - interest;
        remainingBalance -= principal;
      }
      
      // 3. Obliczamy nową ratę dla pozostałego okresu przy wyższym oprocentowaniu
      const rateSecondPeriod = remainingBalance * 
        (monthlyRateAfter5 * Math.pow(1 + monthlyRateAfter5, monthsSecondPeriod)) / 
        (Math.pow(1 + monthlyRateAfter5, monthsSecondPeriod) - 1);
      
      return {
        firstPeriodRate: rateForWholePeriodAt10,
        secondPeriodRate: rateSecondPeriod,
        firstPeriodInterestRate: annualInterestRateFirst5,
        secondPeriodInterestRate: annualInterestRateAfter5,
        hasTwoRates: true,
        remainingBalanceAfter5Years: remainingBalance
      };
    }
  };

  const monthlyRateData = calculateMonthlyRate();

  // Format currency with proper spacing
  const formatCurrency = (value) => {
    if (isNaN(value) || value === Infinity) return '0 zł';
    return Math.round(value).toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' zł';
  };

  // Format percentage - poprawiona funkcja
  const formatPercentage = (value) => {
    return Math.round(value * 100) + '%';
  };

  // Format months to years and months
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

  // Funkcja do określania aktualnego oprocentowania
  const getCurrentInterestRate = () => {
    return repaymentMonths <= 60 ? annualInterestRateFirst5 : annualInterestRateAfter5;
  };

  const totalYears = Math.ceil(repaymentMonths / 12);

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h2>Kalkulator rat notarialnych</h2>
        <p>Oblicz swoją miesięczną ratę</p>
      </div>

      <div className="calculator-body">
        <div className="interest-rate-info">
          <div className={`interest-rate-badge ${repaymentMonths <= 60 ? 'low-rate' : 'high-rate'}`}>
            {repaymentMonths <= 60 ? (
              <>
                <span className="rate-label">Atrakcyjne oprocentowanie</span>
                <span className="rate-value">{formatPercentage(annualInterestRateFirst5)}</span>
                <span className="rate-period">dla okresu do 5 lat</span>
              </>
            ) : (
              <>
                <span className="rate-label">Oprocentowanie</span>
                <span className="rate-value">{formatPercentage(annualInterestRateAfter5)}</span>
                <span className="rate-period">dla okresu 6-{totalYears} lat</span>
              </>
            )}
          </div>
          {repaymentMonths > 60 && (
            <div className="rate-comparison">
              <span>Pierwsze 5 lat: {formatPercentage(annualInterestRateFirst5)}</span>
              <span>Od 6 roku: {formatPercentage(annualInterestRateAfter5)}</span>
            </div>
          )}
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <label htmlFor="propertyPrice">Cena nieruchomości - stan deweloperski zamknięty</label>
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
            <span className="value-display">
              {ownContribution}% - {formatCurrency(ownContributionAmount)}
            </span>
          </div>
          <input
            id="ownContribution"
            type="range"
            min="50"
            max="100"
            step="1"
            value={ownContribution}
            onChange={(e) => setOwnContribution(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>50%</span>
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
            max="120"
            step="12"
            value={repaymentMonths}
            onChange={(e) => setRepaymentMonths(Number(e.target.value))}
            className="slider-input"
          />
          <div className="slider-minmax">
            <span>1 rok</span>
            <span>10 lat</span>
          </div>
          <div className="period-info">
            {repaymentMonths <= 60 ? (
              <span className="low-rate-text">✓ Niższa rata - oprocentowanie {formatPercentage(annualInterestRateFirst5)}</span>
            ) : (
              <span className="high-rate-text">✓ Oprocentowanie {formatPercentage(annualInterestRateFirst5)} przez 5 lat, następnie {formatPercentage(annualInterestRateAfter5)}</span>
            )}
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-label">Wysokość kredytu</div>
            <div className="card-value">{formatCurrency(loanAmount)}</div>
          </div>
          <div className="summary-card">
            <div className="card-label">Wkład własny</div>
            <div className="card-value">{formatCurrency(ownContributionAmount)}</div>
          </div>
          <div className="summary-card">
            <div className="card-label">Aktualne oprocentowanie</div>
            <div className={`card-value ${repaymentMonths <= 60 ? 'low-rate' : 'high-rate'}`}>
              {formatPercentage(getCurrentInterestRate())}
            </div>
          </div>
        </div>

        <div className="result-container">
          {monthlyRateData.hasTwoRates ? (
            <>
              <div className="result-section">
                <div className="result-label">Twoja miesięczna rata przez pierwsze 5 lat:</div>
                <div className="result-amount low-rate">{formatCurrency(monthlyRateData.firstPeriodRate)}</div>
                <div className="result-interest">Przy oprocentowaniu: {formatPercentage(monthlyRateData.firstPeriodInterestRate)}</div>
              </div>
              <div className="result-section">
                <div className="result-label">Twoja miesięczna rata od 6 do {totalYears} roku:</div>
                <div className="result-amount high-rate">{formatCurrency(monthlyRateData.secondPeriodRate)}</div>
                <div className="result-interest">Przy oprocentowaniu: {formatPercentage(monthlyRateData.secondPeriodInterestRate)}</div>
              </div>
              <div className="result-comparison">
                <span>Rata wzrośnie o {formatCurrency(monthlyRateData.secondPeriodRate - monthlyRateData.firstPeriodRate)} miesięcznie</span>
              </div>
            </>
          ) : (
            <div className="result-section">
              <div className="result-label">Twoja miesięczna rata wyniesie:</div>
              <div className="result-amount low-rate">{formatCurrency(monthlyRateData.monthlyRate)}</div>
              <div className="result-interest">Przy oprocentowaniu: {formatPercentage(monthlyRateData.interestRate)}</div>
            </div>
          )}
          <div className="result-note">
            * Symulacja ma charakter poglądowy i nie stanowi oferty kredytowej<br />
            {repaymentMonths > 60 
              ? `Kalkulacja uwzględnia oprocentowanie 10% w skali roku przez pierwsze 5 lat oraz 15% w skali roku od 6 do ${totalYears} roku`
              : "Kalkulacja uwzględnia stałe oprocentowanie w wysokości 10% w skali roku"
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotarialCalculator;