import React, { useState } from 'react'
import Hero from '../components/Hero/Hero'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import TeamSection from '../sections/TeamSection'
import NumberSection from '../sections/NumberSection'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'
import { 
  FaUsers,
  FaHandshake,
  FaRocket,
  FaChartLine,
  FaAward,
  FaHeart,
  FaFileAlt,
  FaComments,
  FaUserCheck,
  FaClipboardList,
  FaStar,
  FaLightbulb,
  FaShieldAlt,
  FaGraduationCap,
  FaBalanceScale
} from 'react-icons/fa'
import './CareerPage.css'
import Footer from '../components/Footer/Footer'
import vid1 from '../assets/videos/vid1.mp4'
import HeroVideo from '../components/HeroVideo/HeroVideo'

export default function ZostanPartneremLubPracownikiem() {
  const backend = import.meta.env.VITE_BACKEND + "/api/inquiry"

  const [partnerFormData, setPartnerFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [partnerLoading, setPartnerLoading] = useState(false)
  const [partnerMessage, setPartnerMessage] = useState('')

  const [employeeFormData, setEmployeeFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [employeeLoading, setEmployeeLoading] = useState(false)
  const [employeeMessage, setEmployeeMessage] = useState('')

  const handlePartnerChange = (e) => {
    const { name, value } = e.target
    setPartnerFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePartnerSubmit = async (e) => {
    e.preventDefault()
    setPartnerLoading(true)
    setPartnerMessage('')

    try {
      const response = await fetch(`${backend}/partner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: partnerFormData.companyName,
          email: partnerFormData.email,
          phone: partnerFormData.phone,
          message: partnerFormData.message,
          formType: 'partner_inquiry'
        })
      })

      const data = await response.json()

      if (data.success) {
        setPartnerMessage('Dziękujemy za Twoją propozycję współpracy! Skontaktujemy się z Tobą w ciągu 24 godzin.')
        setPartnerFormData({
          companyName: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        setPartnerMessage(`Błąd: ${data.error || 'Wystąpił problem podczas wysyłania wiadomości'}`)
      }
    } catch (error) {
      console.error('Błąd wysyłania formularza partnerskiego:', error)
      setPartnerMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.')
    } finally {
      setPartnerLoading(false)
    }
  }

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target
    setEmployeeFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setEmployeeMessage('Plik jest za duży. Maksymalny rozmiar to 5MB.')
        return
      }
      
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setEmployeeMessage('Nieprawidłowy format pliku. Akceptowane formaty: PDF, DOC, DOCX.')
        return
      }

      setCvFile(file)
      setEmployeeMessage('')
    }
  }

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault()
    
    if (!cvFile) {
      setEmployeeMessage('Proszę załączyć CV')
      return
    }

    setEmployeeLoading(true)
    setEmployeeMessage('')

    try {
      const formData = new FormData()
      formData.append('name', employeeFormData.fullName)
      formData.append('email', employeeFormData.email)
      formData.append('phone', employeeFormData.phone)
      formData.append('message', employeeFormData.message)
      formData.append('formType', 'employee_inquiry')
      formData.append('cv', cvFile)

      const response = await fetch(`${backend}/employee`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setEmployeeMessage('Dziękujemy za Twoją aplikację! Skontaktujemy się z Tobą w ciągu 24 godzin.')
        setEmployeeFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        })
        setCvFile(null)
        document.getElementById('cv-upload').value = ''
      } else {
        setEmployeeMessage(`Błąd: ${data.error || 'Wystąpił problem podczas wysyłania aplikacji'}`)
      }
    } catch (error) {
      console.error('Błąd wysyłania formularza rekrutacyjnego:', error)
      setEmployeeMessage('Wystąpił błąd podczas wysyłania aplikacji. Spróbuj ponownie.')
    } finally {
      setEmployeeLoading(false)
    }
  }

  return (
    <div className="career-page">
      <Header/>
      

      <HeroVideo
      video={vid1}
              content={
          <div style={{maxWidth: '800px'}}>
            <h1>Zostań partnerem lub pracownikiem <span style={{color: 'var(--secondary-color)'}}>M2Notarialnie</span></h1>
            <p style={{color: 'white', fontSize: '1.2rem', marginTop: '20px'}}>
              Jesteśmy zespołem łączącym doświadczenie prawne z praktyczną znajomością rynku nieruchomości, by zapewnić klientom kompleksową i bezpieczną obsługę. Jeśli chcesz rozwijać się razem z nami, zapraszamy do współpracy!
            </p>
          </div>
        }
      />

      <div className='section-spacer-md'></div>

      {/* Sekcja Jak dołączyć */}
      <div className="career-container">
        <div className="career-section-header">
          <h2 className="career-section-title">Jak dołączyć?</h2>
          <p className="career-section-subtitle">
            Wyślij swoje CV lub propozycję współpracy na adres: <a href="mailto:kontakt@m2notarialnie.pl" style={{color: 'var(--secondary-color)', fontWeight: 'bold'}}>kontakt@m2notarialnie.pl</a> lub skorzystaj z poniższego formularza kontaktowego. Skontaktujemy się z Tobą, aby omówić szczegóły.
          </p>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Zostań partnerem */}
      <div className="career-partner-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Zostań partnerem M2Notarialnie</h2>
            <p className="career-section-description">
              Jako partner biznesowy dołączasz do zespołu, który łączy doświadczenie prawne i praktyczną znajomość rynku nieruchomości. Razem budujemy markę, która oferuje klientom kompleksową i bezpieczną obsługę.
            </p>
          </div>

          <div className="career-benefits-grid">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaUsers />
              </div>
              <h3 className="career-benefit-title">Kogo szukamy?</h3>
              <ul className="career-benefit-list">
                <li>Partnerów biznesowych z branży nieruchomości i prawa</li>
                <li>Osób zorientowanych na profesjonalną, długofalową współpracę</li>
                <li>Partnerów chcących rozwijać się i wspierać naszych klientów</li>
              </ul>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaHandshake />
              </div>
              <h3 className="career-benefit-title">Co oferujemy?</h3>
              <ul className="career-benefit-list">
                <li>Dostęp do bazy klientów i wspólne działania marketingowe</li>
                <li>Wsparcie merytoryczne i operacyjne</li>
                <li>Elastyczne warunki współpracy dostosowane do Twoich potrzeb</li>
              </ul>
            </div>
          </div>

          <div className="career-section-description" style={{textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>
            Razem możemy stworzyć coś więcej niż tylko współpracę — możemy zbudować partnerstwo oparte na wzajemnym rozwoju i zaufaniu, które przyniesie korzyści nie tylko nam, ale przede wszystkim naszym klientom.
          </div>

          {/* Formularz partnerski */}
          <div className="career-form-section">
            <form className="career-form" onSubmit={handlePartnerSubmit}>
              {partnerMessage && (
                <div className={`career-form-message ${partnerMessage.includes('Błąd') ? 'error' : 'success'}`}>
                  {partnerMessage}
                </div>
              )}

              <div className="career-form-grid">
                <div className="career-form-group">
                  <label htmlFor="company-name" className="career-form-label">Imię i nazwisko / nazwa firmy *</label>
                  <input 
                    type="text" 
                    id="company-name"
                    name="companyName"
                    className="career-form-input"
                    required 
                    value={partnerFormData.companyName}
                    onChange={handlePartnerChange}
                  />
                </div>

                <div className="career-form-group">
                  <label htmlFor="partner-email" className="career-form-label">Adres e-mail *</label>
                  <input 
                    type="email" 
                    id="partner-email"
                    name="email"
                    className="career-form-input"
                    required 
                    value={partnerFormData.email}
                    onChange={handlePartnerChange}
                  />
                </div>

                <div className="career-form-group">
                  <label htmlFor="partner-phone" className="career-form-label">Numer telefonu *</label>
                  <input 
                    type="tel" 
                    id="partner-phone"
                    name="phone"
                    className="career-form-input"
                    required 
                    value={partnerFormData.phone}
                    onChange={handlePartnerChange}
                  />
                </div>

                <div className="career-form-group career-form-group--full">
                  <label htmlFor="partner-message" className="career-form-label">Propozycja współpracy / wiadomość *</label>
                  <textarea 
                    id="partner-message"
                    name="message"
                    className="career-form-textarea"
                    rows="5"
                    required
                    value={partnerFormData.message}
                    onChange={handlePartnerChange}
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                className={`career-form-button ${partnerLoading ? 'loading' : ''}`}
                disabled={partnerLoading}
              >
                {partnerLoading ? 'Wysyłanie...' : 'Wyślij propozycję współpracy'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Zostań pracownikiem */}
      <div className="career-employee-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Zostań pracownikiem M2Notarialnie</h2>
            <p className="career-section-description">
              Jeśli chcesz rozwijać się w branży nieruchomości i prawa, dołącz do naszego zespołu. Szukamy osób, które cenią profesjonalizm, rzetelność i bezpieczeństwo w obsłudze klientów.
            </p>
          </div>

          <div className="career-benefits-grid">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaUserCheck />
              </div>
              <h3 className="career-benefit-title">Kogo szukamy?</h3>
              <ul className="career-benefit-list">
                <li>Prawników, notariuszy i specjalistów rynku nieruchomości</li>
                <li>Osób odpowiedzialnych i zorientowanych na klienta</li>
                <li>Kandydatów gotowych na rozwój zawodowy i współpracę zespołową</li>
              </ul>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaAward />
              </div>
              <h3 className="career-benefit-title">Co oferujemy?</h3>
              <ul className="career-benefit-list">
                <li>Stabilne zatrudnienie lub elastyczne formy współpracy</li>
                <li>Możliwość rozwoju poprzez szkolenia i praktykę</li>
                <li>Przyjazne środowisko pracy oparte na zaufaniu</li>
              </ul>
            </div>
          </div>

          <div className="career-section-description" style={{textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>
            W M2Notarialnie wierzymy, że sukces to efekt wspólnej pracy, pasji i ciągłego rozwoju — dołączając do nas, stajesz się częścią zespołu, który naprawdę dba o Twój rozwój i satysfakcję z pracy.
          </div>

          {/* Formularz rekrutacyjny */}
          <div className="career-form-section">
            <form className="career-form" onSubmit={handleEmployeeSubmit}>
              {employeeMessage && (
                <div className={`career-form-message ${employeeMessage.includes('Błąd') ? 'error' : 'success'}`}>
                  {employeeMessage}
                </div>
              )}

              <div className="career-form-grid">
                <div className="career-form-group">
                  <label htmlFor="full-name" className="career-form-label">Imię i nazwisko *</label>
                  <input 
                    type="text" 
                    id="full-name"
                    name="fullName"
                    className="career-form-input"
                    required 
                    value={employeeFormData.fullName}
                    onChange={handleEmployeeChange}
                  />
                </div>

                <div className="career-form-group">
                  <label htmlFor="employee-email" className="career-form-label">Adres e-mail *</label>
                  <input 
                    type="email" 
                    id="employee-email"
                    name="email"
                    className="career-form-input"
                    required 
                    value={employeeFormData.email}
                    onChange={handleEmployeeChange}
                  />
                </div>

                <div className="career-form-group">
                  <label htmlFor="employee-phone" className="career-form-label">Numer telefonu *</label>
                  <input 
                    type="tel" 
                    id="employee-phone"
                    name="phone"
                    className="career-form-input"
                    required 
                    value={employeeFormData.phone}
                    onChange={handleEmployeeChange}
                  />
                </div>

                <div className="career-form-group career-form-group--full">
                  <label htmlFor="employee-message" className="career-form-label">Krótka wiadomość / list motywacyjny *</label>
                  <textarea 
                    id="employee-message"
                    name="message"
                    className="career-form-textarea"
                    rows="4"
                    required
                    value={employeeFormData.message}
                    onChange={handleEmployeeChange}
                  ></textarea>
                </div>

                <div className="career-form-group career-form-group--full">
                  <label htmlFor="cv-upload" className="career-form-label">Załącz swoje CV (PDF, DOC, max 5MB) *</label>
                  <input 
                    type="file" 
                    id="cv-upload"
                    name="cv-upload"
                    className="career-form-file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleFileChange}
                  />
                  <small className="career-form-help">Akceptowane formaty: PDF, DOC, DOCX. Maksymalny rozmiar: 5MB</small>
                  {cvFile && <div className="career-file-info">Wybrano: {cvFile.name}</div>}
                </div>
              </div>

              <button 
                type="submit" 
                className={`career-form-button ${employeeLoading ? 'loading' : ''}`}
                disabled={employeeLoading}
              >
                {employeeLoading ? 'Wysyłanie...' : 'Wyślij aplikację'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <TeamSection />
      <NumberSection/>
      <Footer/>
    </div>
  )
}