import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ArrowButton({ position = "left", onClick, ariaLabel }) {
  return (
    <button
      className={`arrow-btn arrow-btn--${position}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {position === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
}
