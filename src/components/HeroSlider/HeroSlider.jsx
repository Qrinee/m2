import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import './HeroSlider.css';

const HeroSlider = ({ images, autoPlayDelay = 5000, content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayDelay);

    return () => clearInterval(timer);
  }, [currentSlide, autoPlayDelay]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 1000); // Zwiększony czas dla płynniejszej animacji
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 1000);
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="hero-slider__container">
      <div className="hero-slider__wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-slider__slide ${index === currentSlide ? 'hero-slider__slide--active' : ''} ${
              isTransitioning ? 'hero-slider__slide--transitioning' : ''
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
              {content}
          </div>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;