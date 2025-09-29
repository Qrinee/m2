import React, { useState } from "react";
import "./styles.css";
import Header from './../components/Header/Header';
import { FaLocationPin } from "react-icons/fa6";

const sampleImages = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691723518-36a0a6b3c5c2?w=1400&q=80&auto=format&fit=crop",
];

export default function WidokOgloszenia() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const price = 2590000;
  const title = "Wyjątkowy Apartament z Linią Brzegową i Prywatną Kęją | MAZURY";
  const location = "WĘGORZEWO, Węgorzewo";

  const property = {
    area: 120,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 2,
    updated: "11 lipca, 2025",
  };

  const [down, setDown] = useState(0);
  const [years, setYears] = useState(30);

  const loanAmount = Math.max(0, price - Number(down || 0));
  const monthlyRate = 0.05 / 12;
  const n = years * 12;
  const monthlyPayment =
    loanAmount === 0
      ? 0
      : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

  const formatPLN = (v) =>
    v.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });

  return (
    <>
      <Header black />
      <div className="separate"></div>
      <div className="prop-page-wrap">
        <div className="prop-container">
          
          {/* Breadcrumbs at the top */}
          <Breadcrumbs />
          
          {/* Main Property Grid */}
          <div className="prop-main-grid">
            
            {/* Left Column - Main Content */}
            <div className="prop-left-col">
              
              {/* Gallery Section */}
              <div className="prop-gallery-section">
                <Gallery
                  images={sampleImages}
                  index={galleryIndex}
                  setIndex={setGalleryIndex}
                />
              </div>

              {/* Title and Basic Info */}
              <div className="prop-title-section">
                <div className="prop-labels">
                  <span className="prop-label">Sprzedaż</span>
                  <span className="prop-label">Apartamenty</span>
                </div>

                <h1 className="prop-title">{title}</h1>
                <div className="prop-subline"><FaLocationPin/> {location}</div>

                <div className="prop-price-block">
                  <div className="prop-price">{formatPLN(price)}</div>
                  <div className="prop-action-row">
                    <button className="prop-btn ghost">Podziel się</button>
                    <button className="prop-btn ghost">Ulubione</button>
                    <button className="prop-btn ghost">Z nadrukami</button>
                  </div>
                </div>
              </div>

              {/* Info Bar */}
              <InfoBar property={property} />

              {/* Description */}
              <section className="prop-card">
                <h3>Opis</h3>
                <p>
                  Zapraszamy do odkrycia niezwykłego apartamentu położonego na
                  urokliwym półwyspie Kal w gminie Węgorzewo... (tekst przykładowy)
                  — treść możesz podmienić na pełny opis oferty. Apartament oferuje
                  nowoczesne udogodnienia, wysoki standard wyposażenia oraz
                  prywatny dostęp do jeziora.
                </p>
                <p>
                  Przydatne informacje: dostęp do pomostu, basen, sauna, bliskość
                  centrum i sklepów — wszystko to wpływa na atrakcyjność oferty
                  zarówno dla klientów indywidualnych, jak i najmu
                  krótkoterminowego.
                </p>
              </section>

              {/* Features */}
              <section className="prop-card">
                <h3>Cecha nieruchomości</h3>
                <div className="prop-features-grid">
                  <Feature title="Powierzchnia" value={`${property.area} m²`} />
                  <Feature title="Sypialnie" value={`${property.bedrooms}`} />
                  <Feature title="Łazienki" value={`${property.bathrooms}`} />
                  <Feature title="Ilość pokoi" value={`${property.rooms}`} />
                  <Feature title="Rok budowy" value={"2018"} />
                  <Feature title="Garaż" value={"Tak"} />
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
              <ContactCard />
              
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
                property={property}
                price={price}
                updated={property.updated}
              />

              {/* Search Widget */}
              <SearchWidget />

              {/* Watched List */}
              <WatchedList />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================
   PODKOMPONENTY
   ========================= */

function Breadcrumbs() {
  return (
    <nav className="prop-breadcrumbs">
      <ol>
        <li>Strona główna</li>
        <li>Apartamenty</li>
        <li>Wyjątkowy Apartament z Linią Brzegową i Prywatną Kęją</li>
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
            value={price.toLocaleString("pl-PL")} 
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

function ContactCard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  return (
    <div className="prop-card prop-contact-card">
      <div className="prop-agent">
        <img
          className="prop-agent-avatar"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=60&auto=format&fit=crop"
          alt="agent"
        />
        <div className="prop-agent-info">
          <div className="prop-agent-name">Wiktoria Kisio</div>
          <div className="prop-agent-role">Członek zarządu | CEO</div>
          <div className="prop-agent-rating">
            <div className="stars">★★★★★</div>
            <div className="rating-text">(48 opinii)</div>
          </div>
        </div>
      </div>

      <div className="prop-contact-form">
        <label className="form-label">
          <span className="label-text">Twoje imię</span>
          <input
            className="form-input"
            placeholder="Wpisz swoje imię"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

        <label className="form-label">
          <span className="label-text">Twój Adres e-mail</span>
          <input
            className="form-input"
            placeholder="email@przykład.pl"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label className="form-label">
          <span className="label-text">Twój Telefon</span>
          <input
            className="form-input"
            placeholder="+48 123 456 789"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
          />
        </label>

        <label className="prop-gdpr">
          <input type="checkbox" /> Wyrażam zgodę na Warunki GDPR
        </label>

        <button className="prop-btn primary full-width">Wyślij E-Mail</button>
        
        <div className="prop-contact-actions">
          <button className="prop-btn secondary">
            <span className="btn-icon">📞</span> Dzwoń
          </button>
          <button className="prop-btn secondary">
            <span className="btn-icon">💬</span> WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBar({ property }) {
  return (
    <div className="prop-info-bar">
      <div className="prop-info-item">
        <div className="prop-info-icon">🔄</div>
        <div className="prop-info-value">{property.updated}</div>
        <div className="prop-info-label">Ostatnia aktualizacja</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon">🛏️</div>
        <div className="prop-info-value">{property.bedrooms}</div>
        <div className="prop-info-label">Sypialnie</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon">🚿</div>
        <div className="prop-info-value">{property.bathrooms}</div>
        <div className="prop-info-label">Łazienki</div>
      </div>
      <div className="prop-info-item">
        <div className="prop-info-icon">📐</div>
        <div className="prop-info-value">{property.area} m²</div>
        <div className="prop-info-label">Powierzchnia</div>
      </div>
    </div>
  );
}

function Feature({ title, value }) {
  return (
    <div className="prop-feature">
      <div className="prop-feature-icon">🏷️</div>
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
        <button className="favorite-btn">❤️</button>
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
  const format = (p) =>
    p.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });
  return (
    <div className="prop-card prop-summary-aside">
      <div className="summary-price">{format(price)}</div>
      <div className="summary-details">
        <div className="detail-item">
          <span className="detail-icon">🏠</span>
          <span>{property.rooms} pokoje • {property.bedrooms} sypialnie</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🚿</span>
          <span>{property.bathrooms} łazienki</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">📐</span>
          <span>Powierzchnia: {property.area} m²</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🔄</span>
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

function SearchWidget() {
  return (
    <div className="prop-card prop-search-card">
      <h4>Zaawansowane wyszukiwanie</h4>
      
      <label className="form-label">
        Lokalizacja
        <input 
          className="form-input" 
          placeholder="Wpisz adres, stan, miasto lub obszar" 
        />
      </label>

      <label className="form-label">
        Typ nieruchomości
        <select className="form-select">
          <option>Wybierz typ</option>
          <option>Mieszkanie</option>
          <option>Dom</option>
          <option>Działka</option>
        </select>
      </label>

      <label className="form-label">
        Kategoria
        <select className="form-select">
          <option>Wybierz kategorię</option>
          <option>Sprzedaż</option>
          <option>Wynajem</option>
        </select>
      </label>

      <label className="form-label">
        Przedział cenowy
        <div className="prop-price-range">
          <input className="form-input" placeholder="0 PLN" />
          <span className="range-separator">-</span>
          <input className="form-input" placeholder="1,500,000 PLN" />
        </div>
      </label>

      <button className="prop-btn primary full-width">Szukaj</button>
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