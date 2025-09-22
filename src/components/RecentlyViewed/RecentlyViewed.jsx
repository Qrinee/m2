import React from "react";
import "./RecentlyViewed.css";
import rybnik from '../../assets/rybnik.jpg';
const RecentlyViewed = () => {
  const items = [
    {
      id: 1,
      title: "SZEREGOWIEC 83 M2 | OKOLICA RYBNIKA",
      price: "900,000 PLN",
      image: rybnik
    },
    {
      id: 2,
      title: "Nowoczesny i energooszczędny dom i ...",
      price: "860,000 PLN",
      image: "https://m2notarialnie.pl/wp-content/uploads/2025/08/Zrzut-ekranu-2025-08-4-o-15.43.39-525x328.png"
    },
    {
      id: 3,
      title: "Nowoczesne, świeżo wyremontowane mi...",
      price: "420,000 PLN",
      image: "https://m2notarialnie.pl/wp-content/uploads/2025/07/Zaw-2-525x328.jpg"
    },
  ];

  return (
    <div className="recent-container" style={{marginTop: '20px'}}>
      <h3>Ostatnio oglądane</h3>
      <ul className="recent-list">
        {items.map((item) => (
          <li key={item.id} className="recent-item">
            <img src={item.image} alt={item.title} className="recent-img" />
            <div className="recent-info">
              <p className="recent-title">{item.title}</p>
              <p className="recent-price">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyViewed;
