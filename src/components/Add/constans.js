export const TABS = [
  { id: "podstawowe", label: "1. Podstawowe" },
  { id: "zdjecia", label: "2. Zdjęcia" },
  { id: "lokalizacja", label: "3. Lokalizacja" },
  { id: "szczegoly", label: "4. Szczegóły" },
  { id: "dodatkowe", label: "5. Dodatkowe" },
  { id: "podsumowanie", label: "6. Podsumowanie" },
];

export const INITIAL_FORM_DATA = {
  tytul: "",
  cena: { calkowita: 0, zaM2: 0, waluta: "PLN" }, // Zmiana: 0 zamiast pustego stringa
  rodzajOferty: { typ: "sprzedaz", rynek: "pierwotny" },
  typNieruchomosci: "mieszkanie",
  lokalizacja: {
    wojewodztwo: "", powiat: "", gmina: "", miasto: "", dzielnica: "", ulica: "",
    kodPocztowy: "", lat: "", lon: ""
  },
  powierzchnia: {
    calkowita: 0, uzytkowa: 0, // Zmiana: 0 zamiast pustego stringa
    dodatkowe: { balkon: 0, taras: 0, piwnica: 0, komorka: 0, ogrod: 0, garaz: 0 } // Zmiana: 0 zamiast pustego stringa
  },
  pomieszczenia: {
    pokoje: 0, lazienki: 0, kuchnia: "osobna", garderoby: 0, gabinety: 0 // Zmiana: 0 zamiast pustego stringa
  },
  pietro: {
    pietroNieruchomosci: 0, liczbaPieter: 0, winda: false // Zmiana: 0 zamiast pustego stringa
  },
  budynek: {
    rokBudowy: 0, stanTechniczny: "dobry", remonty: [], material: "", stanWykonczenia: "" // Zmiana: 0 zamiast pustego stringa
  },
  media: {
    ogrzewanie: "", cieplaWoda: "", kanalizacja: false, prad: false, gaz: false,
    klimatyzacja: false, wentylacja: "", alarm: false, domofon: false, internet: false
  },
  wyposazenie: {
    meble: false, agd: [], okna: "", podlogi: "", rolety: false,
    systemAlarmowy: false, monitoring: false
  },
  udogodnienia: {
    balkon: false, taras: false, ogrod: false, garaz: false, parking: false,
    piwnica: false, komorka: false, basen: false, silownia: false,
    monitoringOsiedla: false, ochrona: false
  },
  opis: "",
  dodatkoweInformacje: "",
  warunki: "",
  multimedia: {
    zdjecia: [], film: "", wirtualnySpacer: "", rzuty: ""
  },
  informacjePrawne: {
    formaWlasnosci: "wlasnosc", obciazenia: "", hipoteka: false,
    charakterystykaEnergetyczna: { klasa: "", wskaznik: "" },
    pozwolenieNaBudowe: false, ksiegWieczysty: ""
  },
  kontakt: {
    imie: "", nazwisko: "", telefon: "", email: "",
    biuroNieruchomosci: "", pozycja: ""
  },
  promocje: {
    wyróżnione: false, topOgloszenie: false, podbicia: 0, pakietReklamowy: "brak"
  },
  daty: {
    dataPublikacji: new Date().toISOString().split('T')[0],
    dataWaznosci: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dataAktualizacji: new Date().toISOString().split('T')[0],
    mozliwoscPrzedluzenia: true
  }
};