import React from "react";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item}
          {index < items.length - 1 && <span className="separator">/</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
