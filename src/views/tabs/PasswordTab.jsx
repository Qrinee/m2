// src/components/MojProfil/tabs/PasswordTab.js
import React, { useState } from 'react';
import { FaKey } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function PasswordTab({ setSuccessMessage, setError }) {
  const [editLoading, setEditLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      setError(null);

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('Nowe hasła nie są identyczne');
      }

      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd zmiany hasła');
      }

      setSuccessMessage('Hasło zostało pomyślnie zmienione');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="mp-tab-content">
      <h2 className="mp-tab-title">Zmiana hasła</h2>
      <div className="mp-form-section">
        <form className="mp-form" onSubmit={handleChangePassword}>
          <div className="mp-form__group">
            <label className="mp-form__label">Aktualne hasło</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="mp-form__input"
              placeholder="Wprowadź aktualne hasło"
              required
            />
          </div>

          <div className="mp-form__group">
            <label className="mp-form__label">Nowe hasło</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mp-form__input"
              placeholder="Wprowadź nowe hasło"
              required
            />
          </div>

          <div className="mp-form__group">
            <label className="mp-form__label">Potwierdź nowe hasło</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mp-form__input"
              placeholder="Powtórz nowe hasło"
              required
            />
          </div>

          <div className="mp-form__actions">
            <button 
              type="submit"
              className="mp-btn mp-btn--primary"
              disabled={editLoading}
            >
              <FaKey className="mp-btn__icon" />
              {editLoading ? 'Zmienianie...' : 'Zmień hasło'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}