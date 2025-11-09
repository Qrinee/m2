import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import userImage from '../../assets/user.jpg'
import { Link } from 'react-router-dom';
const ContactCard = ({ property }) => {
    const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      msg: form.msg,
      propertyId: property?._id,
    };

    if (!formData.name || !formData.email) {
      setMessage({ 
        text: 'Proszę wypełnić wymagane pola: imię i email', 
        type: 'error' 
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          text: 'Wiadomość została wysłana pomyślnie!', 
          type: 'success' 
        });
        setForm({ name: "", email: "", phone: "", msg: "" });
      } else {
        setMessage({ 
          text: 'Wystąpił błąd podczas wysyłania wiadomości: ' + result.error, 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setMessage({ 
        text: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const owner = property?.user;
  const agentName = owner?.name || "Administrator";
  const agentSurname = owner?.surname || "Systemu";
  const agentRole = owner?.position || owner?.role == "agent" ? 'Deweloper' : 'Osoba prywatna';
  const agentAvatar = owner?.profilePicture 
    ? `${import.meta.env.VITE_BACKEND}${owner.profilePicture}`
    : userImage;
  
  const agentPhone = owner?.phone || '';
  const agentEmail = owner?.contactEmail || owner?.email || '';

  return (
    <div className="prop-card prop-contact-card">
      <Link to={owner?.role != 'user' ? `/estate_agent/${owner._id}` : ''} style={{color: 'inherit'}}>
      <div className="prop-agent">
        <img
          className="prop-agent-avatar"
          src={agentAvatar}
          alt={`${agentName} ${agentSurname}`}
        />
        <div className="prop-agent-info">
          <div className="prop-agent-name">{owner?.companyName ? owner?.companyName : agentName + " " + agentSurname}</div>
          <div className="prop-agent-role">{agentRole}</div>
        </div>
      </div>
    </Link>
      {message.text && (
        <div className={`form-message ${message.type}`}>
          <div className="message-content">
            {message.type === 'success' && (
              <div className="message-icon success">✓</div>
            )}
            {message.type === 'error' && (
              <div className="message-icon error">!</div>
            )}
            <span>{message.text}</span>
          </div>
          <button 
            className="message-close"
            onClick={() => setMessage({ text: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}

      <form className="prop-contact-form" onSubmit={handleSubmit}>
        <label className="form-labeld">
          <span className="label-text">Twoje imię *</span>
          <input
            className="form-input"
            placeholder="Wpisz swoje imię"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-labeld">
          <span className="label-text">Twój Adres e-mail *</span>
          <input
            className="form-input"
            type="email"
            placeholder="email@przykład.pl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-labeld">
          <span className="label-text">Twój Telefon</span>
          <input
            className="form-input"
            placeholder="+48 123 456 789"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </label>

        <label className="form-labeld">
          <span className="label-text">Wiadomość</span>
          <textarea
            className="form-textarea"
            placeholder="Napisz swoją wiadomość..."
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            rows={4}
            disabled={isSubmitting}
          />
        </label>

        <label className="prop-gdpr">
          <input 
            type="checkbox" 
            required 
            disabled={isSubmitting}
          /> 
          Wyrażam zgodę na Warunki GDPR
        </label>

        <button 
          type="submit" 
          className={`prop-btn primary full-width ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="button-spinner"></div>
              Wysyłanie...
            </>
          ) : (
            'Wyślij E-Mail'
          )}
        </button>
        

        {
          agentPhone ? (
        <div className="prop-contact-actions">
          <a 
            href={`tel:${agentPhone}`} 
            className="prop-btn secondary"
          >
            <span className="btn-icon"><FaPhone/></span> Dzwoń
          </a>
          <a 
            href={`https://wa.me/${agentPhone.replace(/[^\d]/g, '')}?text=Witam,%20jestem%20zainteresowany%20nieruchomością:%20${encodeURIComponent(property?.nazwa || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="prop-btn secondary"
          >
            <span className="btn-icon"><FaWhatsapp/></span> WhatsApp
          </a>
        </div>
          ) : <></>
        }


      </form>
    </div>
  );
};

export default ContactCard;