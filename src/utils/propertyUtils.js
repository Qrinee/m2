export const getStatusText = (status) => {
  switch (status) {
    case 'na_sprzedaz': return 'Sprzedaż';
    case 'do_wynajecia': return 'Wynajem';
    case 'sprzedane': return 'Sprzedane';
    case 'aktywne': return 'Aktywne';
    default: return status || 'Na sprzedaż';
  }
};

export const getPriceFromData = (property) => {
  // Priorytet: cenaDetale.calkowita -> cenaNum -> parsowanie z cena string
  if (property?.cenaDetale?.calkowita) {
    return property.cenaDetale.calkowita;
  }
  if (property?.cenaNum) {
    return property.cenaNum;
  }
  if (property?.cena) {
    return parsePrice(property.cena);
  }
  return 0;
};

export const formatPriceForDisplay = (property) => {
  const price = getPriceFromData(property);
  return formatPLN(price);
};

export const getCategoryText = (kategoria) => {
  switch (kategoria) {
    case 'dom': return 'Dom';
    case 'mieszkanie': return 'Mieszkanie';
    case 'dzialka': return 'Działka';
    case 'lokal': return 'Lokal';
    default: return kategoria || 'Nieruchomość';
  }
};

export const getGarageText = (garaz) => {
  switch (garaz) {
    case 'tak': return 'Tak';
    case 'nie': return 'Nie';
    case 'brak': return 'Brak';
    default: return garaz || 'Nie';
  }
};

export const parsePrice = (priceString) => {
  if (!priceString) return 0;
  // Dodajemy dodatkowe zabezpieczenie przed nieprawidłowymi danymi
  try {
    const cleaned = priceString.toString().replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(cleaned) || 0;
  } catch (error) {
    console.error('Błąd parsowania ceny:', priceString, error);
    return 0;
  }
};

export const formatPLN = (value) => {
  // Dodajemy zabezpieczenia przed undefined/null
  if (value == null) {
    return '0 PLN';
  }

  if (typeof value === 'string') {
    if (value.includes('zł') || value.includes('PLN')) {
      return value;
    }
    // Parsujemy tylko jeśli string nie jest już sformatowany
    value = parsePrice(value);
  }

  // Dodatkowe zabezpieczenie przed NaN
  if (isNaN(value)) {
    return '0 PLN';
  }

  try {
    return value.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    });
  } catch (error) {
    console.error('Błąd formatowania PLN:', value, error);
    return `${value} PLN`;
  }
};


// Dodaj te funkcje do pliku ../utils/propertyUtils.js

export const getMarketText = (market) => {
  const marketMap = {
    'pierwotny': 'Rynek pierwotny',
    'wtorny': 'Rynek wtórny'
  };
  return marketMap[market] || market;
};

export const getHeatingText = (heating) => {
  const heatingMap = {
    'gazowe': 'Gazowe',
    'elektryczne': 'Elektryczne',
    'miejska': 'Miejska',
    'olejowe': 'Olejowe',
    'pompa_ciepla': 'Pompa ciepła',
    'kominek': 'Kominek'
  };
  return heatingMap[heating] || heating;
};

export const getKitchenTypeText = (kitchen) => {
  const kitchenMap = {
    'osobna': 'Osobna',
    'otwarta': 'Otwarta',
    'brak': 'Brak'
  };
  return kitchenMap[kitchen] || kitchen;
};

export const getBuildingConditionText = (condition) => {
  const conditionMap = {
    'do_remontu': 'Do remontu',
    'stan_developer': 'Stan deweloperski',
    'bardzo_dobry': 'Bardzo dobry',
    'dobry': 'Dobry',
    'do_odswiezenia': 'Do odświeżenia'
  };
  return conditionMap[condition] || condition;
};

export const getOwnershipTypeText = (ownership) => {
  const ownershipMap = {
    'wlasnosc': 'Własność',
    'spoldzielcze_wlasnosciowe': 'Spółdzielcze własnościowe',
    'uzytkowanie_wieczyste': 'Użytkowanie wieczyste',
    'inne': 'Inne'
  };
  return ownershipMap[ownership] || ownership;
};