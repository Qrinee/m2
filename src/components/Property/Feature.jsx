import React from 'react';
import { FaCheck } from 'react-icons/fa';

const Feature = ({ title, value }) => {
  return (
    <div className="prop-feature">
      <div className="prop-feature-icon"><FaCheck color="green"/></div>
      <div className="prop-feature-content">
        <div className="prop-feature-title">{title}</div>
        <div className="prop-feature-value">{value}</div>
      </div>
    </div>
  );
};

export default Feature;