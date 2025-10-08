import React from 'react'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import dawid from '../assets/dawid.jpg'
import wiktoria from '../assets/wiktoria.jpg'
import renata from '../assets/renata.png'
import { Link } from 'react-router-dom'
export default function TeamSection() {
  return (
    <div className='card-section-wrapper'>
        <div className='card-section__header'>
        <h2  className='h2'>Zespół, któremu możesz zaufać</h2>
        <p  className='p'>Jesteśmy dumni z jakości usług, które świadczymy. Nasz zespół ekspertów pomoże Ci znaleźć idealną nieruchomość lub szybko sprzedać Twoją.</p>
       </div>
       <div className='card-section'>
        <Link to={'/estate_agent/68e66f7258e3141c145e3d5d'} style={{textDecoration: 'none', color: 'inherit'}}>
        <PhotoCard 
        image={dawid}
        name={'Dawid Frey'}
        status={'Członek zarządu | CEO'}
        description={'Współtwórca M2Notarialnie i specjalista w zakresie analiz rynku oraz procesu sprzedaży i z ...'}
        />
        </Link>

         <Link to={'/estate_agent/68e66abc58e3141c145e3d19'} style={{textDecoration: 'none', color: 'inherit'}}>
        <PhotoCard
        image={wiktoria}
        name={'Wiktoria Kisio'}
        status={'Członek zarządu | CEO'}
        description={'Współzałożycielka M2 Notarialnie, z doświadczeniem w branży nieruchomości i pasją do tworz ...'}
        />
        </Link>
         <Link to={'/estate_agent/68e66e6f58e3141c145e3d4c'} style={{textDecoration: 'none', color: 'inherit'}}>
        <PhotoCard
        image={renata}
        name={'Renata Szwałek'}
        status={'Przedstawiciel'}
        description={'Renata Szwałek to negocjator rynku nieruchomości z wieloletnim doświadczeniem w branży fin ...'}
        />
        </Link>
        </div>
        </div>
  )
}
