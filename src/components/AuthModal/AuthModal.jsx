import React, { useState } from "react";
import "./AuthModal.css";
import { FaEye, FaEyeSlash, FaUser, FaBuilding } from "react-icons/fa";

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

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

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
             <button className="close-btns" onClick={onClose}>
          <span>×</span>
        </button>
      <div className="modal">
 

        <div className="modal-header">
          <h2 className="modal-title">
            {screen === "login" && "Witaj ponownie"}
            {screen === "register" && "Dołącz do nas"}
            {screen === "reset" && "Resetowanie hasła"}
          </h2>
          <p className="modal-subtitle">
            {screen === "login" && "Zaloguj się na swoje konto"}
            {screen === "register" && "Stwórz nowe konto"}
            {screen === "reset" && "Podaj email do resetu hasła"}
          </p>
        </div>

        <div className="modal-content">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {screen === "login" && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder=" "
                  value={loginData.email} 
                  onChange={handleLoginChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Email</label>
              </div>

              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder=" "
                  value={loginData.password} 
                  onChange={handleLoginChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Hasło</label>
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Logowanie..." : "Zaloguj się"}
              </button>

              <div className="form-links">
                <button type="button" onClick={() => handleScreenChange("register")}>
                  Nie masz konta? <span>Zarejestruj się</span>
                </button>
                <button type="button" onClick={() => handleScreenChange("reset")}>
                  <span>Nie pamiętasz hasła?</span>
                </button>
              </div>
            </form>
          )}

          {screen === "register" && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="name-fields">
                <div className="input-group">
                  <input 
                    type="text" 
                    name="name" 
                    placeholder=" "
                    value={registerData.name} 
                    onChange={handleRegisterChange} 
                    required 
                    disabled={loading}
                    className="form-input"
                  />
                  <label className="form-label">Imię</label>
                </div>
                <div className="input-group">
                  <input 
                    type="text" 
                    name="surname" 
                    placeholder=" "
                    value={registerData.surname} 
                    onChange={handleRegisterChange} 
                    required 
                    disabled={loading}
                    className="form-input"
                  />
                  <label className="form-label">Nazwisko</label>
                </div>
              </div>

              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder=" "
                  value={registerData.email} 
                  onChange={handleRegisterChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Email</label>
              </div>

              <div className="input-group">
                <input 
                  type="text" 
                  name="phone" 
                  placeholder=" "
                  value={registerData.phone} 
                  onChange={handleRegisterChange} 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Numer telefonu (opcjonalnie)</label>
              </div>

              <div className="role-selection">
                <div className="role-option">
                  <input 
                    type="radio" 
                    name="role" 
                    value="user" 
                    id="role-user"
                    checked={registerData.role === "user"} 
                    onChange={handleRegisterChange}
                    disabled={loading}
                  />
                  <label htmlFor="role-user" className="role-label">
                    <FaUser className="role-icon" />
                    <span>Osoba prywatna</span>
                  </label>
                </div>
                <div className="role-option">
                  <input 
                    type="radio" 
                    name="role" 
                    value="agent" 
                    id="role-agent"
                    checked={registerData.role === "agent"} 
                    onChange={handleRegisterChange}
                    disabled={loading}
                  />
                  <label htmlFor="role-agent" className="role-label">
                    <FaBuilding className="role-icon" />
                    <span>Deweloper</span>
                  </label>
                </div>
              </div>

              {registerData.role === "agent" && (
                <div className="input-group">
                  <input 
                    type="text" 
                    name="companyName" 
                    placeholder=" "
                    value={registerData.companyName} 
                    onChange={handleRegisterChange} 
                    disabled={loading}
                    className="form-input"
                  />
                  <label className="form-label">Nazwa firmy</label>
                </div>
              )}

              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder=" "
                  value={registerData.password} 
                  onChange={handleRegisterChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Hasło</label>
                <button 
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  placeholder=" "
                  value={registerData.confirmPassword} 
                  onChange={handleRegisterChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Powtórz hasło</label>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Rejestracja..." : "Zarejestruj się"}
              </button>

              <div className="form-links">
                <button type="button" onClick={() => handleScreenChange("login")}>
                  Masz już konto? <span>Zaloguj się</span>
                </button>
              </div>
            </form>
          )}

          {screen === "reset" && (
            <form onSubmit={handleResetPassword} className="auth-form">
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder=" "
                  value={resetData.email} 
                  onChange={handleResetChange} 
                  required 
                  disabled={loading}
                  className="form-input"
                />
                <label className="form-label">Email</label>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
              </button>

              <div className="form-links">
                <button type="button" onClick={() => handleScreenChange("login")}>
                  <span>Powrót do logowania</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}