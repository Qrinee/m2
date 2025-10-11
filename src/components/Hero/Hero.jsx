import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = ({ leftContent, rightContent, leftBg, rightBg }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      {/* Kontener dla obu sekcji */}
      <div className="hero__container">
        {/* Lewa sekcja */}
        <div 
          className={`hero__half left ${isVisible ? 'visible' : ''}`}
          style={{ backgroundImage: `url(${leftBg})` }}
        >
          <div className="hero__content">
            <div className="content-wrapper l">
              {leftContent}
            </div>
          </div>
          <div className="hero__overlay"></div>
        </div>

        {/* Prawa sekcja */}
        <div 
          className={`hero__half right ${isVisible ? 'visible' : ''}`}
          style={{ backgroundImage: `url(${rightBg})` }}
        >
          <div className="hero__content">
            <div className="content-wrapper r">
              {rightContent}
            </div>
          </div>
          <div className="hero__overlay"></div>
        </div>
      </div>

      {/* Element łączący z animacją */}
      <div className="connection-element">
        <div className="pulse-dot"></div>
      </div>
    </section>
  );
};

export default Hero;