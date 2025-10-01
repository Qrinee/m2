import React, { useState, useRef } from "react";
import "./styles.css";

const TABS = [
  { id: "opis", label: "1. Opis" },
  { id: "zdjecia", label: "2. Prześlij zdjęcie" },
  { id: "lokalizacja", label: "3. Lokalizacja" },
  { id: "szczegoly", label: "4. Szczegóły" },
  { id: "zglos", label: "5. Zgłoś nieruchomość" },
];

export default function Add() {
  const [active, setActive] = useState("opis");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // dane wszystkich zakładek (hoistowane do rodzica)
  const [opis, setOpis] = useState({
    nazwa: "",
    opis: "",
    cena: "",
    poCenie: "",
    przedCena: "",
    podatek: "",
    oplata: "",
    kategoria: "",
    wystawioneNa: "",
    status: "",
  });

  const [files, setFiles] = useState([]); // {id, file, src, isCover}
  const idRef = useRef(1);

  const [lokalizacja, setLokalizacja] = useState({
    adres: "",
    wojewodztwo: "",
    miasto: "",
    powiat: "",
    kod: "",
    kraj: "Polska",
    lat: "",
    lon: "",
    streetViewAngle: "",
  });

  const [szczegoly, setSzczegoly] = useState({
    rozmiar_m2: "",
    wielkosc_dzialki: "",
    pokoje: "",
    sypialnie: "",
    id_nieruchomosci: "",
    rok_budowy: "",
    garaz: "",
    wielkosc_garazu: "",
    dostepna_od: "",
    piwnica: "",
    konstrukcja_zew: "",
    material_elewacji: "",
    dach: "",
    typ_konstrukcji: "",
    liczba_pieter: "",
    uwagi: "",
    klasa_energetyczna: "",
    wskaznik_energetyczny: "",
  });

  // blokowanie kliknięć w zakładki — poruszamy się tylko przyciskami Dalej/Wstecz
  const tabClickAllowed = false;

  // Dodawanie plików (używa idRef do unikalnych id)
  function addFiles(fileList) {
    const arr = Array.from(fileList).map((f) => {
      const id = idRef.current++;
      const src = f.type.startsWith("image/") ? URL.createObjectURL(f) : null;
      return { id, file: f, src, isCover: false };
    });
    setFiles((s) => [...s, ...arr]);
  }

  // walidacje per tab (proste)
  function validateTab(tabId) {
    switch (tabId) {
      case "opis":
        if (!opis.nazwa || opis.nazwa.trim() === "") {
          alert("Wypełnij pole: Nazwa (wymagane).");
          return false;
        }
        return true;
      case "zdjecia":
        if (!files || files.length === 0) {
          alert("Dodaj co najmniej jedno zdjęcie.");
          return false;
        }
        return true;
      case "lokalizacja":
        if (!lokalizacja.adres || lokalizacja.adres.trim() === "") {
          alert("Wypełnij pole: Adres (wymagane).");
          return false;
        }
        return true;
      case "szczegoly":
        if (!isPositiveNumber(szczegoly.rozmiar_m2)) {
          alert("Podaj poprawny Rozmiar w m2 (tylko liczby).");
          return false;
        }
        if (!isPositiveNumber(szczegoly.wielkosc_dzialki)) {
          alert("Podaj poprawną Wielkość działki (tylko liczby).");
          return false;
        }
        if (!isPositiveNumber(szczegoly.pokoje)) {
          alert("Podaj poprawną liczbę Pokoi (tylko liczby).");
          return false;
        }
        if (!isPositiveInteger(szczegoly.rok_budowy)) {
          alert("Podaj poprawny Rok budowy.");
          return false;
        }
        return true;
      default:
        return true;
    }
  }

  function isPositiveNumber(v) {
    if (v === null || v === undefined) return false;
    const n = Number(String(v).replace(",", "."));
    return !Number.isNaN(n) && n >= 0;
  }
  function isPositiveInteger(v) {
    const n = Number(v);
    return Number.isInteger(n) && n > 0;
  }

  // przejscie dalej
  function next() {
    // waliduj aktualna zakladke
    if (!validateTab(active)) return;

    const idx = TABS.findIndex((t) => t.id === active);
    if (idx < TABS.length - 1) {
      setActive(TABS[idx + 1].id);
      // przewin na górę formularza (opcjonalnie)
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function back() {
    const idx = TABS.findIndex((t) => t.id === active);
    if (idx > 0) setActive(TABS[idx - 1].id);
  }

  // funkcje do zarządzania zdjęciami (przekazane do TabZdjecia)
  const dropRef = useRef();
  function onDropFiles(e) {
    e.preventDefault();
    if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
    if (dropRef.current) dropRef.current.classList.remove("dragover");
  }
  function onDragOver(e) {
    e.preventDefault();
    if (dropRef.current) dropRef.current.classList.add("dragover");
  }
  function onDragLeave() {
    if (dropRef.current) dropRef.current.classList.remove("dragover");
  }
  function onFileInputChange(e) {
    addFiles(e.target.files);
    e.target.value = null;
  }
  function toggleCover(id) {
    setFiles((s) => s.map((f) => ({ ...f, isCover: f.id === id })));
  }
  function removeFile(id) {
    setFiles((s) => s.filter((f) => f.id !== id));
  }
  // reorder
  const dragItem = useRef();
  function onDragStartThumb(e, idx) {
    dragItem.current = idx;
    e.dataTransfer.effectAllowed = "move";
  }
  function onDragOverThumb(e, idx) {
    e.preventDefault();
    const from = dragItem.current;
    if (from === undefined || from === idx) return;
    setFiles((list) => {
      const copy = [...list];
      const item = copy.splice(from, 1)[0];
      copy.splice(idx, 0, item);
      dragItem.current = idx;
      return copy;
    });
  }

  // WYSYŁANIE DO BACKENDU
  async function submitAll() {
    // jeszcze raz waliduj ostatnie pola
    if (!validateTab("szczegoly")) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      
      // Dodaj dane jako JSON string
      formData.append('opis', JSON.stringify(opis));
      formData.append('lokalizacja', JSON.stringify(lokalizacja));
      formData.append('szczegoly', JSON.stringify(szczegoly));
      
      // Dodaj pliki
      files.forEach(file => {
        formData.append('files', file.file);
      });

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        body: formData,
        // headers nie są potrzebne dla FormData - browser ustawi boundary automatycznie
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Błąd HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      setSubmitSuccess(true);
      alert("Nieruchomość została pomyślnie zgłoszona!");

      // Opcjonalnie: reset formularza po sukcesie
      // resetForm();

    } catch (error) {
      console.error("Błąd podczas wysyłania:", error);
      setSubmitError(error.message);
      resetForm();
      alert(`Wystąpił błąd: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Funkcja do resetowania formularza (opcjonalnie)
  function resetForm() {
    setOpis({
      nazwa: "",
      opis: "",
      cena: "",
      poCenie: "",
      przedCena: "",
      podatek: "",
      oplata: "",
      kategoria: "",
      wystawioneNa: "",
      status: "",
    });
    setFiles([]);
    setLokalizacja({
      adres: "",
      wojewodztwo: "",
      miasto: "",
      powiat: "",
      kod: "",
      kraj: "Polska",
      lat: "",
      lon: "",
      streetViewAngle: "",
    });
    setSzczegoly({
      rozmiar_m2: "",
      wielkosc_dzialki: "",
      pokoje: "",
      sypialnie: "",
      id_nieruchomosci: "",
      rok_budowy: "",
      garaz: "",
      wielkosc_garazu: "",
      dostepna_od: "",
      piwnica: "",
      konstrukcja_zew: "",
      material_elewacji: "",
      dach: "",
      typ_konstrukcji: "",
      liczba_pieter: "",
      uwagi: "",
      klasa_energetyczna: "",
      wskaznik_energetyczny: "",
    });
    setActive("opis");
    idRef.current = 1;
  }

  return (
    <div className="page">
      <div className="card">
        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-trigger ${active === t.id ? "active" : ""}`}
              onClick={(e) => {
                if (tabClickAllowed) setActive(t.id);
                else {
                  e.preventDefault();
                }
              }}
              aria-selected={active === t.id}
              role="tab"
              id={`tab-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-panel">
          {active === "opis" && (
            <TabOpis value={opis} setValue={setOpis} onNext={next} />
          )}
          {active === "zdjecia" && (
            <TabZdjecia
              files={files}
              dropRef={dropRef}
              onDropFiles={onDropFiles}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onFileInputChange={onFileInputChange}
              toggleCover={toggleCover}
              removeFile={removeFile}
              onDragStartThumb={onDragStartThumb}
              onDragOverThumb={onDragOverThumb}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "lokalizacja" && (
            <TabLokalizacja
              value={lokalizacja}
              setValue={setLokalizacja}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "szczegoly" && (
            <TabSzczegoly
              value={szczegoly}
              setValue={setSzczegoly}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "zglos" && (
            <TabZglos
              all={{ opis, files, lokalizacja, szczegoly }}
              onBack={back}
              onSubmit={submitAll}
              isSubmitting={isSubmitting}
              submitError={submitError}
              submitSuccess={submitSuccess}
            />
          )}
        </div>

        <div className="actions">
          {/* globalny przycisk Zapisz — zostawiam jeśli chcesz */}
          {/* <button className="btn ghost">Zapisz roboczo</button> */}
        </div>
      </div>
    </div>
  );
}

/* ======================
   Komponenty zakładek
   ====================== */

function TabOpis({ value, setValue, onNext }) {
  const handle = (k) => (e) => setValue((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="tab-content">
      <h3 className="section-title">Opis obiektu</h3>

      <label className="field">
        <div className="field-label">*Nazwa (wymagane)</div>
        <input className="input" required value={value.nazwa} onChange={handle("nazwa")} />
      </label>

      <label className="field">
        <div className="field-label">Opis</div>
        <textarea rows="6" value={value.opis} onChange={handle("opis")} />
      </label>

      <h4 className="sub-title">Cena nieruchomości</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">Cena w PLN (tylko cyfry)</div>
          <input
           className="input"
            inputMode="numeric"
            pattern="\d*"
            value={value.cena}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "");
              setValue((s) => ({ ...s, cena: v }));
            }}
            placeholder="np. 500000"
          />
        </label>

        <label className="field">
          <div className="field-label">Po cenie (np. "miesięcznie")</div>
          <input  className="input" value={value.poCenie} onChange={handle("poCenie")} />
        </label>

        <label className="field">
          <div className="field-label">Przed ceną (np. "od")</div>
          <input  className="input" value={value.przedCena} onChange={handle("przedCena")} />
        </label>

        <label className="field">
          <div className="field-label">Roczna stawka podatku (opcjonalnie)</div>
          <input  className="input" value={value.podatek} onChange={handle("podatek")} />
        </label>

        <label className="field">
          <div className="field-label">Opłata Stowarzyszenia (opcjonalnie)</div>
          <input  className="input" value={value.oplata} onChange={handle("oplata")} />
        </label>
      </div>

      <h4 className="sub-title">Wybierz kategorię</h4>
      <div className="grid-3">
        <label className="field">
          <div className="field-label">Kategoria</div>
          <select value={value.kategoria} onChange={handle("kategoria")}>
            <option value="">-- wybierz --</option>
            <option value="mieszkanie">Mieszkanie</option>
            <option value="dom">Dom</option>
            <option value="dzialka">Działka</option>
            <option value="komercyjne">Komercyjne</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Wystawione na</div>
          <input  className="input" value={value.wystawioneNa} onChange={handle("wystawioneNa")} />
        </label>

        <label className="field">
          <div className="field-label">Status nieruchomości</div>
          <select value={value.status} onChange={handle("status")}>
            <option value="">-- wybierz --</option>
            <option value="na_sprzedaz">Na sprzedaż</option>
            <option value="do_wynajecia">Do wynajęcia</option>
            <option value="sprzedane">Sprzedane</option>
          </select>
        </label>
      </div>

      <div className="nav-row">
        <div />
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
}

function TabZdjecia({
  files,
  dropRef,
  onDropFiles,
  onDragOver,
  onDragLeave,
  onFileInputChange,
  toggleCover,
  removeFile,
  onDragStartThumb,
  onDragOverThumb,
  onNext,
  onBack,
}) {
  return (
    <div className="tab-content">
      <h3 className="section-title">Prześlij zdjęcie</h3>

      <div
        ref={dropRef}
        className="dropzone"
        onDrop={onDropFiles}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <p className="muted">
          Przeciągnij i upuść obrazy lub <strong>Prześlij zdjęcia</strong>
        </p>
        <p className="muted small">
          * Do rzeczywistego przesłania wymagane jest co najmniej jedno zdjęcie.
          Minimalny rozmiar: 500 × 500 pikseli.
        </p>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,video/*"
          onChange={onFileInputChange}
        />
      </div>

      <div className="notes">
        <ol>
          <li>Kliknij dwukrotnie na obrazek, aby oznaczyć go jako zdjęcie tytułowe.</li>
          <li>Zmieniaj kolejność zdjęć, przeciągając je.</li>
          <li>Obsługiwane są również pliki PDF i video (podgląd może być ograniczony).</li>
        </ol>
      </div>

      <div className="thumbs">
        {files.length === 0 ? (
          <div className="empty">Nie wybrano pliku</div>
        ) : (
          files.map((f, idx) => (
            <div
              key={f.id}
              className={`thumb ${f.isCover ? "cover" : ""}`}
              draggable
              onDragStart={(e) => onDragStartThumb(e, idx)}
              onDragOver={(e) => onDragOverThumb(e, idx)}
            >
              <div
                className="thumb-inner"
                onDoubleClick={() => toggleCover(f.id)}
                title="Dwuklik — ustaw jako zdjęcie tytułowe"
              >
                {f.src ? <img src={f.src} alt={f.file.name} /> : <div className="file-icon">{f.file.type || "plik"}</div>}
              </div>

              <div className="thumb-meta">
                <div className="name">{f.file.name}</div>
                <div className="thumb-actions">
                  <button onClick={() => removeFile(f.id)} className="small-btn">
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="media-links grid-2">
        <label className="field">
          <div className="field-label">Selekcja wideo (Vimeo)</div>
          <input  className="input" placeholder="Wklej link do wideo" />
        </label>
        <label className="field">
          <div className="field-label">Wirtualna Wycieczka</div>
          <input  className="input" placeholder="Wklej link do wirtualnej wycieczki" />
        </label>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack}>
            Wstecz
          </button>
        </div>
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
}

function TabLokalizacja({ value, setValue, onNext, onBack }) {
  const h = (k) => (e) => setValue((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="tab-content">
      <h3 className="section-title">Lokalizacja nieruchomości</h3>

      <label className="field">
        <div className="field-label">*Adres</div>
        <input  className="input" value={value.adres} onChange={h("adres")} placeholder="Wprowadź adres" />
      </label>

      <div className="grid-3">
        <label className="field">
          <div className="field-label">Województwo</div>
          <input  className="input" value={value.wojewodztwo} onChange={h("wojewodztwo")} />
        </label>

        <label className="field">
          <div className="field-label">Miasto</div>
          <input  className="input" value={value.miasto} onChange={h("miasto")} />
        </label>

        <label className="field">
          <div className="field-label">Powiat (opcjonalnie)</div>
          <input  className="input" value={value.powiat} onChange={h("powiat")} />
        </label>
      </div>

      <div className="grid-3">
        <label className="field">
          <div className="field-label">Kod pocztowy</div>
          <input  className="input" value={value.kod} onChange={h("kod")} />
        </label>

        <label className="field">
          <div className="field-label">Kraj</div>
          <input  className="input" value={value.kraj} onChange={h("kraj")} />
        </label>

        <div className="field">
          <div className="field-label">Mapa</div>
          <div className="map-placeholder">Leaflet | © OpenStreetMap contributors</div>
        </div>
      </div>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Szerokość geograficzna</div>
          <input  className="input" value={value.lat} onChange={h("lat")} placeholder="np. 50.06143" />
        </label>
        <label className="field">
          <div className="field-label">Długość geograficzna</div>
          <input  className="input" value={value.lon} onChange={h("lon")} placeholder="np. 19.93658" />
        </label>
      </div>

      <label className="field">
        <div className="field-label">
          Google Street View - kąt widzenia kamery (0–360) (opcjonalnie)
        </div>
        <input  className="input" value={value.streetViewAngle} onChange={h("streetViewAngle")} />
      </label>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack}>
            Wstecz
          </button>
        </div>
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
}

function TabSzczegoly({ value, setValue, onNext, onBack }) {
  const h = (k) => (e) => {
    // dla pól liczbowych filtrowanie
    const numericOnly = [
      "rozmiar_m2",
      "wielkosc_dzialki",
      "pokoje",
      "sypialnie",
      "rok_budowy",
      "liczba_pieter",
      "wskaznik_energetyczny",
    ];
    if (numericOnly.includes(k)) {
      const v = e.target.value.replace(/[^\d]/g, "");
      setValue((s) => ({ ...s, [k]: v }));
    } else {
      setValue((s) => ({ ...s, [k]: e.target.value }));
    }
  };

  return (
    <div className="tab-content">
      <h3 className="section-title">Szczegóły nieruchomości</h3>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Rozmiar w m² *(tylko liczby)</div>
          <input  className="input" value={value.rozmiar_m2} onChange={h("rozmiar_m2")} />
        </label>

        <label className="field">
          <div className="field-label">Wielkość działki *(tylko liczby)</div>
          <input  className="input" value={value.wielkosc_dzialki} onChange={h("wielkosc_dzialki")} />
        </label>

        <label className="field">
          <div className="field-label">Pokoje *(tylko liczby)</div>
          <input  className="input" value={value.pokoje} onChange={h("pokoje")} />
        </label>

        <label className="field">
          <div className="field-label">Sypialnie (opcjonalnie)</div>
          <input  className="input" value={value.sypialnie} onChange={h("sypialnie")} />
        </label>
      </div>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">ID nieruchomości (opcjonalnie)</div>
          <input  className="input" value={value.id_nieruchomosci} onChange={h("id_nieruchomosci")} />
        </label>

        <label className="field">
          <div className="field-label">Rok budowy (*liczba)</div>
          <input  className="input" value={value.rok_budowy} onChange={h("rok_budowy")} />
        </label>

        <label className="field">
          <div className="field-label">Garaż (opcjonalnie)</div>
          <input  className="input" value={value.garaz} onChange={h("garaz")} />
        </label>

        <label className="field">
          <div className="field-label">Wielkość garażu (opcjonalnie)</div>
          <input  className="input" value={value.wielkosc_garazu} onChange={h("wielkosc_garazu")} />
        </label>
      </div>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Nieruchomość dostępna od</div>
          <input  className="input" type="date" value={value.dostepna_od} onChange={h("dostepna_od")} />
        </label>

        <label className="field">
          <div className="field-label">Piwnica (opcjonalnie)</div>
          <input  className="input" value={value.piwnica} onChange={h("piwnica")} />
        </label>
      </div>

      <label className="field">
        <div className="field-label">Konstrukcja zewnętrzna (opcjonalnie)</div>
        <input  className="input" value={value.konstrukcja_zew} onChange={h("konstrukcja_zew")} />
      </label>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Materiał elewacji (opcjonalnie)</div>
          <input  className="input" value={value.material_elewacji} onChange={h("material_elewacji")} />
        </label>

        <label className="field">
          <div className="field-label">Dach (opcjonalnie)</div>
          <input  className="input" value={value.dach} onChange={h("dach")} />
        </label>
      </div>

      <div className="grid-2">
        <label className="field">
          <div className="field-label">Typ konstrukcji (opcjonalnie)</div>
          <input  className="input" value={value.typ_konstrukcji} onChange={h("typ_konstrukcji")} />
        </label>

        <label className="field">
          <div className="field-label">Liczba pięter (opcjonalnie)</div>
          <input  className="input" value={value.liczba_pieter} onChange={h("liczba_pieter")} />
        </label>
      </div>

      <label className="field">
        <div className="field-label">
          Uwagi właściciela / pełnomocnika (dla handlowca, nie są widoczne w ogłoszeniu)
        </div>
        <textarea rows="3" value={value.uwagi} onChange={h("uwagi")} />
      </label>

      <h4 className="sub-title">Klasa energetyczna</h4>
      <div className="grid-2">
        <label className="field">
          <div className="field-label">Klasa energetyczna (opcjonalnie)</div>
          <select value={value.klasa_energetyczna} onChange={h("klasa_energetyczna")}>
            <option value="">-- wybierz --</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
          </select>
        </label>

        <label className="field">
          <div className="field-label">Wskaźnik energetyczny (kWh/m²/rok)</div>
          <input value={value.wskaznik_energetyczny} onChange={h("wskaznik_energetyczny")} />
        </label>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack}>
            Wstecz
          </button>
        </div>
        <div>
          <button className="btn" onClick={onNext}>
            Dalej
          </button>
        </div>
      </div>
    </div>
  );
}

function TabZglos({ all, onBack, onSubmit, isSubmitting, submitError, submitSuccess }) {
  const { opis, files, lokalizacja, szczegoly } = all;

  return (
    <div className="tab-content">
      <h3 className="section-title">Podsumowanie</h3>

      {submitError && (
        <div className="error-message">
          <strong>Błąd:</strong> {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="success-message">
          <strong>Sukces!</strong> Nieruchomość została pomyślnie zgłoszona.
        </div>
      )}

      <div className="summary">
        <h4>Opis</h4>
        <p><strong>Nazwa:</strong> {opis.nazwa || "-"}</p>
        <p><strong>Krótki opis:</strong> {opis.opis || "-"}</p>
        <p><strong>Cena:</strong> {opis.przedCena || ""} {opis.cena || "-"} {opis.poCenie || ""}</p>

        <h4>Zdjęcia</h4>
        <p>{files.length} plik(ów).</p>

        <h4>Lokalizacja</h4>
        <p>{lokalizacja.adres || "-"}, {lokalizacja.miasto || ""} {lokalizacja.wojewodztwo || ""}</p>

        <h4>Szczegóły</h4>
        <p><strong>Rozmiar m²:</strong> {szczegoly.rozmiar_m2 || "-"}</p>
        <p><strong>Pokoje:</strong> {szczegoly.pokoje || "-"}</p>
        <p><strong>Rok budowy:</strong> {szczegoly.rok_budowy || "-"}</p>
      </div>

      <div className="nav-row">
        <div>
          <button className="btn ghost" onClick={onBack} disabled={isSubmitting}>
            Wstecz
          </button>
        </div>
        <div>
          <button 
            className="btn" 
            onClick={onSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Wysyłanie..." : "Zgłoś nieruchomość"}
          </button>
        </div>
      </div>
    </div>
  );
}