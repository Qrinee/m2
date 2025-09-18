import React from "react";
import "./RecentlyViewed.css";

const RecentlyViewed = () => {
  const items = [
    {
      id: 1,
      title: "SZEREGOWIEC 83 M2 | OKOLICA RYBNIKA",
      price: "900,000 PLN",
      image: "https://via.placeholder.com/80x60.png?text=House+1"
    },
    {
      id: 2,
      title: "Nowoczesny i energooszczędny dom i ...",
      price: "860,000 PLN",
      image: "https://via.placeholder.com/80x60.png?text=House+2"
    },
    {
      id: 3,
      title: "Nowoczesne, świeżo wyremontowane mi...",
      price: "420,000 PLN",
      image: "https://via.placeholder.com/80x60.png?text=House+3"
    },
    {
      id: 4,
      title: "PRZESTRONNE WIELOFUNKCYJNE MIESZKAN...",
      price: "419,000 PLN",
      image: "https://via.placeholder.com/80x60.png?text=House+4"
    }
  ];

  return (
    <div className="recent-container">
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
