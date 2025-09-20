import React, { useState, useRef, useEffect } from "react";
import "./AdvancedSearch.css";

const AdvancedRangeSlider = ({ min = 0, max = 1500000, step = 10000 }) => {
  const [values, setValues] = useState([0, 1500000]);
  const rangeRef = useRef(null);

  // Oblicz szerokość wypełnienia
  const getTrackStyle = () => {
    const percent1 = ((values[0] - min) / (max - min)) * 100;
    const percent2 = ((values[1] - min) / (max - min)) * 100;
    return { left: `${percent1}%`, width: `${percent2 - percent1}%` };
  };

  return (
    <div className="price-range">
      <label>
        Przedział cenowy: {values[0].toLocaleString()} PLN do {values[1].toLocaleString()} PLN
      </label>
      <div className="range-slider">
        <div className="slider-track" style={getTrackStyle()}></div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          onChange={(e) =>
            setValues([Math.min(+e.target.value, values[1] - step), values[1]])
          }
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[1]}
          onChange={(e) =>
            setValues([values[0], Math.max(+e.target.value, values[0] + step)])
          }
        />
      </div>
    </div>
  );
};

export default AdvancedRangeSlider;
