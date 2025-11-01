// AuthModal.jsx - zaktualizowany
import React, { useState } from "react";
import "./AuthModal.css";
import { FaEye, FaUserSecret } from "react-icons/fa";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [screen, setScreen] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

const [registerData, setRegisterData] = useState({
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  companyName: "",
  role: "user"
});

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [resetData, setResetData] = useState({ email: "" });
  const [showPassword, setShowPassword] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

  // Obsługa formularzy
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  // Rejestracja
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd rejestracji");
      }

      setSuccess("Rejestracja pomyślna! Możesz się teraz zalogować.");
      
      setTimeout(() => {
        setScreen("login");
        setRegisterData({
          name: "", surname: "", email: "", password: "", confirmPassword: "", phone: "", companyName: ""
        });
        setSuccess("");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logowanie
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd logowania");
      }

      setSuccess("Logowanie pomyślne!");
      
      setTimeout(() => {
        onClose();
        if (onAuthSuccess && data.data && data.data.user) {
          onAuthSuccess(data.data.user);
        }
        window.dispatchEvent(new CustomEvent('userLoggedIn', { 
          detail: { user: data.data.user } 
        }));
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resetowanie hasła
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Błąd resetowania hasła");
      }

      setSuccess(data.message || "Link do resetowania hasła został wysłany na podany email.");
      
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
          <div className="modal-left">
            <div className="overlay-text">
              <h2>Witaj w <br /> M2Notarialnie</h2>
            </div>
          </div>

          <div className="modal-right">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {screen === "login" && (
              <form onSubmit={handleLogin}>
                <h3>Zaloguj się na swoje konto</h3>
                <input 
                className="inp"
                  type="email" name="email" placeholder="Email" 
                  value={loginData.email} onChange={handleLoginChange} required disabled={loading}
                />

                <div className="password-field">
                  <input 
                    type={showPassword ? "text" : "password"} name="password" placeholder="Hasło" 
                    value={loginData.password} onChange={handleLoginChange} required disabled={loading}
                  />
                  <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaUserSecret  style={{opacity: '50%'}}/> :  <FaEye  style={{opacity: '50%'}}/>}
                  </span>
                </div>
                <button style={{marginTop: '10px'}} type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Logowanie..." : "Zaloguj się"}
                </button>
                <div className="links">
                  <span onClick={() => handleScreenChange("register")}>Zarejestruj się tutaj!</span>
                  <span onClick={() => handleScreenChange("reset")}>Nie pamiętasz hasła?</span>
                </div>
              </form>
            )}

{screen === "register" && (
  <form onSubmit={handleRegister}>
    <h3>Rejestracja</h3>
    <input type="text" className="inp" name="name" placeholder="Imię" value={registerData.name} onChange={handleRegisterChange} required disabled={loading} />
    <input type="text" className="inp" name="surname" placeholder="Nazwisko" value={registerData.surname} onChange={handleRegisterChange} required disabled={loading} />
    <input type="email" className="inp" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required disabled={loading} />
    <input type="text" className="inp" name="phone" placeholder="Numer telefonu (opcjonalnie)" value={registerData.phone} onChange={handleRegisterChange} disabled={loading} />
    
    {/* Zmienione radio buttons */}
    <div className="role-selection">
      <label>
        <input 
          type="radio" 
          name="role" 
          value="user" 
          checked={registerData.role === "user"} 
          onChange={handleRegisterChange}
          disabled={loading}
        /> Osoba prywatna
      </label>
      <label>
        <input 
          type="radio" 
          name="role" 
          value="agent" 
          checked={registerData.role === "agent"} 
          onChange={handleRegisterChange}
          disabled={loading}
        /> Deweloper
      </label>
    </div>
    <div>
      {registerData.role === "agent" && (
        <input type="text"  className="inp" disabled={loading} name="companyName" placeholder="Nazwa Firmy" value={registerData.companyName} onChange={handleRegisterChange}  />
      )}
    </div>
    <div className="password-field">
      <input 
        type={showPassword ? "text" : "password"} 
        name="password" 
         className="inp"
        placeholder="Hasło" 
        value={registerData.password} 
        onChange={handleRegisterChange} 
        required 
        disabled={loading}
      />
      <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FaUserSecret style={{opacity: '50%'}}/> : <FaEye style={{opacity: '50%'}}/>}
      </span>
    </div>
    <input 
      type={showPassword ? "text" : "password"} 
      name="confirmPassword" 
       className="inp"
      placeholder="Powtórz hasło" 
      value={registerData.confirmPassword} 
      onChange={handleRegisterChange} 
      required 
      disabled={loading}
    />
    <div>
      
    <button type="submit" className="btn-primary" disabled={loading}>
      {loading ? "Rejestracja..." : "Zarejestruj"}
    </button>
    </div>
    <div className="links">
      <span onClick={() => handleScreenChange("login")}>Masz konto? Zaloguj się</span>
    </div>
  </form>
)}

            {screen === "reset" && (
              <form onSubmit={handleResetPassword}>
                <h3>Reset hasła</h3>
                <input type="email" name="email" placeholder="Podaj email" value={resetData.email} onChange={handleResetChange} required disabled={loading} />
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
                </button>
                <div className="links">
                  <span onClick={() => handleScreenChange("login")}>Powrót do logowania</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}