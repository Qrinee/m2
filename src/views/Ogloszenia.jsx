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
import { Link, useLocation } from 'react-router-dom';

export default function Ogloszenia() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    kategorie: [],
    wojewodztwa: [],
    miasta: [],
    statusy: []
  });
  
  const location = useLocation();
  
  // Odczytaj parametry z URL przy inicjalizacji
  const getInitialFiltersFromURL = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get('search') || '',
      typ: params.get('typ') || '',
      kategoria: params.get('kategoria') || '',
      wojewodztwo: params.get('wojewodztwo') || '',
      miasto: params.get('miasto') || '',
      cenaMin: params.get('cenaMin') || '',
      cenaMax: params.get('cenaMax') || '',
      powierzchniaMin: params.get('powierzchniaMin') || '',
      powierzchniaMax: params.get('powierzchniaMax') || '',
      pokoje: params.get('pokoje') || '',
      sort: params.get('sort') || 'data-desc'
    };
  };

  const [filters, setFilters] = useState(getInitialFiltersFromURL());

  // Pobierz opcje filtrów przy montowaniu komponentu
  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // Pobierz nieruchomości przy zmianie strony, filtrów lub URL
  useEffect(() => {
    fetchProperties();
  }, [currentPage, filters, location.search]);

  // Aktualizuj filtry gdy zmienia się URL (np. z SearchBar)
  useEffect(() => {
    const newFilters = getInitialFiltersFromURL();
    setFilters(newFilters);
    setCurrentPage(1); // Resetuj do pierwszej strony przy zmianie URL
  }, [location.search]);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/properties/filters/options');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFilterOptions(data.data);
        }
      }
    } catch (error) {
      console.error('Błąd pobierania opcji filtrów:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Budowanie URL z parametrami
      const params = new URLSearchParams({
        page: currentPage,
        limit: '9',
        ...filters
      });

      // Usuń puste parametry
      Object.keys(filters).forEach(key => {
        if (!filters[key]) {
          params.delete(key);
        }
      });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/properties/search/advanced?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transformuj dane z backendu na format komponentu ListingCard
      const transformedListings = data.properties.map(property => {
        // Znajdź zdjęcie cover lub pierwsze dostępne zdjęcie
        const coverFile = property.files?.find(f => f.isCover) || property.files?.[0];
        let imageUrl = rybnik; // fallback
        
        if (coverFile && coverFile.path) {
          imageUrl = transformImageUrl(coverFile.path);
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
          agentImage: property.user?.profilePicture || " ",
          agentName: property.user ? `${property.user.name} ${property.user.surname}` : "Zespół M2 Notarialnie",
        };
      });

      setListings(transformedListings);
      setTotalPages(data.totalPages);
      
    } catch (err) {
      console.error('Błąd podczas pobierania nieruchomości:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setFilterLoading(false);
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
    const pokoje = szczegoly?.pokoje || 0;
    return Math.max(1, Math.floor(pokoje / 2));
  };

  // PROSTE ROZWIĄZANIE DLA OBRAZKÓW
  const transformImageUrl = (originalUrl) => {
    if (!originalUrl) return rybnik;
    
    // Po prostu użyj bezpośrednio URL z WordPress
    if (originalUrl.startsWith('http')) {
      return originalUrl;
    }
    
    // Fallback do lokalnego obrazka
    return rybnik;
  };

  const handleFilterChange = (newFilters) => {
    setFilterLoading(true);
    setFilters(newFilters);
    setCurrentPage(1); // Resetuj do pierwszej strony przy zmianie filtrów
    
    // Aktualizuj URL bez przeładowania strony
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilterLoading(true);
    setFilters({
      search: '',
      typ: '',
      kategoria: '',
      wojewodztwo: '',
      miasto: '',
      cenaMin: '',
      cenaMax: '',
      powierzchniaMin: '',
      powierzchniaMax: '',
      pokoje: '',
      sort: 'data-desc'
    });
    setCurrentPage(1);
    
    // Wyczyść URL
    window.history.pushState({}, '', '/ogloszenia');
  };

  if (loading && !filterLoading) {
    return (
      <div>
        <Header black />
        <div className='separate'></div>
        <div className='lay'>
          <div className='main-sec'>
            <div className='section'>
              <Breadcrumbs items={['Strona główna', "Ogłoszenia"]} />
              <h2 className='h2'>Ogłoszenia</h2>
              <FilterBar 
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
              />
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
              <FilterBar 
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
              />
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
            <h2 className='h2'>Ogłoszenia</h2>
            <FilterBar 
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
              loading={filterLoading}
            />
            <div className='sm-separate'></div>
            
            {/* Loading Overlay dla filtrów */}
            {filterLoading && (
              <div className="filter-loading-overlay">
                <div className="filter-loading-spinner"></div>
                <p>Aktualizowanie wyników...</p>
              </div>
            )}
            
            <div className={`listings-container ${filterLoading ? 'loading' : ''}`}>
              {listings.length === 0 ? (
                <div className="no-listings">
                  <h3>Brak dostępnych ogłoszeń</h3>
                  <p>Nie znaleziono żadnych nieruchomości spełniających kryteria wyszukiwania.</p>
                  <button onClick={resetFilters} className="btn">
                    Wyczyść filtry
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
            </div>
            
            <div className='separate'></div>
          </div>
        </div>
        <div>
          <AdvancedSearch
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
      <Footer/>
    </div>
  );
}