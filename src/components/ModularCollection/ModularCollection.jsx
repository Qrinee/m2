import React, { useState, useRef, useEffect } from "react";
import "./ModularCollection.css";
import gal1 from '../../assets/ex/2-5.jpg'
import gal2 from '../../assets/ex/3-5.jpg'
import gal3 from '../../assets/ex/4-5.jpg'
import gal4 from '../../assets/ex/5-5.jpg'
import gal5 from '../../assets/ex/6-5.jpg'
import gal6 from '../../assets/ex/7-5.jpg'
const ModularCollection = () => {
  const galleryItems = [
    { id: 1, image: gal1, title: "Nowoczesny biurowiec modułowy" },
    { id: 2, image: gal2, title: "Dom jednorodzinny modułowy" },
    { id: 3, image: gal3, title: "Pawilon handlowy" },
    { id: 4, image: gal4, title: "Kompleks turystyczny" },
    { id: 5, image: gal5, title: "Obiekt gastronomiczny" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const galleryRef = useRef(null);
  const autoPlayRef = useRef(null);
  const progressRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
    resetProgress();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
    resetProgress();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetProgress();
  };

  const resetProgress = () => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'none';
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = 'width 4s linear';
          progressRef.current.style.width = '100%';
        }
      }, 50);
    }
  };

  // Autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      resetProgress();
      autoPlayRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (progressRef.current) {
      progressRef.current.style.width = progressRef.current.style.width;
      progressRef.current.style.transition = 'none';
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    resetProgress();
  }, []);

  return (
    <section className="modular-collection">
      <div className="container">
        <h2 className="section-titled">Kolekcja 2025</h2>
        <p className="section-subtitle">Modułowe rozwiązania dla twojego biznesu</p>
        
        <div 
          className="gallery-carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="carousel-progress">
            <div 
              ref={progressRef}
              className="progress-bar"
            />
          </div>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              ref={galleryRef}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`
              }}
            >
              {galleryItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="slide-image">
                    <img src={item.image} alt={item.title} />
                    <div className="slide-overlay">
                      <h3>{item.title}</h3>
                      <button className="slide-btn">Zobacz więcej</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            ›
          </button>

          {/* Indicators */}
          <div className="carousel-indicators">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModularCollection;