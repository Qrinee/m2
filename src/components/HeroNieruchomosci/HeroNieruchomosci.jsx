import React from "react";
import "./HeroNieruchomosci.css";

const HeroNieruchomosci = ({content, img}) => {
  return (
    <section className="herod" style={{ backgroundImage: `url(${img})` }}>
      <div className="hero__contentd">
       {content}
      </div>
    </section>
  );
};

export default HeroNieruchomosci;