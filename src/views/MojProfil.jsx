// src/components/MojProfil/MojProfil.js
import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { useParams } from 'react-router-dom';
import './MojProfil.css';
import { FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaUser } from 'react-icons/fa';

const API_BASE_URL = "http://localhost:5000/api";

export default function MojProfil() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: ''
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

  const handleEditToggle = () => {
    if (isEditing) {
      if (user) {
        setFormData({
          name: user.data.user.name || '',
          surname: user.data.user.surname || '',
          phone: user.data.user.phone || '',
          email: user.data.user.email || ''
        });
      }
    }
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
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
      setIsEditing(false);
      setSuccessMessage('Profil został pomyślnie zaktualizowany');
      
      fetchCurrentUser();
      
    } catch (err) {
      setError(err.message);
    } finally {
      setEditLoading(false);
    }
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
              <div className="success-message">
                {successMessage}
                <button onClick={() => setSuccessMessage('')} className="success-close">
                  ×
                </button>
              </div>
            )}

            {error && (
              <div className="error-message">
                {error}
                <button onClick={() => setError('')} className="error-close">
                  ×
                </button>
              </div>
            )}

            <div className="info-section">
              <div className="profile-header">
                <h1>Mój profil</h1>
                {isOwner && (
                  <div className="edit-controls">
                    {isEditing ? (
                      <>
                        <button 
                          onClick={handleSave} 
                          className="btn-save"
                          disabled={editLoading}
                        >
                          <FaSave style={{ marginRight: '8px' }} />
                          {editLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                        </button>
                        <button 
                          onClick={handleEditToggle} 
                          className="btn-cancel"
                          disabled={editLoading}
                        >
                          <FaTimes style={{ marginRight: '8px' }} />
                          Anuluj
                        </button>
                      </>
                    ) : (
                      <button onClick={handleEditToggle} className="btn-edit">
                        <FaEdit style={{ marginRight: '8px' }} />
                        Edytuj dane
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className='profile-content user-profile'>
                <div className='profile-main'>
                  <div className='profile-avatar-section'>
                    <div className="avatar-container">
                      <div className="default-avatar user-avatar">
                        <FaUser className="avatar-icon" />
                      </div>
                    </div>
                    
                    <div className='profile-info'>
                      {isEditing ? (
                        <div className="edit-form">
                          <div className="form-row">
                            <div className="form-group">
                              <label>Imię:</label>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Wprowadź imię"
                              />
                            </div>
                            <div className="form-group">
                              <label>Nazwisko:</label>
                              <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Wprowadź nazwisko"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Email:</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="form-input"
                              placeholder="twój@email.pl"
                            />
                          </div>

                          <div className="form-group">
                            <label>Telefon:</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="form-input"
                              placeholder="+48 123 456 789"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="profile-name">{formData.name} {formData.surname}</h2>
                          <div className="user-contact-info">
                            <p className="profile-email">
                              <FaEnvelope style={{marginRight: '10px', color: '#666'}}/> 
                              {formData.email || 'Brak adresu email'}
                            </p>
                            <p className="profile-phone">
                              <FaPhone style={{marginRight: '10px', color: '#666'}}/> 
                              {formData.phone || 'Brak numeru telefonu'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {isOwner && (
                    <div className='user-actions-section'>
                      <h3>Zarządzanie kontem</h3>
                      <div className="user-actions">
                        <button className="action-btn btn-change-password">
                          Zmień hasło
                        </button>
                        <button className="action-btn btn-saved-offers">
                          Ulubione oferty
                        </button>
                        <button className="action-btn btn-search-history">
                          Historia wyszukiwań
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {!isOwner && (
                  <div className="user-public-info">
                    <div className="public-profile-card">
                      <h3>Profil użytkownika</h3>
                      <p>To jest publiczny profil użytkownika. Aby zobaczyć więcej informacji, zaloguj się na swoje konto.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponenty pomocnicze
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
            <div className="loading-container">
              <div className="loading-spinner"></div>
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
            <div className="error-container">
              <p>{error}</p>
              <button onClick={() => window.history.back()} className="btn-primary">
                Powrót
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}