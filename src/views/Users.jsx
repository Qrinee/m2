// src/components/AdminPanel/Users/Users.js
import React, { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaTrash, FaUser } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Błąd pobierania użytkowników');
      }

      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error('Błąd:', error);
      setError('Nie udało się załadować listy użytkowników');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      const response = await fetch(`${API_BASE_URL}/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editingUser.name,
          surname: editingUser.surname,
          phone: editingUser.phone,
          role: editingUser.role,
          isActive: editingUser.isActive,
          profilePicture: editingUser.profilePicture
        })
      });

      if (!response.ok) {
        throw new Error('Błąd aktualizacji użytkownika');
      }

      await response.json();
      setShowEditModal(false);
      setEditingUser(null);
      fetchUsers(); // Odśwież listę
    } catch (error) {
      console.error('Błąd:', error);
      setError('Nie udało się zaktualizować użytkownika');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Błąd usuwania użytkownika');
      }

      fetchUsers(); // Odśwież listę
    } catch (error) {
      console.error('Błąd:', error);
      setError('Nie udało się usunąć użytkownika');
    }
  };

  const handleInputChange = (field, value) => {
    setEditingUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funkcje do uploadu obrazków
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
      handleImageUpload(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleImageUpload = async (file) => {
    // Sprawdź czy to obrazek
    if (!file.type.startsWith('image/')) {
      setError('Proszę wybrać plik obrazu (JPEG, PNG, GIF)');
      return;
    }

    // Sprawdź rozmiar pliku (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Plik jest zbyt duży. Maksymalny rozmiar to 5MB.');
      return;
    }

    try {
      setUploadLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_BASE_URL}/users/${editingUser._id}/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Błąd podczas uploadu obrazka');
      }

      const result = await response.json();
      
      // Aktualizuj URL obrazka profilowego w edytowanym użytkowniku
      setEditingUser(prev => ({
        ...prev,
        profilePicture: result.data.imageUrl
      }));

      // Odśwież listę użytkowników
      fetchUsers();

    } catch (err) {
      setError(err.message || 'Błąd podczas uploadu obrazka');
    } finally {
      setUploadLoading(false);
    }
  };

  const removeProfilePicture = () => {
    setEditingUser(prev => ({
      ...prev,
      profilePicture: ''
    }));
  };

  if (loading) {
    return (
      <div className="users-loading">
        <div className="loading-spinner"></div>
        <p>Ładowanie użytkowników...</p>
      </div>
    );
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Zarządzanie użytkownikami</h2>
        <p>Znaleziono {users.length} użytkowników</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="error-close">×</button>
        </div>
      )}

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Zdjęcie</th>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Telefon</th>
              <th>Rola</th>
              <th>Status</th>
              <th>Data utworzenia</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className={!user.isActive ? 'user-inactive' : ''}>
                <td>
                  <div className="user-avatar-small">
                    {user.profilePicture ? (
                      <img 
                        src={`${import.meta.env.VITE_BACKEND}${user.profilePicture}`} 
                        alt={`${user.name} ${user.surname}`}
                        className="user-avatar-img"
                      />
                    ) : (
                      <div className="user-avatar-default">
                        <FaUser />
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="user-named">
                    {user.name} {user.surname}
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone || 'Brak'}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role === 'admin' ? 'Administrator' : user.role === "agent" ? 'Deweloper' : "Użytkownik"}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Aktywny' : 'Nieaktywny'}
                  </span>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString('pl-PL')}
                </td>
                <td>
                  <div className="user-actions">
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn-edit"
                      title="Edytuj użytkownika"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn-delete"
                      title="Usuń użytkownika"
                      disabled={user.role === 'admin'} // Zabezpieczenie przed usunięciem admina
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && !loading && (
          <div className="no-users">
            <p>Brak użytkowników do wyświetlenia</p>
          </div>
        )}
      </div>

      {/* Modal edycji użytkownika */}
      {showEditModal && editingUser && (
        <div className="modal-overlay">
          <div className="modal-ct">
            <div className="modal-header">
              <h3>Edytuj użytkownika</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {/* Sekcja zdjęcia profilowego */}
              <div className="avatar-upload-section">
                <label className="form-label">Zdjęcie profilowe:</label>
                <div 
                  className={`avatar-upload-area ${isDragOver ? 'drag-over' : ''} ${uploadLoading ? 'uploading' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInput}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  
                  {uploadLoading ? (
                    <div className="upload-loading">
                      <div className="loading-spinner-small"></div>
                      <p>Przesyłanie...</p>
                    </div>
                  ) : (
                    <>
                      {editingUser.profilePicture ? (
                        <img 
                          src={`${import.meta.env.VITE_BACKEND}${editingUser.profilePicture}`} 
                          alt={`${editingUser.name} ${editingUser.surname}`}
                          className="avatar-preview"
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          <FaUser className="avatar-icon" />
                          <p>Dodaj zdjęcie</p>
                        </div>
                      )}
                      
                      <div className="avatar-overlay">
                        <FaCloudUploadAlt className="upload-icon" />
                        <p>Kliknij lub przeciągnij zdjęcie</p>
                        <span>PNG, JPG, GIF (max 5MB)</span>
                      </div>
                      
                      {editingUser.profilePicture && (
                        <button 
                          type="button"
                          className="avatar-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProfilePicture();
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Imię:</label>
                <input
                  type="text"
                  value={editingUser.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Nazwisko:</label>
                <input
                  type="text"
                  value={editingUser.surname || ''}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Telefon:</label>
                <input
                  type="tel"
                  value={editingUser.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div className="form-group">
                <label>Rola:</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="form-select"
                >
                  <option value="user">Użytkownik</option>
                  <option value="agent">Deweloper</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="form-group form-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={editingUser.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  />
                  <span>Konto aktywne</span>
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowEditModal(false)}
                className="btn-secondary"
                disabled={saveLoading || uploadLoading}
              >
                Anuluj
              </button>
              <button
                onClick={handleSave}
                className="btn-primary"
                disabled={saveLoading || uploadLoading}
              >
                {saveLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;