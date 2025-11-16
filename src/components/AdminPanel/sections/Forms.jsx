import React, { useState, useEffect } from 'react';
import './Forms.css';

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchForms();
  }, [currentPage, filterType]);

  const fetchForms = async () => {
    try {
      let url = `${import.meta.env.VITE_BACKEND}/api/inquiry/submissions?page=${currentPage}&limit=20`;
      
      if (filterType !== 'all') {
        url += `&type=${filterType}`;
      }

      const response = await fetch(url, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setForms(result.submissions || []);
          setTotalPages(result.totalPages || 1);
        } else {
          console.error('Błąd odpowiedzi API:', result.error);
        }
      } else {
        console.error('Błąd HTTP:', response.status);
      }
    } catch (error) {
      console.error('Błąd pobierania formularzy:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormStatus = async (formId, status, notes = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/inquiry/submissions/${formId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ 
            status,
            internalNotes: notes 
          })
        }
      );

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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/inquiry/submissions/${formId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );

      if (response.ok) {
        fetchForms();
        setSelectedForm(null);
      }
    } catch (error) {
      console.error('Błąd usuwania formularza:', error);
    }
  };

  const getFormTypeLabel = (formType) => {
    const types = {
      'property_inquiry': 'Zapytanie o nieruchomość',
      'loan_inquiry': 'Kalkulator kredytu',
      'contact_inquiry': 'Formularz kontaktowy',
      'property_submission': 'Zgłoszenie nieruchomości',
      'partner_inquiry': 'Formularz partnerski',
      'employee_inquiry': 'Formularz rekrutacyjny',
      'house_configuration': 'Konfiguracja domu'
    };
    return types[formType] || formType;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      'new': 'Nowy',
      'contacted': 'Skontaktowano',
      'replied': 'Odpowiedziano',
      'closed': 'Zamknięty'
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      'new': '#f44336',
      'contacted': '#ff9800',
      'replied': '#4caf50',
      'closed': '#9e9e9e'
    };
    return colors[status] || '#666';
  };

  const getFormPreview = (form) => {
    switch (form.formType) {
      case 'property_inquiry':
        return form.propertyInquiry?.message || 'Brak wiadomości';
      case 'loan_inquiry':
        return `Kredyt: ${form.loanInquiry?.propertyPrice || 'Brak danych'}`;
      case 'contact_inquiry':
        return form.contactInquiry?.message || 'Brak wiadomości';
      case 'property_submission':
        return form.propertySubmission?.message || 'Brak wiadomości';
      case 'partner_inquiry':
        return form.partnerInquiry?.message || 'Brak wiadomości';
      case 'employee_inquiry':
        return form.employeeInquiry?.message || 'Brak wiadomości';
      case 'house_configuration':
        return `Konfiguracja: ${form.houseConfiguration?.houseName || 'Brak nazwy'} - ${form.houseConfiguration?.pricing?.total || 'Brak ceny'}`;
      default:
        return 'Brak wiadomości';
    }
  };

  // Funkcja do renderowania szczegółów konfiguracji domu
  const renderHouseConfigurationDetails = (houseConfig) => {
    if (!houseConfig) return null;

    return (
      <div className="house-configuration-details">
        <div className="detail-section">
          <h4>Podstawowe informacje</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Model domu:</label>
              <span>{houseConfig.houseName} ({houseConfig.houseId})</span>
            </div>
            <div className="detail-item">
              <label>Cena bazowa:</label>
              <span>{houseConfig.basePrice}</span>
            </div>
            <div className="detail-item">
              <label>Cena końcowa:</label>
              <span className="total-price">{houseConfig.pricing?.total}</span>
            </div>
          </div>
        </div>

        {/* Wybrane pakiety */}
        {houseConfig.configuration?.packages && houseConfig.configuration.packages.length > 0 && (
          <div className="detail-section">
            <h4>Wybrane pakiety ({houseConfig.configuration.packages.length})</h4>
            <div className="packages-list">
              {houseConfig.configuration.packages.map((pkg, index) => (
                <div key={index} className="package-item">
                  <div className="package-header">
                    <strong>{pkg.packageName}</strong>
                    {pkg.optionPrice && pkg.optionPrice !== '0 PLN' && (
                      <span className="package-price">+{pkg.optionPrice}</span>
                    )}
                  </div>
                  <div className="package-option">{pkg.optionName}</div>
                </div>
              ))}
            </div>
            <div className="packages-total">
              <strong>Suma pakietów: {houseConfig.configuration.totalPackagesPrice || '0 PLN'}</strong>
            </div>
          </div>
        )}

        {/* Opcje wizualne */}
        {houseConfig.configuration?.visualOptions && houseConfig.configuration.visualOptions.length > 0 && (
          <div className="detail-section">
            <h4>Opcje wizualne ({houseConfig.configuration.visualOptions.length})</h4>
            <div className="visual-options-list">
              {houseConfig.configuration.visualOptions.map((option, index) => (
                <div key={index} className="visual-option-item">
                  <div className="option-category">{option.category}:</div>
                  <div className="option-details">
                    <span className="option-name">{option.optionName}</span>
                    {option.optionPrice && option.optionPrice !== '0 PLN' && (
                      <span className="option-price">+{option.optionPrice}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="visual-options-total">
              <strong>Suma opcji wizualnych: {houseConfig.configuration.totalVisualOptionsPrice || '0 PLN'}</strong>
            </div>
          </div>
        )}

        {/* Szczegółowe wyliczenie ceny */}
        <div className="detail-section">
          <h4>Szczegółowe wyliczenie</h4>
          <div className="pricing-breakdown">
            <div className="pricing-row">
              <span>Podsuma:</span>
              <span>{houseConfig.pricing?.subtotal || '0 PLN'}</span>
            </div>
            <div className="pricing-row">
              <span>VAT (8%):</span>
              <span>{houseConfig.pricing?.vat || '0 PLN'}</span>
            </div>
            <div className="pricing-row total">
              <span><strong>RAZEM:</strong></span>
              <span><strong>{houseConfig.pricing?.total || '0 PLN'}</strong></span>
            </div>
          </div>
        </div>

        {/* Podsumowanie konfiguracji */}
        {houseConfig.configurationSummary && (
          <div className="detail-section">
            <h4>Podsumowanie konfiguracji</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Liczba opcji:</label>
                <span>{houseConfig.configurationSummary.totalOptions || 0}</span>
              </div>
              <div className="detail-item">
                <label>Dostosowania:</label>
                <span>{houseConfig.configurationSummary.hasCustomizations ? 'Tak' : 'Nie'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFormDetails = (form) => {
    const baseDetails = (
      <div className="detail-section">
        <h4>Dane kontaktowe</h4>
        <div className="detail-grid">
          <div className="detail-item">
            <label>Imię i nazwisko:</label>
            <span>{form.name}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span>
              <a href={`mailto:${form.email}`}>
                {form.email}
              </a>
            </span>
          </div>
          <div className="detail-item">
            <label>Telefon:</label>
            <span>
              {form.phone ? (
                <a href={`tel:${form.phone}`}>
                  {form.phone}
                </a>
              ) : 'Brak'}
            </span>
          </div>
          <div className="detail-item">
            <label>Typ formularza:</label>
            <span>{getFormTypeLabel(form.formType)}</span>
          </div>
          <div className="detail-item">
            <label>Data zgłoszenia:</label>
            <span>{new Date(form.createdAt).toLocaleString('pl-PL')}</span>
          </div>
          <div className="detail-item">
            <label>IP:</label>
            <span>{form.ipAddress || 'Nieznane'}</span>
          </div>
        </div>
      </div>
    );

    const specificDetails = () => {
      switch (form.formType) {
        case 'property_inquiry':
          return form.propertyInquiry && (
            <div className="detail-section">
              <h4>Szczegóły nieruchomości</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Nieruchomość:</label>
                  <span>{form.propertyInquiry.propertyName || 'Brak nazwy'}</span>
                </div>
                <div className="detail-item">
                  <label>Cena:</label>
                  <span>{form.propertyInquiry.propertyPrice || 'Brak ceny'}</span>
                </div>
                <div className="detail-item">
                  <label>Lokalizacja:</label>
                  <span>{form.propertyInquiry.propertyLocation || 'Brak lokalizacji'}</span>
                </div>
                <div className="detail-item full">
                  <label>Wiadomość:</label>
                  <div className="message-content">
                    {form.propertyInquiry.message || 'Brak wiadomości'}
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 'loan_inquiry':
          return form.loanInquiry && (
            <div className="detail-section">
              <h4>Dane z kalkulatora kredytu</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Cena nieruchomości:</label>
                  <span>{form.loanInquiry.propertyPrice}</span>
                </div>
                <div className="detail-item">
                  <label>Wkład własny:</label>
                  <span>{form.loanInquiry.ownContribution}</span>
                </div>
                <div className="detail-item">
                  <label>Okres spłaty:</label>
                  <span>{form.loanInquiry.loanTerm}</span>
                </div>
                <div className="detail-item">
                  <label>Miesięczna rata:</label>
                  <span>{form.loanInquiry.monthlyPayment}</span>
                </div>
                <div className="detail-item">
                  <label>Oprocentowanie:</label>
                  <span>{form.loanInquiry.interestRate}</span>
                </div>
              </div>
            </div>
          );
        
        case 'contact_inquiry':
          return form.contactInquiry && (
            <div className="detail-section">
              <h4>Wiadomość</h4>
              <div className="detail-grid">
                <div className="detail-item full">
                  <label>Treść wiadomości:</label>
                  <div className="message-content">
                    {form.contactInquiry.message || 'Brak wiadomości'}
                  </div>
                </div>
                <div className="detail-item">
                  <label>GDPR zaakceptowane:</label>
                  <span>{form.contactInquiry.gdprAccepted ? 'Tak' : 'Nie'}</span>
                </div>
              </div>
            </div>
          );
        
        case 'property_submission':
          return form.propertySubmission && (
            <div className="detail-section">
              <h4>Zgłoszenie nieruchomości</h4>
              <div className="detail-grid">
                <div className="detail-item full">
                  <label>Wiadomość:</label>
                  <div className="message-content">
                    {form.propertySubmission.message || 'Brak wiadomości'}
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 'partner_inquiry':
          return form.partnerInquiry && (
            <div className="detail-section">
              <h4>Propozycja współpracy</h4>
              <div className="detail-grid">
                <div className="detail-item full">
                  <label>Wiadomość:</label>
                  <div className="message-content">
                    {form.partnerInquiry.message || 'Brak wiadomości'}
                  </div>
                </div>
              </div>
            </div>
          );
        
        case 'employee_inquiry':
          return form.employeeInquiry && (
            <div className="detail-section">
              <h4>Aplikacja rekrutacyjna</h4>
              <div className="detail-grid">
                <div className="detail-item full">
                  <label>Wiadomość:</label>
                  <div className="message-content">
                    {form.employeeInquiry.message || 'Brak wiadomości'}
                  </div>
                </div>
                <div className="detail-item">
                  <label>Załączone CV:</label>
                  <span>
                    {form.employeeInquiry.cvFile ? 
                      <a href={`/uploads/cv/${form.employeeInquiry.cvFile}`} target="_blank" rel="noopener noreferrer">
                        Pobierz CV
                      </a> : 
                      'Brak'
                    }
                  </span>
                </div>
              </div>
            </div>
          );
        
        case 'house_configuration':
          return renderHouseConfigurationDetails(form.houseConfiguration);
        
        default:
          return null;
      }
    };

    return (
      <>
        {baseDetails}
        {specificDetails()}
      </>
    );
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

      {/* Filtry */}
      <div className="forms-filters">
        <select 
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="filter-select"
        >
          <option value="all">Wszystkie typy</option>
          <option value="property_inquiry">Zapytania o nieruchomości</option>
          <option value="loan_inquiry">Kalkulator kredytu</option>
          <option value="contact_inquiry">Formularze kontaktowe</option>
          <option value="house_configuration">Konfiguracje domów</option>
          <option value="property_submission">Zgłoszenia nieruchomości</option>
          <option value="partner_inquiry">Formularze partnerskie</option>
          <option value="employee_inquiry">Rekrutacje</option>
        </select>
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
            {forms.filter(f => f.formType === 'house_configuration').length}
          </div>
          <div className="stat-label">Konfiguracje domów</div>
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
                    {getFormPreview(form)}
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
              {renderFormDetails(selectedForm)}

              <div className="detail-section">
                <h4>Notatki wewnętrzne</h4>
                <textarea
                  className="notes-textarea"
                  placeholder="Dodaj notatkę..."
                  value={selectedForm.internalNotes || ''}
                  onChange={(e) => {
                    setSelectedForm({
                      ...selectedForm,
                      internalNotes: e.target.value
                    });
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