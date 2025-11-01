// src/components/MojProfil/MojProfil.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import './MojProfil.css';


// Import ikon
import { 
  FaUser, 
  FaChartLine, 
  FaKey, 
  FaInbox, 
  FaBell, 
  FaCog, 
  FaHome 
} from 'react-icons/fa';
import LoadingScreen from '../components/LoadingScreen/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen/ErrorScreen';
import DashboardTab from './tabs/DashboardTab';
import ProfileTab from './tabs/ProfileTab';
import PropertiesTab from './tabs/PropertiesTab';
import PasswordTab from './tabs/PasswordTab';
import MessagesTab from './tabs/MessagesTab';
import SettingsTab from './tabs/SettingsTab';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function MojProfil() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [successMessage, setSuccessMessage] = useState('');
  const [userProperties, setUserProperties] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    companyName: ''
  });

  useEffect(() => {
    fetchCurrentUser();
    if (id) {
      fetchUser();
    } else {
      fetchCurrentUserAsUser();
    }
  }, [id]);

  const fetchCurrentUserAsUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setCurrentUser(userData.data.user);
        setFormData({
          name: userData.data.user.name || '',
          surname: userData.data.user.surname || '',
          phone: userData.data.user.phone || '',
          email: userData.data.user.email || '',
          companyName: userData.data.user.companyName || '',
        });
        setLoading(false);
      }
    } catch (err) {
      console.error('Błąd pobierania danych użytkownika:', err);
      setError('Błąd pobierania danych użytkownika');
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData.data.user);
      }
    } catch (err) {
      console.error('Błąd pobierania danych użytkownika:', err);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Nie znaleziono użytkownika');
      }
      
      const userData = await response.json();
      setUser(userData);
      setFormData({
        name: userData.data.user.name || '',
        surname: userData.data.user.surname || '',
        phone: userData.data.user.phone || '',
        email: userData.data.user.email || ''
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  const displayUser = user ? user.data.user : currentUser;

  if (loading) {
    return <LoadingScreen />;
  }

  if (error && !displayUser) {
    return <ErrorScreen error={error} />;
  }

  if (!displayUser) {
    return <ErrorScreen error="Nie znaleziono użytkownika" />;
  }

  return (
    <div>
      <Header black/>
      <div className='separate'></div>

      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', 'Mój profil']} />
            <div className='sm-separate'></div>
            
            {successMessage && (
              <div className="mp-alert mp-alert--success">
                {successMessage}
                <button onClick={() => setSuccessMessage('')} className="mp-alert__close">
                  ×
                </button>
              </div>
            )}

            {error && (
              <div className="mp-alert mp-alert--error">
                {error}
                <button onClick={() => setError('')} className="mp-alert__close">
                  ×
                </button>
              </div>
            )}

            <div className="mp-container">
              <div className="mp-header">
                <h1 className="mp-title">Mój profil</h1>
                <div className="mp-user-badge">
                  <div className="mp-avatar">
                    <FaUser className="mp-avatar__icon" />
                  </div>
                  <span className="mp-user-name">{formData.name} {formData.surname}</span>
                </div>
              </div>

              <div className="mp-layout">
                {/* Sidebar z zakładkami */}
                <div className="mp-sidebar">
                  <nav className="mp-nav">
                    <button 
                      className={`mp-nav__item ${activeTab === 'dashboard' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('dashboard')}
                    >
                      <FaChartLine className="mp-nav__icon" />
                      <span>Panel informacyjny</span>
                    </button>
                    
                    <button 
                      className={`mp-nav__item ${activeTab === 'profile' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      <FaUser className="mp-nav__icon" />
                      <span>Mój profil</span>
                    </button>
                    
                    <button 
                      className={`mp-nav__item ${activeTab === 'properties' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('properties')}
                    >
                      <FaHome className="mp-nav__icon" />
                      <span>Moje nieruchomości</span>
                    </button>
                    
                    <button 
                      className={`mp-nav__item ${activeTab === 'password' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('password')}
                    >
                      <FaKey className="mp-nav__icon" />
                      <span>Zmień hasło</span>
                    </button>
                    
                    <button 
                      className={`mp-nav__item ${activeTab === 'messages' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('messages')}
                    >
                      <FaInbox className="mp-nav__icon" />
                      <span>Skrzynka pocztowa</span>
                    </button>
                    
                    <button 
                      className={`mp-nav__item ${activeTab === 'settings' ? 'mp-nav__item--active' : ''}`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <FaCog className="mp-nav__icon" />
                      <span>Ustawienia</span>
                    </button>
                  </nav>
                </div>

                {/* Główna zawartość */}
                <div className="mp-content">
                  {activeTab === 'dashboard' && (
                    <DashboardTab 
                      displayUser={displayUser} 
                      userProperties={userProperties} 
                    />
                  )}

                  {activeTab === 'profile' && (
                    <ProfileTab
                      formData={formData}
                      setFormData={setFormData}
                      user={user}
                      setUser={setUser}
                      setCurrentUser={setCurrentUser}
                      setSuccessMessage={setSuccessMessage}
                      setError={setError}
                      currentUser={currentUser}
                      id={id}
                    />
                  )}

                  {activeTab === 'properties' && (
                    <PropertiesTab 
                      currentUser={currentUser}
                      userProperties={userProperties}
                      setUserProperties={setUserProperties}
                      setSuccessMessage={setSuccessMessage}
                      setError={setError}
                    />
                  )}

                  {activeTab === 'password' && (
                    <PasswordTab 
                      setSuccessMessage={setSuccessMessage}
                      setError={setError}
                    />
                  )}

                  {activeTab === 'messages' && (
                    <MessagesTab />
                  )}

                  {activeTab === 'settings' && (
                    <SettingsTab />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}