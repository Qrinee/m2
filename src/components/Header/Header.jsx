import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaPhoneAlt, FaUserCircle, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";

const Header = ({ black }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // 🔹 nasłuchiwanie scrolla
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const menuItems = [
  { label: "Wszystkie oferty", href: "/ogloszenia" },
  {
    label: "Dla kupujących",
    key: "kupujacy", // Unikalny klucz
    children: [
      { label: "Czym są raty notarialne?", href: "/czym-sa-raty-notarialne" },
      { label: "Oblicz ratę", href: "/oblicz-rate" },
    ],
  },
  { 
    label: "Dla sprzedających", 
    key: "sprzedajacy", // Dodany unikalny klucz
    href: "#",
    children: [
      { label: "Zgłoś nieruchomość", href: "/zglos-nieruchomosc" },
      { label: "Dlaczego warto?", href: "/dlaczego-warto" },
    ],
  },
  { label: "Zostań partnerem/pracownikiem", href: "/zostan-partnerem-pracownikiem" },
  { 
    label: "O nas", 
    key: "onas", // Dodany unikalny klucz
    href: "/o-nas",
    children: [
      { label: "Poznaj nasz zespół", href: "#" },
      { label: "Aktualności", href: "/aktualnosci" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
  {
    label: (
      <>
        <FaHeart /> Ulubione
      </>
    ),
    href: "/ulubione",
    className: "header__favorite",
  },
];

  return (
    <header className={`header ${scrolled || black ? "scrolled" : ""}`}>
      <div className="header__container">
        {/* Logo */}
        <Link to="/">
        <div className="header__logo">
          <img src={logo} alt="M2Notarialnie" />
        </div>
        </Link>
        {/* Hamburger Button (Mobile Only) */}
        <button className="header__hamburger" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu */}
        <nav className={`header__nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {menuItems.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className={`header__dropdown ${openDropdown === item.key ? "active" : ""}`}
                onMouseEnter={() => setOpenDropdown(item.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  className={openDropdown === item.key ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown(item.key);
                  }}
                >
                  {item.label}
                </a>
                <div className="dropdown__menu">
                  {item.children.map((child, i) => (
                    <a key={i} href={child.href} onClick={handleLinkClick}>
                      {child.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className={item.className} onClick={handleLinkClick}>
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Kontakt i przycisk */}
              {open && <AuthModal onClose={() => setOpen(false)} />}
        <div className="header__actions">
          <span className="header__phone">
            <FaPhoneAlt /> +48 728 866 825
          </span>
          <button onClick={() => setOpen(true)}>
              <FaUserCircle className="header__icon" />
              
          </button>
          <Link to={"/zglos-nieruchomosc"}>
            <button className="header__btn">Dodaj ogłoszenie</button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>}
    </header>
  );
};

export default Header;