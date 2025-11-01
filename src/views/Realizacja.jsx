import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import realizacja from '../assets/22.png';
import { FaHashtag, FaCubes, FaBuilding, FaLayerGroup, FaPaintBrush, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import Gallery from '../components/Property/Gallery';
import ContactForm from '../components/ContactForm/ContactForm';

export default function Realizacja() {
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Example images array - replace with your actual images
    const images = [
        realizacja,
        realizacja, // Using same image twice for demo - replace with different images
        realizacja,
        // Add more images as needed
    ];

    const details = [
        { icon: <FaHashtag />, label: 'Numer Pawilonu', value: id || '—' },
        { icon: <FaCubes />, label: 'Model', value: '—' },
        { icon: <FaBuilding />, label: 'Typ pawilonu', value: '—' },
        { icon: <FaLayerGroup />, label: 'Ilość modułów', value: '—' },
        { icon: <FaPaintBrush />, label: 'Materiał elewacyjny', value: '—' },
        { icon: <FaUser />, label: 'Klient', value: '—' },
        { icon: <FaMapMarkerAlt />, label: 'Lokalizacja', value: '—' },
    ];

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
                                {/* Replace the img with Gallery component */}
                                <Gallery 
                                    images={images}
                                    index={currentImageIndex}
                                    setIndex={setCurrentImageIndex}
                                />
                                
                                <div className='sm-separate'></div>
                                <h1 className="blog-post__title">Przykładowa realizacja</h1>
                                <p className="blog-post__date">{new Date().toLocaleDateString()}</p>
                                <div className="blog-post__content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </div>

                                <ol className="blog-post__list" style={{ paddingLeft: 0 }}>
                                    {details.map((d, idx) => (
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