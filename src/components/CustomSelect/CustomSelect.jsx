import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import "./CustomSelect.css";

const CustomSelect = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => {
    console.log('Toggle select, isOpen:', !isOpen); // Debug
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    console.log('Wybrano opcję:', option); // Debug
    onSelect(option);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select" ref={containerRef}>
      <button 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`} 
        onClick={toggleOpen}
        type="button"
      >
        <span>{selected}</span>
        <FaArrowDown className="arrow-icon" />
      </button>
      
      {isOpen && (
        <div className="custom-options-container open">
          <ul className="custom-options">
            {options.map((opt, i) => (
              <li
                key={i}
                className={`custom-option ${opt === selected ? "selected" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;