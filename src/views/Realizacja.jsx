import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import realizacja11 from '../assets/pawilony/5/2.png';
import realizacja12 from '../assets/pawilony/5/3.png';
import realizacja13 from '../assets/pawilony/5/Bez nazwy-2.png'

import realizacja21 from '../assets/pawilony/3/1.png'
import realizacja22 from '../assets/pawilony/3/2.png'
import realizacja23 from '../assets/pawilony/3/3.png'
import realizacja24 from '../assets/pawilony/3/4.png'

import realizacja31 from '../assets/pawilony/2/Bez nazwy-2.png'
import realizacja32 from '../assets/pawilony/2/dwa.png'
import realizacja33 from '../assets/pawilony/2/trzy.jpg.png'
import realizacja34 from '../assets/pawilony/2/cztery.png'
import { FaHashtag, FaCubes, FaBuilding, FaLayerGroup, FaPaintBrush, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Gallery from '../components/Property/Gallery';
import ContactForm from '../components/ContactForm/ContactForm';

export default function Realizacja() {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Przykładowe dane dla różnych ID
    const realizacjeData = {
        1: {
            images: [realizacja13, realizacja12, realizacja11],
            title: "Dom mieszkalny modułowy",
            date: "2024-03-15",
            content: "Nowoczesny dom modułowy o powierzchni 120m2, gotowy w 3 miesiące. Energooszczędny i w pełni wyposażony.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: 'PM-001' },
                { icon: <FaCubes />, label: 'Model', value: 'Premium' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Handlowy' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: '12' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Aluminium' },
                { icon: <FaUser />, label: 'Klient', value: 'Fashion Store Sp. z o.o.' },
                { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: 'Warszawa, ul. Centralna 15' },
            ]
        },
        2: {
            images: [realizacja21, realizacja22, realizacja23, realizacja24],
            title: "Pawilon handlowy",
            date: "2024-02-10",
            content: "Przestronny pawilon gastronomiczny z tarasem widokowym, idealny na sezon letni. Wykończenie w stylu skandynawskim.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: 'PG-045' },
                { icon: <FaCubes />, label: 'Model', value: 'Lakeside' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Gastronomiczny' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: '8' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Drewno modrzewiowe' },
                { icon: <FaUser />, label: 'Klient', value: 'Lake Restaurant' },
                { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: 'Mikołajki, ul. Nadjeziorna 8' },
            ]
        },
        3: {
            images: [realizacja31, realizacja32, realizacja33, realizacja34],
            title: "Biuro kontenerowe",
            date: "2024-01-20",
            content: "Kompaktowy pawilon usługowy zaprojektowany specjalnie dla centrów handlowych. Maximilizacja przestrzeni użytkowej.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: 'PU-128' },
                { icon: <FaCubes />, label: 'Model', value: 'Compact' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Usługowy' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: '6' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Szkło + stal' },
                { icon: <FaUser />, label: 'Klient', value: 'Beauty Salon Premium' },
                { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: 'Kraków, Galeria Krakowska' },
            ]
        }
    };

    // Pobierz dane dla aktualnego ID lub użyj domyślnych
    const currentData = realizacjeData[id] || {
        images: [realizacja, realizacja, realizacja],
        title: "Przykładowa realizacja",
        date: new Date().toLocaleDateString(),
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        details: [
            { icon: <FaHashtag />, label: 'Numer Pawilonu', value: id || '—' },
            { icon: <FaCubes />, label: 'Model', value: '—' },
            { icon: <FaBuilding />, label: 'Typ pawilonu', value: '—' },
            { icon: <FaLayerGroup />, label: 'Ilość modułów', value: '—' },
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