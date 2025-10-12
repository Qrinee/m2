// src/components/MojProfil/MojProfil.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import './MojProfil.css';
import { 
  FaEnvelope, 
  FaPhone, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaUser, 
  FaChartLine,
  FaKey,
  FaInbox,
  FaBell,
  FaCog,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaCalendar,
  FaMoneyBillWave,
  FaMapMarkerAlt
} from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function MojProfil() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editLoading, setEditLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userProperties, setUserProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchCurrentUser();
    if (id) {
      fetchUser();
    } else {
      fetchCurrentUserAsUser();
    }
  }, [id]);

  // Pobierz nieruchomości użytkownika gdy zakładka jest aktywna
  useEffect(() => {
    if (activeTab === 'properties' && currentUser) {
      fetchUserProperties();
    }
  }, [activeTab, currentUser]);

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
          email: userData.data.user.email || ''
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

  const fetchUserProperties = async () => {
    try {
      setPropertiesLoading(true);
      const response = await fetch(`${API_BASE_URL}/properties/user/moje`, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setUserProperties(result.properties);
        }
      } else {
        console.error('Błąd pobierania nieruchomości');
      }
    } catch (err) {
      console.error('Błąd pobierania nieruchomości:', err);
    } finally {
      setPropertiesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setEditLoading(true);
      setError(null);

      const userId = id || currentUser?._id;
      if (!userId) {
        throw new Error('Brak ID użytkownika');
      }

      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd aktualizacji profilu');
      }

      const result = await response.json();
      setUser(result);
      setSuccessMessage('Profil został pomyślnie zaktualizowany');
      fetchCurrentUser();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setEditLoading(false);
    }
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
        method: 'POST',
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

  const handlePropertyStatusChange = async (propertyId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'aktywne' ? 'nieaktywne' : 'aktywne';
      
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setSuccessMessage(`Status nieruchomości zmieniony na ${newStatus}`);
        fetchUserProperties(); // Odśwież listę
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Błąd zmiany statusu');
      }
    } catch (err) {
      setError('Błąd zmiany statusu nieruchomości');
    }
  };

  const handlePropertyDelete = async (propertyId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę nieruchomość?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        setSuccessMessage('Nieruchomość została usunięta');
        fetchUserProperties(); // Odśwież listę
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Błąd usuwania nieruchomości');
      }
    } catch (err) {
      setError('Błąd usuwania nieruchomości');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const displayUser = user ? user.data.user : currentUser;
  const isOwner = currentUser && displayUser && currentUser._id === displayUser._id;

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
                  {/* Panel informacyjny */}
                  {activeTab === 'dashboard' && (
                    <div className="mp-tab-content">
                      <h2 className="mp-tab-title">Panel informacyjny</h2>
                      <div className="mp-stats-grid">
                        <div className="mp-stat-card">
                          <div className="mp-stat-card__icon mp-stat-card__icon--primary">
                            <FaUser />
                          </div>
                          <div className="mp-stat-card__content">
                            <h3>Aktywność profilu</h3>
                            <p>Konto aktywne od: {new Date(displayUser.createdAt).toLocaleDateString('pl-PL')}</p>
                          </div>
                        </div>
                        
                        <div className="mp-stat-card">
                          <div className="mp-stat-card__icon mp-stat-card__icon--success">
                            <FaHome />
                          </div>
                          <div className="mp-stat-card__content">
                            <h3>Moje nieruchomości</h3>
                            <p>{userProperties.length} nieruchomości</p>
                          </div>
                        </div>
                        
                        <div className="mp-stat-card">
                          <div className="mp-stat-card__icon mp-stat-card__icon--info">
                            <FaInbox />
                          </div>
                          <div className="mp-stat-card__content">
                            <h3>Wiadomości</h3>
                            <p>0 nieprzeczytanych wiadomości</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Edycja profilu */}
                  {activeTab === 'profile' && (
                    <div className="mp-tab-content">
                      <h2 className="mp-tab-title">Edycja danych profilowych</h2>
                      <div className="mp-form-section">
                        <form className="mp-form">
                          <div className="mp-form__row">
                            <div className="mp-form__group">
                              <label className="mp-form__label">Imię</label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="mp-form__input"
                                placeholder="Wprowadź imię"
                              />
                            </div>
                            <div className="mp-form__group">
                              <label className="mp-form__label">Nazwisko</label>
                              <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="mp-form__input"
                                placeholder="Wprowadź nazwisko"
                              />
                            </div>
                          </div>

                          <div className="mp-form__group">
                            <label className="mp-form__label">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mp-form__input"
                              placeholder="twój@email.pl"
                            />
                          </div>

                          <div className="mp-form__group">
                            <label className="mp-form__label">Telefon</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mp-form__input"
                              placeholder="+48 123 456 789"
                            />
                          </div>

                          <div className="mp-form__actions">
                            <button 
                              type="button"
                              onClick={handleSaveProfile}
                              className="mp-btn mp-btn--primary"
                              disabled={editLoading}
                            >
                              <FaSave className="mp-btn__icon" />
                              {editLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Moje nieruchomości */}
                  {activeTab === 'properties' && (
                    <div className="mp-tab-content">
                      <div className="mp-properties-header">
                        <h2 className="mp-tab-title">Moje nieruchomości</h2>
                        <button 
                          className="mp-btn mp-btn--primary"
                          onClick={() => window.open('/zglos-nieruchomosc', '_blank')}
                        >
                          + Dodaj nieruchomość
                        </button>
                      </div>

                      {propertiesLoading ? (
                        <div className="mp-loading">
                          <div className="mp-loading__spinner"></div>
                          <p>Ładowanie nieruchomości...</p>
                        </div>
                      ) : userProperties.length === 0 ? (
                        <div className="mp-empty-state">
                          <FaHome className="mp-empty-state__icon" />
                          <h3>Brak nieruchomości</h3>
                          <p>Nie dodałeś jeszcze żadnych nieruchomości.</p>
                          <button 
                            className="mp-btn mp-btn--primary"
                            onClick={() => window.open('/dodaj-nieruchomosc', '_blank')}
                          >
                            Dodaj pierwszą nieruchomość
                          </button>
                        </div>
                      ) : (
                        <div className="mp-properties-grid">
                          {userProperties.map(property => (
                            <div key={property._id} className="mp-property-card">
                              <div className="mp-property-card__image">
                                {property.multimedia?.zdjecia?.[0] ? (
                                  <img 
                                    src={`${import.meta.env.VITE_BACKEND}/${property.multimedia.zdjecia[0].path}`} 
                                    alt={property.tytul}
                                    className="mp-property-card__img"
                                  />
                                ) : (
                                  <div className="mp-property-card__no-image">
                                    <FaHome className="mp-property-card__no-image-icon" />
                                  </div>
                                )}
                                <div className={`mp-property-card__status mp-property-card__status--${property.status}`}>
                                  {property.status === 'aktywne' ? 'AKTYWNE' : 'NIEAKTYWNE'}
                                </div>
                              </div>

                              <div className="mp-property-card__content">
                                <h3 className="mp-property-card__title">{property.tytul}</h3>
                                
                                <div className="mp-property-card__details">
                                  <div className="mp-property-card__detail">
                                    <FaMoneyBillWave className="mp-property-card__detail-icon" />
                                    <span>{formatPrice(property.cena?.calkowita || 0)}</span>
                                  </div>
                                  
                                  <div className="mp-property-card__detail">
                                    <FaMapMarkerAlt className="mp-property-card__detail-icon" />
                                    <span>
                                      {property.lokalizacja?.miasto}
                                      {property.lokalizacja?.dzielnica && `, ${property.lokalizacja.dzielnica}`}
                                    </span>
                                  </div>
                                  
                                  <div className="mp-property-card__detail">
                                    <FaCalendar className="mp-property-card__detail-icon" />
                                    <span>Dodano: {formatDate(property.daty?.dataPublikacji)}</span>
                                  </div>
                                </div>

                                <div className="mp-property-card__type">
                                  <span className="mp-property-card__type-badge">
                                    {property.rodzajOferty?.typ} • {property.rodzajOferty?.rynek}
                                  </span>
                                </div>

                                <div className="mp-property-card__actions">
                                  <button 
                                    className={`mp-property-card__btn ${
                                      property.status === 'aktywne' 
                                        ? 'mp-property-card__btn--warning' 
                                        : 'mp-property-card__btn--success'
                                    }`}
                                    onClick={() => handlePropertyStatusChange(property._id, property.status)}
                                  >
                                    {property.status === 'aktywne' ? (
                                      <>
                                        <FaEyeSlash className="mp-property-card__btn-icon" />
                                        Ukryj
                                      </>
                                    ) : (
                                      <>
                                        <FaEye className="mp-property-card__btn-icon" />
                                        Aktywuj
                                      </>
                                    )}
                                  </button>
                                  
                                  <button 
                                    className="mp-property-card__btn mp-property-card__btn--secondary"
                                    onClick={() => window.open(`/nieruchomosci/${property._id}`, '_blank')}
                                  >
                                    Podgląd
                                  </button>
                                  
                                  <button 
                                    className="mp-property-card__btn mp-property-card__btn--danger"
                                    onClick={() => handlePropertyDelete(property._id)}
                                  >
                                    Usuń
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Zmiana hasła */}
                  {activeTab === 'password' && (
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
                  )}

                  {/* Skrzynka pocztowa */}
                  {activeTab === 'messages' && (
                    <div className="mp-tab-content">
                      <h2 className="mp-tab-title">Skrzynka pocztowa</h2>
                      <div className="mp-messages">
                        <div className="mp-messages-empty">
                          <FaInbox className="mp-messages-empty__icon" />
                          <h3>Brak wiadomości</h3>
                          <p>Twoja skrzynka pocztowa jest pusta</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ustawienia */}
                  {activeTab === 'settings' && (
                    <div className="mp-tab-content">
                      <h2 className="mp-tab-title">Ustawienia konta</h2>
                      <div className="mp-settings">
                        <div className="mp-settings-group">
                          <h3 className="mp-settings-group__title">Powiadomienia</h3>
                          <div className="mp-settings-item">
                            <label className="mp-settings-item__label">
                              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
                              Powiadomienia email
                            </label>
                          </div>
                          <div className="mp-settings-item">
                            <label className="mp-settings-item__label">
                              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
                              Powiadomienia o nowych ofertach
                            </label>
                          </div>
                        </div>
                        
                        <div className="mp-settings-group">
                          <h3 className="mp-settings-group__title">Prywatność</h3>
                          <div className="mp-settings-item">
                            <label className="mp-settings-item__label">
                              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
                              Publiczny profil
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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

// Komponenty pomocnicze (pozostały bez zmian)
function LoadingScreen() {
  return (
    <div>
      <Header black />
      <div className='separate'></div>
      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', 'Mój profil']} />
            <div className='sm-separate'></div>
            <div className="mp-loading">
              <div className="mp-loading__spinner"></div>
              <p>Ładowanie profilu...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorScreen({ error }) {
  return (
    <div>
      <Header black />
      <div className='separate'></div>
      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', 'Mój profil']} />
            <div className='sm-separate'></div>
            <div className="mp-error">
              <p>{error}</p>
              <button onClick={() => window.history.back()} className="mp-btn mp-btn--primary">
                Powrót
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}