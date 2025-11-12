import React, { useState } from "react";
import { FaThLarge, FaBars, FaFilter, FaTimes } from "react-icons/fa";
import "./FilterBar.css";
import CustomSelect from './../CustomSelect/CustomSelect';

const FilterBar = ({ filters, filterOptions, onFilterChange, onResetFilters, loading = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    onResetFilters();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  
  const safeFilterOptions = {
    kategorie: filterOptions?.kategorie || [],
    wojewodztwa: filterOptions?.wojewodztwa || [],
    miasta: filterOptions?.miasta || []
  };

  const typOptions = ["Wszystkie typy", "Sprzedaż", "Wynajem"];
  const pokojeOptions = ["Dowolna liczba", "1", "2", "3", "4+"];
  const sortOptions = [
    "Najnowsze",
    "Najstarsze", 
    "Cena rosnąco",
    "Cena malejąco",
    "Powierzchnia rosnąco",
    "Powierzchnia malejąco"
  ];

  
  const getSortValue = (sort) => {
    switch (sort) {
      case 'data-desc': return 'Najnowsze';
      case 'data-asc': return 'Najstarsze';
      case 'cena-asc': return 'Cena rosnąco';
      case 'cena-desc': return 'Cena malejąco';
      case 'powierzchnia-asc': return 'Powierzchnia rosnąco';
      case 'powierzchnia-desc': return 'Powierzchnia malejąco';
      default: return 'Najnowsze';
    }
  };

  return (
    <div className={`filter-bar ${loading ? 'filter-loading' : ''}`}>
      <div className="filter-selects">
        <CustomSelect
          options={typOptions}
          selected={filters.typ ? (filters.typ === 'sprzedaz' ? 'Sprzedaż' : 'Wynajem') : "Typ"}
          onSelect={(value) => {
            const typValue = value === 'Sprzedaż' ? 'sprzedaz' : 
                           value === 'Wynajem' ? 'wynajem' : '';
            handleFilterUpdate('typ', typValue);
          }}
        />

        <CustomSelect
          options={["Kategoria", ...safeFilterOptions.kategorie]}
          selected={filters.kategoria || "Kategoria"}
          onSelect={(value) => handleFilterUpdate('kategoria', value === "Wszystkie kategorie" ? '' : value)}
        />

        <CustomSelect
          options={["Województwo", ...safeFilterOptions.wojewodztwa]}
          selected={filters.wojewodztwo || "Województwo"}
          onSelect={(value) => handleFilterUpdate('wojewodztwo', value === "Wszystkie województwa" ? '' : value)}
        />

        <CustomSelect
          options={["Miasto", ...safeFilterOptions.miasta]}
          selected={filters.miasto || "Miasto"}
          onSelect={(value) => handleFilterUpdate('miasto', value === "Wszystkie miasta" ? '' : value)}
        />

        <CustomSelect
          options={pokojeOptions}
          selected={filters.pokoje ? `${filters.pokoje} pokoi` : "Dowolna liczba"}
          onSelect={(value) => {
            const pokojeValue = value === "Dowolna liczba" ? '' : value.replace(' pokoi', '').replace('+', '');
            handleFilterUpdate('pokoje', pokojeValue);
          }}
        />

        <CustomSelect
          options={sortOptions}
          selected={getSortValue(filters.sort)}
          onSelect={(value) => {
            const sortMap = {
              'Najnowsze': 'data-desc',
              'Najstarsze': 'data-asc',
              'Cena rosnąco': 'cena-asc',
              'Cena malejąco': 'cena-desc',
              'Powierzchnia rosnąco': 'powierzchnia-asc',
              'Powierzchnia malejąco': 'powierzchnia-desc'
            };
            handleFilterUpdate('sort', sortMap[value] || 'data-desc');
          }}
        />
      </div>

      <button className="mobile-filter-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaFilter />}
        <span>Filtry</span>
      </button>

      <div className={`mobile-filter-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-filter-header">
          <h3>Filtry</h3>
          <button onClick={toggleMobileMenu} className="close-mobile-menu">
            <FaTimes />
          </button>
        </div>
        
        <div className="mobile-filter-selects">
          <div className="filter-group">
            <label>Typ ogłoszenia</label>
            <select 
              className="filter-select"
              value={filters.typ || ''}
              onChange={(e) => handleFilterUpdate('typ', e.target.value)}
            >
              <option value="">Wszystkie typy</option>
              <option value="sprzedaz">Sprzedaż</option>
              <option value="wynajem">Wynajem</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Kategoria</label>
            <select 
              className="filter-select"
              value={filters.kategoria || ''}
              onChange={(e) => handleFilterUpdate('kategoria', e.target.value)}
            >
              <option value="">Wszystkie kategorie</option>
              {safeFilterOptions.kategorie.map(kat => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Województwo</label>
            <select 
              className="filter-select"
              value={filters.wojewodztwo || ''}
              onChange={(e) => handleFilterUpdate('wojewodztwo', e.target.value)}
            >
              <option value="">Wszystkie województwa</option>
              {safeFilterOptions.wojewodztwa.map(woj => (
                <option key={woj} value={woj}>{woj}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Miasto</label>
            <select 
              className="filter-select"
              value={filters.miasto || ''}
              onChange={(e) => handleFilterUpdate('miasto', e.target.value)}
            >
              <option value="">Wszystkie miasta</option>
              {safeFilterOptions.miasta.map(miasto => (
                <option key={miasto} value={miasto}>{miasto}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Liczba pokoi</label>
            <select 
              className="filter-select"
              value={filters.pokoje || ''}
              onChange={(e) => handleFilterUpdate('pokoje', e.target.value)}
            >
              <option value="">Dowolna liczba</option>
              <option value="1">1 pokój</option>
              <option value="2">2 pokoje</option>
              <option value="3">3 pokoje</option>
              <option value="4">4+ pokoi</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sortowanie</label>
            <select 
              className="filter-select"
              value={filters.sort || 'data-desc'}
              onChange={(e) => handleFilterUpdate('sort', e.target.value)}
            >
              <option value="data-desc">Najnowsze</option>
              <option value="data-asc">Najstarsze</option>
              <option value="cena-asc">Cena rosnąco</option>
              <option value="cena-desc">Cena malejąco</option>
              <option value="powierzchnia-asc">Powierzchnia rosnąco</option>
              <option value="powierzchnia-desc">Powierzchnia malejąco</option>
            </select>
          </div>
        </div>
        
        <div className="mobile-filter-actions">
          <button className="apply-filters" onClick={toggleMobileMenu}>
            Zastosuj filtry
          </button>
          <button className="reset-filters" onClick={handleReset}>
            Resetuj
          </button>
        </div>
      </div>

      {/* View Icons */}
      <div className="filter-icons">
        <button title="Widok siatki">
          <FaThLarge />
        </button>
        <button title="Widok listy">
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default FilterBar;