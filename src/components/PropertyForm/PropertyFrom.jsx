import React, { useState } from "react";
import "./PropertyForm.css";
import city from '../../assets/city.jpeg';

export default function PropertyForm() {
  const backend = import.meta.env.VITE_BACKEND + "/api/inquiry";
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${backend}/property-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Dziękujemy! Twoja nieruchomość została zgłoszona. Skontaktujemy się z Tobą w ciągu 24 godzin.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setMessage(`Błąd: ${data.error || 'Wystąpił problem podczas wysyłania zgłoszenia'}`);
      }
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      setMessage('Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="property-form-container">
      <div className="property-form-image">
        <img src={city} alt="Building" />
      </div>

      <div className="property-form-content">
        <h2>Zgłoś nieruchomość do sprzedaży</h2>

        {message && (
          <div className={`property-form-message ${message.includes('Błąd') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <form className="property-form" onSubmit={handleSubmit}>
          <div className="property-form-row">
            <div className="property-form-group">
              <label>Imię*</label>
              <input 
                type="text" 
                name="firstName"
                placeholder="Imię" 
                required 
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="property-form-group">
              <label>Nazwisko*</label>
              <input 
                type="text" 
                name="lastName"
                placeholder="Nazwisko" 
                required 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="property-form-row">
            <div className="property-form-group">
              <label>Email*</label>
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="property-form-group">
              <label>Telefon</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Telefon" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="property-form-group">
            <label>Treść wiadomości</label>
            <textarea 
              name="message"
              placeholder="Opisz swoją nieruchomość (lokalizacja, metraż, stan techniczny, itp.)"
              value={formData.message}
              onChange={handleChange}
              rows="5"
            ></textarea>
          </div>

          <button 
            className={`property-form-button ${isLoading ? 'loading' : ''}`} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Wysyłanie...' : 'Wyślij zgłoszenie'}
          </button>
        </form>
      </div>
    </div>
  );
}