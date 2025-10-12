// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './AdminPanel.css';
import { FaDashcube, FaNewspaper, FaUser, FaVideo, FaWpforms } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Nieautoryzowany dostęp');
      }

      const data = await response.json();
      
      if (data.data.user.role !== 'admin') {
        navigate('/');
        return;
      }
      
      setUser(data.data.user);
    } catch (error) {
      console.error('Błąd autoryzacji:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: 'include'
      });
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    } finally {
      setUser(null);
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Sprawdzanie uprawnień...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Przekierowywanie...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <Link to={'/'} style={{color: 'inherit', textDecoration: 'none'}}><h2> M2Notarialnie</h2></Link>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className="nav-item">
            <span className="nav-icon"><FaDashcube/></span>
            {sidebarOpen && <span className="nav-text">Dashboard</span>}
          </Link>

          <Link to="/admin/forms" className="nav-item">
            <span className="nav-icon"><FaWpforms/></span>
            {sidebarOpen && <span className="nav-text">Formularze</span>}
          </Link>

          <Link to="/admin/properties" className="nav-item">
            <span className="nav-icon"><FaHouse/></span>
            {sidebarOpen && <span className="nav-text">Oferty</span>}
          </Link>

          <Link to="/admin/reels" className="nav-item">
            <span className="nav-icon"><FaVideo/></span>
            {sidebarOpen && <span className="nav-text">Rolki</span>}
          </Link>

          <Link to="/admin/news" className="nav-item">
            <span className="nav-icon"><FaNewspaper/></span>
            {sidebarOpen && <span className="nav-text">Aktualności</span>}
          </Link>

          <Link to="/admin/users" className="nav-item">
            <span className="nav-icon"><FaUser/></span>
            {sidebarOpen && <span className="nav-text">Użytkownicy</span>}
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-avatar">
              {user.name?.charAt(0)}{user.surname?.charAt(0)}
            </span>
            {sidebarOpen && (
              <div className="user-details">
                <span className="user-name">{user.name} {user.surname}</span>
                <span className="user-role">Administrator</span>
              </div>
            )}
          </div>
          <button onClick={logout} className="logout-btn">
            <span className="nav-icon">🚪</span>
            {sidebarOpen && <span>Wyloguj</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <div className="content-header">
          <h1>Panel Administratora</h1>
          <div className="header-actions">
            <span>Witaj, {user.name}!</span>
          </div>
        </div>
        
        <div className="content-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;