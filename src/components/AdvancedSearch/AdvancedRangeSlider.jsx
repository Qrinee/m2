import React, { useState, useEffect } from "react";
import "./AdvancedSearch.css";

const AdvancedRangeSlider = ({ min = 0, max = 1500000, step = 10000, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const priceGap = 50000; // Minimum gap between min and max

  // Update parent component when values change
  useEffect(() => {
    if (onChange) {
      onChange([minValue, maxValue]);
    }
  }, [minValue, maxValue, onChange]);

  // Handle min input change
  const handleMinInput = (e) => {
    let value = parseInt(e.target.value) || min;
    
    if (value < min) {
      value = min;
    }
    
    if (value > maxValue - priceGap) {
      value = maxValue - priceGap;
    }
    
    setMinValue(value);
  };

  // Handle max input change
  const handleMaxInput = (e) => {
    let value = parseInt(e.target.value) || max;
    
    if (value > max) {
      value = max;
    }
    
    if (value < minValue + priceGap) {
      value = minValue + priceGap;
    }
    
    setMaxValue(value);
  };

  // Handle min range slider change
  const handleMinRange = (e) => {
    let value = parseInt(e.target.value);
    
    if (value > maxValue - priceGap) {
      value = maxValue - priceGap;
    }
    
    setMinValue(value);
  };

  // Handle max range slider change
  const handleMaxRange = (e) => {
    let value = parseInt(e.target.value);
    
    if (value < minValue + priceGap) {
      value = minValue + priceGap;
    }
    
    setMaxValue(value);
  };

  // Calculate slider track position
  const getTrackStyle = () => {
    const left = ((minValue - min) / (max - min)) * 100;
    const right = 100 - ((maxValue - min) / (max - min)) * 100;
    return { left: `${left}%`, right: `${right}%` };
  };

  return (
    <div className="price-range">
      <div className="price-input-container">
        <div className="price-input">
          <div className="price-field">
            <span>Cena minimalna</span>
            <input 
              type="number" 
              className="min-input" 
              value={minValue} 
              onChange={handleMinInput}
              min={min}
              max={max}
            />
          </div>
          <div className="price-field">
            <span>Cena maksymalna</span>
            <input 
              type="number" 
              className="max-input" 
              value={maxValue} 
              onChange={handleMaxInput}
              min={min}
              max={max}
            />
          </div>
        </div>
        
        <div className="slider">
          <div className="price-slider" style={getTrackStyle()}></div>
        </div>
      </div>

      <div className="range-input">
        <input 
          type="range" 
          className="min-range" 
          min={min} 
          max={max} 
          value={minValue} 
          step={step}
          onChange={handleMinRange}
        />
        <input 
          type="range" 
          className="max-range" 
          min={min} 
          max={max} 
          value={maxValue} 
          step={step}
          onChange={handleMaxRange}
        />
      </div>
    </div>
  );
};

export default AdvancedRangeSlider;