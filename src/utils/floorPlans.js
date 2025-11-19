// data.js
import parterD126 from '../assets/konfigurator/d126-rzut-parteru.jpg'
import poddaszeD126 from '../assets/konfigurator/d126-rzut-poddasza.jpg'
import parterD70 from '../assets/rzuty/d70-rzut-parteru.jpg'
import poddaszeD70 from '../assets/rzuty/d70-rzut-antresoli.jpg'
import parterD115 from '../assets/rzuty/d115-rzut-parteru.jpg'
import poddaszeD115 from '../assets/rzuty/d115-rzut-antresoli.jpg'

export const floorPlans = {
  d126: {
    parter: {
      image: parterD126,
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
      image: poddaszeD126,
      rooms: [
        { name: 'Pokój 1', area: 15.0 },
        { name: 'Pokój 2', area: 12.0 },
        { name: 'Łazienka', area: 6.0 },
        { name: 'Korytarz', area: 5.0 },
      ],
    },
  },
  d70: {
    parter: {
      image: parterD70,
      rooms: [
        { name: 'Salon', area: 26.9 },
        { name: 'Sypialnia 1', area: 9.33 },
        { name: 'Sypialnia 2', area: 9.33 },
        { name: 'Łazienka', area: 4.40 },
        { name: 'Pomieszczenie gospodarcze', area: 2.82 },
        { name: 'Wiatrołap', area: 3.17 },
        { name: 'Korytarz', area: 4.48 },
      ],
    },
    poddasze: {
      image: poddaszeD70,
      rooms: [
        { name: 'Antresola', area: 10.46 },
      ],
    },
  },
  d115: {
    parter: {
      image: parterD115,
      rooms: [
        { name: 'Salon', area: 34.91 },
        { name: 'Pokój', area: 11.66 },
        { name: 'Pokój', area: 11.66 },
        { name: 'Sypialnia', area: 13.96 },
        { name: 'Łazienka', area: 5.09 },
        { name: 'Łazienka', area: 3.88 },
        { name: 'Pomieszczenie gospodarcze', area: 3.09},
        { name: 'Korytarz / Klatka schodowa', area: 10.30}
      ],
    },
    poddasze: {
      image: poddaszeD115,
      rooms: [
        { name: 'Antresola', area: 20.39 },
      ],
    },
  }
};

// Funkcja pomocnicza do pobierania planów dla danego domu
export const getFloorPlans = (houseId) => {
  return floorPlans[houseId] || floorPlans.d126; // domyślnie d126 jeśli nie znaleziono
};