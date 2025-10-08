import React, { useState } from 'react';
import { FaInfoCircle, FaHome, FaRulerCombined, FaBed, FaBath, FaBolt, FaFilePdf, FaHeart, FaExchangeAlt, FaEye, FaCheck, FaPhone, FaEnvelope, FaUser, FaArrowRight } from 'react-icons/fa';
import './HouseConfigurator.css';
import Header from '../components/Header/Header';

import p1 from '../assets/ex/2-5.jpg';
import p2 from '../assets/ex/3-5.jpg';
import p3 from '../assets/ex/4-5.jpg';
import p4 from '../assets/ex/5-5.jpg';
import p5 from '../assets/ex/6-5.jpg';
import p6 from '../assets/ex/7-5.jpg';
import p7 from '../assets/ex/8-5.jpg';

// Import dodatkowych obrazków dla pakietów
import formalnosciImg from '../assets/btns/1.webp';
import fundamentyImg from '../assets/ex/3-5.jpg';
import instalacjeImg from '../assets/ex/4-5.jpg';
import dachImg from '../assets/ex/5-5.jpg';
import wykonczenieImg from '../assets/ex/6-5.jpg';
import ogrzewanieImg from '../assets/ex/7-5.jpg';
import tarasImg from '../assets/ex/8-5.jpg';
import sanitarnyImg from '../assets/ex/2-5.jpg';
import fotowoltaikaImg from '../assets/ex/3-5.jpg';

