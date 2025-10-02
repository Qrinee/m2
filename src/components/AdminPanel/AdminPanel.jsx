// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import './AdminPanel.css';
import { FaDashcube, FaNewspaper, FaUser, FaVideo, FaWpforms } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin') {
        navigate('/');
        return;
      }
      setUser(parsedUser);
    } catch (error) {
      console.error('Błąd parsowania danych użytkownika:', error);
      navigate('/login');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Sprawdzanie uprawnień...</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Panel Admina</h2>
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

          <Link to="/admin/faq" className="nav-item">
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
                <span className="user-name">{user.fullName}</span>
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