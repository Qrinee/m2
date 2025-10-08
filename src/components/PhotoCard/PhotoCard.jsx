import React from 'react'
import { FaMailBulk, FaPhone } from 'react-icons/fa'
import './PhotoCard.css';

export default function PhotoCard({ image, name, status, description }) {
  // Skróć opis do 100 znaków
  const shortDescription = description.length > 100 
    ? description.slice(0, 100) + '...'
    : description;

  return (
    <div className="photo-card">
      <img src={image} alt={name} className="photo-card__image" />
      <h3 className="photo-card__name">{name}</h3>
      <p className="photo-card__status">{status}</p>
      <p className="photo-card__description">{shortDescription}</p>
      <div className="photo-card__icons">
        <FaPhone className="photo-card__icon" />
        <FaMailBulk className="photo-card__icon" />
      </div>
    </div>
  )
}
