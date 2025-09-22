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
