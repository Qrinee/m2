import React, { useState } from "react";
import AdvancedRangeSlider from "./AdvancedRangeSlider";
import "./AdvancedSearch.css";

const AdvancedSearch = () => {
  const [priceRange, setPriceRange] = useState([0, 1500000]);

  return (
    <div className="search-container">
      <h3>Zaawansowane wyszukiwanie</h3>

      <input
        type="text"
        placeholder="Wpisz adres, stan, miasto lub obszar"
        className="search-input"
      />

      <select className="search-select">
        <option>Typy</option>
        <option>Mieszkanie</option>
        <option>Dom</option>
        <option>Działka</option>
      </select>

      <select className="search-select">
        <option>Kategoria</option>
        <option>Sprzedaż</option>
        <option>Wynajem</option>
      </select>

      <AdvancedRangeSlider
        min={0}
        max={1500000}
        step={10000}
        onChange={(range) => setPriceRange(range)}
      />

      <p className="extra-options">Dodatkowe Opcje Wyszukiwania</p>

      <button className="search-button">Szukaj</button>
    </div>
  );
};

export default AdvancedSearch;
