import React from "react";
import "./NewsCard.css";  // jeśli używasz zwykłego CSS

const NewsCard = ({ imageSrc, title, date, excerpt, onReadMore }) => {
  return (
    <div className="news-card">
      <div className="news-card__image-wrapper">
        <img src={imageSrc} alt={title} className="news-card__image" />
      </div>
      <div className="news-card__content">
        <h3 className="news-card__title">{title}</h3>
        <div className="news-card__date">{date}</div>
        <p className="news-card__excerpt">{excerpt}</p>
        <button onClick={onReadMore}>
          Czytaj dalej
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
