import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Marquee from '../components/Marquee/Marquee'

export default function Ulubione() {
  return (
    <div>
        <Header black />
        <div className='separate'></div>
        <div className='section'>
        <h2>Ulubione</h2>
        <p>Brak nowych ofert nieruchomości</p>
        <div className='separate'></div>
        <div className='separate'></div>
        <div className='separate'></div>
        </div>
          <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381'/>
         <Footer/>
    </div>
  )
}
