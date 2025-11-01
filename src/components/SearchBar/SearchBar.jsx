import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchFields, setSearchFields] = useState({
    propertyType: "",
    transactionType: "",
    priceMin: "",
    priceMax: "",
    location: "",
    areaMin: "",
    areaMax: ""
  });
  const [developerFields, setDeveloperFields] = useState({
    propertyType: "",
    propertyCategory: "",
    priceMin: "",
    priceMax: "",
    location: "",
    areaMin: "",
    areaMax: ""
  });
  
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    const fields = activeTab === "search" ? searchFields : developerFields;

    Object.entries(fields).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    navigate(`/ogloszenia?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchFieldChange = (field, value) => {
    setSearchFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeveloperFieldChange = (field, value) => {
    setDeveloperFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderSearchFields = () => (
    <div className="searchbar__fields">
      <select 
        className="searchbar__select"
        value={searchFields.propertyType}
        onChange={(e) => handleSearchFieldChange("propertyType", e.target.value)}
      >
        <option value="">Typ nieruchomości</option>
        <option value="mieszkanie">Mieszkanie</option>
        <option value="dom">Dom</option>
        <option value="kawalerka">Kawalerka</option>
      </select>

      <select 
        className="searchbar__select"
        value={searchFields.transactionType}
        onChange={(e) => handleSearchFieldChange("transactionType", e.target.value)}
      >
        <option value="">Na sprzedaż/wynajem</option>
        <option value="sprzedaz">Na sprzedaż</option>
        <option value="wynajem">Na wynajem</option>
      </select>

      <input
        type="number"
        placeholder="Cena od"
        className="searchbar__input"
        value={searchFields.priceMin}
        onChange={(e) => handleSearchFieldChange("priceMin", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <input
        type="number"
        placeholder="Cena do"
        className="searchbar__input"
        value={searchFields.priceMax}
        onChange={(e) => handleSearchFieldChange("priceMax", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <input
        type="text"
        placeholder="Lokalizacja"
        className="searchbar__input"
        value={searchFields.location}
        onChange={(e) => handleSearchFieldChange("location", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <div className="searchbar__range">
        <input
          type="number"
          placeholder="Pow. od"
          className="searchbar__input searchbar__input--range"
          value={searchFields.areaMin}
          onChange={(e) => handleSearchFieldChange("areaMin", e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <span className="searchbar__range-separator">-</span>
        <input
          type="number"
          placeholder="Pow. do"
          className="searchbar__input searchbar__input--range"
          value={searchFields.areaMax}
          onChange={(e) => handleSearchFieldChange("areaMax", e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );

  const renderDeveloperFields = () => (
    <div className="searchbar__fields">
      <select 
        className="searchbar__select"
        value={developerFields.propertyType}
        onChange={(e) => handleDeveloperFieldChange("propertyType", e.target.value)}
      >
        <option value="">Typ nieruchomości</option>
        <option value="inwestycje">Inwestycje</option>
        <option value="mieszkanie">Mieszkanie</option>
        <option value="dom">Dom</option>
        <option value="kawalerka">Kawalerka</option>
      </select>

      <select 
        className="searchbar__select"
        value={developerFields.propertyCategory}
        onChange={(e) => handleDeveloperFieldChange("propertyCategory", e.target.value)}
      >
        <option value="">Domy/lokale użytkowe</option>
        <option value="domy">Domy</option>
        <option value="lokale-uzytkowe">Lokale użytkowe</option>
      </select>

      <input
        type="number"
        placeholder="Cena od"
        className="searchbar__input"
        value={developerFields.priceMin}
        onChange={(e) => handleDeveloperFieldChange("priceMin", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <input
        type="number"
        placeholder="Cena do"
        className="searchbar__input"
        value={developerFields.priceMax}
        onChange={(e) => handleDeveloperFieldChange("priceMax", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <input
        type="text"
        placeholder="Lokalizacja"
        className="searchbar__input"
        value={developerFields.location}
        onChange={(e) => handleDeveloperFieldChange("location", e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <div className="searchbar__range">
        <input
          type="number"
          placeholder="Pow. od"
          className="searchbar__input searchbar__input--range"
          value={developerFields.areaMin}
          onChange={(e) => handleDeveloperFieldChange("areaMin", e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <span className="searchbar__range-separator">-</span>
        <input
          type="number"
          placeholder="Pow. do"
          className="searchbar__input searchbar__input--range"
          value={developerFields.areaMax}
          onChange={(e) => handleDeveloperFieldChange("areaMax", e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );

  return (
    <div className="searchbar">
      <div className="searchbar__tabs">
        <button 
          className={`searchbar__tab ${activeTab === "search" ? "searchbar__tab--active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          Szukaj
        </button>
        <button 
          className={`searchbar__tab ${activeTab === "developer" ? "searchbar__tab--active" : ""}`}
          onClick={() => setActiveTab("developer")}
        >
          Oferty deweloperów
        </button>
      </div>

      <div className="searchbar__content">
        {activeTab === "search" ? renderSearchFields() : renderDeveloperFields()}
        
        <button className="searchbar__button" onClick={handleSearch}>
          <FaSearch className="searchbar__icon" /> 
          <span className="searchbar__button-text">Szukaj</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;