import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaPhoneAlt, FaUserCircle, FaHeart, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";

const Header = ({ black }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Sprawdź czy użytkownik jest zalogowany przy ładowaniu komponentu
  useEffect(() => {
    checkAuthStatus();
    
    // Nasłuchuj na zdarzenia logowania z innych komponentów
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  // 🔹 nasłuchiwanie scrolla
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Błąd parsowania danych użytkownika:", error);
        logout();
      }
    } else {
      setUser(null);
    }
  };

  const handleUserLoggedIn = (event) => {
    if (event.detail && event.detail.user) {
      setUser(event.detail.user);
      setShowAuthModal(false);
    }
  };

  const handleUserLoggedOut = () => {
    setUser(null);
  };

  const handleUserIconClick = () => {
    if (user) {
      navigate("/my-profile");
    } else {
      setShowAuthModal(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    
    // Wywołaj event dla innych komponentów
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
    
    // Przekieruj na stronę główną
    navigate("/");
  };

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

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    
    // Wywołaj event dla innych komponentów
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: { user: userData } }));
  };

  const menuItems = [
    { label: "Wszystkie oferty", href: "/ogloszenia" },
    {
      label: "Dla kupujących",
      key: "kupujacy",
      children: [
        { label: "Czym są raty notarialne?", href: "/czym-sa-raty-notarialne" },
        { label: "Oblicz ratę", href: "/oblicz-rate" },
      ],
    },
    { 
      label: "Dla sprzedających", 
      key: "sprzedajacy",
      href: "#",
      children: [
        { label: "Zgłoś nieruchomość", href: "/zglos-nieruchomosc" },
        { label: "Dlaczego warto?", href: "/dlaczego-warto" },
      ],
    },
    { label: "Zostań partnerem/pracownikiem", href: "/zostan-partnerem-pracownikiem" },
    { 
      label: "O nas", 
      key: "onas",
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
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onAuthSuccess={handleAuthSuccess}
          />
        )}
        
        <div className="header__actions">
          <span className="header__phone">
            <FaPhoneAlt /> +48 728 866 825
          </span>
          
          {/* Menu użytkownika */}
          <div className="header__user-menu">
            {user ? (
              <div className="user-dropdown">
                <button 
                  className="user-btn"
                  onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
                >
                  <FaUserCircle className="header__icon" />
                  <span className="user-name">{user.name}</span>
                </button>
                
                {openDropdown === 'user' && (
                  <div className="user-dropdown-menu">
                    <Link 
                      to="/my-profile" 
                      className="dropdown-item"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <FaUserCircle /> Mój profil
                    </Link>
                    <Link 
                      to="/my-properties" 
                      className="dropdown-item"
                      onClick={() => setOpenDropdown(null)}
                    >
                      🏠 Moje nieruchomości
                    </Link>
                    <Link 
                      to="/favorites" 
                      className="dropdown-item"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <FaHeart /> Ulubione
                    </Link>
                    <button 
                      className="dropdown-item logout-btn"
                      onClick={logout}
                    >
                      <FaSignOutAlt /> Wyloguj się
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={handleUserIconClick}
                className="login-btn"
              >
                <FaUserCircle className="header__icon" />
                <span className="login-text">Zaloguj się</span>
              </button>
            )}
          </div>
          
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