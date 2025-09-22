import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import "./CustomSelect.css";

const CustomSelect = ({ options, defaultIndex = 0 }) => {
  const [selected, setSelected] = useState(options[defaultIndex]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
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
    <div className="custom-select" ref={containerRef} >
      <button 
        className={`custom-select-trigger ${isOpen ? "open" : ""}`} 
        onClick={toggleOpen}
      >
        <span>{selected}</span>
        <FaArrowDown className="arrow-icon" />
      </button>
      
      <div className={`custom-options-container ${isOpen ? "open" : ""}`}>
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
    </div>
  );
};

export default CustomSelect;