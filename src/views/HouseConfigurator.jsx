import React, { useState } from 'react';
import Header from '../components/Header/Header';
import ProjectHeader from '../components/ProjectHeader/ProjectHeader';
import Visualization from '../components/Visualization/Visualization';
import Configurator from '../components/Configurator/Configurator';
import './HouseConfigurator.css';

// Import obrazków
import p1 from '../assets/ex/2-5.jpg';
import p2 from '../assets/ex/3-5.jpg';
import p3 from '../assets/ex/4-5.jpg';
import p4 from '../assets/ex/5-5.jpg';
import p5 from '../assets/ex/6-5.jpg';
import p6 from '../assets/ex/7-5.jpg';
import p7 from '../assets/ex/8-5.jpg';
import Footer from '../components/Footer/Footer';
import VisualConfigurator from '../components/VisualConfigurator/VisualConfigurator';
import HousePlan from '../components/HousePlan/HousePlan';
import NotarialCalculator from '../components/NotarialCalculator/NotarialCalculator';
import ModularHouseCalculator from '../components/ModularHouseCalculator/ModularHouseCalculator';

const HouseConfigurator = () => {
  const houseImages = [p1, p2, p3, p4, p5, p6, p7];
  const [activeImage, setActiveImage] = useState(0);
  
  const [selectedPackages, setSelectedPackages] = useState({});

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

  const calculateTotal = () => {
    let total = basePrice;
    
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
  const priceWithVAT = totalPrice * 1.23; 

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

  return (
    <>
      <Header black red />
      <div className="separate"></div>
      
      <div className="configurator">
        {/* <ProjectHeader basePrice={basePrice} /> */}
        <VisualConfigurator />
        <HousePlan/>
        <ModularHouseCalculator/>
        <Configurator
          selectedPackages={selectedPackages}
          selectPackage={selectPackage}
          totalPrice={totalPrice}
          priceWithVAT={priceWithVAT}
          basePrice={basePrice}
          getPackageName={getPackageName}
          getPackagePrice={getPackagePrice}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <Footer/>
    </>
  );
};

export default HouseConfigurator;