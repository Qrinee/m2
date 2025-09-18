import React from "react";
import { FaStar } from "react-icons/fa";
import './testimonials.css'
export default function TestimonialCard({ testimonial }) {
  const { name, title, text, image, stars } = testimonial;

  return (
    <article className="testimonial-card" role="group" aria-label={`Opinia użytkownika ${name}`}>
      <div className="testimonial-content">
        <h3 className="t-name">{name}</h3>
        <p className="t-title">{title}</p>
        <p className="t-text">"{text}"</p>

        <div className="t-stars" aria-hidden>
          {Array.from({ length: stars }).map((_, i) => (
            <FaStar key={i} className="star" />
          ))}
        </div>
      </div>

      <div className="testimonial-image-wrapper">
        <img src={image} alt={`${name}`} className="testimonial-image" />
      </div>
    </article>
  );
}
