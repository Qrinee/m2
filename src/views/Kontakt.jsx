import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import HeroVideo from '../components/HeroVideo/HeroVideo'
import laptop from '../assets/videos/laptop.mp4'
import TeamSection from '../sections/TeamSection'
export default function Kontakt() {
  return (
    <div>
        <Header/>
      <HeroVideo video={laptop}
      content={
        <div>Skontaktuj się z nami</div>
      }
      />
        <div className='section'>
            <div className="app">
              <div className="container">
                <Breadcrumbs items={['Strona główna', "Kontakt"]} />
                <div className='sm-separate'></div>
                <TeamSection/>
                <ContactForm />
              </div>
            </div>
        </div>
    </div>
  )
}
