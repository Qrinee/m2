import React from "react";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

const InfoSection = () => {
  return (
    <div className="info-section">
      <h1>FREY&KISIO ESTATE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</h1>
      <p className="address">
        Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa, Polska
      </p>
      <div className="social-icons">
        <FaFacebookF />
        <FaTiktok />
        <FaInstagram />
      </div>
      <p className="contact">
        Telefon: <a className="a" href="tel:+48728866825">+48 728 866 825</a>
      </p>
      <p className="contact">
        E-mail: <a className="a"  href="mailto:biuro@m2noratrialnie.pl">biuro@m2noratrialnie.pl</a>
      </p>
      <p>
        M2Notarialnie to zespół ludzi, którzy połączyli siły, by zapewnić klientom coś więcej
        niż standardową obsługę przy zakupie lub sprzedaży nieruchomości...
      </p>
      <p>
        Nie jesteśmy typową agencją nieruchomości. Nasze działania opieramy na gruntownej
        analizie – zarówno formalnej, jak i terenowej...
      </p>
      <p>
        Wierzymy, że tylko takie podejście daje klientowi realne poczucie bezpieczeństwa i komfortu.
      </p>
      <div className="values">
        <strong>Nasze wartości:</strong>
        <ul>
          <li><strong>Bezpieczeństwo</strong> – każda transakcja zabezpieczona prawnie</li>
          <li><strong>Rzetelność</strong> – tylko sprawdzone i przeanalizowane oferty</li>
          <li><strong>Transparentność</strong> – jasne zasady współpracy</li>
          <li><strong>Elastyczność</strong> – dopasowujemy się do potrzeb klienta</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoSection;
