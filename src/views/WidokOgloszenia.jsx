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
  const [years, setYears] = useState(30);

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

              <section className="prop-card">
                <h3>Podstawowe informacje</h3>
                <div className="prop-features-grid">
                  <Feature title="Powierzchnia całkowita" value={`${property.powierzchnia?.calkowita} m²`} />
                  {property.powierzchnia?.uzytkowa && (
                    <Feature title="Powierzchnia użytkowa" value={`${property.powierzchnia.uzytkowa} m²`} />
                  )}
                  <Feature title="Liczba pokoi" value={property.pomieszczenia?.pokoje} />
                  <Feature title="Liczba łazienek" value={property.pomieszczenia?.lazienki} />
                  
                  {property.pomieszczenia?.kuchnia && (
                    <Feature title="Typ kuchni" value={getKitchenTypeText(property.pomieszczenia.kuchnia)} />
                  )}
                  {property.pomieszczenia?.garderoby && property.pomieszczenia.garderoby > 0 && (
                    <Feature title="Garderoby" value={property.pomieszczenia.garderoby} />
                  )}
                  {property.pomieszczenia?.gabinety && property.pomieszczenia.gabinety > 0 && (
                    <Feature title="Gabinety" value={property.pomieszczenia.gabinety} />
                  )}
                </div>

                {renderAdditionalAreas() && (
                  <div className="additional-areas">
                    <h4>Dodatkowe powierzchnie</h4>
                    <p>{renderAdditionalAreas()}</p>
                  </div>
                )}
              </section>

              <section className="prop-card">
                <h3>Informacje o budynku</h3>
                <div className="prop-features-grid">
                  {property.budynek?.rokBudowy && (
                    <Feature title="Rok budowy" value={property.budynek.rokBudowy} />
                  )}
                  {property.budynek?.stanTechniczny && (
                    <Feature title="Stan techniczny" value={getBuildingConditionText(property.budynek.stanTechniczny)} />
                  )}
                  {property.budynek?.material && (
                    <Feature title="Materiał budynku" value={property.budynek.material} />
                  )}
                  {property.budynek?.stanWykonczenia && (
                    <Feature title="Stan wykończenia" value={property.budynek.stanWykonczenia} />
                  )}
                  {property.pietro?.pietroNieruchomosci !== undefined && (
                    <Feature title="Piętro" value={property.pietro.pietroNieruchomosci} />
                  )}
                  {property.pietro?.liczbaPieter && (
                    <Feature title="Liczba pięter w budynku" value={property.pietro.liczbaPieter} />
                  )}
                  {property.pietro?.winda !== undefined && (
                    <Feature title="Winda" value={property.pietro.winda ? 'Tak' : 'Nie'} />
                  )}
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

              <section className="prop-card">
                <h3>Wyposażenie i udogodnienia</h3>
                <div className="prop-features-grid">
                  {/* Media */}
                  {property.media?.ogrzewanie && (
                    <Feature title="Ogrzewanie" value={getHeatingText(property.media.ogrzewanie)} />
                  )}
                  {property.media?.cieplaWoda && (
                    <Feature title="Ciepła woda" value={property.media.cieplaWoda} />
                  )}
                  {property.media?.klimatyzacja == true && (
                    <Feature title="Klimatyzacja" value={property.media.klimatyzacja ? 'Tak' : 'Nie'} />
                  )}
                  {property.media?.wentylacja && (
                    <Feature title="Wentylacja" value={property.media.wentylacja} />
                  )}

                  {/* Wyposażenie */}
                  {property.wyposazenie?.meble == true && (
                    <Feature title="Meble" value={property.wyposazenie.meble ? 'Tak' : 'Nie'} />
                  )}
                  {property.wyposazenie?.okna && (
                    <Feature title="Okna" value={property.wyposazenie.okna} />
                  )}
                  {property.wyposazenie?.podlogi && (
                    <Feature title="Podłogi" value={property.wyposazenie.podlogi} />
                  )}
                  {property.wyposazenie?.rolety && (
                    <Feature title="Rolety" value={property.wyposazenie.rolety ? 'Tak' : 'Nie'} />
                  )}

                  {/* Udogodnienia */}
                  {property.udogodnienia?.balkon && (
                    <Feature title="Balkon" value={property.udogodnienia.balkon ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.taras  && (
                    <Feature title="Taras" value={property.udogodnienia.taras ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.ogrod  && (
                    <Feature title="Ogród" value={property.udogodnienia.ogrod ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.garaz  && (
                    <Feature title="Garaż" value={property.udogodnienia.garaz ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.parking && (
                    <Feature title="Parking" value={property.udogodnienia.parking ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.basen && (
                    <Feature title="Basen" value={property.udogodnienia.basen ? 'Tak' : 'Nie'} />
                  )}
                  {property.udogodnienia?.silownia && (
                    <Feature title="Siłownia" value={property.udogodnienia.silownia ? 'Tak' : 'Nie'} />
                  )}
                </div>

                {/* AGD */}
                {property.wyposazenie?.agd && property.wyposazenie.agd.length > 0 && (
                  <div className="appliances-info">
                    <h4>Wyposażenie AGD</h4>
                    <p>{property.wyposazenie.agd.join(', ')}</p>
                  </div>
                )}
              </section>

              <section className="prop-card">
                <h3>Informacje prawne</h3>
                <div className="prop-features-grid">
                  {property.informacjePrawne?.formaWlasnosci && (
                    <Feature title="Forma własności" value={getOwnershipTypeText(property.informacjePrawne.formaWlasnosci)} />
                  )}
                  {property.informacjePrawne?.hipoteka !== undefined && (
                    <Feature title="Hipoteka" value={property.informacjePrawne.hipoteka ? 'Tak' : 'Nie'} />
                  )}
                  {property.informacjePrawne?.pozwolenieNaBudowe !== undefined && (
                    <Feature title="Pozwolenie na budowę" value={property.informacjePrawne.pozwolenieNaBudowe ? 'Tak' : 'Nie'} />
                  )}
                  {property.informacjePrawne?.charakterystykaEnergetyczna?.klasa && (
                    <Feature title="Klasa energetyczna" value={property.informacjePrawne.charakterystykaEnergetyczna.klasa} />
                  )}
                  {property.informacjePrawne?.charakterystykaEnergetyczna?.wskaznik && (
                    <Feature title="Wskaźnik energetyczny" value={property.informacjePrawne.charakterystykaEnergetyczna.wskaznik} />
                  )}
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
                  // Zachowanie kompatybilności ze starym komponentem ContactCard
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