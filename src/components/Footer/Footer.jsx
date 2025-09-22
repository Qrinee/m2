import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import PiaLogo from '../../assets/logo_pia-scaled.png';
import FreyLogo from '../../assets/logo_frey-scaled.png';
import Instytut from '../../assets/logo_instytut.png';
import OLX from '../../assets/olx-logo.svg';
import Otodom from '../../assets/otodom_logo_2021_black.svg';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* O nas */}
        <div className="footer-section">
          <h3>O nas</h3>
          <p className="p">
            M2Notarialnie to zespół łączący doświadczenie prawne z praktyczną
            znajomością rynku, by oferować klientom więcej niż standardową
            obsługę przy kupnie i sprzedaży nieruchomości.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Partnerzy */}
        <div className="footer-section">
          <h3>Nasi partnerzy</h3>
          <div className="partners">
            <img src={PiaLogo} alt="PIA" />
            <img src={FreyLogo} alt="Frey & Kisio" />
            <img src={Instytut} alt="Instytut Antywindykacji" />
          </div>
        </div>

        {/* Kontakt */}
        <div className="footer-section">
          <h3>Kontakt</h3>
          <p><FaMapMarkerAlt /> Aleja Prymasa Tysiąclecia 83A / 310,<br />01-242 Warszawa, Polska</p>
          <p><FaPhoneAlt /> +48 728 866 825</p>
          <p><FaEnvelope /> kontakt@m2notarialnie.pl</p>

          <h4>Znajdziesz nas na:</h4>
          <div className="partners">
            <img src={OLX} alt="OLX" />
            <img src={Otodom} alt="Otodom" height={20}/>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Wszystkie prawa zastrzeżone.</p>
        <a href="#">Polityka Prywatności</a>
      </div>
    </footer>
  );
}