const HouseConfigurator = () => {
  // Zdjęcia domku
  const houseImages = [p1, p2, p3, p4, p5, p6, p7];

  const [selectedPackages, setSelectedPackages] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Cena bazowa domu
  const basePrice = 299000;

  // Dane pakietów z background images
  const packages = {
    formalities: [
      {
        id: 'formal-1',
        name: 'Zgłoszenie Budynku Rekreacji Indywidualnej',
        price: 4420,
        description: 'Pakiet Formalności zgłoszenia i pozwolenia na budowę (VAT 23%)',
        vat: '23%',
        backgroundImage: formalnosciImg,
        features: ['Komplet dokumentacji', 'Zgłoszenie budowlane', 'Obsługa urzędowa', 'VAT 23%']
      },
      {
        id: 'formal-2',
        name: 'Zgłoszenie budynku Mieszkalnego lub Pozwolenie na budowę',
        price: 15640,
        description: 'Kompleksowe formalności budowlane',
        vat: '23%',
        backgroundImage: formalnosciImg,
        features: ['Pozwolenie na budowę', 'Projekt budowlany', 'Konsultacje z architektem', 'Obsługa w urzędzie']
      },
      {
        id: 'formal-3',
        name: 'Formalności wykonam we własnym zakresie, kupuję tylko projekt',
        price: 8113,
        description: 'Podstawowy pakiet projektowy',
        vat: '23%',
        backgroundImage: formalnosciImg,
        features: ['Dokumentacja projektowa', 'Rzuty i przekroje', 'Specyfikacja techniczna', 'Konsultacje online']
      }
    ],
    construction: [
      {
        id: 'foundation',
        name: 'Ocieplona, zbrojona płyta fundamentowa',
        price: 26792,
        description: 'Wraz z wykonaniem posadzki betonowej (typu MIXOKRET)',
        backgroundImage: fundamentyImg,
        features: ['Płyta fundamentowa 25cm', 'Ocieplenie styropianem', 'Zbrojenie stalowe', 'Posadzka betonowa', 'Izolacja przeciwwilgociowa']
      },
      {
        id: 'utilities',
        name: 'Pakiet Instalacje Sanitarne i Elektryczne',
        price: 18990,
        description: 'Pakiet 3 - Kompletne instalacje',
        backgroundImage: instalacjeImg,
        features: [
          'Punkty elektryczne zgodnie z projektem',
          'Instalacje wodne i kanalizacyjne',
          'Przewody wody i odpływy',
          'Płyty OSB i G-K',
          'Ocieplenie ścian wełną mineralną'
        ]
      },
      {
        id: 'roofing',
        name: 'Pakiet Obróbki Blacharskie, Ocieplenie Sufitu, Płyty G-K Sufit',
        price: 18990,
        description: 'Pakiet 4 - Kompletny dach',
        backgroundImage: dachImg,
        features: [
          'Blacha na rąbek stojący (antracyt)',
          'Obróbki blacharskie',
          'Ocieplenie sufitu wełną 20cm',
          'Płyty G-K sufitowe',
          'Folie paroizolacyjne'
        ]
      }
    ],
    finishing: [
      {
        id: 'turnkey',
        name: 'Wykończenie pod klucz',
        price: 39390,
        description: 'Pakiet 5 - Profesjonalne wykończenie',
        backgroundImage: wykonczenieImg,
        features: [
          'Kompletne wykończenie pod klucz',
          'Materiały premium + robocizna',
          'Łazienka z ceramiką',
          'Montaż oświetlenia',
          'Malowanie dwukrotne',
          'Doradztwo projektowe'
        ]
      }
    ],
    heating: [
      {
        id: 'heating-1',
        name: 'Klimatyzacja z opcją grzania i chłodzenia',
        price: 9680,
        description: 'Opcja nr 1 - Nowoczesne ogrzewanie',
        backgroundImage: ogrzewanieImg,
        features: ['Klimatyzator multi-split', 'Grzenie i chłodzenie', 'Sterowanie zdalne', 'Class A+', 'Gwarancja 5 lat'],
        type: 'option'
      },
      {
        id: 'heating-2',
        name: 'Ogrzewanie foliami i kablami grzewczymi elektrycznymi',
        price: 7038,
        description: 'Opcja nr 2 - Na parterze i na piętrze',
        backgroundImage: ogrzewanieImg,
        features: ['Folie grzewcze pod panele', 'Kable w łazience', 'Termostaty pokojowe', 'Oszczędność energii'],
        type: 'option'
      }
    ],
    additional: [
      {
        id: 'terrace',
        name: 'Pakiet Taras i Oświetlenie Zewnętrzne',
        price: 19675,
        description: 'Pakiet 6 - Taras i oświetlenie',
        backgroundImage: tarasImg,
        features: [
          'Taras drewniany 10 m²',
          'Pergola aluminiowa',
          'Oświetlenie LED tarasu',
          'Oświetlenie fasady',
          'Zadaszenie wejściowe'
        ]
      },
      {
        id: 'sanitary',
        name: 'Pakiet Sanitarny',
        price: 17680,
        description: 'Pakiet 7 - Szambo lub oczyszczalnia',
        backgroundImage: sanitarnyImg,
        features: [
          'Szambo 10 m³ z tworzywa',
          'Wykop i montaż',
          'Podłączenie do budynku',
          'Zasypanie i utwardzenie',
          'Oczyszczalnia - wycena indywidualna'
        ]
      }
    ],
    photovoltaic: [
      {
        id: 'pv-1',
        name: 'Instalacja do 3,36 kWp + bank energii 5 kWh',
        price: 22190,
        description: 'Podstawowy system fotowoltaiczny',
        backgroundImage: fotowoltaikaImg,
        features: ['8 paneli 420W', 'Inwerder hybrydowy', 'Bank energii 5 kWh', 'Montaż i konfiguracja', 'Dotacja ulga termo']
      },
      {
        id: 'pv-2',
        name: 'Instalacja do 6,72 kWp + bank energii 10 kWh',
        price: 39119,
        description: 'Rozszerzony system fotowoltaiczny',
        backgroundImage: fotowoltaikaImg,
        features: ['16 paneli 420W', 'Inwerder 6kW', 'Bank energii 10 kWh', 'Samowystarczalność 90%', 'Monitoring online']
      }
    ]
  };

  const togglePackage = (packageId) => {
    setSelectedPackages(prev => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  };

  const calculateTotal = () => {
    let total = basePrice;
    Object.keys(selectedPackages).forEach(packageId => {
      if (selectedPackages[packageId]) {
        Object.keys(packages).forEach(category => {
          const pkg = packages[category].find(p => p.id === packageId);
          if (pkg) {
            total += pkg.price;
          }
        });
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
    console.log('Formularz wysłany:', formData);
    alert('Dziękujemy za zapytanie! Skontaktujemy się z Tobą wkrótce.');
  };

  const totalPrice = calculateTotal();

  return (
    <>
      <Header black red/>
      <div className='separate'></div>
      <div className="house-configurator">
        <div className="background-gradient"></div>
        
        <div className="container">
          <header className="project-header">
            <div className="header-content">
              <h1>Modułowy DOM 84</h1>
              <p className="project-subtitle">Nowoczesny dom parterowy dla wymagającej rodziny</p>
              <div className="project-highlights">
                <div className="highlight-item">
                  <FaRulerCombined className="highlight-icon" />
                  <span>84 m²</span>
                </div>
                <div className="highlight-item">
                  <FaBed className="highlight-icon" />
                  <span>3 sypialnie</span>
                </div>
                <div className="highlight-item">
                  <FaBath className="highlight-icon" />
                  <span>1 łazienka</span>
                </div>
                <div className="highlight-item">
                  <FaHome className="highlight-icon" />
                  <span>299 000 zł</span>
                </div>
              </div>
            </div>
          </header>

          <section className="visualization-section">
            <div className="visualization-main">
              <div className="main-image">
                <img 
                  src={houseImages[activeImage]} 
                  alt={`Wizualizacja domu - widok ${activeImage + 1}`}
                />
                <div className="image-nav">
                  <button 
                    onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : houseImages.length - 1)}
                    className="nav-btn"
                  >
                    ‹
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => prev < houseImages.length - 1 ? prev + 1 : 0)}
                    className="nav-btn"
                  >
                    ›
                  </button>
                </div>
              </div>
              
              <div className="image-thumbnails">
                {houseImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`Miniatura ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="visualization-info">
              <h3>Opis projektu</h3>
              <p>
                Modułowy DOM 84 to nowoczesny, energooszczędny dom parterowy zaprojektowany 
                z myślą o komforcie rodziny. Przestronny salon połączony z kuchnią, 
                3 słoneczne sypialnie oraz funkcjonalna łazienka tworzą idealną przestrzeń 
                do życia.
              </p>
              <div className="features-list">
                <div className="feature">
                  <FaCheck className="feature-icon" />
                  <span>Energooszczędna konstrukcja</span>
                </div>
                <div className="feature">
                  <FaCheck className="feature-icon" />
                  <span>Nowoczesne materiały</span>
                </div>
                <div className="feature">
                  <FaCheck className="feature-icon" />
                  <span>Gotowy do zamieszkania w 90 dni</span>
                </div>
                <div className="feature">
                  <FaCheck className="feature-icon" />
                  <span>Gwarancja 10 lat</span>
                </div>
              </div>
            </div>
          </section>

          <section className="configurator-section">
            <div className="configurator-header">
              <h2>Konfigurator Domu</h2>
              <p>Wybierz pakiety dodatkowe i dostosuj dom do swoich potrzeb</p>
            </div>

            <div className="configurator-content">
              <div className="price-summary-card">
                <div className="base-price">
                  <span>Cena bazowa domu:</span>
                  <span>{basePrice.toLocaleString('pl-PL')} zł</span>
                </div>
                <div className="selected-packages">
                  {Object.keys(selectedPackages).map(packageId => {
                    if (selectedPackages[packageId]) {
                      let pkg = null;
                      Object.keys(packages).forEach(category => {
                        const found = packages[category].find(p => p.id === packageId);
                        if (found) pkg = found;
                      });
                      return pkg ? (
                        <div key={packageId} className="selected-item">
                          <span>{pkg.name}</span>
                          <span>+ {pkg.price.toLocaleString('pl-PL')} zł</span>
                        </div>
                      ) : null;
                    }
                    return null;
                  })}
                </div>
                <div className="total-price">
                  <span>Całkowita cena:</span>
                  <span>{totalPrice.toLocaleString('pl-PL')} zł</span>
                </div>
              </div>

              <div className="packages-container">
                <PackageSection 
                  title="Pakiet Formalności"
                  packages={packages.formalities}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Fundamenty"
                  packages={packages.construction.filter(p => p.id === 'foundation')}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Instalacje Sanitarne i Elektryczne"
                  packages={packages.construction.filter(p => p.id === 'utilities')}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Dach i Sufity"
                  packages={packages.construction.filter(p => p.id === 'roofing')}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Wykończenie pod klucz"
                  packages={packages.finishing}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Ogrzewanie i Klimatyzacja"
                  packages={packages.heating}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                  isOption={true}
                />

                <PackageSection 
                  title="Taras i Oświetlenie"
                  packages={packages.additional.filter(p => p.id === 'terrace')}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Pakiet Sanitarny"
                  packages={packages.additional.filter(p => p.id === 'sanitary')}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />

                <PackageSection 
                  title="Fotowoltaika"
                  packages={packages.photovoltaic}
                  selectedPackages={selectedPackages}
                  onToggle={togglePackage}
                />
              </div>
            </div>
          </section>

          <section className="contact-section">
            <div className="contact-content">
              <div className="contact-info">
                <h2>Skontaktuj się z nami</h2>
                <p>Masz pytania dotyczące projektu? Chcesz omówić szczegóły? Jesteśmy do Twojej dyspozycji!</p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <FaPhone className="contact-icon" />
                    <span>+48 728 866 825</span>
                  </div>
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <span>kontakt@m2notarialnie.pl</span>
                  </div>
                  <div className="contact-item">
                    <FaHome className="contact-icon" />
                    <span>Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa</span>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FaUser className="input-icon" />
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      <FaEnvelope className="input-icon" />
                      Adres email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <FaPhone className="input-icon" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Wiadomość</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Opisz swoje potrzeby, zadaj pytanie dotyczące projektu..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <span>Wyślij zapytanie</span>
                  <FaArrowRight className="btn-icon" />
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

// Komponent sekcji pakietów z background image
const PackageSection = ({ title, packages, selectedPackages, onToggle, isOption = false }) => {
  if (packages.length === 0) return null;

  return (
    <div className="package-section">
      <h3 style={{fontSize: '30px', fontWeight: '800'}}>{title}</h3>
      <div className="packages-grid">
        {packages.map(pkg => (
          <div 
            key={pkg.id}
            className={`package-card ${selectedPackages[pkg.id] ? 'selected' : ''} ${isOption ? 'option' : ''}`}
            onClick={() => onToggle(pkg.id)}
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255), rgba(255, 255, 255, 0.83)), url(${pkg.backgroundImage})`
            }}
          >
            <div className="package-header">
              <h4 style={{fontWeight: '800'}}>{pkg.name}</h4>
              <div className="package-price">
                {pkg.price.toLocaleString('pl-PL')} zł
                {pkg.vat && <span className="vat">w tym VAT {pkg.vat}</span>}
              </div>
            </div>
            
            <p className="package-description">{pkg.description}</p>
            
            {pkg.features && (
              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index} style={{marginTop: 10}}>
                    <FaCheck className="feature-check" style={{marginRight: 10}} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            
            <div className="package-actions">
              <button className="info-btn">
                <FaInfoCircle />
                Informacje
              </button>
              <div className="select-indicator">
                {selectedPackages[pkg.id] ? (
                  <>
                    <FaCheck className="selected-check" />
                    Wybrano
                  </>
                ) : (
                  'Wybierz'
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseConfigurator;