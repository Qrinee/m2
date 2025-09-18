import React from "react";
import "./Hero.css";
import Header from "../Header/Header";

const Hero = ({content, img}) => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero__content">
       {content}
      </div>
    </section>
  );
};

export default Hero;
