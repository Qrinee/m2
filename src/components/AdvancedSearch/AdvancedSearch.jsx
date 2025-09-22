import React, { useState, useCallback } from "react";
import AdvancedRangeSlider from "./AdvancedRangeSlider";
import "./AdvancedSearch.css";
import CustomSelect from "../CustomSelect/CustomSelect";

const AdvancedSearch = () => {
  const [priceRange, setPriceRange] = useState([0, 1500000]);

  // Use useCallback to memoize the function
  const handlePriceRangeChange = useCallback((range) => {
    setPriceRange(range);
  }, []);

  return (
    <div className="search-container">
      <h3>Zaawansowane wyszukiwanie</h3>

      <input
        type="text"
        placeholder="Wpisz adres, stan, miasto lub obszar"
        className="search-input"
      />
  <CustomSelect options={["Typy", "Mieszkanie", "Dom", "Działka"]} />
  <div style={{margin: '10px'}}> </div>
      <CustomSelect options={["Kategorie", "Sprzedaż", "Wynajem"]} />
      <p className="extra-options">Dodatkowe Opcje Wyszukiwania</p>

      <button className="search-button">Szukaj</button>
    </div>
  );
};

export default AdvancedSearch;