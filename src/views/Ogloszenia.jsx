import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from './../components/Breadcrumbs/Breadcrumbs';
import FilterBar from '../components/FilterBar/FilterBar';
import ListingCard from './../components/ListingCard/ListingCard';
import rybnik from '../assets/rybnik.jpg';
import Footer from '../components/Footer/Footer';
import AdvancedSearch from './../components/AdvancedSearch/AdvancedSearch';
import RecentlyViewed from '../components/RecentlyViewed/RecentlyViewed';
import Pagination from '../components/Pagination/Pagination';
import { Link } from 'react-router-dom';

export default function Ogloszenia() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Pobierz dane z backendu przy montowaniu komponentu
  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `http://localhost:5000/api/properties?page=${currentPage}&limit=9`
      );
      
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Otrzymane dane z backendu:', data); // Debug
      
      // Transformuj dane z backendu na format komponentu ListingCard
      const transformedListings = data.properties.map(property => {
        // Znajdź zdjęcie cover lub pierwsze dostępne zdjęcie
        const coverFile = property.files?.find(f => f.isCover) || property.files?.[0];
        let imageUrl = rybnik; // fallback
        
        if (coverFile && coverFile.path) {
          // Konwertuj ścieżkę Windows na URL - usuń część przed 'uploads'
          const pathParts = coverFile.path.split('uploads\\');
          if (pathParts.length > 1) {
            imageUrl = `http://localhost:5000/uploads/${pathParts[1]}`;
          } else {
            // Jeśli ścieżka jest już względna
            imageUrl = `http://localhost:5000/${coverFile.path}`;
          }
        }

        return {
          id: property._id,
          image: imageUrl,
          badges: [
            { 
              text: getStatusText(property.status), 
              color: getStatusColor(property.status) 
            },
            { 
              text: getAvailabilityText(property), 
              color: "yellow" 
            },
          ],
          location: `${property.lokalizacja?.miasto || 'Brak miasta'}, ${property.lokalizacja?.wojewodztwo || 'Brak województwa'}`,
          title: property.nazwa || 'Brak nazwy',
          price: `${formatPrice(property.cena)} PLN`,
          description: property.opis ? 
            (property.opis.length > 100 ? property.opis.substring(0, 100) + '...' : property.opis) 
            : "Brak opisu",
          baths: calculateBaths(property.szczegoly),
          beds: property.szczegoly?.pokoje || 0,
          area: property.szczegoly?.rozmiar_m2 || 0,
          agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zrzut-ekranu-2025-07-14-o-15.47.03-120x120.png",
          agentName: "Zespół M2 Notarialnie",
        };
      });

      console.log('Przekształcone ogłoszenia:', transformedListings); // Debug
      
      setListings(transformedListings);
      setTotalPages(data.totalPages);
      
    } catch (err) {
      console.error('Błąd podczas pobierania nieruchomości:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funkcje pomocnicze do transformacji danych
  const getStatusText = (status) => {
    switch (status) {
      case 'na_sprzedaz': return 'Sprzedaż';
      case 'do_wynajecia': return 'Wynajem';
      case 'sprzedane': return 'Sprzedane';
      default: return 'Na sprzedaż';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'na_sprzedaz': return 'green';
      case 'do_wynajecia': return 'blue';
      case 'sprzedane': return 'red';
      default: return 'green';
    }
  };

  const getAvailabilityText = (property) => {
    if (property.szczegoly?.dostepna_od) {
      return `Dostępne od ${property.szczegoly.dostepna_od}`;
    }
    return "Dostępne";
  };

  const formatPrice = (price) => {
    if (!price) return '0';
    const priceNum = parseInt(price);
    return isNaN(priceNum) ? '0' : priceNum.toLocaleString('pl-PL');
  };

  const calculateBaths = (szczegoly) => {
    // Przybliżona liczba łazienek na podstawie liczby pokoi
    const pokoje = szczegoly?.pokoje || 0;
    return Math.max(1, Math.floor(pokoje / 2));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div>
        <Header black />
        <div className='separate'></div>
        <div className='lay'>
          <div className='main-sec'>
            <div className='section'>
              <Breadcrumbs items={['Strona główna', "Ogłoszenia"]} />
              <h2 className='h2'>Ogłoszenia</h2>
              <FilterBar/>
              <div className='sm-separate'></div>
              <div className="loading-message">Ładowanie ogłoszeń...</div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header black />
        <div className='separate'></div>
        <div className='lay'>
          <div className='main-sec'>
            <div className='section'>
              <Breadcrumbs items={['Strona główna', "Ogłoszenia"]} />
              <h2 className='h2'>Ogłoszenia</h2>
              <FilterBar/>
              <div className='sm-separate'></div>
              <div className="error-message">
                <h3>Wystąpił błąd podczas ładowania ogłoszeń</h3>
                <p>{error}</p>
                <p>Sprawdź czy backend działa na localhost:5000</p>
                <button onClick={fetchProperties} className="btn">
                  Spróbuj ponownie
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

  return (
    <div>
      <Header black />
      <div className='separate'></div>
      <div className='lay'>
        <div className='main-sec'>
          <div className='section'>
            <Breadcrumbs items={['Strona główna', "Ogłoszenia"]} />
            <h2 className='h2'>Ogłoszenia ({listings.length})</h2>
            <FilterBar/>
            <div className='sm-separate'></div>
            
            {listings.length === 0 ? (
              <div className="no-listings">
                <h3>Brak dostępnych ogłoszeń</h3>
                <p>Nie znaleziono żadnych nieruchomości w bazie danych.</p>
                <button onClick={fetchProperties} className="btn">
                  Odśwież
                </button>
              </div>
            ) : (
              <>
                <div className="list-grid">
                  {listings.map((item) => (
                    <Link 
                      key={item.id} 
                      to={`/ogloszenie/${item.id}`} 
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListingCard {...item} />
                    </Link>
                  ))}
                </div>
                
                <div className='separate'></div>
                
                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                  />
                )}
              </>
            )}
            
            <div className='separate'></div>
          </div>
        </div>
        <div>
          <AdvancedSearch/>
          <RecentlyViewed/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}