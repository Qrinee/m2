import React from 'react'
import ListingCard from '../components/ListingCard/ListingCard';
import rybnik from '../assets/rybnik.jpg';
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
