import React from 'react';

const MortgageWidget = ({
  price,
  down,
  setDown,
  years,
  setYears,
  monthlyPayment,
}) => {
  const percent = Math.round(((price - (down || 0)) / price) * 100);
  const loanPercent = Math.min(100, Math.max(0, percent));
  const size = 120;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (loanPercent / 100) * circumference;

  const formatPLN = (v) =>
    v.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });

  return (
    <div className="prop-card prop-mortgage-widget">
      <div className="prop-mortgage-top">
        <div className="prop-donut">
          <svg width={size} height={size}>
            <g transform={`translate(${size / 2},${size / 2})`}>
              <circle r={radius} fill="none" stroke="#eee" strokeWidth={stroke} />
              <circle
                r={radius}
                fill="none"
                stroke="#1d4ed8"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                transform="rotate(-90)"
              />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#111"
              >
                {monthlyPayment > 0
                  ? `${Math.round(monthlyPayment).toLocaleString("pl-PL")} zł`
                  : "0 zł"}
              </text>
            </g>
          </svg>
        </div>

        <div className="prop-mortgage-info">
          <h4>Kalkulator rat</h4>
          <div className="small">Miesięczna rata (orientacyjnie)</div>
          <div className="big">
            {monthlyPayment > 0
              ? `${Math.round(monthlyPayment).toLocaleString("pl-PL")} PLN`
              : "0 PLN"}
          </div>
        </div>
      </div>

      <div className="prop-mortgage-controls">
        <label className="form-labeld">
          Cena domu
          <input 
            className="form-input" 
            type="text" 
            value={formatPLN(price)} 
            readOnly 
          />
        </label>

        <label className="form-labeld">
          Wpłata własna: {Number(down || 0).toLocaleString("pl-PL")} PLN
          <input
            className="form-range"
            type="range"
            min="0"
            max={price}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
          />
        </label>

        <label className="form-labeld">
          Termin spłaty (lata): {years}
          <input
            className="form-range"
            type="range"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default MortgageWidget;