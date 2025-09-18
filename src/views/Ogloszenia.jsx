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
    description: "Na sprzedaż komfortowe mieszkanie o pow. 83 m²...",
    baths: 1,
    beds: 2,
    area: 83,
    agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zrzut-ekranu-2025-07-14-o-15.47.03-120x120.png",
    agentName: "Piotr Strzelecki",
  },
    {
    image: rybnik,
    badges: [
      { text: "Sprzedaż", color: "green" },
      { text: "Dostępne", color: "yellow" },
    ],
    location: "Rybnik",
    title: "SZEREGOWIEC 83 M2 | OKOLICA RYBNIKA",
    price: "900,000 PLN",
    description: "Na sprzedaż komfortowe mieszkanie o pow. 83 m²...",
    baths: 1,
    beds: 2,
    area: 83,
    agentImage: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zrzut-ekranu-2025-07-14-o-15.47.03-120x120.png",
    agentName: "Piotr Strzelecki",
  },
    {
    image: rybnik,
    badges: [
      { text: "Sprzedaż", color: "green" },
      { text: "Dostępne", color: "yellow" },
    ],
    location: "Rybnik",
    title: "SZEREGOWIEC 83 M2 | OKOLICA RYBNIKA",
    price: "900,000 PLN",
    description: "Na sprzedaż komfortowe mieszkanie o pow. 83 m²...",
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
          <div>
              <div className='section'>
              <Breadcrumbs items={['Strona główna', "Ogłoszenia"]} />
              <h2>Ogłoszenia</h2>
              <FilterBar/>
              <div className='separate'></div>
                   <div className="list-grid">
                {listings.map((item, index) => (
                      <ListingCard key={index} {...item} />
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
