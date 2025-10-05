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
import ZglosNieruchomosc from './views/ZglosNieruchomosc.jsx'
import AdminPanel from './components/AdminPanel/AdminPanel.jsx'
import Dashboard from './components/AdminPanel/sections/Dashboard.jsx'
import Forms from './components/AdminPanel/sections/Forms.jsx'
import Properties from './components/AdminPanel/sections/Properties.jsx'
import FAQ from './components/AdminPanel/sections/FAQ.jsx'
import News from './components/AdminPanel/sections/News.jsx'
import Profil from './views/Profil.jsx'
import Users from './views/Users';
import MojProfil from './views/MojProfil.jsx'
import NaszZespol from './views/NaszZespol.jsx'
import Wpis from './views/Wpis.jsx'
import PolitykaPrywatnosci from './views/PolitykaPrywatnosci.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ogloszenia" element={<Ogloszenia />} />
         <Route path="/czym-sa-raty-notarialne" element={<CzymSaRatyNotarialne />} />
        <Route path="/raty-notarialne" element={<Ogloszenia />} />
        <Route path='/oblicz-rate' element={<ObliczRate />} />
        <Route path='/wpis/:id' element={<Wpis />} />
        <Route path='/privacy-policy' element={<PolitykaPrywatnosci/>} />
        <Route path='/kontakt' element={<Kontakt />} />
        <Route path='/nasz-zespol' element={<NaszZespol />} />
        <Route path='/ulubione' element={<Ulubione />} />
        <Route path='/ogloszenie/:id' element={<WidokOgloszenia />} />
        <Route path='/aktualnosci' element={<Aktualnosci />} />
           <Route path="/zglos-nieruchomosc" element={<ZglosNieruchomosc />} />
        <Route path="/dlaczego-warto" element={<DlaczegoWarto />} />
        <Route path="/zostan-partnerem-pracownikiem" element={<ZostanPartneremLubPracownikiem />} />
         <Route path="/o-nas" element={<ONas />} />
            <Route path="/estate_agent/:id" element={<Profil />} />
           <Route path='/my-profile' element={<MojProfil />} />
         <Route path="/admin" element={<AdminPanel />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="forms" element={<Forms />} />
            <Route path="news" element={<News />} />
            <Route path="properties" element={<Properties />} />
            <Route path="faq" element={<FAQ />} />
          
          </Route>
      </Routes>
    </BrowserRouter>

  </StrictMode>,
)
