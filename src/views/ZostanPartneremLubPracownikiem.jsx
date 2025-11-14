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
            <h1>Dołącz do <span style={{color: 'var(--secondary-color)'}}>M2Notarialnie</span> – jako partner lub członek zespołu</h1>
            <p style={{color: 'white', fontSize: '1.2rem', marginTop: '20px'}}>
 W M2Notarialnie tworzymy środowisko ekspertów łączących wiedzę prawną, doświadczenie biznesowe oraz praktyczne kompetencje z zakresu rynku nieruchomości i inwestycji. Naszym celem jest zapewnienie klientom pełnej, bezpiecznej i rzetelnej obsługi — od analizy, przez prowadzenie procesu, aż po finalizację transakcji czy realizację inwestycji.
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
Jeśli widzisz swoją przyszłość w pracy z nami, wyślij CV lub propozycję współpracy na adres: <a href="mailto:kontakt@m2notarialnie.pl" style={{color: 'var(--secondary-color)', fontWeight: 'bold'}}>kontakt@m2notarialnie.pl</a> 
          </p>
          <p className='career-section-subtitle'>
            Możesz także użyć formularza kontaktowego poniżej.
Po analizie zgłoszenia skontaktujemy się z Tobą, aby przedstawić dostępne ścieżki rozwoju i omówić możliwości współpracy.
          </p>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja Zostań partnerem */}
      <div className="career-partner-section">
        <div className="career-container">
          <div className="career-section-header">
            <h2 className="career-section-title">Dołącz jako partner M2Notarialnie</h2>
            <p className="career-section-description">
Jako partner biznesowy stajesz się częścią zespołu, który łączy kompetencje prawne, doświadczenie inwestycyjne oraz dogłębną znajomość rynku nieruchomości. Wspólnie tworzymy markę, która dostarcza klientom kompletne, nowoczesne i bezpieczne rozwiązania — od analiz, przez sprzedaż i inwestycje, po obsługę prawną i deweloperską.
            </p>
          </div>

          <div className="career-benefits-grid">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaUsers />
              </div>
              <h3 className="career-benefit-title">Kogo szukamy?</h3>
              <ul className="career-benefit-list">
                <li>Partnerów biznesowych związanych z rynkiem nieruchomości, prawa, inwestycji i finansów</li>
                <li>Osób nastawionych na rzetelną, profesjonalną i długoterminową współpracę</li>
                <li>Specjalistów, którzy chcą rozwijać swoje kompetencje i realnie wspierać naszych klientów</li>
                <li></li>Ludzi przedsiębiorczych, otwartych na nowe projekty, którzy chcą współtworzyć markę opartą na zaufaniu i wysokich standardach działania
              </ul>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaHandshake />
              </div>
              <h3 className="career-benefit-title">Co oferujemy?</h3>
              <ul className="career-benefit-list">
                <li>⁠Dostęp do naszej bazy klientów oraz wspólne działania marketingowe zwiększające skuteczność sprzedaży</li>
                <li>Wsparcie merytoryczne, prawne i operacyjne na każdym etapie współpracy</li>
                <li>Elastyczne warunki współpracy, dopasowane do Twoich potrzeb</li>
                <li>Nowoczesne narzędzia i sprawdzone procesy, które ułatwiają pracę i przyspieszają efekty</li>
              </ul>
            </div>
          </div>

          <div className="career-section-description" style={{textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>
Razem możemy stworzyć coś więcej niż standardową współpracę — możemy zbudować partnerską relację opartą na zaufaniu, rozwoju i wspólnych celach. Taka współpraca przyniesie realne korzyści nie tylko nam, ale przede wszystkim naszym klientom.
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
            <h2 className="career-section-title">Dołącz do zespołu M2Notarialnie</h2>
            <p className="career-section-description">
Jeśli chcesz rozwijać swoją karierę w obszarze nieruchomości, prawa oraz nowoczesnych usług deweloperskich, zapraszamy do naszego zespołu. Poszukujemy osób, które stawiają na profesjonalizm, odpowiedzialność i wysoką jakość obsługi — zarówno w pracy z klientem indywidualnym, jak i biznesowym.
            </p>
          </div>

          <div className="career-benefits-grid">
            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaUserCheck />
              </div>
              <h3 className="career-benefit-title">Kogo szukamy?</h3>
              <ul className="career-benefit-list">
                <li> ⁠Osób z doświadczeniem lub gotowych je zdobyć, zainteresowanych prawem, nieruchomościami lub finansami</li>
                <li>Kandydatów odpowiedzialnych, nastawionych na rzetelną pracę i profesjonalną obsługę klienta</li>
                <li>Osób otwartych na rozwój zawodowy, współpracę zespołową i budowanie długoterminowych relacji</li>
              </ul>
            </div>

            <div className="career-benefit-card">
              <div className="career-benefit-icon">
                <FaAward />
              </div>
              <h3 className="career-benefit-title">Co oferujemy?</h3>
              <ul className="career-benefit-list">
                <li>Stabilne zatrudnienie lub elastyczne formy współpracy — dopasowane do Twoich potrzeb</li>
                <li>Realne możliwości rozwoju dzięki szkoleniom, mentoringowi i praktycznej nauce zawodu</li>
                <li>Przyjazne, wspierające środowisko pracy oparte na wzajemnym szacunku i zaufaniu</li>
                <li>Dostęp do nowoczesnych narzędzi i sprawdzonych procedur ułatwiających codzienną pracę</li>
                <li>Współpracę w zespole, który dzieli się wiedzą i doświadczeniem, by wspólnie osiągać cele</li>
              </ul>
            </div>
          </div>

          <div className="career-section-description" style={{textAlign: 'center', marginTop: '2rem', fontStyle: 'italic'}}>
         W M2Notarialnie wierzymy, że sukces powstaje dzięki współpracy, zaangażowaniu i ciągłemu rozwojowi. Dołączając do nas, stajesz się częścią zespołu, który realnie wspiera Twój rozwój i dba o satysfakcję z codziennej pracy.
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

      <TeamSection content={
                <div className='card-section__header'>
        <p  className='p'>Poniżej znajdziesz kontakt bezpośrednio do właścicieli M2Notarialnie. Możesz odezwać się do nas w każdej sprawie związanej z nieruchomościami — szybko wrócimy do Ciebie z pomocą i konkretnymi rozwiązaniami.</p>
       </div>
      } />
      <NumberSection/>
      <Footer/>
    </div>
  )
}