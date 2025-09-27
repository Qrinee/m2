// AuthModal.jsx
import React, { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ onClose }) {
  const [screen, setScreen] = useState("login"); // "login" | "register" | "reset"

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="modal-content">
          {/* LEFT IMAGE + TEXT */}
          <div className="modal-left">
            <div className="overlay-text">
              <h2>Witaj w <br /> M2Notarialnie</h2>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="modal-right">
            {screen === "login" && (
              <>
                <h3>Zaloguj się na swoje konto</h3>
                <input type="text" placeholder="Nazwa użytkownika" />
                <div className="password-field">
                  <input type="password" placeholder="Hasło" />
                  <span className="toggle-eye">👁️</span>
                </div>
                <button className="btn-primary">Wejście</button>

                <div className="links">
                  <span onClick={() => setScreen("register")}>Zarejestruj się tutaj!</span>
                  <span onClick={() => setScreen("reset")}>Nie pamiętasz hasła?</span>
                </div>
              </>
            )}

            {screen === "register" && (
              <>
                <h3>Rejestracja</h3>
                <input type="text" placeholder="Nazwa użytkownika" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Hasło" />
                <input type="password" placeholder="Powtórz hasło" />
                <button className="btn-primary">Zarejestruj</button>

                <div className="links">
                  <span onClick={() => setScreen("login")}>Masz konto? Zaloguj się</span>
                </div>
              </>
            )}

            {screen === "reset" && (
              <>
                <h3>Reset hasła</h3>
                <input type="email" placeholder="Podaj email" />
                <button className="btn-primary">Wyślij link resetujący</button>

                <div className="links">
                  <span onClick={() => setScreen("login")}>Powrót do logowania</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
