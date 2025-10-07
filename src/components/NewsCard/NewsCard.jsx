import React from "react";
import "./NewsCard.css";

const NewsCard = ({ imageSrc, title, date, excerpt, onReadMore }) => {
  return (
    <div className="news-card">
      <div className="news-card__image-wrapper">
        {imageSrc ? (
          <img 
            src={import.meta.env.VITE_BACKEND + imageSrc} 
            alt={title} 
            className="news-card__image" 
          />
        ) : (
          <div className="news-card__placeholder">Brak obrazu</div>
        )}
      </div>
      <div className="news-card__content">
        <h3 className="news-card__title">{title}</h3>
        <div className="news-card__date">{date}</div>
        <p className="news-card__excerpt">{excerpt}</p>
        <button className="news-card__read-more" onClick={onReadMore}>
          Czytaj dalej
        </button>
      </div>
    </div>
  );
};

export default NewsCard;