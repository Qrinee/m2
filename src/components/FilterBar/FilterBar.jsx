import React from "react";
import { FaThLarge, FaBars } from "react-icons/fa";
import "./FilterBar.css";

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <select className="filter-select">
        <option>Typy</option>
        <option>Mieszkanie</option>
        <option>Dom</option>
        <option>Działka</option>
      </select>

      <select className="filter-select">
        <option>Kategorie</option>
        <option>Sprzedaż</option>
        <option>Wynajem</option>
      </select>

      <select className="filter-select">
        <option>Stanu</option>
        <option>Nowe</option>
        <option>Używane</option>
      </select>

      <select className="filter-select">
        <option>Miasta</option>
        <option>Warszawa</option>
        <option>Kraków</option>
        <option>Gdańsk</option>
      </select>

      <select className="filter-select">
        <option>Dziedzinie</option>
        <option>Technologia</option>
        <option>Nieruchomości</option>
        <option>Biznes</option>
      </select>

      <select className="filter-select">
        <option>Cena od wysokiej do niskiej</option>
        <option>Od niskiej do wysokiej</option>
      </select>

      <div className="filter-icons">
        <button>
          <FaThLarge />
        </button>
        <button>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
