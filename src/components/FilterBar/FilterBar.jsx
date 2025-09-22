import React, { useState } from "react";
import { FaThLarge, FaBars, FaFilter, FaTimes } from "react-icons/fa";
import "./FilterBar.css";
import CustomSelect from './../CustomSelect/CustomSelect';

const FilterBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="filter-bar">
      {/* Desktop/Tablet View */}
      <div className="filter-selects">
        <CustomSelect
          options={["Typy", "Mieszkanie", "Dom", "Działka"]}
        />
        <CustomSelect
          options={["Kategorie", "Sprzedaż", "Wynajem"]}
        />

        <CustomSelect
          options={["Stanu", "Nowe", "Używane"]}
        />
        <CustomSelect
          options={["Miasta", "Warszawa", "Kraków", "Gdańsk"]}
        />
        <CustomSelect
          options={["Dziedzinie", "Technologia", "Nieruchomości", "Biznes"]}
        />
        <CustomSelect
          options={["Cena od wysokiej do niskiej", "Od niskiej do wysokiej"]}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button className="mobile-filter-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaFilter />}
        <span>Filtry</span>
      </button>

      {/* Mobile Filter Menu */}
      <div className={`mobile-filter-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-filter-header">
          <h3>Filtry</h3>
          <button onClick={toggleMobileMenu} className="close-mobile-menu">
            <FaTimes />
          </button>
        </div>
        
        <div className="mobile-filter-selects">
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
        </div>
        
        <div className="mobile-filter-actions">
          <button className="apply-filters">Zastosuj filtry</button>
          <button className="reset-filters">Resetuj</button>
        </div>
      </div>

      {/* View Icons */}
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