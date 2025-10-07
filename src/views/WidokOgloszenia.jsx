import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Header from './../components/Header/Header';
import { FaHouse, FaLocationPin, FaMessage, FaSquareBehance } from "react-icons/fa6";
import { FaArrowCircleDown, FaBed, FaCheck, FaEnvelope, FaHeart, FaPhone, FaRuler, FaShower, FaSquare, FaSquarespace, FaWhatsapp } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function WidokOgloszenia() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [down, setDown] = useState(0);
  const [years, setYears] = useState(30);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono nieruchomości');
        }
        
        const responseData = await response.json();
        
        // Poprawka: używamy responseData.property zamiast responseData
        if (responseData.success && responseData.property) {
          setProperty(responseData.property);
          
          // Ustaw początkową wpłatę własną na 10% ceny
          if (responseData.property.cena) {
            const priceNumber = parseFloat(responseData.property.cena.replace(/[^\d,]/g, '').replace(',', '.'));
            setDown(priceNumber * 0.1);
          }
        } else {
          throw new Error('Nieprawidłowa struktura danych z serwera');
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // Funkcje pomocnicze do konwersji danych
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^\d,]/g, '').replace(',', '.'));
  };

  const formatPLN = (value) => {
    if (typeof value === 'string') {
      // Jeśli już jest sformatowana cena, zwróć ją
      if (value.includes('zł') || value.includes('PLN')) {
        return value;
      }
      value = parsePrice(value);
    }
    return value.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });
  };

  // Obliczenia kredytu
  const price = property ? parsePrice(property.cena) : 0;
  const loanAmount = Math.max(0, price - Number(down || 0));
  const monthlyRate = 0.05 / 12;
  const n = years * 12;
  const monthlyPayment = loanAmount === 0 ? 0 : 
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

  if (loading) {
    return (
      <>
        <Header black />
        <div className="separate"></div>
        <div className="prop-page-wrap">
          <div className="prop-container">
            <div className="loading-state">Ładowanie nieruchomości...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header black />
        <div className="separate"></div>
        <div className="prop-page-wrap">
          <div className="prop-container">
            <div className="error-state">Błąd: {error}</div>
          </div>
        </div>
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header black />
        <div className="separate"></div>
        <div className="prop-page-wrap">
          <div className="prop-container">
            <div className="error-state">Nie znaleziono nieruchomości</div>
          </div>
        </div>
      </>
    );
  }

  // Przygotowanie danych do wyświetlenia
  const images = property.files && property.files.length > 0 
    ? property.files.map(file => {
        // Poprawne tworzenie URL do zdjęć
        if (file.path.startsWith('http')) {
          return file.path;
        } else if (file.path.startsWith('uploads/')) {
          return `${API_BASE_URL}/${file.path}`;
        } else {
          return `${API_BASE_URL}/uploads/${file.filename}`;
        }
      })
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop"];

  const title = property.nazwa || "Brak tytułu";
  const location = property.lokalizacja 
    ? `${property.lokalizacja.miasto || ""}, ${property.lokalizacja.wojewodztwo || ""}`.trim()
    : "Brak lokalizacji";

  const propertyDetails = {
    area: property.szczegoly?.rozmiar_m2 || "0",
    rooms: property.szczegoly?.pokoje || "0",
    bedrooms: property.szczegoly?.sypialnie || "0",
    bathrooms: "1", // Zakładamy domyślnie 1 łazienkę jeśli nie ma danych
    updated: property.updatedAt ? new Date(property.updatedAt).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : "Nieznana data"
  };

  return (
    <>
      <Header black />
      <div className="separate"></div>
      <div className="prop-page-wrap">
        <div className="prop-container">
          
          {/* Breadcrumbs at the top */}
          <Breadcrumbs property={property} />
          
          {/* Main Property Grid */}
          <div className="prop-main-grid">
            
            {/* Left Column - Main Content */}
            <div className="prop-left-col">
              
              {/* Gallery Section */}
              <div className="prop-gallery-section">
                <Gallery
                  images={images}
                  index={galleryIndex}
                  setIndex={setGalleryIndex}
                />
              </div>

              {/* Title and Basic Info */}
              <div className="prop-title-section">
                <div className="prop-labels">
                  <span className="prop-label">{getStatusText(property.status)}</span>
                  <span className="prop-label">{getCategoryText(property.kategoria)}</span>
                </div>

                <h1 className="prop-title">{title}</h1>
                <div className="prop-subline"><FaLocationPin/> {location}</div>

                <div className="prop-price-block">
                  <div className="prop-price">{formatPLN(property.cena)}</div>
                  {property.przedCena && (
                    <div className="prop-old-price">{formatPLN(property.przedCena)}</div>
                  )}
                </div>
              </div>

              {/* Info Bar */}
              <InfoBar property={propertyDetails} />

              {/* Description */}
              <section className="prop-card">
                <h3>Opis</h3>
                <p>
                  {property.opis || "Brak opisu nieruchomości."}
                </p>
                {property.szczegoly?.uwagi && (
                  <p>{property.szczegoly.uwagi}</p>
                )}
              </section>

              {/* Features */}
              <section className="prop-card">
                <h3>Cecha nieruchomości</h3>
                <div className="prop-features-grid">
                  <Feature title="Powierzchnia" value={`${propertyDetails.area} m²`} />
                  <Feature title="Sypialnie" value={propertyDetails.bedrooms} />
                  <Feature title="Łazienki" value={propertyDetails.bathrooms} />
                  <Feature title="Ilość pokoi" value={propertyDetails.rooms} />
                  <Feature title="Rok budowy" value={property.szczegoly?.rok_budowy || "Nieznany"} />
                  <Feature title="Garaż" value={getGarageText(property.szczegoly?.garaz)} />
                  {property.szczegoly?.wielkosc_dzialki && (
                    <Feature title="Wielkość działki" value={`${property.szczegoly.wielkosc_dzialki} m²`} />
                  )}
                  {property.szczegoly?.klasa_energetyczna && (
                    <Feature title="Klasa energetyczna" value={property.szczegoly.klasa_energetyczna} />
                  )}
                  {property.szczegoly?.liczba_pieter && (
                    <Feature title="Liczba pięter" value={property.szczegoly.liczba_pieter} />
                  )}
                  {property.szczegoly?.dostepna_od && (
                    <Feature title="Dostępne od" value={property.szczegoly.dostepna_od} />
                  )}
                </div>
              </section>

              {/* Similar Properties */}
              <section className="prop-card">
                <h3>Podobne oferty</h3>
                <div className="prop-similar-grid">
                  <SimilarCard
                    title="SZEREGOWIEC 83 m²"
                    price={900000}
                    img="https://images.unsplash.com/photo-1598928506312-7b5f5dd4e3b9?w=800&q=60&auto=format&fit=crop"
                  />
                  <SimilarCard
                    title="Nowoczesny energooszczędny dom"
                    price={860000}
                    img="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=60&auto=format&fit=crop"
                  />
                  <SimilarCard
                    title="100 m2 mieszkanie z ogródkiem"
                    price={780000}
                    img="https://images.unsplash.com/photo-1505691723518-36a0a6b3c5c2?w=800&q=60&auto=format&fit=crop"
                  />
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <aside className="prop-right-col">
              
              {/* Contact Card - Top of sidebar */}
              <ContactCard property={property} />
              
              {/* Mortgage Widget */}
              <MortgageWidget
                price={price}
                down={down}
                setDown={setDown}
                years={years}
                setYears={setYears}
                monthlyPayment={monthlyPayment}
              />

              {/* Summary Card */}
              <SummaryCard
                property={propertyDetails}
                price={property.cena}
                updated={propertyDetails.updated}
              />


              {/* Watched List */}
              <WatchedList />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Funkcje pomocnicze do tłumaczenia wartości
function getStatusText(status) {
  switch (status) {
    case 'na_sprzedaz': return 'Sprzedaż';
    case 'do_wynajecia': return 'Wynajem';
    case 'sprzedane': return 'Sprzedane';
    default: return status || 'Na sprzedaż';
  }
}

function getCategoryText(kategoria) {
  switch (kategoria) {
    case 'dom': return 'Dom';
    case 'mieszkanie': return 'Mieszkanie';
    case 'dzialka': return 'Działka';
    case 'lokal': return 'Lokal';
    default: return kategoria || 'Nieruchomość';
  }
}

function getGarageText(garaz) {
  switch (garaz) {
    case 'tak': return 'Tak';
    case 'nie': return 'Nie';
    case 'brak': return 'Brak';
    default: return garaz || 'Nie';
  }
}

/* =========================
   PODKOMPONENTY
   ========================= */

function Breadcrumbs({ property }) {
  return (
    <nav className="prop-breadcrumbs">
      <ol>
        <li>Strona główna</li>
        <li>{getCategoryText(property?.kategoria) || "Nieruchomości"}</li>
        <li>{property?.nazwa || "Szczegóły oferty"}</li>
      </ol>
    </nav>
  );
}

function Gallery({ images, index, setIndex }) {
  return (
    <div className="prop-gallery">
      <div className="prop-main-photo">
        <img src={images[index]} alt={`photo-${index}`} />
        <div className="gallery-counter">{index + 1} / {images.length}</div>
      </div>
      {images.length > 1 && (
        <div className="prop-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`prop-thumb-btn ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            >
              <img src={src} alt={`thumb-${i}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MortgageWidget({
  price,
  down,
  setDown,
  years,
  setYears,
  monthlyPayment,
}) {
  const percent = Math.round(((price - (down || 0)) / price) * 100);
  const loanPercent = Math.min(100, Math.max(0, percent));
  const size = 120;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (loanPercent / 100) * circumference;

  const formatPLN = (v) =>
    v.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });

  return (
    <div className="prop-card prop-mortgage-widget">
      <div className="prop-mortgage-top">
        <div className="prop-donut">
          <svg width={size} height={size}>
            <g transform={`translate(${size / 2},${size / 2})`}>
              <circle r={radius} fill="none" stroke="#eee" strokeWidth={stroke} />
              <circle
                r={radius}
                fill="none"
                stroke="#1d4ed8"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
                transform="rotate(-90)"
              />
              <text
                x="0"
                y="6"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#111"
              >
                {monthlyPayment > 0
                  ? `${Math.round(monthlyPayment).toLocaleString("pl-PL")} zł`
                  : "0 zł"}
              </text>
            </g>
          </svg>
        </div>

        <div className="prop-mortgage-info">
          <h4>Kalkulator rat</h4>
          <div className="small">Miesięczna rata (orientacyjnie)</div>
          <div className="big">
            {monthlyPayment > 0
              ? `${Math.round(monthlyPayment).toLocaleString("pl-PL")} PLN`
              : "0 PLN"}
          </div>
        </div>
      </div>

      <div className="prop-mortgage-controls">
        <label className="form-label">
          Cena domu
          <input 
            className="form-input" 
            type="text" 
            value={formatPLN(price)} 
            readOnly 
          />
        </label>

        <label className="form-label">
          Wpłata własna: {Number(down || 0).toLocaleString("pl-PL")} PLN
          <input
            className="form-range"
            type="range"
            min="0"
            max={price}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
          />
        </label>

        <label className="form-label">
          Termin spłaty (lata): {years}
          <input
            className="form-range"
            type="range"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}

function ContactCard({ property }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error' | ''

  // Czyszczenie komunikatu po 5 sekundach
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      msg: form.msg,
      propertyId: property?._id,
    };

    // Walidacja podstawowych pól
    if (!formData.name || !formData.email) {
      setMessage({ 
        text: 'Proszę wypełnić wymagane pola: imię i email', 
        type: 'error' 
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ 
          text: 'Wiadomość została wysłana pomyślnie! Sprawdź swoją skrzynkę email.', 
          type: 'success' 
        });
        setForm({ name: "", email: "", phone: "", msg: "" });
      } else {
        setMessage({ 
          text: 'Wystąpił błąd podczas wysyłania wiadomości: ' + result.error, 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      setMessage({ 
        text: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pobierz dane właściciela nieruchomości
  const owner = property?.user;
  
  // Jeśli nie ma właściciela, użyj domyślnych danych
  const agentName = owner?.name || "Administrator";
  const agentSurname = owner?.surname || "Systemu";
  const agentRole = owner?.position || owner?.role === 'admin' ? 'Administrator' : 'Agent nieruchomości';
  const agentAvatar = owner?.profilePicture 
    ? `${import.meta.env.VITE_BACKEND}${owner.profilePicture}`
    : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=60&auto=format&fit=crop";
  
  const agentPhone = owner?.phone || '+48 123 456 789';
  const agentEmail = owner?.contactEmail || owner?.email || 'kontakt@biuronieruchomosci.pl';

  return (
    <div className="prop-card prop-contact-card">
      <div className="prop-agent">
        <img
          className="prop-agent-avatar"
          src={agentAvatar}
          alt={`${agentName} ${agentSurname}`}
        />
        <div className="prop-agent-info">
          <div className="prop-agent-name">{agentName} {agentSurname}</div>
          <div className="prop-agent-role">{agentRole}</div>
        </div>
      </div>

      {/* Komunikat o statusie */}
      {message.text && (
        <div className={`form-message ${message.type}`}>
          <div className="message-content">
            {message.type === 'success' && (
              <div className="message-icon success">✓</div>
            )}
            {message.type === 'error' && (
              <div className="message-icon error">!</div>
            )}
            <span>{message.text}</span>
          </div>
          <button 
            className="message-close"
            onClick={() => setMessage({ text: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}

      <form className="prop-contact-form" onSubmit={handleSubmit}>
        <label className="form-label">
          <span className="label-text">Twoje imię *</span>
          <input
            className="form-input"
            placeholder="Wpisz swoje imię"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-label">
          <span className="label-text">Twój Adres e-mail *</span>
          <input
            className="form-input"
            type="email"
            placeholder="email@przykład.pl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="form-label">
          <span className="label-text">Twój Telefon</span>
          <input
            className="form-input"
            placeholder="+48 123 456 789"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={isSubmitting}
          />
        </label>

        <label className="form-label">
          <span className="label-text">Wiadomość</span>
          <textarea
            className="form-textarea"
            placeholder="Napisz swoją wiadomość..."
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            rows={4}
            disabled={isSubmitting}
          />
        </label>

        <label className="prop-gdpr">
          <input 
            type="checkbox" 
            required 
            disabled={isSubmitting}
          /> 
          Wyrażam zgodę na Warunki GDPR
        </label>

        <button 
          type="submit" 
          className={`prop-btn primary full-width ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="button-spinner"></div>
              Wysyłanie...
            </>
          ) : (
            'Wyślij E-Mail'
          )}
        </button>
        
        <div className="prop-contact-actions">
          <a 
            href={`tel:${agentPhone}`} 
            className="prop-btn secondary"
          >
            <span className="btn-icon"><FaPhone/></span> Dzwoń
          </a>
          <a 
            href={`https://wa.me/${agentPhone.replace(/[^\d]/g, '')}?text=Witam,%20jestem%20zainteresowany%20nieruchomością:%20${encodeURIComponent(property?.nazwa || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="prop-btn secondary"
          >
            <span className="btn-icon"><FaWhatsapp/></span> WhatsApp
          </a>
        </div>

        {/* Dodatkowe informacje kontaktowe */}
        <div className="prop-contact-details">
          <div className="contact-detail">
            <FaPhone className="contact-icon" />
            <span> {agentPhone}</span>
          </div>
          <div className="contact-detail">
            <FaEnvelope className="contact-icon" />
            <span> {agentEmail}</span>
          </div>
        </div>
      </form>
    </div>
  );
}

function InfoBar({ property }) {
  return (
    <div className="prop-info-bar">
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaArrowCircleDown/></div>
        <div className="prop-info-value">{property.updated}</div>
        <div className="prop-info-label">Ostatnia aktualizacja</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaBed/></div>
        <div className="prop-info-value">{property.bedrooms}</div>
        <div className="prop-info-label">Sypialnie</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaShower/></div>
        <div className="prop-info-value">{property.bathrooms}</div>
        <div className="prop-info-label">Łazienki</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon"><FaSquarespace/></div>
        <div className="prop-info-value">{property.area} m²</div>
        <div className="prop-info-label">Powierzchnia</div>
      </div>
    </div>
  );
}

function Feature({ title, value }) {
  return (
    <div className="prop-feature">
      <div className="prop-feature-icon"><FaCheck color="green"/></div>
      <div className="prop-feature-content">
        <div className="prop-feature-title">{title}</div>
        <div className="prop-feature-value">{value}</div>
      </div>
    </div>
  );
}

function SimilarCard({ title, price, img }) {
  const format = (p) =>
    p.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });
  return (
    <div className="prop-similar-card-item">
      <div className="similar-image-container">
        <img src={img} alt={title} />
      </div>
      <div className="prop-similar-meta">
        <div className="prop-sim-title">{title}</div>
        <div className="prop-sim-price">{format(price)}</div>
        <div className="prop-sim-details">3 pokoje • 2 sypialnie • 85 m²</div>
      </div>
    </div>
  );
}

function SummaryCard({ property, price, updated }) {
  const format = (p) => {
    if (typeof p === 'string' && (p.includes('zł') || p.includes('PLN'))) {
      return p;
    }
    const num = typeof p === 'string' ? parseFloat(p.replace(/[^\d,]/g, '').replace(',', '.')) : p;
    return num.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="prop-card prop-summary-aside">
      <div className="summary-price">{format(price)}</div>
      <div className="summary-details">
        <div className="detail-item">
          <span className="detail-icon"><FaHouse/></span>
          <span>{property.rooms} pokoje • {property.bedrooms} sypialnie</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaShower/></span>
          <span>{property.bathrooms} łazienki</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaSquarespace/></span>
          <span>Powierzchnia: {property.area} m²</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon"><FaArrowCircleDown/></span>
          <span>Aktualizacja: {updated}</span>
        </div>
      </div>

      <div className="summary-actions">
        <button className="prop-btn primary full-width">
          Poproś o informację
        </button>
        <button className="prop-btn secondary full-width">
          Zaplanuj wycieczkę
        </button>
      </div>
    </div>
  );
}


function WatchedList() {
  return (
    <div className="prop-card">
      <h4>Ostatnio oglądane</h4>
      
      <div className="prop-watched-item">
        <img
          src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=200&q=60&auto=format&fit=crop"
          alt="property"
        />
        <div className="watched-info">
          <div className="prop-watched-title">SZEREGOWIEC 83 M2</div>
          <div className="prop-watched-price">900,000 PLN</div>
          <div className="prop-watched-details">3 pokoje • 85 m²</div>
        </div>
      </div>

      <div className="prop-watched-item">
        <img
          src="https://images.unsplash.com/photo-1572120360610-d971b9b3df4a?w=200&q=60&auto=format&fit=crop"
          alt="property"
        />
        <div className="watched-info">
          <div className="prop-watched-title">Nowoczesny dom</div>
          <div className="prop-watched-price">860,000 PLN</div>
          <div className="prop-watched-details">4 pokoje • 120 m²</div>
        </div>
      </div>
    </div>
  );
}