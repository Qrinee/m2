import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

export default function Kontakt() {
  return (
    <div>
        <Header black />
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                <Breadcrumbs items={['Strona główna', "Kontakt"]} />
                <div className='sm-separate'></div>
                <InfoSection />
                <ContactForm />
              </div>
            </div>
        </div>
    </div>
  )
}
