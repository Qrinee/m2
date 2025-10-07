import React, { useState } from 'react'
import SplitLayout from '../layouts/SplitLayout'
import city from '../assets/city_contact3-2.jpeg'
import './ContactSection.css'

export default function ContactSection() {
  const backend = import.meta.env.VITE_BACKEND + "/api/inquiry"
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    
    if (!acceptedTerms) {
      setMessage('Proszę zaakceptować regulamin i politykę prywatności')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${backend}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessage('Wiadomość została wysłana pomyślnie! Skontaktujemy się z Tobą w ciągu 24 godzin.')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        setAcceptedTerms(false)
      } else {
        setMessage(`Błąd: ${data.error || 'Wystąpił problem podczas wysyłania wiadomości'}`)
      }
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error)
      setMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <SplitLayout
        rightContent={
          <div>
            <div className='contact-section__header'>
              <p>
                Wypełnij krótki formularz, a nasi agenci odezwą się do Ciebie w mniej niż 24 godziny.
              </p>
              <h2 className='h2'>Chętnie Ci pomożemy</h2>
            </div>
            
            {message && (
              <div className={`contact-message ${message.includes('Błąd') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            <form className='contact-form' onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Imię i nazwisko" 
                required 
                className='input' 
                value={formData.name}
                onChange={handleChange}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                required 
                className='input' 
                value={formData.email}
                onChange={handleChange}
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Telefon" 
                required 
                className='input' 
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea 
                name="message"
                placeholder="Wiadomość" 
                required 
                className='textarea' 
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <label className='label'>
                <input 
                  type="checkbox" 
                  required 
                  style={{marginRight: '10px'}} 
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                Akceptuję <a href="/terms" className='a'>regulamin</a> i <a className='a' href="/privacy">politykę prywatności</a>
              </label>
              <button 
                className={`contact-button ${isLoading ? 'loading' : ''}`} 
                style={{marginTop: '20px'}} 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
              </button>
            </form>
          </div>
        }
        leftBg={city}
        rightBg="#F8F8F8"
      />
    </div>
  )
}