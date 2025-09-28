import React from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from './../components/Breadcrumbs/Breadcrumbs';
import FilterBar from '../components/FilterBar/FilterBar';
import ListingCard from './../components/ListingCard/ListingCard';
import rybnik from '../assets/rybnik.jpg';
import Footer from '../components/Footer/Footer';
import AdvancedSearch from './../components/AdvancedSearch/AdvancedSearch';
import RecentlyViewed from '../components/RecentlyViewed/RecentlyViewed';
import Pagination from '../components/Pagination/Pagination';
import NotarialCalculator from '../components/NotarialCalculator/NotarialCalculator';
import { Link } from 'react-router-dom';


export default function Ogloszenia() {



const listings = [
  {
    image: rybnik,
    badges: [
      { text: "Sprzedaż", color: "green" },
      { text: "Dostępne", color: "yellow" },
    ],
    location: "Rybnik",
    title: "SZEREGOWIEC 83 M2 | OKOLICA RYBNIKA",
    price: "900,000 PLN",
    description: "Na sprzedaż komfortowe mieszkanie o pow. 83 m² z dwoma balkonami (łącznie 10 m²) w spokojn ...",
    baths: 1,
    beds: 2,
    area: 83,
    agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zrzut-ekranu-2025-07-14-o-15.47.03-120x120.png",
    agentName: "Piotr Strzelecki",
  },
    {
    image: "https://m2notarialnie.pl/wp-content/uploads/2025/08/Zrzut-ekranu-2025-08-4-o-15.43.39-525x328.png",
    badges: [
      { text: "Sprzedaż", color: "green" },
      { text: "Dostępne", color: "yellow" },
    ],
    location: "Wrocław",
    title: "Nowoczesny i energooszczędny dom | BLISKO WR...",
    price: "860,000 PLN",
    description: "🛠️Zamów taki dom w dowolnym miejscu w Polsce – również na raty notarialne! Podoba Ci się ...",
    baths: 1,
    beds: 2,
    area: 83,
    agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/06/wiktoria-1-525x328.jpg",
    agentName: "Wiktoria Kisio",
  },
    {
    image: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zaw-2-525x328.jpg",
    badges: [
      { text: "Sprzedaż", color: "green" },
      { text: "Dostępne", color: "yellow" },
    ],
    location: "Zawiercie",
    title: "Nowoczesne, świeżo wyremontowane mieszkanie ...",
    price: "420,000 PLN",
    description: "Nowoczesne, świeżo wyremontowane mieszkanie w Zawierciu| 52,1 m² | Wysoki standard | Gotow ...",
    baths: 1,
    beds: 2,
    area: 83,
    agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zrzut-ekranu-2025-07-14-o-15.47.03-120x120.png",
    agentName: "Piotr Strzelecki",
  },
];

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
              
                   <div className="list-grid">
                {listings.map((item, index) => (
                    <Link to="/ogloszenie" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListingCard key={index} {...item} />
                      </Link>
                  ))}
                  </div>
              </div>
              <div className='separate'></div>
                
              <div className='separate'></div>
              <Pagination currentPage={1} totalPages={5} onPageChange={(page) => console.log("Go to page:", page)} />
              <div className='separate'></div>
          </div>
          <div>
              <AdvancedSearch/>
              <RecentlyViewed/>
          </div>
        </div>
        <Footer/>
    </div>
  )
}
