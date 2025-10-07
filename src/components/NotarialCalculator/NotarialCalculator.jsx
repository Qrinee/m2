import React, { useState } from "react";
import "./NotarialCalculator.css";

const NotarialCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [ownContribution, setOwnContribution] = useState(50);
  const [repaymentMonths, setRepaymentMonths] = useState(120);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Stałe oprocentowanie - 10% do 5 lat, 15% powyżej 5 lat
  const annualInterestRateFirst5 = 0.10;
  const annualInterestRateAfter5 = 0.15;
  
  const loanAmount = propertyPrice * (1 - ownContribution / 100);
  const ownContributionAmount = propertyPrice * ownContribution / 100;
  
  // Funkcja do obliczania raty
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

  // Format currency with proper spacing
  const formatCurrency = (value) => {
    if (isNaN(value) || value === Infinity) return '0 zł';
    return Math.round(value).toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' zł';
  };

  // Format percentage
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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
const submissionData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  propertyPrice: propertyPrice,
  ownContribution: ownContributionAmount,
  loanTerm: repaymentMonths,
  monthlyPayment: monthlyRateData.monthlyRate,
  interestRate: formatPercentage(monthlyRateData.interestRate) // Dodaj tę linię
};

      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/emails/loan-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Zapytanie zostało wysłane pomyślnie! Skontaktujemy się z Tobą w ciągu 24 godzin.' 
        });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Wystąpił błąd podczas wysyłania formularza.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close status message
  const closeStatusMessage = () => {
    setSubmitStatus(null);
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h2>Kalkulator rat notarialnych</h2>
        <p>Oblicz swoją miesięczną ratę</p>
      </div>

      <div className="calculator-body">
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
            <div className="card-label">Oprocentowanie</div>
            <div className={`card-value ${repaymentMonths <= 60 ? 'low-rate' : 'high-rate'}`}>
              {formatPercentage(monthlyRateData.interestRate)}
            </div>
          </div>
        </div>

        <div className="result-container">
          <div className="result-section">
            <div className="result-label">Twoja miesięczna rata wyniesie:</div>
            <div className={`result-amount ${repaymentMonths <= 60 ? 'low-rate' : 'high-rate'}`}>
              {formatCurrency(monthlyRateData.monthlyRate)}
            </div>
            <div className="result-interest">
              Przy oprocentowaniu: {formatPercentage(monthlyRateData.interestRate)}
            </div>
          </div>
          
          <div className="result-note">
            * Symulacja ma charakter poglądowy i nie stanowi oferty kredytowej<br />
            {repaymentMonths <= 60 
              ? "Kalkulacja uwzględnia oprocentowanie w wysokości 10% w skali roku"
              : "Kalkulacja uwzględnia oprocentowanie w wysokości 15% w skali roku"
            }
          </div>
        </div>

        {/* Formularz kontaktowy */}
        <form className="contact-form" onSubmit={handleSubmit}>
          
          {/* Status Message */}
          {submitStatus && (
            <div className={`submit-status ${submitStatus.type}`}>
              <div className="status-content">
                <div className={`status-icon ${submitStatus.type}`}>
                  {submitStatus.type === 'success' ? '✓' : '!'}
                </div>
                <div className="status-text">
                  {submitStatus.message}
                </div>
              </div>
              <button 
                type="button" 
                className="status-close"
                onClick={closeStatusMessage}
              >
                ×
              </button>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Imię *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefon</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="+48 123 456 789"
            />
          </div>

          <div className="form-separator"></div>
          
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="button-spinner"></span>
                Wysyłanie...
              </>
            ) : (
              'Wyślij zapytanie'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotarialCalculator;