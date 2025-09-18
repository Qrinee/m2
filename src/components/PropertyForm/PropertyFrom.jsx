// PropertyForm.jsx
import React from "react";
import "./PropertyForm.css";
import city from '../../assets/city.jpeg';

export default function PropertyForm() {
  return (
    <div className="form-container">
      <div className="form-image">
        <img src={city} alt="Building" />
      </div>

      <div className="form-content">
        <h2>Zgłoś nieruchomość do sprzedaży</h2>

        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Imię*</label>
              <input type="text" placeholder="Imię" required />
            </div>
            <div className="form-group">
              <label>Nazwisko*</label>
              <input type="text" placeholder="Nazwisko" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email*</label>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <label>Telefon</label>
              <input type="tel" placeholder="Telefon" />
            </div>
          </div>

          <div className="form-group">
            <label>Treść wiadomości</label>
            <textarea placeholder="Treść wiadomości"></textarea>
          </div>

          <button type="submit">Wyślij</button>
        </form>
      </div>
    </div>
  );
}