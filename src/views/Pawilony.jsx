import React from 'react'
import Hero from '../components/Hero/Hero'
import Background from '../assets/pexels-pixabay-48148.jpg'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import FAQItem from '../components/FAQItem/FAQItem'

import projekt1 from '../assets/pawilony/dwa.png'
import projekt2 from '../assets/pawilony/3/1.png'
import projekt3 from '../assets/pawilony/4/dsad.png'
import projekt4 from '../assets/pawilony/5/2.png'
import projekt5 from '../assets/pawilony/6/4.png'
import Footer from '../components/Footer/Footer'
import './Pawilony.css'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'
import { 
  FaBuilding, 
  FaStore, 
  FaIndustry, 
  FaBoxes, 
  FaTruck, 
  FaCogs, 
  FaExpand,
  FaToolbox,
  FaHammer,
  FaRulerCombined,
  FaClock,
  FaMoneyBillWave,
  FaRocket,
  FaStar,
  FaShieldAlt,
  FaCheckCircle,
  FaCog,
  FaHandshake
} from 'react-icons/fa'
import HeroSlider from '../components/HeroSlider/HeroSlider'

export default function Pawilony() {
  return (
    <div className="business-modules-page">
      <Header/>
      <HeroSlider 
      images={[projekt2, projekt3, projekt4, projekt5]} content={
                    <div className="hero-slider__overlay">
              <div className="hero-slider__content">
                <h1 className="hero-slider__title">Modułowe rozwiązania dla <span style={{color: 'var(--primary-color)'}}>biznesu</span></h1>
              </div>
            </div>
      }
      />
      <div className='section-spacer-md'></div>
      <div className='section-spacer-md'></div>

      {/* Sekcja główna - Czym są rozwiązania modułowe */}
      <div className="business-modules-container">
        <div className="business-modules-hero-cards">
          <div className="business-modules-feature-card business-modules-feature-card--primary">
            <div className="business-modules-card-icon">
              <FaBuilding />
            </div>
            <div className="business-modules-card-content">
              <h2 className="business-modules-card-title">Nowoczesne rozwiązania modułowe</h2>
              <p className="business-modules-card-text">Pawilony handlowe, biura modułowe i obiekty usługowe to przyszłość elastycznego biznesu. Dzięki technologii modułowej możesz szybko i efektywnie kosztowo rozwinąć swoją przestrzeń biznesową bez długotrwałych budów i skomplikowanych formalności.</p>
              <p className="business-modules-card-text">Nasze konstrukcje modułowe łączą w sobie trwałość tradycyjnych budynków z elastycznością i szybkością montażu charakterystyczną dla rozwiązań prefabrykowanych.</p>
            </div>
          </div>

          <div className="business-modules-feature-card business-modules-feature-card--accent">
            <div className="business-modules-card-icon">
              <FaStar />
            </div>
            <div className="business-modules-card-content">
              <h2 className="business-modules-card-title">Kompleksowa oferta</h2>
              <p className="business-modules-card-text">Oferujemy pełen zakres usług - od projektu, przez produkcję, transport i montaż, po serwis gwarancyjny. Dostarczamy gotowe do użytku obiekty w rekordowym czasie, zachowując najwyższe standardy jakości.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja rodzaje rozwiązań */}
      <div className="business-modules-container">
        <div className="business-modules-section-header">
          <h2 className="business-modules-section-title">Nasze rozwiązania modułowe</h2>
          <p className="business-modules-section-subtitle">Oferujemy szeroką gamę gotowych rozwiązań dostosowanych do różnych potrzeb biznesowych</p>
        </div>
        
        <div className="business-modules-solutions-grid">
          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaStore />
            </div>
            <h3 className="business-modules-solution-title">Pawilony handlowe</h3>
            <p className="business-modules-solution-description">Nowoczesne pawilony handlowe idealne na sklepy, punkty usługowe, gastronomię. Szybki montaż i gotowość do prowadzenia działalności w kilka tygodni.</p>
            <ul className="business-modules-solution-features">
              <li>Powierzchnie 20-200 m²</li>
              <li>Możliwość personalizacji</li>
              <li>Przyłącza mediów</li>
              <li>Dostosowanie do branży</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaIndustry />
            </div>
            <h3 className="business-modules-solution-title">Biura modułowe</h3>
            <p className="business-modules-solution-description">Funkcjonalne przestrzenie biurowe dla małych i średnich firm. Idealne rozwiązanie przy dynamicznym rozwoju zespołu.</p>
            <ul className="business-modules-solution-features">
              <li>Konfigurowalne pomieszczenia</li>
              <li>Izolacja akustyczna</li>
              <li>Systemy wentylacji</li>
              <li>Gotowe do pracy</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaBoxes />
            </div>
            <h3 className="business-modules-solution-title">Magazyny modułowe</h3>
            <p className="business-modules-solution-description">Bezpieczne i funkcjonalne przestrzenie magazynowe z możliwością łatwej rozbudowy w miarę rozwoju biznesu.</p>
            <ul className="business-modules-solution-features">
              <li>Różne klasy izolacji</li>
              <li>Dostęp dla wózków</li>
              <li>Systemy zabezpieczeń</li>
              <li>Możliwość rozbudowy</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaTruck />
            </div>
            <h3 className="business-modules-solution-title">Obiekty branżowe</h3>
            <p className="business-modules-solution-description">Specjalistyczne obiekty dostosowane do wymagań konkretnych branż - od gastronomii po usługi profesjonalne.</p>
            <ul className="business-modules-solution-features">
              <li>Dostosowanie do wymogów</li>
              <li>Certyfikaty branżowe</li>
              <li>Specjalistyczne wyposażenie</li>
              <li>Projekt pod klucz</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja procesu */}
      <div className="business-modules-process-section">
        <div className="business-modules-container">
          <div className="business-modules-section-header">
            <h2 className="business-modules-section-title">Jak działamy?</h2>
            <p className="business-modules-section-subtitle">Proces realizacji w 4 prostych krokach</p>
          </div>
          
          <div className="business-modules-process-flow">
            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">1</div>
              <div className="business-modules-step-icon">
                <FaHandshake />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Konsultacja i projekt</h3>
                <p className="business-modules-step-description">Bezpłatna konsultacja, analiza potrzeb i stworzenie indywidualnego projektu dopasowanego do Twojej działalności.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">2</div>
              <div className="business-modules-step-icon">
                <FaCog />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Produkcja modułów</h3>
                <p className="business-modules-step-description">Produkcja elementów w kontrolowanych warunkach fabrycznych zapewniająca najwyższą jakość i precyzję wykonania.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">3</div>
              <div className="business-modules-step-icon">
                <FaTruck />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Transport i montaż</h3>
                <p className="business-modules-step-description">Profesjonalny transport na miejsce inwestycji i szybki montaż przez wykwalifikowany zespół.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">4</div>
              <div className="business-modules-step-icon">
                <FaCheckCircle />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Gotowy obiekt</h3>
                <p className="business-modules-step-description">Oddanie gotowego do użytku obiektu z pełną dokumentacją i gwarancją jakości.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja dla kogo */}
      <div className="business-modules-audience-section">
        <div className="business-modules-container">
          <div className="business-modules-section-header">
            <h2 className="business-modules-section-title" style={{color: 'white'}}>Dla kogo są nasze rozwiązania?</h2>
            <p className="business-modules-section-subtitle" style={{color: 'white'}}>Idealne rozwiązanie dla różnych typów biznesu</p>
          </div>
          
          <div className="business-modules-audience-grid">
            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaStore />
              </div>
              <h3 className="business-modules-audience-title">Handel detaliczny</h3>
              <p className="business-modules-audience-description">Sklepy spożywcze, odzieżowe, elektroniczne - szybkie uruchomienie punktu sprzedaży w dogodnej lokalizacji.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaIndustry />
              </div>
              <h3 className="business-modules-audience-title">Przemysł i produkcja</h3>
              <p className="business-modules-audience-description">Biura terenowe, szatnie, pomieszczenia socjalne, magazyny - elastyczne rozwiązania dla przemysłu.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaBuilding />
              </div>
              <h3 className="business-modules-audience-title">Usługi profesjonalne</h3>
              <p className="business-modules-audience-description">Gabinet lekarski, salon fryzjerski, biuro rachunkowe - prestiżowe przestrzenie dla profesjonalistów.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaBoxes />
              </div>
              <h3 className="business-modules-audience-title">Logistyka i magazynowanie</h3>
              <p className="business-modules-audience-description">Tymczasowe magazyny, punkty dystrybucyjne, biura logistyczne - rozwiązania dla łańcucha dostaw.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja korzyści */}
      <div className="business-modules-container">
        <div className="business-modules-benefits-grid">
          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaClock />
            </div>
            <h3 className="business-modules-benefit-title">Szybka realizacja</h3>
            <p className="business-modules-benefit-description">Gotowy obiekt nawet w 4-8 tygodni od złożenia zamówienia. Brak opóźnień pogodowych.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaMoneyBillWave />
            </div>
            <h3 className="business-modules-benefit-title">Oszczędność kosztów</h3>
            <p className="business-modules-benefit-description">Znacznie niższe koszty inwestycji w porównaniu z tradycyjnym budownictwem. Przewidywalny budżet.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaExpand />
            </div>
            <h3 className="business-modules-benefit-title">Elastyczność i mobilność</h3>
            <p className="business-modules-benefit-description">Możliwość rozbudowy, przebudowy lub przeniesienia obiektu w miarę zmieniających się potrzeb.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaShieldAlt />
            </div>
            <h3 className="business-modules-benefit-title">Gwarancja jakości</h3>
            <p className="business-modules-benefit-description">Produkcja w kontrolowanych warunkach fabrycznych zapewnia najwyższą jakość wykonania.</p>
          </div>
        </div>
      </div>

      {/* Sekcja FAQ */}
      <div className='business-modules-faq-section'>
        <div className="business-modules-container">
          <h2 className="business-modules-faq-title">Często zadawane pytania</h2>
          <p className="business-modules-faq-subtitle">Masz pytania dotyczące rozwiązań modułowych? Znajdź odpowiedź!</p>
          <div className="business-modules-faq-container">
            <FAQItem question={'Ile trwa montaż pawilonu handlowego?'} answer={'Czas montażu zależy od wielkości i specyfikacji obiektu. Standardowe pawilony handlowe montujemy w 2-4 tygodnie. Dzięki prefabrykacji większość prac wykonujemy w fabryce, co znacząco skraca czas realizacji na miejscu inwestycji.'} />
            <FAQItem question={'Czy budynki modułowe są trwałe?'} answer={'Tak, nasze budynki modułowe spełniają wszystkie normy budowlane i są tak samo trwałe jak tradycyjne konstrukcje. Stosujemy wysokiej jakości materiały i nowoczesne technologie, które zapewniają żywotność porównywalną z budownictwem murowanym.'} />
            <FAQItem question={'Czy potrzebuję pozwolenia na budowę?'} answer={'Większość naszych obiektów modułowych nie wymaga pozwolenia na budowę, ponieważ są uznawane za tymczasowe obiekty budowlane. Wszystkie formalności załatwiamy za klienta, zapewniając pełną zgodność z prawem budowlanym.'} />
            <FAQItem question={'Czy mogę rozbudować istniejący obiekt?'} answer={'Tak, to jedna z głównych zalet rozwiązań modułowych. W każdej chwili możesz łatwo rozbudować swój obiekt o dodatkowe moduły, dostosowując przestrzeń do aktualnych potrzeb biznesowych.'} />
         </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}