import React from 'react'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import dawid from '../assets/dawid.jpg'
import wiktoria from '../assets/wiktoria.jpg'
import renata from '../assets/renata.png'
import { Link } from 'react-router-dom'
export default function TeamSection({content, height}) {
  return (
    <div className='card-section-wrapper' style={{minHeight: height ? height: '100vh'}}>
        {content}
       <div className='card-section'>
        <Link to={'/estate_agent/68e66f7258e3141c145e3d5d'} style={{textDecoration: 'none', color: 'inherit'}}>
        <PhotoCard 
        short
        image={dawid}
        name={'Dawid Frey'}
        phoneNumber={'+48 728 866 825'}
        email={'kontakt@m2notarialnie.pl'}
        status={'Członek zarządu | CEO'}
        description={'Współtwórca M2Notarialnie i specjalista w zakresie analiz rynku oraz procesu sprzedaży i z ...'}
        />
        </Link>

         <Link to={'/estate_agent/68e66abc58e3141c145e3d19'} style={{textDecoration: 'none', color: 'inherit'}}>
        <PhotoCard
        short
        phoneNumber={'+48 696 266 381'}
        email={"kontakt@m2notarialnie.pl"}
        image={wiktoria}
        name={'Wiktoria Kisio'}
        status={'Członek zarządu | CEO'}
        description={'Współzałożycielka M2 Notarialnie, z doświadczeniem w branży nieruchomości i pasją do tworz ...'}
        />
        </Link>
        </div>
        </div>
  )
}
