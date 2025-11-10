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
                { icon: <FaHashtag />, label: 'Numer wizualizacji', value: '004' },
                { icon: <FaCubes />, label: 'Model', value: 'Seria ZEZ' },
                { icon: <FaBuilding />, label: 'Typ realizacji', value: 'Domy modułowe' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: 'Powyżej 6 modułów' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Płyty włókno-cementowe' },
                { icon: <FaMapMarkerAlt />, label: 'Powierzchnia zabudowy', value: 'Powyżej 108 m2' },
            ]
        },
        2: {
            images: [realizacja21, realizacja22, realizacja23, realizacja24],
            title: "Pawilon handlowy",
            date: "2024-02-10",
            content: "Przestronny pawilon gastronomiczny z tarasem widokowym, idealny na sezon letni. Wykończenie w stylu skandynawskim.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: '036' },
                { icon: <FaCubes />, label: 'Model', value: 'Seria ZEZ PRO' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Pawilony i kontenery handlowe' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: 'Powyżej 6 modułów' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Elewacje drewniane, Płyty włókno-cementowe' },
                { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: 'Reda' },
            ]
        },
        3: {
            images: [realizacja31, realizacja32, realizacja33, realizacja34],
            title: "Biuro kontenerowe",
            date: "2024-01-20",
            content: "Kompaktowy pawilon usługowy zaprojektowany specjalnie dla centrów handlowych. Maximilizacja przestrzeni użytkowej.",
            details: [
                { icon: <FaHashtag />, label: 'Numer Pawilonu', value: '002' },
                { icon: <FaCubes />, label: 'Model', value: 'Seria Glass' },
                { icon: <FaBuilding />, label: 'Typ pawilonu', value: 'Pawilony i kontenery biurowe' },
                { icon: <FaLayerGroup />, label: 'Ilość modułów', value: 'Poniżej 6 modułów' },
                { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: 'Płyty włókno-cementowe' },
                { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: 'Poznań MTP' },
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