import React from 'react'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import dawid from '../assets/dawid.jpg'
import wiktoria from '../assets/wiktoria.jpg'
import renata from '../assets/renata.png'
export default function TeamSection() {
  return (
    <div className='card-section-wrapper'>
        <div className='card-section__header'>
        <h2>Zespół, któremu możesz zaufać</h2>
        <p>Jesteśmy dumni z jakości usług, które świadczymy. Nasz zespół ekspertów pomoże Ci znaleźć idealną nieruchomość lub szybko sprzedać Twoją.</p>
       </div>
       <div className='card-section'>
        <PhotoCard 
        image={dawid}
        name={'Dawid Frey'}
        status={'Członek zarządu | CEO'}
        description={'Współtwórca M2Notarialnie i specjalista w zakresie analiz rynku oraz procesu sprzedaży i z ...'}
        />
        <PhotoCard
        image={wiktoria}
        name={'Wiktoria Kisio'}
        status={'Członek zarządu | CEO'}
        description={'Współzałożycielka M2 Notarialnie, z doświadczeniem w branży nieruchomości i pasją do tworz ...'}
        />
        <PhotoCard
        image={renata}
        name={'Renata Szwałek'}
        status={'Przedstawiciel'}
        description={'Renata Szwałek to negocjator rynku nieruchomości z wieloletnim doświadczeniem w branży fin ...'}
        />
        </div>
        </div>
  )
}
