import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Header from './../components/Header/Header';
import { FaLocationPin } from "react-icons/fa6";
import InfoBar from './../components/Property/InfoBar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Gallery from '../components/Property/Gallery';
import ContactCard from '../components/Property/ContactCard';
import MortgageWidget from '../components/Property/MortgageWidget';
import { useProperty } from "../hooks/useProperty";
import Feature from "../components/Property/Feature";
import {
  parsePrice, 
  formatPLN, 
  getStatusText, 
  getCategoryText, 
  getGarageText,
  getMarketText,
  getHeatingText,
  getKitchenTypeText,
  getBuildingConditionText,
  getOwnershipTypeText
} from "../utils/propertyUtils";
import SummaryCard from "../components/Property/SummaryCard";

export default function WidokOgloszenia() {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [down, setDown] = useState(0);
  const [years, setYears] = useState(5);

  // Obliczenia kredytu - używamy nowej struktury ceny
  const price = property ? parsePrice(property.cena?.calkowita) : 0;
  const loanAmount = Math.max(0, price - Number(down || 0));
  const monthlyRate = 0.05 / 12;
  const n = years * 12;
  const monthlyPayment = loanAmount === 0 ? 0 : 
    (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!property) {
    return <NotFoundState />;
  }

  // Przygotowanie danych do wyświetlenia - nowa struktura multimediów
  const images = property.multimedia?.zdjecia && property.multimedia.zdjecia.length > 0 
    ? property.multimedia.zdjecia.map(file => {
        if (file.path.startsWith('http')) {
          return file.path;
        } else if (file.path.startsWith('uploads/')) {
          return `${import.meta.env.VITE_BACKEND}/${file.path}`;
        } else {
          return `${import.meta.env.VITE_BACKEND}/uploads/${file.filename}`;
        }
      })
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80&auto=format&fit=crop"];

  const title = property.tytul || "Brak tytułu";
  
  // Nowa struktura lokalizacji
  const location = property.lokalizacja 
    ? `${property.lokalizacja.ulica ? property.lokalizacja.ulica + ', ' : ''}${property.lokalizacja.miasto || ""}, ${property.lokalizacja.wojewodztwo || ""}`.trim()
    : "Brak lokalizacji";

  // Mapowanie nowej struktury na starą dla kompatybilności z istniejącymi komponentami
  const propertyDetails = {
    area: property.powierzchnia?.calkowita || "0",
    rooms: property.pomieszczenia?.pokoje || "0",
    bedrooms: property.pomieszczenia?.pokoje || "0", // Używamy pokoi jako sypialni
    bathrooms: property.pomieszczenia?.lazienki || "0",
    updated: property.daty?.dataAktualizacji ? new Date(property.daty.dataAktualizacji).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : "Nieznana data"
  };

  // Funkcja do wyświetlania dodatkowych powierzchni
  const renderAdditionalAreas = () => {
    const areas = [];
    if (property.powierzchnia?.dodatkowe?.balkon) {
      areas.push(`Balkon: ${property.powierzchnia.dodatkowe.balkon} m²`);
    }
    if (property.powierzchnia?.dodatkowe?.taras) {
      areas.push(`Taras: ${property.powierzchnia.dodatkowe.taras} m²`);
    }
    if (property.powierzchnia?.dodatkowe?.piwnica) {
      areas.push(`Piwnica: ${property.powierzchnia.dodatkowe.piwnica} m²`);
    }
    if (property.powierzchnia?.dodatkowe?.ogrod) {
      areas.push(`Ogród: ${property.powierzchnia.dodatkowe.ogrod} m²`);
    }
    if (property.powierzchnia?.dodatkowe?.garaz) {
      areas.push(`Garaż: ${property.powierzchnia.dodatkowe.garaz} m²`);
    }
    return areas.length > 0 ? areas.join(', ') : null;
  };

  return (
    <>
      <Header black />
      <div className="separate"></div>
      <div className="prop-page-wrap">
        <div className="prop-container">
          
          <Breadcrumbs items={['']} />
          
          <div className="prop-main-grid">
            
            <div className="prop-left-col">
              
              <div className="prop-gallery-section">
                <Gallery
                  images={images}
                  index={galleryIndex}
                  setIndex={setGalleryIndex}
                />
              </div>

              <div className="prop-title-section">
                <div className="prop-labels">
                  <span className="prop-label">{getStatusText(property.status)}</span>
                  <span className="prop-label">{getCategoryText(property.typNieruchomosci)}</span>
                  <span className="prop-label">{getMarketText(property.rodzajOferty?.rynek)}</span>
                </div>

                <h1 className="prop-title">{title}</h1>
                <div className="prop-subline"><FaLocationPin/> {location}</div>

                <div className="prop-price-block">
                  <div className="prop-price">{formatPLN(property.cena?.calkowita)}</div>
                  {property.cena?.zaM2 && (
                    <div className="prop-price-per-m2">
                      {formatPLN(property.cena.zaM2)}/m²
                    </div>
                  )}
                </div>
              </div>

              <InfoBar property={propertyDetails} />

              <section className="prop-card">
                <h3>Opis</h3>
                <p
                  style={{ whiteSpace: 'pre-line' }}
                  dangerouslySetInnerHTML={{
                    __html: property.opis || "Brak opisu nieruchomości."
                  }}
                ></p>

                {property.dodatkoweInformacje && (
                  <div className="additional-info">
                    <h4>Dodatkowe informacje</h4>
                    <p>{property.dodatkoweInformacje}</p>
                  </div>
                )}

                {property.warunki && (
                  <div className="conditions-info">
                    <h4>Warunki</h4>
                    <p>{property.warunki}</p>
                  </div>
                )}
              </section>

{/* Sekcja: Podstawowe informacje */}
<section className="prop-features-section">
  <h3>Podstawowe informacje</h3>
  <div className="prop-features-grid">
    <Feature title="Powierzchnia całkowita" value={property.powierzchnia?.calkowita ? `${property.powierzchnia.calkowita} m²` : null} />
    <Feature title="Liczba pokoi" value={property.pomieszczenia?.pokoje || null} />
    <Feature title="Liczba łazienek" value={property.pomieszczenia?.lazienki || null} />
    <Feature title="Typ kuchni" value={property.pomieszczenia?.kuchnia ? getKitchenTypeText(property.pomieszczenia.kuchnia) : null} />
  </div>

  {renderAdditionalAreas() && (
    <div className="additional-areas">
      <h4>Dodatkowe powierzchnie</h4>
      <p>{renderAdditionalAreas()}</p>
    </div>
  )}
</section>

{/* Sekcja: Informacje o budynku */}
<section className="prop-features-section">
  <h3>Informacje o budynku</h3>
  <div className="prop-features-grid">
    <Feature title="Stan techniczny" value={property.budynek?.stanTechniczny ? getBuildingConditionText(property.budynek.stanTechniczny) : null} />
    <Feature title="Materiał budynku" value={property.budynek?.material || null} />
    <Feature title="Piętro" value={property.pietro?.pietroNieruchomosci !== undefined ? property.pietro.pietroNieruchomosci : null} />
    <Feature title="Winda" value={property.pietro?.winda !== undefined ? (property.pietro.winda ? 'Tak' : 'Nie') : null} />
  </div>

  {property.budynek?.remonty && property.budynek.remonty.length > 0 && (
    <div className="renovations-info">
      <h4>Historia remontów</h4>
      {property.budynek.remonty.map((remont, index) => (
        <div key={index} className="renovation-item">
          <strong>{remont.rok}:</strong> {remont.opis}
        </div>
      ))}
    </div>
  )}
</section>

{/* Sekcja: Wyposażenie i udogodnienia */}
<section className="prop-features-section">
  <h3>Wyposażenie i udogodnienia</h3>
  <div className="prop-features-grid">
    {/* Media */}
    <Feature title="Ogrzewanie" value={property.media?.ogrzewanie ? getHeatingText(property.media.ogrzewanie) : null} />
    <Feature title="Ciepła woda" value={property.media?.cieplaWoda || null} />
    <Feature title="Klimatyzacja" value={property.media?.klimatyzacja !== undefined ? (property.media.klimatyzacja ? 'Tak' : 'Nie') : null} />
    <Feature title="Wentylacja" value={property.media?.wentylacja || null} />

    {/* Wyposażenie */}
    <Feature title="Meble" value={property.wyposazenie?.meble !== undefined ? (property.wyposazenie.meble ? 'Tak' : 'Nie') : null} />
    <Feature title="Okna" value={property.wyposazenie?.okna || null} />
    <Feature title="Podłogi" value={property.wyposazenie?.podlogi || null} />
    <Feature title="Rolety" value={property.wyposazenie?.rolety !== undefined ? (property.wyposazenie.rolety ? 'Tak' : 'Nie') : null} />

    {/* Udogodnienia */}
    <Feature title="Balkon" value={property.udogodnienia?.balkon !== undefined ? (property.udogodnienia.balkon ? 'Tak' : 'Nie') : null} />
    <Feature title="Taras" value={property.udogodnienia?.taras !== undefined ? (property.udogodnienia.taras ? 'Tak' : 'Nie') : null} />
    <Feature title="Ogród" value={property.udogodnienia?.ogrod !== undefined ? (property.udogodnienia.ogrod ? 'Tak' : 'Nie') : null} />
    <Feature title="Garaż" value={property.udogodnienia?.garaz !== undefined ? (property.udogodnienia.garaz ? 'Tak' : 'Nie') : null} />
    <Feature title="Parking" value={property.udogodnienia?.parking !== undefined ? (property.udogodnienia.parking ? 'Tak' : 'Nie') : null} />
    <Feature title="Basen" value={property.udogodnienia?.basen !== undefined ? (property.udogodnienia.basen ? 'Tak' : 'Nie') : null} />
    <Feature title="Siłownia" value={property.udogodnienia?.silownia !== undefined ? (property.udogodnienia.silownia ? 'Tak' : 'Nie') : null} />
  </div>

  {/* AGD */}
  {property.wyposazenie?.agd && property.wyposazenie.agd.length > 0 && (
    <div className="appliances-info">
      <h4>Wyposażenie AGD</h4>
      <p>{property.wyposazenie.agd.join(', ')}</p>
    </div>
  )}
</section>

{/* Sekcja: Informacje prawne */}
<section className="prop-features-section">
  <h3>Informacje prawne</h3>
  <div className="prop-features-grid">
    <Feature title="Forma własności" value={property.informacjePrawne?.formaWlasnosci ? getOwnershipTypeText(property.informacjePrawne.formaWlasnosci) : null} />
    <Feature title="Hipoteka" value={property.informacjePrawne?.hipoteka !== undefined ? (property.informacjePrawne.hipoteka ? 'Tak' : 'Nie') : null} />
    <Feature title="Pozwolenie na budowę" value={property.informacjePrawne?.pozwolenieNaBudowe !== undefined ? (property.informacjePrawne.pozwolenieNaBudowe ? 'Tak' : 'Nie') : null} />
    <Feature title="Klasa energetyczna" value={property.informacjePrawne?.charakterystykaEnergetyczna?.klasa || null} />
    <Feature title="Wskaźnik energetyczny" value={property.informacjePrawne?.charakterystykaEnergetyczna?.wskaznik || null} />
  </div>

  {property.informacjePrawne?.obciazenia && (
    <div className="encumbrances-info">
      <h4>Obciążenia nieruchomości</h4>
      <p>{property.informacjePrawne.obciazenia}</p>
    </div>
  )}

  {property.informacjePrawne?.ksiegWieczysty && (
    <div className="land-register-info">
      <h4>Księga wieczysta</h4>
      <p>{property.informacjePrawne.ksiegWieczysty}</p>
    </div>
  )}
</section>

            </div>

            <aside className="prop-right-col">
              
              <ContactCard 
                property={{
                  ...property,
                  kontakt: property.kontakt
                }} 
              />
              
              <MortgageWidget
                price={price}
                down={down}
                setDown={setDown}
                years={years}
                setYears={setYears}
                monthlyPayment={monthlyPayment}
              />

              <SummaryCard
                property={propertyDetails}
                price={property.cena?.calkowita}
                updated={propertyDetails.updated}
              />

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

// Komponenty stanów (pozostają bez zmian)
const LoadingState = () => (
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

const ErrorState = ({ error }) => (
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

const NotFoundState = () => (
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