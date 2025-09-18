import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ogloszenia from './views/Ogloszenia.jsx'
import ONas from './views/ONas';
import ZostanPartneremLubPracownikiem from './views/ZostanPartneremLubPracownikiem.jsx'
import CzymSaRatyNotarialne from './views/CzymSaRatyNotarialne';
import DlaczegoWarto from './views/DlaczegoWarto.jsx'
import ObliczRate from './views/ObliczRate.jsx'
import Aktualnosci from './views/Aktualnosci.jsx'
import Kontakt from './views/Kontakt.jsx'
import Ulubione from './views/Ulubione.jsx'
import WidokOgloszenia from './views/WidokOgloszenia.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ogloszenia" element={<Ogloszenia />} />
         <Route path="/czym-sa-raty-notarialne" element={<CzymSaRatyNotarialne />} />
        <Route path="/raty-notarialne" element={<Ogloszenia />} />
        <Route path='/oblicz-rate' element={<ObliczRate />} />
        <Route path='/kontakt' element={<Kontakt />} />
        <Route path='/ulubione' element={<Ulubione />} />
        <Route path='/ogloszenie' element={<WidokOgloszenia />} />
        <Route path='/aktualnosci' element={<Aktualnosci />} />
           <Route path="/zglos-nieruchomosc" element={<Ogloszenia />} />
        <Route path="/dlaczego-warto" element={<DlaczegoWarto />} />
        <Route path="/zostan-partnerem-pracownikiem" element={<ZostanPartneremLubPracownikiem />} />
         <Route path="/o-nas" element={<ONas />} />
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
