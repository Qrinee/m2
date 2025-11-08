import React, { useState, useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
    order: 0
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/admin/faq', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFaqs(data.data);
      }
    } catch (error) {
      console.error('Błąd pobierania FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const url = editingFaq 
        ? `${import.meta.env.VITE_BACKEND}/api/admin/faq/${editingFaq._id}`
        : import.meta.env.VITE_BACKEND + '/api/admin/faq';
      
      const method = editingFaq ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchFAQs();
        resetForm();
      }
    } catch (error) {
      console.error('Błąd zapisywania FAQ:', error);
    }
  };

  const deleteFAQ = async (faqId) => {
    if (!window.confirm('Czy na pewno chcesz usunąć to pytanie?')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_BACKEND}/api/admin/faq/${faqId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchFAQs();
    } catch (error) {
      console.error('Błąd usuwania FAQ:', error);
    }
  };

  const editFAQ = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'general',
      order: 0
    });
    setEditingFaq(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="loading">Ładowanie FAQ...</div>;
  }

  return (
    <div className="faq-section">
      <div className="section-header">
        <h2>Zarządzanie FAQ</h2>
        <p>Dodawaj i edytuj najczęściej zadawane pytania</p>
      </div>

      <div className="faq-actions">
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Dodaj nowe pytanie
        </button>
      </div>

      {showForm && (
        <div className="faq-form">
          <h3>{editingFaq ? 'Edytuj pytanie' : 'Nowe pytanie'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Pytanie:</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Odpowiedź:</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({...formData, answer: e.target.value})}
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kategoria:</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="general">Ogólne</option>
                  <option value="finance">Finanse</option>
                  <option value="technical">Techniczne</option>
                  <option value="legal">Prawne</option>
                </select>
              </div>

              <div className="form-group">
                <label>Kolejność:</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingFaq ? 'Zaktualizuj' : 'Dodaj'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Anuluj
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="faq-list">
        {faqs.length === 0 ? (
          <div className="empty-state">
            <p>Brak pytań w FAQ</p>
          </div>
        ) : (
          faqs.map(faq => (
            <div key={faq._id} className="faq-item">
              <div className="faq-content">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
                <div className="faq-meta">
                  <span className="faq-category">{faq.category}</span>
                  <span className="faq-order">Kolejność: {faq.order}</span>
                </div>
              </div>
              <div className="faq-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => editFAQ(faq)}
                >
                  Edytuj
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => deleteFAQ(faq._id)}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQ;