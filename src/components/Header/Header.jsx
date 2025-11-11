import React, { useState, useEffect } from "react";
import "./Header.css";
import { href, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import AuthModal from "../AuthModal/AuthModal";
import { FaHouse, FaShield } from "react-icons/fa6";
const Header = ({ black }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    checkAuthStatus();
    
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Błąd sprawdzania autoryzacji:", error);
      setUser(null);
    } finally {
      setLoading(false);
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
      setIsMobileMenuOpen(false);
    } else {
      setShowAuthModal(true);
      setIsMobileMenuOpen(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: 'include'
      });
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    } finally {
      setUser(null);
      setOpenDropdown(null);
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      navigate("/");
    }
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setOpenDropdown(null);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: { user: userData } }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header__dropdown') && !event.target.closest('.user-dropdown')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "Dla kupujących",
      key: "kupujacy",
      children: [
        { label: "Oferty nieruchomości", href: "/ogloszenia"},
        { label: "Czym są raty notarialne?", href: "/czym-sa-raty-notarialne" },
        { label: "Dodaj ogłoszenie", href: "/zglos-nieruchomosc" },
        { label: "Płyty fundamentowe", href: "/plyty-fundamentowe" },
      ],
    },
    {
      label: "Dla biznesu",
      key: "biznes",
      children: [
        {label: "Pawilony", href: "/rozwiazania-biznesowe"}
      ]
    },
    { 
      label: "Dla sprzedających", 
      key: "sprzedajacy",
      children: [
        { label: "Zgłoś nieruchomość", href: "/zglos-nieruchomosc" },
      ],
    },
    { 
      label: "O nas", 
      key: "onas",
      children: [
        { label: "Poznaj nasz zespół", href: "/nasz-zespol" },
        { label: "Współpraca", href: "/zostan-partnerem-pracownikiem" },
        { label: "Aktualności", href: "/aktualnosci" },
      ],
    },
    { label: "Kontakt", href: "/kontakt" },
  ];

  if (loading) {
    return (
      <header className={`header ${scrolled || black ? "scrolled" : ""}`}>
        <div className="header__container">
          <Link to="/">
            <div className="header__logo">
              <img src={logo} alt="M2Notarialnie" />
            </div>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className={`header ${scrolled || black ? "scrolled" : ""}`}>
      <div className="header__container">
        <Link to="/" onClick={handleLinkClick}>
          <div className="header__logo">
            <img src={logo} alt="M2Notarialnie" />
          </div>
        </Link>
        
        <button 
          className="header__hamburger" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`header__nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
{menuItems.map((item) =>
  item.children ? (
    <div
      key={item.key}
      className={`header__dropdown ${openDropdown === item.key ? "active" : ""}`}
      onMouseEnter={!isMobile ? () => setOpenDropdown(item.key) : undefined}
      onMouseLeave={!isMobile ? (e) => {
        
        const { relatedTarget, currentTarget } = e;
        if (!currentTarget.contains(relatedTarget)) {
          setOpenDropdown(null);
        }
      } : undefined}
    >
      <button
        className={`dropdown-toggle ${openDropdown === item.key ? "active" : ""}`}
        onClick={() => toggleDropdown(item.key)}
        onMouseEnter={!isMobile ? () => setOpenDropdown(item.key) : undefined}
      >
        {item.label}
        <FaChevronDown className={`dropdown-arrow ${openDropdown === item.key ? "active" : ""}`} />
      </button>
      <div 
        className="dropdown__menu"
        onMouseEnter={!isMobile ? () => setOpenDropdown(item.key) : undefined}
        onMouseLeave={!isMobile ? () => setOpenDropdown(null) : undefined}
      >
        {item.children.map((child, i) => (
          <Link 
            key={i} 
            to={child.href} 
            onClick={handleLinkClick}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <Link 
      key={item.label} 
      to={item.href} 
      className="header__link"
      onClick={handleLinkClick}
    >
      {item.label}
    </Link>
  )
)}

          <div className="mobile-actions">
            <div className="header__user-menu mobile-user-menu">
              {user ? (
<div 
  className="user-dropdown"
  onMouseEnter={!isMobile ? () => setOpenDropdown('user') : undefined}
  onMouseLeave={!isMobile ? (e) => {
    const { relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setOpenDropdown(null);
    }
  } : undefined}
>
  <button 
    className="user-btn"
    onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
    onMouseEnter={!isMobile ? () => setOpenDropdown('user') : undefined}
  >
    {user.role === 'admin' ? (
      <img src={import.meta.env.VITE_BACKEND + user.profilePicture} alt="Admin" className="header__avatar" />
    ) : <FaUserCircle className="header__icon" />}
    <span className="user-name">{user.name}</span>
    <FaChevronDown className={`dropdown-arrow ${openDropdown === 'user' ? "active" : ""}`} />
  </button>
  
  {openDropdown === 'user' && (
    <div 
      className="user-dropdown-menu"
      onMouseEnter={!isMobile ? () => setOpenDropdown('user') : undefined}
      onMouseLeave={!isMobile ? () => setOpenDropdown(null) : undefined}
    >
      {user.role === 'admin' ? (
        <Link 
          to="/admin" 
          style={{color: 'black'}}
          className="dropdown-item"
          onClick={() => setOpenDropdown(null)}
        >
          <FaShield /> Admin Panel
        </Link>
      ) : (
        <Link 
          to="/my-profile" 
          className="dropdown-item"
          onClick={() => setOpenDropdown(null)}
        >
          <FaUserCircle /> Mój profil
        </Link>
      )}
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
                  onClick={() => setShowAuthModal(true)}
                  className="login-btn mobile-login-btn"
                >
                  <FaUserCircle className="header__icon" />
                  <span className="login-text">Zaloguj się</span>
                </button>
              )}
            </div>
            
            <Link to={"/projekty-domow"} onClick={handleLinkClick}>
              <button className="header__btn mobile-add-btn">
                <FaHouse className="btn-icon" />
                Skonfiguruj dom
              </button>
            </Link>
          </div>
        </nav>

        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onAuthSuccess={handleAuthSuccess}
          />
        )}
        
        <div className="header__actions desktop-actions">
          <div className="header__user-menu">
            {user ? (
              <div 
                className="user-dropdown"
                onMouseEnter={!isMobile ? () => setOpenDropdown('user') : undefined}
                onMouseLeave={!isMobile ? (e) => {
                  const relatedTarget = e.relatedTarget;
                  if (!e.currentTarget.contains(relatedTarget)) {
                    setOpenDropdown(null);
                  }
                } : undefined}
              >
                <button 
                  className="user-btn"
                  onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
                >
                  {user.role === 'admin' ? (
                    <img src={import.meta.env.VITE_BACKEND + user.profilePicture} alt="Admin" className="header__avatar" />
                  ) : <FaUserCircle className="header__icon" />}
                  <span className="user-name">{user.name}</span>
                  <FaChevronDown className={`dropdown-arrow ${openDropdown === 'user' ? "active" : ""}`} />
                </button>
                
                <div 
                  className="user-dropdown-container"
                  onMouseEnter={!isMobile ? () => setOpenDropdown('user') : undefined}
                  onMouseLeave={!isMobile ? () => setOpenDropdown(null) : undefined}
                >
                  {openDropdown === 'user' && (
                    <div className="user-dropdown-menu">
                      {user.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          className="dropdown-item"
                          style={{color: 'black'}}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <FaShield style={{color: 'var(--secondary-color)'}} /> Admin Panel
                        </Link>
                      ) : (
                        <Link 
                          to="/my-profile" 
                          className="dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <FaUserCircle /> Mój profil
                        </Link>
                      )}
                      <button 
                        className="dropdown-item logout-btn"
                        onClick={logout}
                      >
                        <FaSignOutAlt /> Wyloguj się
                      </button>
                    </div>
                  )}
                </div>
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
          
          <Link to={"/projekty-domow"}>
            <button className="header__btn">
              <FaHouse className="btn-icon" />
              Skonfiguruj dom
            </button>
          </Link>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
};

export default Header;