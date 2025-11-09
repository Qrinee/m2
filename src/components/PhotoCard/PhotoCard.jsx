import React from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import './PhotoCard.css';

export default function PhotoCard({ 
  image, 
  name, 
  status, 
  description, 
  phoneNumber, 
  email,
  location,
  short
  
}) {
  
  const shortDescription = description.length > 120 
    ? description.slice(0, 120) + '...'
    : description;

  return (
    <div className="photo-card">
      {
          !short ? (
                <>
                      <img 
                          src={image} 
                          alt={`Portrait of ${name}`} 
                          className="photo-card__image" 
                          loading="lazy"
                      />
                </>
          ) : null
      }

      <div className="photo-card__content">
        <h3 className="photo-card__name">{name}</h3>
        {
          !short ? (
            <>
                <p className="photo-card__status">{status}</p>
                <p className="photo-card__description">{shortDescription}</p>
            </>
          ) : null
        }

        <div className="photo-card__contacts">
          {
            phoneNumber ? (
          <div className="photo-card__contact-item">
            <FaPhone className="photo-card__contact-icon" />
            <span className="photo-card__contact-text">{phoneNumber}</span>
          </div>
            ) : null
          }
          {
            email ? (
          <div className="photo-card__contact-item">
            <FaEnvelope className="photo-card__contact-icon" />
            <span className="photo-card__contact-text">{email}</span>
          </div>) : null
          }

          {location && (
            <div className="photo-card__contact-item">
              <FaMapMarkerAlt className="photo-card__contact-icon" />
              <span className="photo-card__contact-text">{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}