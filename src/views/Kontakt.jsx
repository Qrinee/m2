import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import HeroVideo from '../components/HeroVideo/HeroVideo'
import laptop from '../assets/videos/laptop.mp4'
import TeamSection from '../sections/TeamSection'
import SocialMediaSection from '../components/SocialMediaSection/SocialMediaSection'
import Footer from '../components/Footer/Footer'


export default function Kontakt() {
  return (
    <div>
        <Header black/>
        <div className='section'>
            <div className="app">
              <div className="container">
                <div className='separate'></div>
                <Breadcrumbs items={['Strona główna', "Kontakt"]} />
                <div className='sm-separate'></div>
                <TeamSection height={"20px"}/>
                <SocialMediaSection />
                <ContactForm color={'var(--primary-color)'} />
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}