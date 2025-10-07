// src/components/AdminPanel/sections/Forms.js
import React, { useState, useEffect } from 'react';
import './Forms.css';

const Users = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/admin/forms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setForms(data.data);
      }
    } catch (error) {
      console.error('Błąd pobierania formularzy:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (formId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_BACKEND}/api/admin/forms/${formId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchForms();
    } catch (error) {
      console.error('Błąd aktualizacji formularza:', error);
    }
  };

  const deleteForm = async (formId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten formularz?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_BACKEND}/api/admin/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchForms();
      setSelectedForm(null);
    } catch (error) {
      console.error('Błąd usuwania formularza:', error);
    }
  };

  if (loading) {
    return <div className="loading">Ładowanie formularzy...</div>;
  }

  return (
    <div className="forms-section">
      <div className="section-header">
        <h2>Formularze kontaktowe</h2>
        <p>Zarządzaj formularzami wysłanymi przez użytkowników</p>
      </div>

      <div className="forms-container">
        <div className="forms-list">
          {forms.length === 0 ? (
            <div className="empty-state">
              <p>Brak formularzy do wyświetlenia</p>
            </div>
          ) : (
            forms.map(form => (
              <div 
                key={form._id} 
                className={`form-item ${form.status === 'new' ? 'unread' : ''} ${selectedForm?._id === form._id ? 'active' : ''}`}
                onClick={() => setSelectedForm(form)}
              >
                <div className="form-header">
                  <h4>{form.name}</h4>
                  <span className="form-type">{form.type}</span>
                </div>
                <p className="form-email">{form.email}</p>
                <p className="form-preview">{form.message.substring(0, 100)}...</p>
                <div className="form-meta">
                  <span className="form-date">
                    {new Date(form.createdAt).toLocaleDateString('pl-PL')}
                  </span>
                  {form.status === 'new' && <span className="status-badge">Nowy</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedForm && (
          <div className="form-details">
            <div className="details-header">
              <h3>Szczegóły formularza</h3>
              <div className="details-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => markAsRead(selectedForm._id)}
                >
                  Oznacz jako przeczytane
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => deleteForm(selectedForm._id)}
                >
                  Usuń
                </button>
              </div>
            </div>

            <div className="details-content">
              <div className="detail-row">
                <label>Imię i nazwisko:</label>
                <span>{selectedForm.name}</span>
              </div>
              <div className="detail-row">
                <label>Email:</label>
                <span>{selectedForm.email}</span>
              </div>
              <div className="detail-row">
                <label>Telefon:</label>
                <span>{selectedForm.phone || 'Brak'}</span>
              </div>
              <div className="detail-row">
                <label>Typ formularza:</label>
                <span>{selectedForm.type}</span>
              </div>
              <div className="detail-row">
                <label>Data:</label>
                <span>{new Date(selectedForm.createdAt).toLocaleString('pl-PL')}</span>
              </div>
              <div className="detail-row full">
                <label>Wiadomość:</label>
                <div className="message-content">
                  {selectedForm.message}
                </div>
              </div>

              {/* Dodatkowe pola dla kalkulatora */}
              {selectedForm.calculatorData && (
                <div className="calculator-data">
                  <h4>Dane z kalkulatora:</h4>
                  <div className="detail-row">
                    <label>Cena nieruchomości:</label>
                    <span>{selectedForm.calculatorData.propertyPrice} PLN</span>
                  </div>
                  <div className="detail-row">
                    <label>Wkład własny:</label>
                    <span>{selectedForm.calculatorData.ownContribution} PLN</span>
                  </div>
                  <div className="detail-row">
                    <label>Okres spłaty:</label>
                    <span>{selectedForm.calculatorData.loanTerm} miesięcy</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;