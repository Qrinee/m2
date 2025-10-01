import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <input

        type="text"
        placeholder="Wprowadź adres, województwo, miasto, województwo lub kod pocztowy"
        className="searchbar__input"
      />
      <select className="searchbar__select">
        <option value="">Typ ogłoszenia</option>
        <option value="sprzedaz">Sprzedaż</option>
        <option value="wynajem">Wynajem</option>
        <option value="inne">Inne</option>
      </select>
      <button className="searchbar__button">
        <FaSearch className="searchbar__icon" /> Szukaj
      </button>
    </div>
  );
};

export default SearchBar;
