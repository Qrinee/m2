import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useParams } from 'react-router-dom';
import './Profil.css'
import { FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import ListingCard from '../components/ListingCard/ListingCard';

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function Profil() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono użytkownika');
        }
        
        const userData = await response.json();
        setUser(userData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProperties = async () => {
      try {
        setPropertiesLoading(true);
        const response = await fetch(`${API_BASE_URL}/properties/user/${id}`);
        
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania nieruchomości');
        }
        
        const propertiesData = await response.json();
        setProperties(propertiesData.properties || []);
        
      } catch (err) {
        console.error('Błąd pobierania nieruchomości:', err);
        setProperties([]);
      } finally {
        setPropertiesLoading(false);
      }
    };

    if (id) {
      fetchUser();
      fetchUserProperties();
    }
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pl-PL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'na_sprzedaz': { text: 'Na sprzedaż', color: 'primary' },
      'do_wynajecia': { text: 'Do wynajęcia', color: 'secondary' },
      'aktywne': { text: 'Aktywne', color: 'success' },
      'nieaktywne': { text: 'Nieaktywne', color: 'default' }
    };
    return statusMap[status] || { text: status, color: 'default' };
  };

  // Funkcja do przekształcania danych property na propsy dla ListingCard
  const mapPropertyToCardProps = (property) => {
    const statusBadge = getStatusBadge(property.status);
    
    return {
      key: property._id,
      image: property.multimedia?.zdjecia?.length > 0 
        ? `${import.meta.env.VITE_BACKEND}/${property.multimedia.zdjecia.find(img => img.isCover)?.path || property.multimedia.zdjecia[0].path}`
        : '/placeholder-image.jpg', // fallback image
      badges: [statusBadge],
      location: `${property.lokalizacja?.miasto || ''}, ${property.lokalizacja?.wojewodztwo || ''}`,
      views: property.views || 0,
      title: property.tytul || property.nazwa || 'Brak tytułu',
      price: `${formatPrice(property.cena?.calkowita || property.cenaNum)} zł`,
      role: property.user?.role || 'user',
      companyName: property.user?.companyName || '',
      description: property.opis ? 
        (property.opis.length > 150 ? property.opis.substring(0, 150) + '...' : property.opis) 
        : 'Brak opisu',
      baths: property.pomieszczenia?.lazienki || property.szczegoly?.lazienki || 0,
      beds: property.pomieszczenia?.pokoje || property.szczegoly?.pokoje || 0,
      area: property.powierzchnia?.calkowita || property.szczegoly?.rozmiar_m2 || 0,
      agentImage: property.user?.profilePicture || '',
      agentName: property.user ? `${property.user.name || ''} ${property.user.surname || ''}`.trim() : ''
    };
  };

  return (
    <div>
      <Header black/>
      <div className='separate'></div>

      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', "Profil"]} />
            <div className='sm-separate'></div>
            
            {loading ? (
              <div className="loading">Ładowanie profilu...</div>
            ) : error ? (
              <div className="error">Błąd: {error}</div>
            ) : user && (
              <div className="info-section">
                <div className='f'>
                  {user?.data.user.profilePicture ? (
                    <img 
                      src={import.meta.env.VITE_BACKEND + user.data.user.profilePicture} 
                      alt={user.data.user.name || 'Avatar'} 
                      className="info-section__avatar" 
                    />
                  ) : (
                    <></>
                  )}
                  
                  <div className='info-section__text'>
                    <h2 className="info-section__name">
                      {user.data.user.companyName || `${user.data.user.name} ${user.data.user.surname}`}
                    </h2>
                    <p className='info-section__position'>{user.data.user.position}</p>
                    <p className="info-section__phone">
                     {user.data.user.phone && <FaPhone style={{marginRight: '10px'}}/> }  
                      {user.data.user.phone}
                    </p>
                    {user.data.user.contactEmail && (
                      <p className="info-section__email">
                        <FaEnvelope style={{marginRight: '10px'}}/> 
                        {user.data.user.contactEmail}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className='about'>
                  <h2>O mnie</h2>
                  <p className="info-section__bio">
                    {user.data.user.bio || 'Brak opisu'}
                  </p>
                </div>

                {/* Sekcja nieruchomości użytkownika */}
                <div className="user-properties-section">
                  <h2>{user.data.user.role == 'agent' ? 'Inwestycje' : 'Nieruchomości'} ({properties.length})</h2>
                  
                  {propertiesLoading ? (
                    <div className="loading">Ładowanie nieruchomości...</div>
                  ) : properties.length === 0 ? (
                    <div className="no-properties">
                      <FaHome size={48} />
                      <p>Brak dostępnych nieruchomości</p>
                    </div>
                  ) : (
                    <div className="properties-grid">
                      {properties.map(property => (
                        <ListingCard {...mapPropertyToCardProps(property)} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="form">
                  <h3>Skontaktuj się ze mną</h3>
                  <form>
                    <input type="text" className='input' placeholder="Twoje imię" />
                    <input type="email" className='input' placeholder="Twój Adres e-mail" />
                    <input type="tel" className='input' placeholder="Twój Telefon" />
                    <textarea className='input' placeholder="Twoja wiadomość"></textarea>
                    <label className="gdpr">
                      <input type="checkbox" /> Wyrażam zgodę na Warunki GDPR
                    </label>
                    <button type="submit" className='btn-submit'>Wyślij E-Mail</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}