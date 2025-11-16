
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
  });

  const basePrice = 299000;

  
  const selectOption = (optionId, packageIndex) => {
    setSelectedOptions(prev => {
      const newState = { ...prev };
      const optionParts = optionId.split('-');
      const currentPackageIndex = optionParts[1];
      
      
      const housePackages = PACKAGE_CONFIGS[id] || [];
      const currentPackage = housePackages[packageIndex];
      const hasSingleOption = currentPackage.options.length === 1;
      
      if (hasSingleOption) {
        
        if (newState[optionId]) {
          delete newState[optionId];
        } else {
          newState[optionId] = true;
        }
      } else {
        
        
        Object.keys(newState).forEach(key => {
          const keyParts = key.split('-');
          if (keyParts.length === 3) {
            const keyPackageIndex = keyParts[1];
            if (keyPackageIndex === currentPackageIndex) {
              delete newState[key];
            }
          }
        });
        
        
        if (!prev[optionId]) {
          newState[optionId] = true;
        }
        
      }
      
      return newState;
    });
  };

  
  const handleVisualPriceChange = (price, selections) => {
    setVisualOptionsPrice(price);
    setSelectedVisualOptions(selections);
  };

  
  const calculateTotal = () => {
    let total = basePrice + visualOptionsPrice;
    
    
    const housePackages = PACKAGE_CONFIGS[id] || [];
    
    
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

  
  const prepareConfigurationData = () => {
    
    const houseConfig = HOUSE_CONFIGS[id] || {};
    
    
    const selectedPackages = [];
    const housePackages = PACKAGE_CONFIGS[id] || [];
    
    housePackages.forEach((packageConfig, packageIndex) => {
      packageConfig.options.forEach((option, optionIndex) => {
        const optionId = `${id}-${packageIndex}-${optionIndex}`;
        if (selectedOptions[optionId]) {
          selectedPackages.push({
            packageName: packageConfig.title,
            optionName: option.name,
            optionPrice: option.price,
            packageIndex,
            optionIndex
          });
        }
      });
    });

    
    const visualSelections = [];
    if (selectedVisualOptions && Object.keys(selectedVisualOptions).length > 0) {
      const houseConfig = HOUSE_CONFIGS.d126; 
      
      Object.entries(selectedVisualOptions).forEach(([category, optionId]) => {
        const categoryOptions = houseConfig.options[category];
        if (Array.isArray(categoryOptions)) {
          const selectedOption = categoryOptions.find(opt => opt.id === optionId);
          if (selectedOption) {
            visualSelections.push({
              category: category,
              optionName: selectedOption.name,
              optionPrice: selectedOption.price,
              optionId: selectedOption.id
            });
          }
        }
      });
    }

    return {
      
      houseId: id,
      houseName: houseConfig.name || `Dom ${id}`,
      basePrice: basePrice,
      
      
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      },
      
      
      configuration: {
        packages: selectedPackages,
        visualOptions: visualSelections,
        totalPackagesPrice: selectedPackages.reduce((sum, pkg) => sum + pkg.optionPrice, 0),
        totalVisualOptionsPrice: visualOptionsPrice
      },
      
      
      pricing: {
        subtotal: totalPrice,
        vat: totalPrice * 0.08,
        total: priceWithVAT
      },
      
      
      timestamp: new Date().toISOString(),
      configurationSummary: {
        totalOptions: selectedPackages.length + visualSelections.length,
        hasCustomizations: selectedPackages.length > 0 || visualSelections.length > 0
      }
    };
  };

// W HouseConfigurator.js zaktualizuj funkcję handleSubmit:

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Przygotuj dane konfiguracji
  const configurationData = prepareConfigurationData();
  
  console.log('📦 Dane konfiguracji do wysłania:', configurationData);
  
  try {
    // Wyślij dane do backendu
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/emails/house-configuration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configurationData)
    });

    const result = await response.json();

    if (result.success) {
      alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.\n\nDane konfiguracji zostały zapisane.');
      
      // Opcjonalnie: reset formularza
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      alert('Wystąpił błąd podczas wysyłania formularza: ' + result.error);
    }

  } catch (error) {
    console.error('Błąd wysyłania formularza:', error);
    alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
  }
};

  const totalPrice = calculateTotal();
  const priceWithVAT = totalPrice * 1.08;

  
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
      <ModularHouseCalculator totalPrice={priceWithVAT} minOwnContribution={50}/>
      <p style={{maxWidth: '700px', margin: '50px auto', color: 'gray', fontSize: '14px'}}>
Ogłoszenie ma charakter wyłącznie informacyjny i nie stanowi oferty w rozumieniu art. 66 § 1 ani art. 71 Kodeksu cywilnego. Nie jest to również oferta handlowa, porada prawna ani zaproszenie do rokowań. Wszelkie podane kwoty i wyliczenia mają charakter orientacyjny i nie stanowią wiążącej oferty.    </p>
      <Footer/>
    </>
  );
};

export default HouseConfigurator;