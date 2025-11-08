
import React from 'react';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';


export default function ErrorScreen({ error }) {
  return (
    <div>
      <Header black />
      <div className='separate'></div>
      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', 'Mój profil']} />
            <div className='sm-separate'></div>
            <div className="mp-error">
              <p>{error}</p>
              <button onClick={() => window.history.back()} className="mp-btn mp-btn--primary">
                Powrót
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}