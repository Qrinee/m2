import React from 'react'
import Hero from '../components/Hero/Hero'
import Background from '../assets/pexels-pixabay-48148.jpg'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import FAQItem from '../components/FAQItem/FAQItem'

import projekt1 from '../assets/slajdy_modulowe/1.jpg'
import projekt2 from '../assets/slajdy_modulowe/2.jpg'
import projekt3 from '../assets/slajdy_modulowe/3.jpg'
import projekt4 from '../assets/slajdy_modulowe/4.jpg'
import projekt5 from '../assets/slajdy_modulowe/5.jpg'
import projekt6 from '../assets/slajdy_modulowe/7.jpg'
import projekt7 from '../assets/slajdy_modulowe/7.jpg'
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
      images={[projekt1, projekt2, projekt3, projekt4, projekt5, projekt6, projekt7]} content={
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
              <p className="business-modules-card-text">Pawilony handlowe, biura modułowe i obiekty usługowe to przyszłość elastycznego biznesu. Dzięki technologii modułowej możesz szybko, bezpiecznie i ekonomicznie rozwijać swoją przestrzeń firmową — bez wielomiesięcznych budów i skomplikowanych formalności.</p>
              <p className="business-modules-card-text">Nasze konstrukcje modułowe łączą trwałość tradycyjnych budynków z elastycznością i błyskawicznym montażem charakterystycznym dla nowoczesnych rozwiązań prefabrykowanych. Moduły można dowolnie rozbudowywać, przenosić i dostosowywać do zmieniających się potrzeb, co czyni je idealnym wyborem dla firm dynamicznie rozwijających swoją działalność.          Dodatkowo zastosowane technologie zapewniają wysoką energooszczędność, komfort użytkowania i niskie koszty eksploatacji, co przekłada się na realne korzyści zarówno dla biznesu, jak i środowiska.</p>
            </div>
          </div>

          <div className="business-modules-feature-card business-modules-feature-card--accent">
            <div className="business-modules-card-icon">
              <FaStar />
            </div>
            <div className="business-modules-card-content">
              <h2 className="business-modules-card-title">Kompleksowa oferta</h2>
              <p className="business-modules-card-text">

                Zapewniamy pełną obsługę inwestycji — od koncepcji i projektu, przez produkcję, transport i montaż, aż po wsparcie posprzedażowe. Dostarczamy obiekty gotowe do użytkowania w krótkim czasie, dbając o najwyższą jakość wykonania i pełną zgodność z wymaganiami Klienta.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja rodzaje rozwiązań */}
      <div className="business-modules-container">
        <div className="business-modules-section-header">
          <h2 className="business-modules-section-title">Nowoczesne rozwiązania modułowe</h2>
          <p className="business-modules-section-subtitle">Dostarczamy szeroki wybór gotowych obiektów modułowych, precyzyjnie dopasowanych do zróżnicowanych potrzeb biznesowych — od biur i magazynów, po obiekty usługowe i zaplecza techniczne.</p>
        </div>
        
        <div className="business-modules-solutions-grid">
          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaStore />
            </div>
            <h3 className="business-modules-solution-title">Pawilony handlowe</h3>
            <p className="business-modules-solution-description">Nowoczesne i energooszczędne pawilony handlowe idealne dla branży retail, usług oraz gastronomii. Modułowa konstrukcja pozwala rozpocząć działalność w zaledwie kilka tygodni — bez skomplikowanych formalności i długich procesów budowlanych.</p>
            <ul className="business-modules-solution-features">
              <li>Powierzchnia od 20 do 200 m²</li>
              <li>Możliwość pełnej personalizacji wnętrza i fasady</li>
              <li>Przygotowane pod wszystkie przyłącza mediów</li>
              <li>Nowoczesny design przyciągający klientów</li>
              <li>Wysoka trwałość i odporność na warunki atmosferyczne</li>
              <li>Opcja rozbudowy wraz z rozwojem działalności</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaIndustry />
            </div>
            <h3 className="business-modules-solution-title">Biura modułowe</h3>
            <p className="business-modules-solution-description">Funkcjonalne i komfortowe przestrzenie biurowe przeznaczone dla firm, które potrzebują szybkiej adaptacji i elastycznego wzrostu. Doskonały wybór dla startupów, firm usługowych oraz instytucji.</p>
            <ul className="business-modules-solution-features">
              <li>Konfigurowalne układy pomieszczeń</li>
              <li>Izolacja akustyczna zapewniająca komfort pracy</li>
              <li>Nowoczesne systemy wentylacji i klimatyzacji</li>
              <li>Możliwość dodania sal konferencyjnych i zaplecza socjalnego</li>
              <li>Gotowe do pracy zaraz po montażu</li>
              <li>Reprezentacyjny wygląd budynku</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaBoxes />
            </div>
            <h3 className="business-modules-solution-title">Magazyny modułowe</h3>
            <p className="business-modules-solution-description">Bezpieczne, funkcjonalne i skalowalne przestrzenie magazynowe — idealne dla firm logistycznych, e-commerce, produkcyjnych oraz lokalnych przedsiębiorców.</p>
            <ul className="business-modules-solution-features">
              <li>Różne klasy izolacji termicznej</li>
              <li>Wysokie wjazdy i dostosowanie do wózków widłowych</li>
              <li>Nowoczesne systemy zabezpieczeń (monitoring, czujniki, alarmy)</li>
              <li>Możliwość rozbudowy bez przerywania pracy</li>
              <li>Szybki montaż i minimalizacja przestojów w firmie</li>
              <li>Możliwość dostosowania pod przechowywanie specjalistyczne</li>
            </ul>
          </div>

          <div className="business-modules-solution-card">
            <div className="business-modules-solution-icon">
              <FaTruck />
            </div>
            <h3 className="business-modules-solution-title">Obiekty branżowe</h3>
            <p className="business-modules-solution-description">Specjalistyczne konstrukcje modułowe zaprojektowane pod wymagania konkretnych sektorów – od gastronomii i usług medycznych, po salony beauty, warsztaty czy obiekty usługowe.</p>
            <ul className="business-modules-solution-features">
              <li>Pełne dopasowanie do wymogów i norm danej branży</li>
              <li>Możliwość wyposażenia w instalacje specjalistyczne</li>
              <li>Możliwość realizacji pod klucz</li>
              <li>Elastyczność – obiekt może być przeniesiony lub rozbudowany</li>
            </ul>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja procesu */}
      <div className="business-modules-process-section">
        <div className="business-modules-container">
          <div className="business-modules-section-header">
            <h2 className="business-modules-section-title">Jak przebiega współpraca</h2>
            <p className="business-modules-section-subtitle">Przejrzysty proces realizacji w czterech kluczowych etapach</p>
          </div>
          
          <div className="business-modules-process-flow">
            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">1</div>
              <div className="business-modules-step-icon">
                <FaHandshake />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Konsultacja koncepcja</h3>
                <p className="business-modules-step-description">Bezpłatna rozmowa, analiza potrzeb oraz doradztwo w wyborze najlepszego rozwiązania. Na tym etapie powstaje wstępna koncepcja obiektu dopasowana do Twojego biznesu i działki.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">2</div>
              <div className="business-modules-step-icon">
                <FaCog />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Projekt i produkcja modułów</h3>
                <p className="business-modules-step-description">Przygotowujemy kompletny projekt techniczny, a następnie w kontrolowanych warunkach fabrycznych wytwarzamy moduły – z dbałością o detale, parametry techniczne i estetykę.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">3</div>
              <div className="business-modules-step-icon">
                <FaTruck />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Transport i montaż</h3>
                <p className="business-modules-step-description">Organizujemy transport na miejsce inwestycji oraz sprawny montaż modułów na przygotowanych fundamentach. Cały proces jest koordynowany przez doświadczony zespół, co minimalizuje przestoje w Twojej działalności.</p>
              </div>
            </div>

            <div className="business-modules-process-step">
              <div className="business-modules-step-badge">4</div>
              <div className="business-modules-step-icon">
                <FaCheckCircle />
              </div>
              <div className="business-modules-step-content">
                <h3 className="business-modules-step-title">Gotowy obiekt do użytkowania</h3>
                <p className="business-modules-step-description">Po zakończeniu montażu przekazujemy w pełni wykończony obiekt wraz z dokumentacją powykonawczą. Możesz od razu rozpocząć działalność - bez długotrwałych prac budowlanych i zbędnych formalności.</p>
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
            <h2 className="business-modules-section-title" style={{color: 'white'}}>Dla kogo tworzymy nasze rozwiązania?</h2>
            <p className="business-modules-section-subtitle" style={{color: 'white'}}>Modułowe obiekty dopasowane do potrzeb różnych branż</p>
          </div>
          
          <div className="business-modules-audience-grid">
            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaStore />
              </div>
              <h3 className="business-modules-audience-title">Handel detaliczny</h3>
              <p className="business-modules-audience-description">Elastyczne przestrzenie idealne dla sklepów spożywczych, odzieżowych czy elektronicznych. Szybkie uruchomienie punktu sprzedaży w dowolnej lokalizacji.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaIndustry />
              </div>
              <h3 className="business-modules-audience-title">Przemysł i produkcja</h3>
              <p className="business-modules-audience-description">Nowoczesne biura terenowe, szatnie, magazyny i pomieszczenia socjalne. Funkcjonalne rozwiązania modułowe wspierające rozwój firm produkcyjnych i przemysłowych.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaBuilding />
              </div>
              <h3 className="business-modules-audience-title">Usługi profesjonalne</h3>
              <p className="business-modules-audience-description">Gabinet lekarski, salon fryzjerski, biuro rachunkowe czy pracownia — modułowe obiekty tworzą prestiżową i praktyczną przestrzeń dla specjalistów.</p>
            </div>

            <div className="business-modules-audience-card">
              <div className="business-modules-audience-icon">
                <FaBoxes />
              </div>
              <h3 className="business-modules-audience-title">Logistyka i magazynowanie</h3>
              <p className="business-modules-audience-description">Bezpieczne magazyny, punkty przeładunkowe, obiekty logistyczne oraz zaplecza dla firm transportowych. Idealne rozwiązania dla całego łańcucha dostaw.</p>
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
            <p className="business-modules-benefit-description">Gotowy obiekt nawet w 4–12 tygodni od złożenia zamówienia. Prace odbywają się w kontrolowanych warunkach, dzięki czemu nie występują opóźnienia pogodowe.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaMoneyBillWave />
            </div>
            <h3 className="business-modules-benefit-title">Oszczędność kosztów</h3>
            <p className="business-modules-benefit-description">Niższe koszty inwestycji w porównaniu z tradycyjnym budownictwem. Modułowa technologia zapewnia przewidywalny budżet i realne oszczędności.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaExpand />
            </div>
            <h3 className="business-modules-benefit-title">Elastyczność i mobilność</h3>
            <p className="business-modules-benefit-description">Możliwość rozbudowy, przebudowy, a nawet przeniesienia obiektu w miarę rozwoju i zmieniających się potrzeb Twojego biznesu.</p>
          </div>

          <div className="business-modules-benefit-card">
            <div className="business-modules-benefit-icon">
              <FaShieldAlt />
            </div>
            <h3 className="business-modules-benefit-title">Gwarancja jakości</h3>
            <p className="business-modules-benefit-description">Produkcja w kontrolowanych warunkach fabrycznych to stała jakość wykonania, precyzja i trwałość, niezależnie od warunków zewnętrznych.</p>
          </div>
        </div>
      </div>

      {/* Sekcja FAQ */}
      <div className='business-modules-faq-section'>
        <div className="business-modules-container">
          <h2 className="business-modules-faq-title">Często zadawane pytania</h2>
          <p className="business-modules-faq-subtitle">Masz pytania dotyczące rozwiązań modułowych? Znajdź odpowiedź!</p>
          <div className="business-modules-faq-container">
            <FAQItem question={'Ile trwa montaż pawilonu handlowego?'} answer={'Czas montażu zależy od wielkości oraz stopnia wyposażenia obiektu, jednak większość pawilonów handlowych montujemy w 2–4 tygodnie. Prefabrykacja znacznej części elementów pozwala ograniczyć prace na placu budowy do minimum, co znacząco przyspiesza finalną realizację i ogranicza ryzyko opóźnień.'} />
            <FAQItem question={'Czy budynki modułowe są trwałe?'} answer={'Tak — konstrukcje modułowe charakteryzują się wysoką wytrzymałością i spełniają wszelkie normy budowlane. Wykorzystywane technologie zapewniają odporność na warunki atmosferyczne, izolacyjność oraz stabilność konstrukcyjną. To rozwiązanie równie trwałe jak tradycyjne budownictwo, ale znacznie szybsze w realizacji.'} />
            <FAQItem question={'Czy potrzebuję pozwolenia na budowę?'} answer={'W wielu przypadkach tak, jednak wymagania zależą od rodzaju, wielkości oraz przeznaczenia obiektu. Niektóre projekty można postawić wyłącznie na zgłoszenie. Analizujemy każdą inwestycję indywidualnie i pomagamy dobrać opcję, która formalnie będzie najkorzystniejsza.'} />
            <FAQItem question={'Czy mogę rozbudować istniejący obiekt?'} answer={'Tak. Jedną z największych zalet budownictwa modułowego jest możliwość szybkiej rozbudowy, zmiany układu lub relokacji obiektu. Dzięki modułowej konstrukcji inwestor może elastycznie dostosować przestrzeń do nowych potrzeb lub rozwoju firmy — bez kosztownych i długotrwałych prac rozbiórkowych.'} />
         </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}