// data.js
import parter from '../assets/konfigurator/d126-rzut-parteru.jpg'
import poddasze from '../assets/konfigurator/d126-rzut-poddasza.jpg'
export const floorPlans = {
  parter: {
    image: parter, // ścieżka do Twojego pliku PNG
    rooms: [
      { name: 'Salon', area: 36.7 },
      { name: 'Sypialnia', area: 12.8 },
      { name: 'Łazienka', area: 5.9 },
      { name: 'Toaleta', area: 2.0 },
      { name: 'Pomieszczenie gospodarcze', area: 2.5 },
      { name: 'Korytarz / Klatka schodowa', area: 11.4 },
      { name: 'Wiatrołap', area: 4.0 },
    ],
  },
  poddasze: {
    image: poddasze, // wstaw ścieżkę do poddasza
    rooms: [
      { name: 'Pokój 1', area: 15.0 },
      { name: 'Pokój 2', area: 12.0 },
      { name: 'Łazienka', area: 6.0 },
      { name: 'Korytarz', area: 5.0 },
    ],
  },
};
