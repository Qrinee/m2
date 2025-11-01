// src/components/MojProfil/tabs/ProfileTab.js
import React, { useState, useRef, useEffect } from 'react';
import { FaSave, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function ProfileTab({ 
  formData, 
  setFormData, 
  setUser, 
  user,
  setCurrentUser, 
  setSuccessMessage, 
  setError, 
  currentUser, 
  id 
}) {
  const [editLoading, setEditLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(formData.avatar || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(user)
  }, [user])

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Plik jest zbyt duży. Maksymalny rozmiar to 5MB.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        avatar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Proszę wybrać plik obrazu (JPG, PNG, GIF)');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      avatar: null
    }));
    setAvatarPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveProfile = async () => {
    try {
      setEditLoading(true);
      setError(null);

      const userId = id || currentUser?._id;
      if (!userId) {
        throw new Error('Brak ID użytkownika');
      }

      // Create FormData to handle file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          // For avatar, we want to send null if it was removed
          if (key === 'avatar' && formData[key] === null) {
            submitData.append(key, '');
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });

      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        body: submitData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd aktualizacji profilu');
      }

      const result = await response.json();
      setUser(result);
      setSuccessMessage('Profil został pomyślnie zaktualizowany');
      
      // Refresh current user data
      const currentUserResponse = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });
      if (currentUserResponse.ok) {
        const userData = await currentUserResponse.json();
        setCurrentUser(userData.data.user);
        
        // Update avatar preview with new avatar URL
        if (userData.data.user.avatar) {
          setAvatarPreview(userData.data.user.avatar);
        }
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  const isAgent = currentUser?.role === 'agent';

  return (
    <div className="mp-tab-content">
      <h2 className="mp-tab-title">Edycja danych profilowych</h2>
      <div className="mp-form-section">
        <Link to={`/estate_agent/${currentUser?._id}`}><button className="mp-btn mp-btn--primary">Otwórz stronę profilu</button></Link> 
        <form className="mp-form">
          {isAgent && (
            <>

                            {avatarPreview ? (
                  <div className="mp-avatar-preview-wrapper">
                    <div className="mp-avatar-preview">
                      <img 
                        src={avatarPreview} 
                        alt="Podgląd zdjęcia profilowego" 
                        className="mp-avatar-preview__image"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="mp-avatar-remove"
                        title="Usuń zdjęcie"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    <p className="mp-avatar-change-text">
                      Kliknij poniżej aby zmienić zdjęcie
                    </p>
                  </div>
                ) : null}

              <div className="mp-form__group">
                <label className="mp-form__label">Zdjęcie profilowe</label>
                            <div 
                  className={`mp-file-upload ${isDragOver ? 'mp-file-upload--dragover' : ''} ${avatarPreview ? 'mp-file-upload--has-preview' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleClickUpload}
                >
                  

                  <input
                    ref={fileInputRef}
                    type="file"
                    name="avatar"
                    onChange={handleFileChange}
                    className="mp-file-upload__input"
                    accept="image/*"
                  />
                  
                  <div className="mp-file-upload__content">
                    <FaCloudUploadAlt className="mp-file-upload__icon" />
                    <div className="mp-file-upload__text">
                      <p className="mp-file-upload__title">
                        {avatarPreview ? 'Zmień zdjęcie profilowe' : 'Dodaj zdjęcie profilowe'}
                      </p>
                      <p className="mp-file-upload__subtitle">
                        Przeciągnij i upuść lub kliknij aby wybrać plik
                      </p>
                      <p className="mp-file-upload__info">
                        PNG, JPG, GIF • Maks. 5MB
                      </p>
                    </div>
                  </div>
                </div>
                </div>
                </>
          )}
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

          {/* Fields visible only for agents */}
          {isAgent && (
            <>
              <div className="mp-form__group">
                <label className="mp-form__label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  className="mp-form__input mp-form__textarea"
                  placeholder="Opisz swoją firmę i jej specjalizacje..."
                  rows="4"
                />
              </div>

            <div className="mp-form__group">
            <label className="mp-form__label">Nazwa firmy</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mp-form__input"
              placeholder="Firma"
            />
          </div>

                {/* Avatar preview */}

                

            </>
          )}

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
  );
}