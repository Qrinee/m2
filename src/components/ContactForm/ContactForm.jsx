import React, { useState } from "react";
import "./ContactForm.css";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gdpr: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Formularz wysłany!");
  };

  return (
    <div className="contact-form">
      <h2>Skontaktuj się ze mną</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputs-row">
          <input
            type="text"
             className="input"
            name="name"
            placeholder="Twoje imię"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Twój Adres e-mail"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
             className="input"
            name="phone"
            placeholder="Twój Telefon"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="message"
           className="input"
          placeholder="Twoja wiadomość"
          value={formData.message}
          onChange={handleChange}
        />
        <div className="gdpr">
          <input
            type="checkbox"
            name="gdpr"
            checked={formData.gdpr}
            onChange={handleChange}
          />
          <label>Wyrażam zgodę na Warunki GDPR</label>
        </div>
        <button type="submit">Wyślij E-Mail</button>
      </form>
    </div>
  );
};

export default ContactForm;
