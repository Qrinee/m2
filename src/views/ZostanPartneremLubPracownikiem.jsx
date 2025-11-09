import React, { useState } from 'react'
import Hero from '../components/Hero/Hero'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import TwoPartText from '../layouts/TwoPartText'
import TeamSection from '../sections/TeamSection'
import NumberSection from '../sections/NumberSection'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'

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
    <div>
      <Header />
      <HeroNieruchomosci 
        img={'partner-scaled.jpg'}
        content={
          <>
            <div className='card-section__header'>
              <h1>Zostań partnerem lub pracownikiem</h1>
              <p style={{color: 'white'}}>Jesteśmy zespołem łączącym doświadczenie prawne z praktyczną znajomością rynku nieruchomości, by zapewnić klientom kompleksową i bezpieczną obsługę. Jeśli chcesz rozwijać się razem z nami, zapraszamy do współpracy!</p>
            </div>
          </>
        }
      />

      <div className='separate'></div>
      <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381'/>
      <div className='separate'></div>
      
      <div className='card-section__header'>
        <h2>Jak dołączyć?</h2>
        <p>Wyślij swoje CV lub propozycję współpracy na adres: kontakt@m2notarialnie.pl lub skorzystaj z poniższego formularza kontaktowego. Skontaktujemy się z Tobą, aby omówić szczegóły.</p>
      </div>

      <TwoPartText
        left={
          <>
            <h2>Zostań partnerem M2Notarialnie</h2>
            <p>Jako partner biznesowy dołączasz do zespołu, który łączy doświadczenie prawne i praktyczną znajomość rynku nieruchomości. Razem budujemy markę, która oferuje klientom kompleksową i bezpieczną obsługę.</p>
          </>
        }
        right={
          <>
            <h2>Zostań pracownikiem M2Notarialnie</h2>
            <p>Jeśli chcesz rozwijać się w branży nieruchomości i prawa, dołącz do naszego zespołu. Szukamy osób, które cenią profesjonalizm, rzetelność i bezpieczeństwo w obsłudze klientów.</p>
          </>
        }
      />

      <TwoPartText
        left={
          <>
            <h2>Kogo szukamy?</h2>
            <ul>
              <li>Partnerów biznesowych z branży nieruchomości i prawa</li>
              <li>Osób zorientowanych na profesjonalną, długofalową współpracę</li>
              <li>Partnerów chcących rozwijać się i wspierać naszych klientów</li>
            </ul>
          </>
        }
        right={
          <>
            <h2>Kogo szukamy?</h2>
            <ul>
              <li>Prawników, notariuszy i specjalistów rynku nieruchomości</li>
              <li>Osób odpowiedzialnych i zorientowanych na klienta</li>
              <li>Kandydatów gotowych na rozwój zawodowy i współpracę zespołową</li>
            </ul>
          </>
        }
      />

      <TwoPartText
        left={<h3>Razem możemy stworzyć coś więcej niż tylko współpracę — możemy zbudować partnerstwo oparte na wzajemnym rozwoju i zaufaniu, które przyniesie korzyści nie tylko nam, ale przede wszystkim naszym klientom.</h3>}
        right={<h3>W M2Notarialnie wierzymy, że sukces to efekt wspólnej pracy, pasji i ciągłego rozwoju — dołączając do nas, stajesz się częścią zespołu, który naprawdę dba o Twój rozwój i satysfakcję z pracy.</h3>}
      />

      {/* Sekcja z formularzami */}
      <TwoPartText
        left={
          <form className="cooperation-form" onSubmit={handlePartnerSubmit}>
            <h3>Formularz partnerski</h3>
            
            {partnerMessage && (
              <div className={`form-message ${partnerMessage.includes('Błąd') ? 'error' : 'success'}`}>
                {partnerMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="company-name">Imię i nazwisko / nazwa firmy *</label>
              <input 
                type="text" 
                id="company-name"
                name="companyName"
                required 
                value={partnerFormData.companyName}
                onChange={handlePartnerChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner-email">Adres e-mail *</label>
              <input 
                type="email" 
                id="partner-email"
                name="email"
                required 
                value={partnerFormData.email}
                onChange={handlePartnerChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner-phone">Numer telefonu *</label>
              <input 
                type="tel" 
                id="partner-phone"
                name="phone"
                required 
                value={partnerFormData.phone}
                onChange={handlePartnerChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="partner-message">Propozycja współpracy / wiadomość *</label>
              <textarea 
                id="partner-message"
                name="message"
                rows="5"
                required
                value={partnerFormData.message}
                onChange={handlePartnerChange}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${partnerLoading ? 'loading' : ''}`}
              disabled={partnerLoading}
            >
              {partnerLoading ? 'Wysyłanie...' : 'Wyślij propozycję współpracy'}
            </button>
          </form>
        }
        right={
          <form className="cooperation-form" onSubmit={handleEmployeeSubmit}>
            <h3>Formularz rekrutacyjny</h3>
            
            {employeeMessage && (
              <div className={`form-message ${employeeMessage.includes('Błąd') ? 'error' : 'success'}`}>
                {employeeMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="full-name">Imię i nazwisko *</label>
              <input 
                type="text" 
                id="full-name"
                name="fullName"
                required 
                value={employeeFormData.fullName}
                onChange={handleEmployeeChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="employee-email">Adres e-mail *</label>
              <input 
                type="email" 
                id="employee-email"
                name="email"
                required 
                value={employeeFormData.email}
                onChange={handleEmployeeChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="employee-phone">Numer telefonu *</label>
              <input 
                type="tel" 
                id="employee-phone"
                name="phone"
                required 
                value={employeeFormData.phone}
                onChange={handleEmployeeChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="employee-message">Krótka wiadomość / list motywacyjny *</label>
              <textarea 
                id="employee-message"
                name="message"
                rows="4"
                required
                value={employeeFormData.message}
                onChange={handleEmployeeChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="cv-upload">Załącz swoje CV (PDF, DOC, max 5MB) *</label>
              <input 
                type="file" 
                id="cv-upload"
                name="cv-upload"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
              />
              <small>Akceptowane formaty: PDF, DOC, DOCX. Maksymalny rozmiar: 5MB</small>
              {cvFile && <div className="file-info">Wybrano: {cvFile.name}</div>}
            </div>

            <button 
              type="submit" 
              className={`btn btn-primary ${employeeLoading ? 'loading' : ''}`}
              disabled={employeeLoading}
            >
              {employeeLoading ? 'Wysyłanie...' : 'Wyślij aplikację'}
            </button>
          </form>
        }
      />

      <TeamSection />
      <NumberSection/>
    </div>
  )
}