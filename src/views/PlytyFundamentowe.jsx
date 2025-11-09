import React, { useState } from 'react'
import Hero from '../components/Hero/Hero'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import TeamSection from '../sections/TeamSection'
import NumberSection from '../sections/NumberSection'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'
import { 
  FaThermometerHalf,
  FaClock,
  FaHome,
  FaShieldAlt,
  FaFire,
  FaWrench,
  FaCog,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaBuilding,
  FaLeaf,
  FaIndustry,
  FaMountain
} from 'react-icons/fa'
import './PlytyFundamentowePage.css'
import Footer from '../components/Footer/Footer'

export default function PlytyFundamentowe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // Tutaj dodaj logikę wysyłania formularza
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage('Dziękujemy za zapytanie! Skontaktujemy się z Tobą w ciągu 24 godzin.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      setMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="plyty-fundamentowe-page">
      <Header/>
      
      <HeroNieruchomosci
        img={'plyty-fundamentowe-scaled.jpg'}
        content={
          <div style={{maxWidth: '800px'}}>
            <h1>Energooszczędna i ciepła <span style={{color: 'var(--secondary-color)'}}>PŁYTA FUNDAMENTOWA</span></h1>
            <p style={{color: 'white', fontSize: '1.2rem', marginTop: '20px'}}>
              Nowoczesny fundament. Kompleksowa budowa i realizacja na terenie całej Polski.
            </p>
            <p style={{color: 'white', fontSize: '1.1rem', marginTop: '15px'}}>
              Płyty fundamentowe, to nowoczesna alternatywą dla tradycyjnych fundamentów.
              Zajmujemy się kompleksową realizacją od projektu aż po budowę!
            </p>
          </div>
        }
      />

      <div className='section-spacer-md'></div>

      {/* Sekcja Zalety */}
      <div className="career-container">
        <div className="career-section-header">
          <h2 className="career-section-title">Jakie zalety ma płyta fundamentowa?</h2>
        </div>

        <div className="career-benefits-grid">
          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaThermometerHalf />
            </div>
            <h3 className="career-benefit-title">Doskonałe parametry izolacyjne i termiczne</h3>
            <p className="career-benefit-description">
              Dzięki odpowiedniej technologii i doborze warstw izolacji nasze płyty są wysoce energooszczędne i ciepłe. 
              Pozwalają na budowę energooszczędnych a nawet pasywnych domów, co gwarantuje wyjątkowo niskie koszty ogrzewania.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaClock />
            </div>
            <h3 className="career-benefit-title">Szybki czas budowy już od 4 do 5 dni</h3>
            <p className="career-benefit-description">
              Dzięki przemyślanej i dopracowanej technologii maksymalnie skracamy czas budowy fundamentów. 
              Nasza płyta fundamentowa powstaje już nawet w 4 do 5 dni, co przekłada się na oszczędność czasu i finansów potrzebnych do budowy.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaShieldAlt />
            </div>
            <h3 className="career-benefit-title">Technologia eliminuje mostki termiczne</h3>
            <p className="career-benefit-description">
              Dzięki odpowiedniej konstrukcji jak i projektowi warstw izolacji a tym samym całkowitym odizolowaniu 
              płyty od gruntu pozbywamy się mostków termicznych. Jest to ogromna zaleta płyt w stosunku do tradycyjnych ław fundamentowych.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaHome />
            </div>
            <h3 className="career-benefit-title">Idealna izolacja przed wilgocią</h3>
            <p className="career-benefit-description">
              Zastosowanie płyty fundamentowej zapewnia idealną izolację przeciwwilgociową budynku. 
              Zapewnia to bezpieczeństwo przed przenikaniem wilgoci i wody.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaFire />
            </div>
            <h3 className="career-benefit-title">Ogrzewanie w płycie</h3>
            <p className="career-benefit-description">
              Na etapie budowy płyty możemy wyposażyć ją w system ogrzewania wodny lub elektryczny. 
              Generuje to znaczne oszczędności i eliminuje konieczność wykonywania wylewek.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaWrench />
            </div>
            <h3 className="career-benefit-title">Instalacje zintegrowane w płycie</h3>
            <p className="career-benefit-description">
              Większość instalacji wodnych, kanalizacyjnych jak i teletechnicznych możemy wykonać już na etapie budowy płyty fundamentowej, 
              co pozwoli na dodatkowe oszczędności.
            </p>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Kompleksowe wykonanie */}
      <div className="career-partner-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Kompleksowe wykonanie płyty fundamentowej</h2>
            <p className="career-section-description">
              Jako marka Prestige House zapewniamy kompleksową budowę płyt fundamentowych. Oferujemy szeroki zakres usług w tym instalacje i montaż ekologicznych oczyszczalni, eko-szamb, drenażów, zbiorników na deszczówkę a także wykonanie wszelkich prace ziemnych na działce Inwestora.
            </p>
            <p className="career-section-description">
              Kompleksowość naszych usług i ich szeroki zakres pozwala nam na współpracę zarówno z inwestorami z sektora prywatnego jak i komercyjnego – również deweloperskiego.
            </p>
          </div>

          <div className="career-benefits-grid">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="career-benefit-title">Działamy na terenie całej Polski</h3>
              <p className="career-benefit-description">
                W szczególności zapraszamy Klientów z takich województw jak:
              </p>
              <ul className="career-benefit-list">
                <li>małopolskie</li>
                <li>śląskie</li>
                <li>dolnośląskie</li>
                <li>podkarpackie</li>
                <li>świętokrzyskie</li>
                <li>łódzkie</li>
                <li>mazowieckie</li>
                <li>wielkopolskie</li>
                <li>opolskie</li>
                <li>lubuskie</li>
              </ul>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaCog />
              </div>
              <h3 className="career-benefit-title">Dlaczego warto budować z nami?</h3>
              <ul className="career-benefit-list">
                <li>Eliminacja wszelkich problemów na każdym etapie budowy</li>
                <li>Solidność i jakość wykonanych prac (30 lat gwarancji)</li>
                <li>Oszczędność czasu i pieniędzy</li>
                <li>Koordynacja i doradztwo na każdym etapie inwestycji</li>
                <li>Szeroki zakres prac wykonany przez jedną firmę</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Zastosowania */}
      <div className="career-employee-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Płyta fundamentowa w naszej technologii sprawdzi się doskonale:</h2>
          </div>

          <div className="applications-grid">
            <div className="application-category">
              <div className="application-icon">
                <FaBuilding />
              </div>
              <h3 className="application-title">Budynki mieszkalne</h3>
              <ul className="career-benefit-list">
                <li>Pod dom szkieletowy, dom pasywny</li>
                <li>Pod dom murowany, pod dom jednorodzinny</li>
                <li>Pod domek 35m², pod domek drewniany 35m²</li>
                <li>Pod domek letniskowy</li>
              </ul>
            </div>

            <div className="application-category">
              <div className="application-icon">
                <FaIndustry />
              </div>
              <h3 className="application-title">Budynki gospodarcze i przemysłowe</h3>
              <ul className="career-benefit-list">
                <li>Pod garaż, garaż 35m²</li>
                <li>Garaż murowany, garaż blaszany, garaż drewniany</li>
                <li>Pod budynek gospodarczy</li>
                <li>Pod zbiornik gazu, pod gaz LPG, pod zbiornik gazu LPG</li>
              </ul>
            </div>

            <div className="application-category">
              <div className="application-icon">
                <FaMountain />
              </div>
              <h3 className="application-title">Trudne warunki gruntowe</h3>
              <ul className="career-benefit-list">
                <li>Na podmokłym terenie, na torfie</li>
                <li>Na gruntach wysadzinowych</li>
                <li>Na szkodach górniczych</li>
              </ul>
            </div>
          </div>

          <div className="career-section-description" style={{textAlign: 'center', marginTop: '3rem'}}>
            <h3>Obszar i teren naszego działania:</h3>
            <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--secondary-color)'}}>
              Działamy na terenie całej Polski.
            </p>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Formularz kontaktowy */}
      <div className="career-form-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Zapytaj o wycenę płyty fundamentowej</h2>
            <p className="career-section-subtitle">Skontaktuj się z nami, aby omówić szczegóły Twojej inwestycji</p>
          </div>

          <form className="career-form" onSubmit={handleSubmit}>
            {message && (
              <div className={`career-form-message ${message.includes('Błąd') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <div className="career-form-grid">
              <div className="career-form-group">
                <label htmlFor="name" className="career-form-label">Imię i nazwisko *</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  className="career-form-input"
                  required 
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="email" className="career-form-label">Adres e-mail *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="career-form-input"
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="career-form-group">
                <label htmlFor="phone" className="career-form-label">Numer telefonu *</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="career-form-input"
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="career-form-group career-form-group--full">
                <label htmlFor="message" className="career-form-label">Opis inwestycji *</label>
                <textarea 
                  id="message"
                  name="message"
                  className="career-form-textarea"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opisz swoją inwestycję, podaj lokalizację, metraż, rodzaj budynku..."
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className={`career-form-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Wysyłanie...' : 'Wyślij zapytanie'}
            </button>
          </form>
        </div>
      </div>

      <Footer/>
    </div>
  )
}