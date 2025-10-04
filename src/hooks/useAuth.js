// hooks/useAuth.js
import { useState, useEffect } from 'react';

const API_BASE_URL = "http://localhost:5000/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Błąd sprawdzania autoryzacji:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Błąd wylogowania:', error);
    } finally {
      setUser(null);
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
    }
  };

  useEffect(() => {
    checkAuthStatus();

    // Nasłuchuj na globalne zdarzenia logowania
    const handleUserLoggedIn = (event) => {
      if (event.detail && event.detail.user) {
        setUser(event.detail.user);
      }
    };

    const handleUserLoggedOut = () => {
      setUser(null);
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  return {
    user,
    loading,
    checkAuthStatus,
    logout
  };
};