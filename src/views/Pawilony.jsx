import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import HeroSlider from '../components/HeroSlider/HeroSlider'
import Footer from '../components/Footer/Footer';


import projekt1 from '../assets/pawilony/dwa.png'
import projekt2 from '../assets/pawilony/3/1.png'
import projekt3 from '../assets/pawilony/4/dsad.png'
import projekt4 from '../assets/pawilony/5/2.png'
import projekt5 from '../assets/pawilony/6/4.png'
export default function Pawilony() {
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      setIsVisible(true);
    }, []);
  
  return (
    <div>

      <Header red />
      <HeroSlider images={[projekt2, projekt3, projekt1, projekt4, projekt5]}
      
      content={
                    <div className="hero-slider__overlay">
              <div className="hero-slider__content">
                <h1 className="hero-slider__title">Rozwiązania modułowe dla biznesu</h1>
                <p className="hero-slider__description">Zamów budynek modułowy dla twojego biznesu</p>
              </div>
            </div>
      }
      
      />
      <div className='separate'></div>
      <div className={`projekty-domow-container ${isVisible ? 'page-loaded' : ''}`}>


        <div className="projects-grid">

        </div>
      </div>


      <Footer/>
    </div>

  )
}
