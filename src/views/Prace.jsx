import React from 'react';
import './Prace.css'; // Import pliku CSS

const Prace = () => {
  return (
    <div className="under-construction">
      <div className="content">
        <h1>Trwają prace nad stroną</h1>
        <p>Zapraszamy wkrótce!</p>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Prace;