// HouseConfigurator.js
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Configurator from '../components/Configurator/Configurator';
import './HouseConfigurator.css';

import { HOUSE_CONFIGS } from '../utils/houseConfigs'
import { PACKAGE_CONFIGS } from '../utils/packageConfigs'
import Footer from '../components/Footer/Footer';
import VisualConfigurator from '../components/VisualConfigurator/VisualConfigurator';
import HousePlan from '../components/HousePlan/HousePlan';
import ModularHouseCalculator from '../components/ModularHouseCalculator/ModularHouseCalculator';
import { useParams } from 'react-router-dom';

const HouseConfigurator = () => {
  const { id } = useParams()
  const [selectedOptions, setSelectedOptions] = useState({});
  const [visualOptionsPrice, setVisualOptionsPrice] = useState(0);
  const [selectedVisualOptions, setSelectedVisualOptions] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const basePrice = 299000;

  // Zmodyfikowana funkcja - pozwala na odznaczanie pojedynczych opcji
  const selectOption = (optionId, packageIndex) => {
    setSelectedOptions(prev => {
      const newState = { ...prev };
      const optionParts = optionId.split('-');
      const currentPackageIndex = optionParts[1];
      
      // Sprawdź czy pakiet ma tylko jedną opcję
      const housePackages = PACKAGE_CONFIGS[id] || [];
      const currentPackage = housePackages[packageIndex];
      const hasSingleOption = currentPackage.options.length === 1;
      
      if (hasSingleOption) {
        // Dla pakietów z jedną opcją - toggle
        if (newState[optionId]) {
          delete newState[optionId];
        } else {
          newState[optionId] = true;
        }
      } else {
        // Dla pakietów z wieloma opcjami - zachowanie radio
        // Usuń wszystkie opcje z tego samego pakietu
        Object.keys(newState).forEach(key => {
          const keyParts = key.split('-');
          if (keyParts.length === 3) {
            const keyPackageIndex = keyParts[1];
            if (keyPackageIndex === currentPackageIndex) {
              delete newState[key];
            }
          }
        });
        
        // Jeśli kliknięta opcja nie była wcześniej zaznaczona, dodaj ją
        if (!prev[optionId]) {
          newState[optionId] = true;
        }
        // Jeśli była zaznaczona, to po usunięciu wszystkich pozostanie odznaczona
      }
      
      return newState;
    });
  };

  // Aktualizacja cen opcji wizualnych
  const handleVisualPriceChange = (price, selections) => {
    setVisualOptionsPrice(price);
    setSelectedVisualOptions(selections);
  };

  // Obliczanie całkowitej ceny na podstawie PACKAGE_CONFIGS
  const calculateTotal = () => {
    let total = basePrice + visualOptionsPrice;
    
    // Pobierz konfigurację dla danego domu
    const housePackages = PACKAGE_CONFIGS[id] || [];
    
    // Przejdź przez wszystkie pakiety i ich opcje
    housePackages.forEach((packageConfig, packageIndex) => {
      packageConfig.options.forEach((option, optionIndex) => {
        const optionId = `${id}-${packageIndex}-${optionIndex}`;
        if (selectedOptions[optionId]) {
          total += option.price;
        }
      });
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

  // Pobieranie nazw i cen pakietów z PACKAGE_CONFIGS
  const getPackageInfo = (optionId) => {
    if (!optionId) return { name: '', price: 0 };
    
    const parts = optionId.split('-');
    if (parts.length !== 3) return { name: '', price: 0 };
    
    const [houseId, packageIndex, optionIndex] = parts;
    const housePackages = PACKAGE_CONFIGS[houseId];
    
    if (!housePackages || !housePackages[packageIndex] || !housePackages[packageIndex].options[optionIndex]) {
      return { name: '', price: 0 };
    }
    
    const option = housePackages[packageIndex].options[optionIndex];
    return {
      name: option.name,
      price: option.price
    };
  };

  // Pobieranie podsumowania wybranych pakietów
  const getSelectedPackagesSummary = () => {
    const summary = [];
    
    Object.keys(selectedOptions).forEach(optionId => {
      if (selectedOptions[optionId]) {
        const packageInfo = getPackageInfo(optionId);
        if (packageInfo.name && packageInfo.price > 0) {
          summary.push({
            id: optionId,
            name: packageInfo.name,
            price: packageInfo.price
          });
        }
      }
    });
    
    return summary;
  };

  const selectedPackagesSummary = getSelectedPackagesSummary();

  // Funkcja do uzyskania nazw wybranych opcji wizualnych
  const getVisualOptionsSummary = () => {
    if (!selectedVisualOptions || Object.keys(selectedVisualOptions).length === 0) {
      return [];
    }

    const summary = [];
    const houseConfig = HOUSE_CONFIGS.d126;

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
          selectedOptions={selectedOptions}
          selectOption={selectOption}
          totalPrice={totalPrice}
          priceWithVAT={priceWithVAT}
          basePrice={basePrice}
          visualOptionsPrice={visualOptionsPrice}
          selectedPackagesSummary={selectedPackagesSummary}
          visualOptionsSummary={visualOptionsSummary}
          formData={formData}
          houseId={id}
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