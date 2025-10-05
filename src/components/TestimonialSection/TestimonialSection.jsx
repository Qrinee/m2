import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import ArrowButton from "../ArrowButton/ArrowButton";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import Anna from '../../assets/Anna.jpg'
import Marek from '../../assets/MarekT.jpg'
import Background from '../../assets/bread-scaled-1-scaled.jpg'
import Piotr from '../../assets/slide1.jpeg'
/*
  Przykładowe dane - podmieniaj obrazy / teksty wg potrzeb.
*/
const testimonials = [
  {
    id: 1,
    name: "Marek T.",
    title: "Zadowolony klient",
    text:
      'Nie spodziewałem się, że można kupić mieszkanie z taką pewnością, że wszystko jest sprawdzone od A do Z. Świetne połączenie wiedzy prawniczej i znajomości rynku. Na pewno wrócę przy kolejnej inwestycji.',
    image:
      Marek,
    stars: 5,
  },
  {
    id: 2,
    name: "Anna K.",
    title: "Kupująca",
    text:
      "Profesjonalne wsparcie i szybka obsługa. Wszystkie formalności ogarnięte sprawnie i bez stresu. Polecam serdecznie!",
    image:
      Anna,
    stars: 5,
  },
  {
    id: 3,
    name: "Katarzyna i Piotr R.",
    title: "Inwestor",
    text:
      "Szukaliśmy nie tylko agencji, ale i partnera, który zadba o nasze interesy. Zespół M2Notarialnie doradził nam najlepsze rozwiązania i dopilnował każdego szczegółu. Czuliśmy się naprawdę bezpiecznie.",
    image:
      Piotr,
    stars: 5,
  },
];

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // automatyczne przewijanie (opcjonalne)
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <section className="testimonials-hero" style={{backgroundImage: `url(${Background})`}}>
      <div className="hero-overlay">
        <h2 className="hero-title">Opinie mówią same za siebie</h2>
      </div>

      <div className="testimonials-container">
        <div className="carousel-wrapper">
          <ArrowButton position="left" onClick={prev} ariaLabel="Poprzednia opinia" />
          <div className="carousel-inner">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`slide ${i === index ? "active" : ""}`}
                aria-hidden={i === index ? "false" : "true"}
              >
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
          <ArrowButton position="right" onClick={next} ariaLabel="Następna opinia" />
        </div>

        <div className="dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "dot--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Przejdź do opinii ${i + 1}`}
            >
              <FaCircle />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
