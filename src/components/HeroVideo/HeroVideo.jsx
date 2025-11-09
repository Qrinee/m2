import React from "react";
import "./HeroVideo.css";

const HeroVideo = ({ content, video, poster }) => {
  return (
    <section className="herod">
      <div className="hero-background-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="hero-video"
        >
          <source src={video} type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </div>
      <div className="hero__contentd">
        {content}
      </div>
    </section>
  );
};

export default HeroVideo;