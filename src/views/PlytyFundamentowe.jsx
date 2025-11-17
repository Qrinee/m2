import React, { useState } from 'react'
import Hero from '../components/Hero/Hero'
import Header from '../components/Header/Header'
import video from '../assets/videos/vid.mp4'
import img from '../assets/plytafundamentowa.jpg'
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
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'

// Import obrazu mapy Polski - upewnij się, że ścieżka jest poprawna
import mapaPolski from '../assets/mapa-polski.jpg'

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
        img={img}
        content={
          <div style={{maxWidth: '800px'}}>
            <h1><span style={{color: 'var(--secondary-color)'}}>PŁYTA FUNDAMENTOWA</span> — nowoczesny standard budowy.</h1>
            <p style={{color: 'white', fontSize: '1.2rem', marginTop: '20px'}}>
              Nowoczesny fundament dopasowany do współczesnych standardów budownictwa. Zapewniamy kompleksową realizację płyt fundamentowych na terenie całej Polski – od projektu aż po wykonanie. Płyta fundamentowa to innowacyjna alternatywa dla tradycyjnych fundamentów, która gwarantuje doskonałą izolację cieplną, wysoką trwałość oraz pełną stabilność konstrukcji. Oferujemy profesjonalną obsługę, precyzję wykonania i rozwiązania dopasowane do każdego rodzaju budynku.
            </p>
          </div>
        }
      />

      <div className='section-spacer-md'></div>

      {/* Sekcja Zalety */}
      <div className="career-container">
        <div className="career-section-header">
          <h2 className="career-section-title">Jakie korzyści daje zastosowanie płyty fundamentowej?</h2>
        </div>

        <div className="career-benefits-grid">
          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaThermometerHalf />
            </div>
            <h3 className="career-benefit-title">Doskonałe parametry izolacyjne i termiczne</h3>
            <p className="career-benefit-description">
              Dzięki zaawansowanej technologii wykonania oraz precyzyjnie dobranym warstwom izolacji, nasze płyty fundamentowe zapewniają wyjątkową efektywność energetyczną i wysoki komfort cieplny. Umożliwiają realizację domów energooszczędnych oraz pasywnych, znacząco obniżając koszty ogrzewania i eksploatacji budynku.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaClock />
            </div>
            <h3 className="career-benefit-title">Realizacja płyty fundamentowej w zaledwie 7 dni</h3>
            <p className="career-benefit-description">
              Realizacja płyty fundamentowej w naszej technologii trwa średnio około 7 dni, obejmując wszystkie kluczowe etapy prac – od przygotowania podłoża, przez zbrojenie i instalacje, aż po wylanie betonu.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaShieldAlt />
            </div>
            <h3 className="career-benefit-title">Technologia skutecznie eliminuje mostki termiczne</h3>
            <p className="career-benefit-description">
              Dzięki zaawansowanej konstrukcji oraz precyzyjnie zaprojektowanym warstwom izolacji płyta fundamentowa jest całkowicie odizolowana od gruntu, co pozwala wyeliminować mostki termiczne. To jedna z kluczowych przewag płyty nad tradycyjnymi fundamentami.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaHome />
            </div>
            <h3 className="career-benefit-title">Skuteczna ochrona przed wilgocią</h3>
            <p className="career-benefit-description">
              Płyta fundamentowa zapewnia doskonałą izolację przeciwwilgociową, chroniąc budynek przed przenikaniem wilgoci i wody. To pewne i trwałe rozwiązanie zwiększające bezpieczeństwo konstrukcji.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaFire />
            </div>
            <h3 className="career-benefit-title">Ogrzewanie zintegrowane z płytą</h3>
            <p className="career-benefit-description">
              Na etapie budowy płytę można wyposażyć w system ogrzewania wodnego lub elektrycznego. Rozwiązanie to znacząco obniża koszty, zwiększa efektywność cieplną i eliminuje potrzebę wykonywania tradycyjnych wylewek.
            </p>
          </div>

          <div className="career-benefit-card">
            <div className="career-benefit-icon">
              <FaWrench />
            </div>
            <h3 className="career-benefit-title">Instalacje zintegorwane w płycie</h3>
            <p className="career-benefit-description">
              Większość instalacji wodnych, kanalizacyjnych oraz teletechnicznych wykonujemy już na etapie budowy płyty fundamentowej. Takie rozwiązanie przyspiesza prace, zwiększa precyzję i generuje dodatkowe oszczędności.
            </p>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Nowa Sekcja z Mapą Polski */}
      <div className="map-section" style={{padding: '10vw', backgroundColor: 'white'}}>
        <div className="career-container">
          <div className="map-content">
            <div className="map-text">
              <h2 className="career-section-title">Działamy na terenie całej Polski</h2>
              <p className="map-description">
                Realizujemy płyty fundamentowe w każdym województwie, zapewniając pełną obsługę — od przygotowania terenu po finalizację prac. Niezależnie od lokalizacji, gwarantujemy terminowość, jakość i wsparcie na każdym etapie inwestycji.
              </p>
              <div className="map-features">
                <div className="map-feature">
                  <FaCheckCircle className="feature-icone" />
                  <span>Pełna obsługa inwestycji w całym kraju</span>
                </div>
                <div className="map-feature">
                  <FaCheckCircle className="feature-icone" />
                  <span>Terminowość i jakość wykonania</span>
                </div>
                <div className="map-feature">
                  <FaCheckCircle className="feature-icone" />
                  <span>Wsparcie na każdym etapie</span>
                </div>
              </div>
            </div>
            <div className="map-image">
              <img src={mapaPolski} alt="Mapa Polski - obszar działania" width={600} />
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Kompleksowe wykonanie */}
      <div className="career-partner-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Kompleksowe i profesjonalne wykonanie płyty fundamentowej</h2>
            <p className="career-section-description">
              Zapewniamy pełną realizację płyt fundamentowych — od przygotowania terenu, przez wykonanie niezbędnych instalacji, aż po finalne prace konstrukcyjne. Oferujemy szeroki zakres usług, w tym montaż ekologicznych oczyszczalni, eko-szamb, drenaży, zbiorników na deszczówkę oraz wykonanie wszystkich prac ziemnych na działce Inwestora.
            </p>
            <p className="career-section-description">
              Zakres naszych usług oraz doświadczenie umożliwiają współpracę zarówno z inwestorami prywatnymi, jak i komercyjnymi, w tym z sektorem deweloperskim.
            </p>
          </div>

          <div className="career-benefits-gride">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="career-benefit-title">Działamy na terenie całej Polski</h3>
              <p className="career-benefit-description">
                Realizujemy płyty fundamentowe w każdym województwie, zapewniając pełną obsługę — od przygotowania terenu po finalizację prac. Niezależnie od lokalizacji, gwarantujemy terminowość, jakość i wsparcie na każdym etapie inwestycji.
              </p>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaCog />
              </div>
              <h3 className="career-benefit-title">Dlaczego warto z nami współpracować?</h3>
              <ul className="career-benefit-list">
                <li>⁠Kompleksowa obsługa inwestycji od początku do końca</li>
                <li>Pewność solidnego wykonania i wysokiej jakości technologii</li>
                <li>Oszczędność czasu i pieniędzy dzięki sprawnej organizacji prac</li>
                <li>Profesjonalna koordynacja i doradztwo na każdym etapie inwestycji</li>
                <li>Nowoczesne rozwiązania, które zwiększają trwałość i komfort budynku</li>
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
            <h2 className="career-section-title">Technologia płyty fundamentowej — doskonała w wielu zastosowaniach:</h2>
          </div>

          <div className="applications-grid">
            <div className="application-category">
              <div className="application-icon">
                <FaBuilding />
              </div>
              <h3 className="application-title">Budynki mieszkalne</h3>
              <p>Idealne rozwiązanie dla domów jednorodzinnych. Nasze płyty fundamentowe doskonale sprawdzają się jako baza pod:</p>
              <ul className="career-benefit-list">
                <li>domy szkieletowe i pasywne,</li>
                <li>domy murowane oraz projekty jednorodzinne,</li>
                <li>małe domki do 35m², domki rekreacyjne i letniskowe,</li>
                <li>konstrukcje drewniane oraz modułowe.</li>
              </ul>
              <p>Stabilna konstrukcja płyty gwarantuje trwałość, izolację termiczną i bezpieczeństwo użytkowania.</p>
            </div>

            <div className="application-category">
              <div className="application-icon">
                <FaIndustry />
              </div>
              <h3 className="application-title">Budynki gospodarcze i przemysłowe</h3>
              <p>Wytrzymałość i funkcjonalność na lata. Płyta fundamentowa idealnie nadaje się pod:</p>
              <ul className="career-benefit-list">
                <li>garaże murowane, blaszane i drewniane,</li>
                <li>garaże do 35 m², wiaty oraz małe obiekty gospodarcze,</li>
                <li>hale magazynowe, warsztaty czy pomieszczenia techniczne,</li>
                <li>zbiorniki LPG, zbiorniki gazowe i elementy techniczne wymagające stabilnego posadowienia.</li>
              </ul>
              <p>Technologia płyty zapewnia równomierne przenoszenie obciążeń i wysoki poziom odporności na eksploatację.</p>
            </div>

            <div className="application-category">
              <div className="application-icon">
                <FaMountain />
              </div>
              <h3 className="application-title">Trudne warunki gruntowe</h3>
              <p>Niezawodne posadowienie nawet na wymagającym terenie. Płyta fundamentowa świetnie sprawdza się w miejscach, gdzie tradycyjne fundamenty zawodzą:</p>
              <ul className="career-benefit-list">
                <li>na terenach podmokłych i o wysokim poziomie wód gruntowych,</li>
                <li>na gruntach wysadzinowych i niestabilnych,</li>
                <li>na terenach objętych szkodami górniczymi,</li>
                <li>na torfach, glinach i gruntach o niskiej nośności.</li>
              </ul>
              <p>Dzięki odpowiedniej konstrukcji i izolacji płyta zapewnia stabilność, bezpieczeństwo i trwałość inwestycji.</p>
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