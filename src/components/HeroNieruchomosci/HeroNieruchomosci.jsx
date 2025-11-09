import React from "react";
import "./HeroNieruchomosci.css";

const HeroNieruchomosci = ({ content, img, video }) => {
  const isVideo = video || (img && (img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.ogg') || img.endsWith('.mov')));

  return (
    <section className="herod">
      {isVideo ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="hero-background-media"
        >
          <source src={video || img} type="video/mp4" />
          Twoja przeglądarka nie obsługuje wideo.
        </video>
      ) : (
        <div 
          className="hero-background-media"
          style={{ backgroundImage: `url(${img})` }}
        />
      )}
      <div className="hero__contentd">
        {content}
      </div>
    </section>
  );
};

export default HeroNieruchomosci;