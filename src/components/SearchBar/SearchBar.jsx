import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    
    if (type) {
      params.append("typ", type);
    }

    navigate(`/ogloszenia?${params.toString()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Wprowadź adres, miasto, województwo lub kod pocztowy"
        className="searchbar__input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <select 
        className="searchbar__select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Typ ogłoszenia</option>
        <option value="sprzedaz">Sprzedaż</option>
        <option value="wynajem">Wynajem</option>
      </select>
      
      <button className="searchbar__button" onClick={handleSearch}>
        <FaSearch className="searchbar__icon" /> 
        <span className="searchbar__button-text">Szukaj</span>
      </button>
    </div>
  );
};

export default SearchBar;