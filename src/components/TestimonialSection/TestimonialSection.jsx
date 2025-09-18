import React, { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import ArrowButton from "../ArrowButton/ArrowButton";
import TestimonialCard from "../TestimonialCard/TestimonialCard";

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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=60",
    stars: 5,
  },
  {
    id: 2,
    name: "Anna K.",
    title: "Kupująca",
    text:
      "Profesjonalne wsparcie i szybka obsługa. Wszystkie formalności ogarnięte sprawnie i bez stresu. Polecam serdecznie!",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60",
    stars: 5,
  },
  {
    id: 3,
    name: "Piotr B.",
    title: "Inwestor",
    text:
      "Dzięki nim moja inwestycja przyniosła zysk szybciej niż planowałem. Rzetelność i konkretna wiedza na pierwszym miejscu.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=60",
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
    <section className="testimonials-hero">
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
