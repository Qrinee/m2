import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = ({color}) => {
  const backend = import.meta.env.VITE_BACKEND + "/api/inquiry";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdpr: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (!formData.gdpr) {
      setMessage("Musisz zaakceptować warunki GDPR");
      return;
    }

    
    if (!formData.name || !formData.email || !formData.message) {
      setMessage("Proszę wypełnić wszystkie wymagane pola");
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Proszę podać poprawny adres email");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backend}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          gdpr: formData.gdpr
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Wiadomość została wysłana pomyślnie! Skontaktujemy się z Tobą wkrótce.");
        
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          gdpr: false,
        });
      } else {
        setMessage(`Błąd: ${data.error || "Wystąpił problem podczas wysyłania wiadomości"}`);
      }
    } catch (error) {
      console.error("Błąd wysyłania formularza:", error);
      setMessage("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Skontaktuj się ze mną</h2>
      
      {message && (
        <div className={`form-message ${message.includes("Błąd") ? "error" : "success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="inputs-row">
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Twoje imię *"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Twój Adres e-mail *"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
          <input
            type="text"
            className="input"
            name="phone"
            placeholder="Twój Telefon"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <textarea
          name="message"
          className="input"
          placeholder="Twoja wiadomość *"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <div className="gdpr">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
          <label>Wyrażam zgodę na Warunki GDPR *</label>
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{backgroundColor: color ? color : 'var(--secondary-color)', color: 'white', fontWeight: 'bold'}}
          
          className={isLoading ? "loading" : ""}
        >
          {isLoading ? "Wysyłanie..." : "Wyślij E-Mail"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;