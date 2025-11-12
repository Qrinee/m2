// HouseConfigurator.js
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Configurator from '../components/Configurator/Configurator';
import './HouseConfigurator.css';

import { HOUSE_CONFIGS } from '../utils/houseConfigs'
import Footer from '../components/Footer/Footer';
import VisualConfigurator from '../components/VisualConfigurator/VisualConfigurator';
import HousePlan from '../components/HousePlan/HousePlan';
import ModularHouseCalculator from '../components/ModularHouseCalculator/ModularHouseCalculator';

const HouseConfigurator = () => {
  const [selectedPackages, setSelectedPackages] = useState({});
  const [visualOptionsPrice, setVisualOptionsPrice] = useState(0);
  const [selectedVisualOptions, setSelectedVisualOptions] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const basePrice = 299000;

  const selectPackage = (packageId, category) => {
    setSelectedPackages(prev => ({
      ...prev,
      [category]: packageId
    }));
  };

  // Aktualizacja cen opcji wizualnych
  const handleVisualPriceChange = (price, selections) => {
    setVisualOptionsPrice(price);
    setSelectedVisualOptions(selections);
  };

  const calculateTotal = () => {
    let total = basePrice + visualOptionsPrice;
    
    const packagePrices = {
      'formal-1': 4420,
      'formal-2': 15640,
      'formal-3': 8113,
      'foundation': 26792,
      'utilities': 18990,
      'roofing': 18990,
      'turnkey': 39390,
      'terrace': 19675,
      'sanitary': 17680
    };

    Object.values(selectedPackages).forEach(packageId => {
      if (packageId && packagePrices[packageId]) {
        total += packagePrices[packageId];
      }
    });
    
    return total;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  };

  const totalPrice = calculateTotal();
  const priceWithVAT = totalPrice * 1.08;

  const getPackageName = (packageId) => {
    const allPackages = {
      'formal-1': 'Zgłoszenie Budynku Rekreacji Indywidualnej',
      'formal-2': 'Zgłoszenie budynku Mieszkalnego lub Pozwolenie na budowę',
      'formal-3': 'Formalność wykonam we własnym zakresie',
      'foundation': 'Ocieplona, zbrojona płyta fundamentowa',
      'utilities': 'Pakiet Instalacje Sanitarne i Elektryczne',
      'roofing': 'Pakiet Obróbki Blacharskie, Ocieplenie Sufitu',
      'turnkey': 'Kompletne wykończenie pod klucz',
      'terrace': 'Pakiet Taras i Oświetlenie Zewnętrzne',
      'sanitary': 'Szambo 10 m³ lub oczyszczalnia'
    };
    
    return allPackages[packageId] || 'Dodatkowy pakiet';
  };

  const getPackagePrice = (packageId) => {
    const packagePrices = {
      'formal-1': 4420,
      'formal-2': 15640,
      'formal-3': 8113,
      'foundation': 26792,
      'utilities': 18990,
      'roofing': 18990,
      'turnkey': 39390,
      'terrace': 19675,
      'sanitary': 17680
    };
    
    return packagePrices[packageId] || 0;
  };

  // Funkcja do uzyskania nazw wybranych opcji wizualnych
  const getVisualOptionsSummary = () => {
    if (!selectedVisualOptions || Object.keys(selectedVisualOptions).length === 0) {
      return [];
    }

    const summary = [];
    const houseConfig = HOUSE_CONFIGS.d126; // Zakładamy, że pracujemy z D-126

    Object.entries(selectedVisualOptions).forEach(([category, optionId]) => {
      const categoryOptions = houseConfig.options[category];
      if (Array.isArray(categoryOptions)) {
        const selectedOption = categoryOptions.find(opt => opt.id === optionId);
        if (selectedOption && selectedOption.price > 0) {
          summary.push({
            name: `${category.charAt(0).toUpperCase() + category.slice(1)}: ${selectedOption.name}`,
            price: selectedOption.price
          });
        }
      }
    });

    return summary;
  };

  const visualOptionsSummary = getVisualOptionsSummary();

  return (
    <>
      <Header black red />
      <div className="separate"></div>
      
      <div className="configurator">
        <VisualConfigurator onVisualPriceChange={handleVisualPriceChange} />
        <HousePlan/>

        <Configurator
          selectedPackages={selectedPackages}
          selectPackage={selectPackage}
          totalPrice={totalPrice}
          priceWithVAT={priceWithVAT}
          basePrice={basePrice}
          visualOptionsPrice={visualOptionsPrice}
          visualOptionsSummary={visualOptionsSummary}
          getPackageName={getPackageName}
          getPackagePrice={getPackagePrice}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <ModularHouseCalculator/>
      <Footer/>
    </>
  );
};

export default HouseConfigurator;