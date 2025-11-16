import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import PiaLogo from '../../assets/logo_pia-scaled.png';
import FreyLogo from '../../assets/logo_frey-scaled.png';
import Instytut from '../../assets/logo_instytut.png';
import OLX from '../../assets/olx-logo.svg';
import Otodom from '../../assets/otodom_logo_2021_black.svg';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">O nas</h3>
          <p className="footer-description">
            M2Notarialnie to zespół łączący doświadczenie prawne z praktyczną
            znajomością rynku, by oferować klientom więcej niż standardową
            obsługę przy kupnie i sprzedaży nieruchomości.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61577857168786" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@m2notarialnie?_t=ZN-8xWOz04Zon8&_r=1" className="social-icon">
              <FaTiktok />
            </a>
            <a href="https://www.instagram.com/m2notarialnie.pl/" className="social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Nasi partnerzy</h3>
          <div className="partners-grid">
            <div className="partner-logo">
              <img src={PiaLogo} alt="PIA" />
            </div>
            <a href="https://frey-kisio.pl/" className="partner-logo">
              <img src={FreyLogo} alt="Frey & Kisio" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100077924352822" className="partner-logo">
              <img src={Instytut} alt="Instytut Antywindykacji" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Kontakt</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>Aleja Prymasa Tysiąclecia 83A / 310<br />01-242 Warszawa, Polska</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>+48 728 866 825</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>kontakt@m2notarialnie.pl</span>
            </div>
          </div>

          <h4 className="platforms-title">Znajdziesz nas na:</h4>
          <div className="platforms-grid">
            <a href="https://www.olx.pl/" className="platform-logo">
              <img src={OLX} alt="OLX" />
            </a>
            <a href="https://www.otodom.pl/" className="platform-logo">
              <img src={Otodom} alt="Otodom" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">© 2025 Wszystkie prawa zastrzeżone.</p>
          <Link to={'/privacy-policy'} className="privacy-link">Polityka Prywatności</Link>
          <Link to={'/cookies-policy'} className="privacy-link">Ciasteczka</Link>
          <Link to={'/regulamin'} className="privacy-link">Regulamin</Link>
        </div>
      </div>
    </footer>
  );
}