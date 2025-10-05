// src/components/AdminPanel/sections/Forms.js
import React, { useState, useEffect } from 'react';
import './Forms.css';

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchForms();
  }, [currentPage]);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/emails/submissions?page=${currentPage}&limit=20`, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setForms(result.submissions);
          setTotalPages(result.totalPages);
        }
      }
    } catch (error) {
      console.error('Błąd pobierania formularzy:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormStatus = async (formId, status, notes = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/emails/submissions/${formId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          status,
          internalNotes: notes 
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          fetchForms();
          if (selectedForm && selectedForm._id === formId) {
            setSelectedForm(result.submission);
          }
        }
      }
    } catch (error) {
      console.error('Błąd aktualizacji formularza:', error);
    }
  };

  const deleteForm = async (formId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten formularz?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/emails/submissions/${formId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        fetchForms();
        setSelectedForm(null);
      }
    } catch (error) {
      console.error('Błąd usuwania formularza:', error);
    }
  };

  const getFormTypeLabel = (formType) => {
    switch (formType) {
      case 'property_inquiry':
        return 'Zapytanie o nieruchomość';
      case 'loan_inquiry':
        return 'Kalkulator kredytu';
      default:
        return formType;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'Nowy';
      case 'contacted':
        return 'Skontaktowano';
      case 'replied':
        return 'Odpowiedziano';
      case 'closed':
        return 'Zamknięty';
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return '#f44336';
      case 'contacted':
        return '#ff9800';
      case 'replied':
        return '#4caf50';
      case 'closed':
        return '#9e9e9e';
      default:
        return '#666';
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

      <div className="forms-stats">
        <div className="stat-card">
          <div className="stat-number">{forms.length}</div>
          <div className="stat-label">Wszystkie formularze</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {forms.filter(f => f.status === 'new').length}
          </div>
          <div className="stat-label">Nowe</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {forms.filter(f => f.formType === 'property_inquiry').length}
          </div>
          <div className="stat-label">Zapytania o nieruchomości</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {forms.filter(f => f.formType === 'loan_inquiry').length}
          </div>
          <div className="stat-label">Kalkulator kredytu</div>
        </div>
      </div>

      <div className="forms-container">
        <div className="forms-list">
          {forms.length === 0 ? (
            <div className="empty-state">
              <p>Brak formularzy do wyświetlenia</p>
            </div>
          ) : (
            <>
              {forms.map(form => (
                <div 
                  key={form._id} 
                  className={`form-item ${form.status === 'new' ? 'unread' : ''} ${selectedForm?._id === form._id ? 'active' : ''}`}
                  onClick={() => setSelectedForm(form)}
                >
                  <div className="form-header">
                    <h4>{form.name}</h4>
                    <div className="form-badges">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(form.status) }}
                      >
                        {getStatusLabel(form.status)}
                      </span>
                      <span className="type-badge">
                        {getFormTypeLabel(form.formType)}
                      </span>
                    </div>
                  </div>
                  <p className="form-email">{form.email}</p>
                  <p className="form-preview">
                    {form.formType === 'property_inquiry' 
                      ? (form.propertyInquiry?.message || 'Brak wiadomości')
                      : `Kalkulator: ${form.loanInquiry?.propertyPrice || 'Brak danych'}`
                    }
                  </p>
                  <div className="form-meta">
                    <span className="form-date">
                      {new Date(form.createdAt).toLocaleDateString('pl-PL')}
                    </span>
                    <span className="form-phone">
                      {form.phone || 'Brak telefonu'}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Paginacja */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="pagination-btn"
                  >
                    Poprzednia
                  </button>
                  
                  <span className="pagination-info">
                    Strona {currentPage} z {totalPages}
                  </span>
                  
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="pagination-btn"
                  >
                    Następna
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {selectedForm && (
          <div className="form-details">
            <div className="details-header">
              <h3>Szczegóły formularza</h3>
              <div className="details-actions">
                <select 
                  value={selectedForm.status}
                  onChange={(e) => updateFormStatus(selectedForm._id, e.target.value)}
                  className="status-select"
                >
                  <option value="new">Nowy</option>
                  <option value="contacted">Skontaktowano</option>
                  <option value="replied">Odpowiedziano</option>
                  <option value="closed">Zamknięty</option>
                </select>
                <button 
                  className="btn-danger"
                  onClick={() => deleteForm(selectedForm._id)}
                >
                  Usuń
                </button>
              </div>
            </div>

            <div className="details-content">
              <div className="detail-section">
                <h4>Dane kontaktowe</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Imię i nazwisko:</label>
                    <span>{selectedForm.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>
                      <a href={`mailto:${selectedForm.email}`}>
                        {selectedForm.email}
                      </a>
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Telefon:</label>
                    <span>
                      {selectedForm.phone ? (
                        <a href={`tel:${selectedForm.phone}`}>
                          {selectedForm.phone}
                        </a>
                      ) : 'Brak'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Typ formularza:</label>
                    <span>{getFormTypeLabel(selectedForm.formType)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Data zgłoszenia:</label>
                    <span>{new Date(selectedForm.createdAt).toLocaleString('pl-PL')}</span>
                  </div>
                  <div className="detail-item">
                    <label>IP:</label>
                    <span>{selectedForm.ipAddress || 'Nieznane'}</span>
                  </div>
                </div>
              </div>

              {/* Dane dla zapytań o nieruchomości */}
              {selectedForm.formType === 'property_inquiry' && selectedForm.propertyInquiry && (
                <div className="detail-section">
                  <h4>Szczegóły nieruchomości</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Nieruchomość:</label>
                      <span>{selectedForm.propertyInquiry.propertyName || 'Brak nazwy'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Cena:</label>
                      <span>{selectedForm.propertyInquiry.propertyPrice || 'Brak ceny'}</span>
                    </div>
                    <div className="detail-item">
                      <label>Lokalizacja:</label>
                      <span>{selectedForm.propertyInquiry.propertyLocation || 'Brak lokalizacji'}</span>
                    </div>
                    <div className="detail-item full">
                      <label>Wiadomość:</label>
                      <div className="message-content">
                        {selectedForm.propertyInquiry.message || 'Brak wiadomości'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dane dla kalkulatora kredytu */}
              {selectedForm.formType === 'loan_inquiry' && selectedForm.loanInquiry && (
                <div className="detail-section">
                  <h4>Dane z kalkulatora kredytu</h4>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Cena nieruchomości:</label>
                      <span>{selectedForm.loanInquiry.propertyPrice}</span>
                    </div>
                    <div className="detail-item">
                      <label>Wkład własny:</label>
                      <span>{selectedForm.loanInquiry.ownContribution}</span>
                    </div>
                    <div className="detail-item">
                      <label>Okres spłaty:</label>
                      <span>{selectedForm.loanInquiry.loanTerm}</span>
                    </div>
                    <div className="detail-item">
                      <label>Miesięczna rata:</label>
                      <span>{selectedForm.loanInquiry.monthlyPayment}</span>
                    </div>
                    <div className="detail-item">
                      <label>Oprocentowanie:</label>
                      <span>{selectedForm.loanInquiry.interestRate}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notatki wewnętrzne */}
              <div className="detail-section">
                <h4>Notatki wewnętrzne</h4>
                <textarea
                  className="notes-textarea"
                  placeholder="Dodaj notatkę..."
                  value={selectedForm.internalNotes || ''}
                  onChange={(e) => {
                    // Możesz dodać funkcję do aktualizacji notatek w czasie rzeczywistym
                  }}
                  onBlur={(e) => updateFormStatus(selectedForm._id, selectedForm.status, e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;