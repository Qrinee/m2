// src/components/AdminPanel/sections/AddPropertyModal.js
import React, { useState, useRef } from 'react';

const AddPropertyModal = ({ onClose, onPropertyAdded }) => {
  const [newProperty, setNewProperty] = useState({
    tytul: '',
    opis: '',
    cena: { 
      calkowita: '', 
      zaM2: '',
      waluta: 'PLN' 
    },
    rodzajOferty: { 
      typ: 'sprzedaz', 
      rynek: 'pierwotny' 
    },
    typNieruchomosci: 'mieszkanie',
    lokalizacja: {
      wojewodztwo: '',
      powiat: '',
      gmina: '',
      miasto: '',
      dzielnica: '',
      ulica: '',
      kodPocztowy: '',
      lat: '',
      lon: ''
    },
    powierzchnia: { 
      calkowita: '',
      uzytkowa: '',
      dodatkowe: {
        balkon: '',
        taras: '',
        piwnica: '',
        komorka: '',
        ogrod: '',
        garaz: ''
      }
    },
    pomieszczenia: { 
      pokoje: '', 
      lazienki: '',
      kuchnia: 'osobna',
      garderoby: '',
      gabinety: ''
    },
    pietro: {
      pietroNieruchomosci: '',
      liczbaPieter: '',
      winda: false
    },
    budynek: {
      rokBudowy: '',
      stanTechniczny: 'dobry',
      material: '',
      stanWykonczenia: ''
    },
    media: {
      ogrzewanie: '',
      cieplaWoda: '',
      kanalizacja: false,
      prad: false,
      gaz: false,
      klimatyzacja: false,
      wentylacja: '',
      alarm: false,
      domofon: false,
      internet: false
    },
    wyposazenie: {
      meble: false,
      agd: [],
      okna: '',
      podlogi: '',
      rolety: false,
      systemAlarmowy: false,
      monitoring: false
    },
    udogodnienia: {
      balkon: false,
      taras: false,
      ogrod: false,
      garaz: false,
      parking: false,
      piwnica: false,
      komorka: false,
      basen: false,
      silownia: false,
      monitoringOsiedla: false,
      ochrona: false
    },
    informacjePrawne: {
      formaWlasnosci: 'wlasnosc',
      obciazenia: '',
      hipoteka: false,
      charakterystykaEnergetyczna: {
        klasa: '',
        wskaznik: ''
      },
      pozwolenieNaBudowe: false,
      ksiegWieczysty: ''
    },
    dodatkoweInformacje: '',
    warunki: '',
    status: 'aktywne'
  });

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (path, value) => {
    setNewProperty(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nested = keys.reduce((obj, key) => obj[key] || {}, prev);
      nested[lastKey] = value;
      return { ...prev };
    });
  };

  const handleCheckboxChange = (path, checked) => {
    setNewProperty(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nested = keys.reduce((obj, key) => obj[key] || {}, prev);
      nested[lastKey] = checked;
      return { ...prev };
    });
  };

  const handleArrayChange = (path, value, checked) => {
    setNewProperty(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nested = keys.reduce((obj, key) => obj[key] || {}, prev);
      
      if (checked) {
        nested[lastKey] = [...(nested[lastKey] || []), value];
      } else {
        nested[lastKey] = (nested[lastKey] || []).filter(item => item !== value);
      }
      
      return { ...prev };
    });
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (fileList) => {
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const setCoverImage = (index) => {
    setFiles(prev => prev.map((file, i) => ({
      ...file,
      isCover: i === index
    })));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Add property data
    formData.append('data', JSON.stringify(newProperty));
    
    // Add files
    files.forEach((file, index) => {
      formData.append('files', file);
      if (file.isCover) {
        formData.append('coverIndex', index.toString());
      }
    });

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND + '/api/properties', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          onClose();
          onPropertyAdded();
        }
      } 
    } catch (error) {
    }
  };

  const agdOptions = ['lodowka', 'pralka', 'zmywarka', 'kuchenka', 'piekarnik', 'mikrofalowka'];

  return (
    <div className="adm-prop-modal">
      <div className="adm-prop-modal__content">
        <div className="adm-prop-modal__header">
          <h3>Dodaj nową nieruchomość</h3>
          <button 
            className="adm-prop-modal__close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleAddProperty} className="adm-prop-form">
          <div className="adm-prop-form__sections">
            
            {/* Sekcja 1: Podstawowe informacje */}
            <div className="adm-prop-form__section">
              <h4>Podstawowe informacje</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Tytuł ogłoszenia *</label>
                  <input
                    type="text"
                    value={newProperty.tytul}
                    onChange={(e) => handleInputChange('tytul', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Opis *</label>
                  <textarea
                    value={newProperty.opis}
                    onChange={(e) => handleInputChange('opis', e.target.value)}
                    required
                    rows="3"
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Cena całkowita (PLN) *</label>
                  <input
                    type="number"
                    value={newProperty.cena.calkowita}
                    onChange={(e) => handleInputChange('cena.calkowita', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Typ oferty *</label>
                  <select
                    value={newProperty.rodzajOferty.typ}
                    onChange={(e) => handleInputChange('rodzajOferty.typ', e.target.value)}
                  >
                    <option value="sprzedaz">Sprzedaż</option>
                    <option value="wynajem">Wynajem</option>
                  </select>
                </div>

                <div className="adm-prop-form__group">
                  <label>Rynek *</label>
                  <select
                    value={newProperty.rodzajOferty.rynek}
                    onChange={(e) => handleInputChange('rodzajOferty.rynek', e.target.value)}
                  >
                    <option value="pierwotny">Pierwotny</option>
                    <option value="wtorny">Wtórny</option>
                  </select>
                </div>

                <div className="adm-prop-form__group">
                  <label>Typ nieruchomości *</label>
                  <select
                    value={newProperty.typNieruchomosci}
                    onChange={(e) => handleInputChange('typNieruchomosci', e.target.value)}
                  >
                    <option value="mieszkanie">Mieszkanie</option>
                    <option value="dom">Dom</option>
                    <option value="lokal_uzytkowy">Lokal użytkowy</option>
                    <option value="dzialka">Działka</option>
                    <option value="hala_magazyn">Hala/Magazyn</option>
                    <option value="biuro">Biuro</option>
                    <option value="komercyjne">Komercyjne</option>
                    <option value="inne">Inne</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sekcja 2: Lokalizacja */}
            <div className="adm-prop-form__section">
              <h4>Lokalizacja</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Województwo *</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.wojewodztwo}
                    onChange={(e) => handleInputChange('lokalizacja.wojewodztwo', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Miasto *</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.miasto}
                    onChange={(e) => handleInputChange('lokalizacja.miasto', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Powiat</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.powiat}
                    onChange={(e) => handleInputChange('lokalizacja.powiat', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Gmina</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.gmina}
                    onChange={(e) => handleInputChange('lokalizacja.gmina', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Dzielnica</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.dzielnica}
                    onChange={(e) => handleInputChange('lokalizacja.dzielnica', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Ulica</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.ulica}
                    onChange={(e) => handleInputChange('lokalizacja.ulica', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Kod pocztowy</label>
                  <input
                    type="text"
                    value={newProperty.lokalizacja.kodPocztowy}
                    onChange={(e) => handleInputChange('lokalizacja.kodPocztowy', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sekcja 3: Powierzchnia i pomieszczenia */}
            <div className="adm-prop-form__section">
              <h4>Powierzchnia i pomieszczenia</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Powierzchnia całkowita (m²) *</label>
                  <input
                    type="number"
                    value={newProperty.powierzchnia.calkowita}
                    onChange={(e) => handleInputChange('powierzchnia.calkowita', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Powierzchnia użytkowa (m²)</label>
                  <input
                    type="number"
                    value={newProperty.powierzchnia.uzytkowa}
                    onChange={(e) => handleInputChange('powierzchnia.uzytkowa', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Liczba pokoi *</label>
                  <input
                    type="number"
                    value={newProperty.pomieszczenia.pokoje}
                    onChange={(e) => handleInputChange('pomieszczenia.pokoje', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Liczba łazienek *</label>
                  <input
                    type="number"
                    value={newProperty.pomieszczenia.lazienki}
                    onChange={(e) => handleInputChange('pomieszczenia.lazienki', e.target.value)}
                    required
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Typ kuchni</label>
                  <select
                    value={newProperty.pomieszczenia.kuchnia}
                    onChange={(e) => handleInputChange('pomieszczenia.kuchnia', e.target.value)}
                  >
                    <option value="osobna">Osobna</option>
                    <option value="otwarta">Otwarta</option>
                    <option value="brak">Brak</option>
                  </select>
                </div>

                <div className="adm-prop-form__group">
                  <label>Liczba garderob</label>
                  <input
                    type="number"
                    value={newProperty.pomieszczenia.garderoby}
                    onChange={(e) => handleInputChange('pomieszczenia.garderoby', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sekcja 4: Budynek i piętro */}
            <div className="adm-prop-form__section">
              <h4>Budynek</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Piętro nieruchomości</label>
                  <input
                    type="number"
                    value={newProperty.pietro.pietroNieruchomosci}
                    onChange={(e) => handleInputChange('pietro.pietroNieruchomosci', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Liczba pięter w budynku</label>
                  <input
                    type="number"
                    value={newProperty.pietro.liczbaPieter}
                    onChange={(e) => handleInputChange('pietro.liczbaPieter', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Winda</label>
                  <input
                    type="checkbox"
                    checked={newProperty.pietro.winda}
                    onChange={(e) => handleCheckboxChange('pietro.winda', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Rok budowy</label>
                  <input
                    type="number"
                    value={newProperty.budynek.rokBudowy}
                    onChange={(e) => handleInputChange('budynek.rokBudowy', e.target.value)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Stan techniczny</label>
                  <select
                    value={newProperty.budynek.stanTechniczny}
                    onChange={(e) => handleInputChange('budynek.stanTechniczny', e.target.value)}
                  >
                    <option value="do_remontu">Do remontu</option>
                    <option value="stan_developer">Stan deweloperski</option>
                    <option value="bardzo_dobry">Bardzo dobry</option>
                    <option value="dobry">Dobry</option>
                    <option value="do_odswiezenia">Do odświeżenia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sekcja 5: Media */}
            <div className="adm-prop-form__section">
              <h4>Media i instalacje</h4>
              <div className="adm-prop-form__grid">
                {Object.keys(newProperty.media).map(medium => (
                  <div key={medium} className="adm-prop-form__group">
                    <label>
                      <input
                        type="checkbox"
                        checked={newProperty.media[medium]}
                        onChange={(e) => handleCheckboxChange(`media.${medium}`, e.target.checked)}
                      />
                      {medium.charAt(0).toUpperCase() + medium.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sekcja 6: Wyposażenie */}
            <div className="adm-prop-form__section">
              <h4>Wyposażenie</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Meble</label>
                  <input
                    type="checkbox"
                    checked={newProperty.wyposazenie.meble}
                    onChange={(e) => handleCheckboxChange('wyposazenie.meble', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Rolety</label>
                  <input
                    type="checkbox"
                    checked={newProperty.wyposazenie.rolety}
                    onChange={(e) => handleCheckboxChange('wyposazenie.rolety', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>System alarmowy</label>
                  <input
                    type="checkbox"
                    checked={newProperty.wyposazenie.systemAlarmowy}
                    onChange={(e) => handleCheckboxChange('wyposazenie.systemAlarmowy', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Monitoring</label>
                  <input
                    type="checkbox"
                    checked={newProperty.wyposazenie.monitoring}
                    onChange={(e) => handleCheckboxChange('wyposazenie.monitoring', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Sprzęt AGD</label>
                  <div className="checkbox-group">
                    {agdOptions.map(agd => (
                      <label key={agd} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={newProperty.wyposazenie.agd.includes(agd)}
                          onChange={(e) => handleArrayChange('wyposazenie.agd', agd, e.target.checked)}
                        />
                        {agd}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sekcja 7: Udogodnienia */}
            <div className="adm-prop-form__section">
              <h4>Udogodnienia</h4>
              <div className="adm-prop-form__grid">
                {Object.keys(newProperty.udogodnienia).map(udogodnienie => (
                  <div key={udogodnienie} className="adm-prop-form__group">
                    <label>
                      <input
                        type="checkbox"
                        checked={newProperty.udogodnienia[udogodnienie]}
                        onChange={(e) => handleCheckboxChange(`udogodnienia.${udogodnienie}`, e.target.checked)}
                      />
                      {udogodnienie.charAt(0).toUpperCase() + udogodnienie.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sekcja 8: Zdjęcia */}
            <div className="adm-prop-form__section">
              <h4>Zdjęcia nieruchomości</h4>
              
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />

              <div
                className={`adm-prop-form__dropzone ${isDragging ? 'adm-prop-form__dropzone--dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={triggerFileInput}
              >
                <p>Przeciągnij i upuść zdjęcia tutaj lub kliknij, aby wybrać</p>
                <small>Możesz dodać wiele zdjęć naraz</small>
              </div>

              {files.length > 0 && (
                <div className="adm-prop-form__preview">
                  <h5>Podgląd zdjęć ({files.length})</h5>
                  <div className="adm-prop-form__preview-grid">
                    {files.map((file, index) => (
                      <div key={index} className="adm-prop-form__preview-item">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Preview ${index + 1}`}
                          className={`adm-prop-form__preview-img ${file.isCover ? 'adm-prop-form__preview-img--cover' : ''}`}
                        />
                        <div className="adm-prop-form__preview-actions">
                          <button
                            type="button"
                            className="adm-prop-form__preview-btn--cover"
                            onClick={() => setCoverImage(index)}
                          >
                            {file.isCover ? 'Zdjęcie główne' : 'Ustaw jako główne'}
                          </button>
                          <button
                            type="button"
                            className="adm-prop-form__preview-btn--remove"
                            onClick={() => removeFile(index)}
                          >
                            Usuń
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sekcja 9: Informacje prawne */}
            <div className="adm-prop-form__section">
              <h4>Informacje prawne</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group">
                  <label>Forma własności</label>
                  <select
                    value={newProperty.informacjePrawne.formaWlasnosci}
                    onChange={(e) => handleInputChange('informacjePrawne.formaWlasnosci', e.target.value)}
                  >
                    <option value="wlasnosc">Własność</option>
                    <option value="spoldzielcze_wlasnosciowe">Spółdzielcze własnościowe</option>
                    <option value="uzytkowanie_wieczyste">Użytkowanie wieczyste</option>
                    <option value="inne">Inne</option>
                  </select>
                </div>

                <div className="adm-prop-form__group">
                  <label>Hipoteka</label>
                  <input
                    type="checkbox"
                    checked={newProperty.informacjePrawne.hipoteka}
                    onChange={(e) => handleCheckboxChange('informacjePrawne.hipoteka', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Pozwolenie na budowę</label>
                  <input
                    type="checkbox"
                    checked={newProperty.informacjePrawne.pozwolenieNaBudowe}
                    onChange={(e) => handleCheckboxChange('informacjePrawne.pozwolenieNaBudowe', e.target.checked)}
                  />
                </div>

                <div className="adm-prop-form__group">
                  <label>Klasa energetyczna</label>
                  <input
                    type="text"
                    value={newProperty.informacjePrawne.charakterystykaEnergetyczna.klasa}
                    onChange={(e) => handleInputChange('informacjePrawne.charakterystykaEnergetyczna.klasa', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sekcja 10: Dodatkowe informacje */}
            <div className="adm-prop-form__section">
              <h4>Dodatkowe informacje</h4>
              <div className="adm-prop-form__grid">
                <div className="adm-prop-form__group adm-prop-form__group--full">
                  <label>Dodatkowe informacje o otoczeniu</label>
                  <textarea
                    value={newProperty.dodatkoweInformacje}
                    onChange={(e) => handleInputChange('dodatkoweInformacje', e.target.value)}
                    rows="3"
                    placeholder="Opisz otoczenie, komunikację, szkoły, sklepy w okolicy..."
                  />
                </div>

                <div className="adm-prop-form__group adm-prop-form__group--full">
                  <label>Warunki sprzedaży/wynajmu</label>
                  <textarea
                    value={newProperty.warunki}
                    onChange={(e) => handleInputChange('warunki', e.target.value)}
                    rows="3"
                    placeholder="Warunki transakcji, możliwość negocjacji, dodatkowe opłaty..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="adm-prop-form__actions">
            <button 
              type="button" 
              className="adm-prop-form__btn--secondary"
              onClick={onClose}
            >
              Anuluj
            </button>
            <button 
              type="submit" 
              className="adm-prop-form__btn--primary"
            >
              Dodaj nieruchomość
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyModal;