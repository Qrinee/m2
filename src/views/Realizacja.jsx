import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import realizacja11 from '../assets/pawilony/5/1.jpg';
import realizacja12 from '../assets/pawilony/5/2.jpg';
import realizacja13 from '../assets/pawilony/5/3.jpg'
import realizacja14 from '../assets/pawilony/5/4.jpg'
import realizacja15 from '../assets/pawilony/2/w1.jpeg'
import realizacja16 from '../assets/pawilony/2/w2.jpeg'
import realizacja17 from '../assets/pawilony/2/w3.jpeg'

import realizacja21 from '../assets/pawilony/3/1.png'
import realizacja22 from '../assets/pawilony/3/wst.jpeg'
import realizacja23 from '../assets/pawilony/3/wst1.jpeg'
import realizacja24 from '../assets/pawilony/3/wst2.jpeg'
import realizacja25 from '../assets/pawilony/3/wst3.jpeg'
import realizacja26 from '../assets/pawilony/3/wst4.jpeg'
import realizacja27 from '../assets/pawilony/3/wst5.jpeg'
import realizacja28 from '../assets/pawilony/3/ws.jpeg'

import realizacja31 from '../assets/projekt3/1.jpg'
import realizacja32 from '../assets/projekt3/2.jpg'
import realizacja33 from '../assets/projekt3/3.jpg'
import realizacja34 from '../assets/projekt3/4.jpg'
import { FaHashtag, FaCubes, FaBuilding, FaLayerGroup, FaPaintBrush, FaUser, FaMapMarkerAlt, FaClock, FaIndustry } from 'react-icons/fa';
import Gallery from '../components/Property/Gallery';
import ContactForm from '../components/ContactForm/ContactForm';

export default function Realizacja() {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Zaktualizowane dane dla różnych ID
    const realizacjeData = {
        1: {
            images: [realizacja28,realizacja13, realizacja12, realizacja11, realizacja14, realizacja15, realizacja16, realizacja17],
            title: "Dom modułowy w kilku opcjach o pow. 120 m²",
            date: "2024-03-15",
            content: "Poznaj nowy standard budownictwa modułowego.Prezentowane domy to przestronna, funkcjonalna i w pełni wyposażona konstrukcja o powierzchni około 120 m², zaprojektowana z myślą o komforcie, estetyce i wysokiej jakości wykończenia.                                                        Realizujemy również projekty na zamówienie indywidualne – dla klientów wymagających, poszukujących rozwiązań klasy premium, tworzonych w pełni pod ich potrzeby, styl życia i oczekiwania. Każdy dom możemy dopasować personalnie: od układu modułów, przez materiały, po szczegółowe wykończenie.",
            details: [
                { icon: <FaIndustry />, label: 'Technologia', value: 'Modułowa, premium' },
                { icon: <FaBuilding />, label: 'Realizacja', value: 'Kompleksowa – od projektu po odbiór' },
                { icon: <FaLayerGroup />, label: 'Liczba modułów', value: '6+' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: ' płyty włóknocementowe + drewno termiczne' },
                { icon: <FaMapMarkerAlt />, label: 'Powierzchnia zabudowy', value: 'ok. 110 m²' },
                { icon: <FaUser />, label: 'Standard', value: 'energooszczędny, w pełni wyposażony, z możliwością personalizacji premium' },
                { icon: <FaClock />, label: 'Czas realizacji', value: '3–6 miesięcy' },
            ]
        },
        2: {
            images: [realizacja21,realizacja22, realizacja23, realizacja24, realizacja25, realizacja26, realizacja27],
            title: "Nowoczesny Pawilon Usługowy",
            date: "2024-02-10",
            content: `
            
            Nowoczesny, przestronny pawilon handlowo-usługowy klasy premium, zaprojektowany z myślą o właścicielach biznesów, którzy stawiają na estetykę, funkcjonalność i reprezentacyjny wygląd.

Charakterystyczna, minimalistyczna bryła wykończona płytami włókno-cementowymi oraz duże panoramiczne przeszklenia nadają obiektowi ekskluzywny charakter i tworzą idealne warunki do pracy z klientem. Konstrukcja modułowa pozwala na pełną adaptację wnętrza do dowolnej działalności.                                                                                       
               Możliwe Przeznaczenia Pawilonu
Pawilon jest zaprojektowany tak, aby można go było zaadaptować pod różne branże, bez konieczności ingerowania w konstrukcję.
            `,
            details: [
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: ' Pawilon handlowy / usługowy / biurowy / gabinetowy (z możliwością adaptacji na salon beauty, klinikę weterynaryjną, gabinety specjalistyczne, showroom lub lokal gastronomiczny)' },
                { icon: <FaIndustry />, label: 'Technologia', value: 'Modułowa, stalowa konstrukcja premium z ociepleniem całorocznym        ' },
                { icon: <FaBuilding />, label: 'Realizacja', value: 'Produkcja i montaż pod klucz lub w standardzie deweloperskim — w zależności od potrzeb klienta' },
                { icon: <FaLayerGroup />, label: 'Liczba modułów', value: ' Powyżej 6 modułów (możliwość rozbudowy, łączenia i modyfikacji układu)' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: ' Płyty włókno-cementowe + aluminium / stal w systemie profili architektonicznych' },
                { icon: <FaMapMarkerAlt />, label: 'Powierzchnia zabudowy', value: 'Konfigurowalna — standardowo ok. 45–85 m² (możliwość wykonania większych układów)' },
                { icon: <FaClock />, label: 'Czas realizacji', value: 'ok. 3 msc (w zależności od konfiguracji, zakresu wykończenia i wyposażenia)' },
            ]
        },
        3: {
            images: [realizacja31, realizacja32, realizacja33, realizacja34],
            title: "Kompaktowy Pawilon Usługowy – Nowoczesna Przestrzeń Biznesowa",
            date: "2024-01-20",
            content: "Kompaktowy pawilon usługowy zaprojektowany jako funkcjonalne, estetyczne i w pełni modułowe miejsce do prowadzenia działalności gospodarczej. Dzięki nowoczesnej przeszklonej formie i wysokiej jakości materiałom idealnie sprawdza się jako biuro, punkt usługowy, salon beauty, gabinet lub biuro sprzedaży nieruchomości przy inwestycjach deweloperskich.                                                           Pawilon zapewnia pełen komfort pracy, maksymalne doświetlenie oraz reprezentacyjny wygląd, który wzbudza zaufanie klientów już od pierwszego kontaktu. To doskonałe rozwiązanie zarówno na tereny inwestycyjne, przydomowe jak i miejskie.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: '002' },
                { icon: <FaBuilding />, label: 'Realizacja', value: 'Pod klucz – produkcja, transport, montaż, możliwość konfiguracji branżowej' },
                { icon: <FaIndustry />, label: 'Technologia', value: 'Konstrukcja stalowa • moduły prefabrykowane • systemowe przeszklenia aluminiowe' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Kompaktowy pawilon usługowo-biurowy' },
                { icon: <FaLayerGroup />, label: 'Liczba modułów', value: '2–4 moduły (zależnie od wybranego metrażu)' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: ' Panele kompozytowe / aluminium / płyty włókno-cementowe / szkło hartowane' },
                { icon: <FaMapMarkerAlt />, label: 'Powierzchnia zabudowy', value: '18–45 m²' },
                { icon: <FaClock />, label: 'Czas realizacji', value: '4-12 tygodni od zamówienia' },
            ]
        }
    };

    // Pobierz dane dla aktualnego ID lub użyj domyślnych
    const currentData = realizacjeData[id] || {
        images: [realizacja31, realizacja32, realizacja34],
        title: "Przykładowa realizacja",
        date: new Date().toLocaleDateString(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        details: [
            { icon: <FaHashtag />, label: 'Numer Pawilonu', value: id || '—' },
            { icon: <FaCubes />, label: 'Model', value: '—' },
            { icon: <FaBuilding />, label: 'Typ pawilonu', value: '—' },
            { icon: <FaLayerGroup />, label: 'Liczba modułów', value: '—' },
            { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: '—' },
            { icon: <FaUser />, label: 'Klient', value: '—' },
            { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: '—' },
        ]
    };

    return (
        <div>
            <Header black />
            <div className='separate'></div>

            <div className='section'>
                <div className="app">
                    <div className="container">
                        <Breadcrumbs items={['Strona główna', "Realizacja"]} />
                        <div className='sm-separate'></div>

                        <div className="info-section">
                            <div className='blog-post'>
                                <Gallery 
                                    images={currentData.images}
                                    index={currentImageIndex}
                                    setIndex={setCurrentImageIndex}
                                />
                                
                                <div className='sm-separate'></div>
                                <h1 className="blog-post__title">{currentData.title}</h1>
                                <p className="blog-post__date">{currentData.date}</p>
                                <div className="blog-post__content">
                                    {currentData.content}
                                </div>

                                <ol className="blog-post__list" style={{ paddingLeft: 0 }}>
                                    {currentData.details.map((d, idx) => (
                                        <li key={idx} className="flex items-center gap-3" style={{ listStyle: 'none', marginBottom: 12 }}>
                                            <span className="blog-post__icon" style={{ display: 'inline-flex', alignItems: 'center', fontSize: 18 }}>{d.icon}</span>
                                            <span>
                                                <strong>{d.label}:</strong>
                                                <span style={{ marginLeft: 8 }}>{d.value}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ol>

                                <ContactForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}