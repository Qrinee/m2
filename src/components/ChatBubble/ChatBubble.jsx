import React, { useState } from 'react';
import { FaEnvelope, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './ChatBubble.css';

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj logika wysyłania formularza
    console.log('Formularz wysłany:', formData);
    // Resetowanie pól
    setFormData({ email: '', message: '' });
    // Opcjonalnie zamknięcie formularza po wysłaniu
    // setIsOpen(false);
  };

  return (
    <div className="cb-wrapper">
      {isOpen && (
        <div className="cb-popup">
          <div className="cb-header">
            <h3>Skontaktuj się z nami</h3>
            <button className="cb-close" onClick={toggleForm}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="cb-content">
            <div className="cb-field">
              <label htmlFor="email" className="cb-label">Twój email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="cb-input"
                placeholder="wpisz@email.com"
              />
            </div>
            
            <div className="cb-field">
              <label htmlFor="message" className="cb-label">Wiadomość</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="cb-textarea"
                placeholder="Napisz swoją wiadomość..."
                rows="4"
              />
            </div>
            
            <button type="submit" className="cb-submit">
              <FaPaperPlane /> Wyślij
            </button>
          </form>
        </div>
      )}

      <button
        className={`cb-trigger ${isOpen ? 'active' : ''}`}
        onClick={toggleForm}
      >
        {isOpen ? <FaTimes /> : <FaEnvelope  style={{width: '30px', height: '30px'}}/>}
      </button>
    </div>
  );
};

export default ChatBubble;