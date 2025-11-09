import React from 'react';

const Feature = ({ title, value }) => {
  if (!value && value !== 0) return null; // Nie renderuj pustych wartości
  
  return (
    <div className="prop-feature">
      <div className="prop-feature-title">{title}</div>
      <div className="prop-feature-value">{value}</div>
    </div>
  );
};

export default Feature;