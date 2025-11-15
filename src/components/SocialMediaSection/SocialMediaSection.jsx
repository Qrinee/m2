import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaLinkedinIn } from 'react-icons/fa';
import './SocialMediaSection.css';

const SocialMediaSection = () => {
  const socialMedia = [
    {
      icon: <FaFacebookF />,
      url: 'https://www.facebook.com/profile.php?id=61577857168786',
      name: 'Facebook'
    },
    {
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/m2notarialnie.pl/',
      name: 'Instagram'
    },
    {
      icon: <FaYoutube />,
      url: 'https://youtube.com/@dwdewelopment',
      name: 'YouTube'
    },
    {
      icon: <FaTiktok />,
      url: 'https://www.tiktok.com/@m2notarialnie?_t=ZN-8xWOz04Zon8&_r=1',
      name: 'TikTok'
    },
    {
      icon: <FaLinkedinIn />,
      url: 'https://linkedin.com/company/twoja-strona',
      name: 'LinkedIn'
    }
  ];

  return (
    <div className="sm-section">
      <p className="sm-section__text">
        Jesteśmy do Twojej dyspozycji — skontaktuj się z nami telefonicznie, mailowo lub poprzez formularz kontaktowy.
        Jeśli chcesz być na bieżąco z naszymi realizacjami, nowościami i poradami, znajdziesz nas również w social media:
      </p>
      
      <div className="sm-section__icons">
        {socialMedia.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="sm-section__link"
            aria-label={social.name}
          >
            <div className="sm-section__icon">
              {social.icon}
            </div>
          </a>
        ))}
      </div>

      <p className="sm-section__description">
        Obserwuj nas, aby nie przegapić aktualizacji, inspiracji oraz informacji dotyczących nieruchomości, 
        rat notarialnych i domów modułowych.
      </p>
    </div>
  );
};

export default SocialMediaSection;