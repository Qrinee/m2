
import React from 'react';
import Header from '../Header/Header';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';


export default function LoadingScreen() {
  return (
    <div>
      <Header black />
      <div className='separate'></div>
      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', 'Mój profil']} />
            <div className='sm-separate'></div>
            <div className="mp-loading">
              <div className="mp-loading__spinner"></div>
              <p>Ładowanie profilu...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}