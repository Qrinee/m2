import React from 'react'
import ListingCard from '../components/ListingCard/ListingCard';
import rybnik from '../assets/rybnik.jpg';
import second from '../assets/11.jpg'
import wiktoria from '../assets/wiktoria.jpg'
import piotr from '../assets/piotr.png'
import third from '../assets/22.png'
export default function ListingSection() {


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
    agentImage: piotr,
    agentName: "Piotr Strzelecki",
  },
    {
    image: second,
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
    agentImage: wiktoria,
    agentName: "Wiktoria Kisio",
  },
    {
    image: third,
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
    agentImage: piotr,
    agentName: "Piotr Strzelecki",
  },
];

  return (
    <div>
        <div className='separate'></div>
        <div className='card-section__header'>
            <h2 className='h2'>Zrealizuj marzenie o własnym mieszkaniu – bez kredytu, bez stresu.</h2>
            <p  className='p'>Dzięki naszej unikalnej ofercie rat notarialnych, możesz kupić nieruchomość na jasnych i bezpiecznych warunkach, bez sprawdzania zdolności kredytowej. Sprawdź, jak łatwo to zrobić.</p>
        </div>
        <div className="listing-grid">
            {listings.map((item, index) => (
                <ListingCard key={index} {...item} />
            ))}
        </div>



    </div>
  )
}
