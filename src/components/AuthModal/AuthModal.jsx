// AuthModal.jsx
import React, { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ onClose }) {
  const [screen, setScreen] = useState("login"); // "login" | "register" | "reset"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Stan dla formularza rejestracji
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  // Stan dla formularza logowania
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Stan dla resetowania hasła
  const [resetData, setResetData] = useState({
    email: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  // Obsługa zmian w formularzach
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleResetChange = (e) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value
    });
  };

  // Rejestracja użytkownika
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Walidacja
    if (registerData.password !== registerData.confirmPassword) {
      setError("Hasła nie są identyczne");
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.name.split(' ')[0], // Pierwsze słowo jako imię
          surname: registerData.name.split(' ').slice(1).join(' ') || registerData.name.split(' ')[0], // Reszta jako nazwisko
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd rejestracji");
      }

      setSuccess("Rejestracja pomyślna! Możesz się teraz zalogować.");
      
      // Automatyczne przejście do logowania po 2 sekundach
      setTimeout(() => {
        setScreen("login");
        setRegisterData({
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: ""
        });
        setSuccess("");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logowanie użytkownika
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd logowania");
      }

      // Zapisz token i dane użytkownika w localStorage
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      
      setSuccess("Logowanie pomyślne!");
      
      // Zamknij modal po 1 sekundzie
      setTimeout(() => {
        onClose();
        // Możesz dodać callback do odświeżenia stanu użytkownika w rodzicu
        if (window.onAuthSuccess) {
          window.onAuthSuccess(data.data.user);
        }
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      window.location.reload(); 
    }
  };

  // Resetowanie hasła (placeholder - wymaga implementacji w backendzie)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // TODO: Zaimplementuj endpoint resetowania hasła w backendzie
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd resetowania hasła");
      }

      setSuccess("Link do resetowania hasła został wysłany na podany email.");
      
      setTimeout(() => {
        setScreen("login");
        setResetData({ email: "" });
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resetuj błędy przy zmianie ekranu
  const handleScreenChange = (newScreen) => {
    setScreen(newScreen);
    setError("");
    setSuccess("");
  };

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
            {/* Komunikat o błędzie */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Komunikat o sukcesie */}
            {success && (
              <div className="success-message">
                {success}
              </div>
            )}

            {/* LOGIN */}
            {screen === "login" && (
              <form onSubmit={handleLogin}>
                <h3>Zaloguj się na swoje konto</h3>
                
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  disabled={loading}
                />
 
                
                <div className="password-field">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Hasło" 
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    disabled={loading}
                  />
                  <span 
                    className="toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Logowanie..." : "Wejście"}
                </button>

                <div className="links">
                  <span onClick={() => handleScreenChange("register")}>
                    Zarejestruj się tutaj!
                  </span>
                  <span onClick={() => handleScreenChange("reset")}>
                    Nie pamiętasz hasła?
                  </span>
                </div>
              </form>
            )}

            {/* REGISTER */}
            {screen === "register" && (
              <form onSubmit={handleRegister}>
                <h3>Rejestracja</h3>
                
                <input 
                  type="text" 
                  name="name"
                  placeholder="Imię i Nazwisko" 
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
                
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email" 
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
                
                <input 
                  type="text" 
                  name="phone"
                  placeholder="Numer telefonu (opcjonalnie)" 
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  disabled={loading}
                />
                
                <div className="password-field">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Hasło" 
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                    disabled={loading}
                  />
                  <span 
                    className="toggle-eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword"
                  placeholder="Powtórz hasło" 
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                  disabled={loading}
                />
                
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Rejestracja..." : "Zarejestruj"}
                </button>

                <div className="links">
                  <span onClick={() => handleScreenChange("login")}>
                    Masz konto? Zaloguj się
                  </span>
                </div>
              </form>
            )}

            {/* RESET PASSWORD */}
            {screen === "reset" && (
              <form onSubmit={handleResetPassword}>
                <h3>Reset hasła</h3>
                
                <input 
                  type="email" 
                  name="email"
                  placeholder="Podaj email" 
                  value={resetData.email}
                  onChange={handleResetChange}
                  required
                  disabled={loading}
                />
                
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
                </button>

                <div className="links">
                  <span onClick={() => handleScreenChange("login")}>
                    Powrót do logowania
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}