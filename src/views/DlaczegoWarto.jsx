import React from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Marquee from '../components/Marquee/Marquee'
import TwoPartText from '../layouts/TwoPartText'
import TeamSection from '../sections/TeamSection'
import NumberSection from '../sections/NumberSection'
import PropertyForm from '../components/PropertyForm/PropertyFrom'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'

export default function DlaczegoWarto() {
  return (
    <div>
        <Header/>
        <HeroNieruchomosci img={
            'bread-scaled3-scaled.jpg'
        }
        content={
            <>
                    <div className='card-section__header'>
                <h1>8X szybsza sprzedaż</h1>
                <p style={{color: 'white'}}>Statystyki pokazują jasno, że sprzedaż mieszkania lub domu na raty notarialne, jest nawet 8 razy szybsza od tradycyjnej formy sprzedaży.</p>
                </div>
            </>
        }
        />

        <div className='separate'></div>
        <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381' />
        <div className='separate'></div>
                <div className='card-section__header'>
        <h2>Co zyskujesz dzięki takiej formie sprzedaży?</h2>
        <p>Utilizing our exceptional experience and knowledge of the luxury waterfront markets,we serve an extensive and elite worldwide client base. </p>
        </div>
        <div style={{padding: '0 20px'}}>
        <TwoPartText left={
          <>
          <h2>Pewną, bezpieczną i szybką transakcję</h2>
          <p>
            Umowa rat notarialnych gwarantuje pełne bezpieczeństwo i przejrzystość transakcji. Dzięki temu masz pewność, że sprzedaż przebiega zgodnie z prawem, a formalności są uproszczone i szybkie.
          </p>
                    <div className='separate'></div>
                    <h2>Wyższą kwotę za sprzedaż</h2>
                    <p>Nie bój się o inflację. W umowie z kupującym zawsze jest zapis o jej corocznej waloryzacji, dzięki czemu nie możesz stracić na takiej transakcji. Ponadto kwota finalna sprzedaży mieszkania w ratach notarialnych niemal zawsze jest większa niż przy tradycyjnej sprzedaży.</p>
           <div className='separate'></div>
          </>
        }
        
        right={
          <>
          <h2>Stały, przewidywalny dochód miesięczny</h2>
          <p>Dzięki sprzedaży nieruchomości na raty notarialne zyskujesz pewność regularnych wpływów na konto. To stabilne, wysokie źródło dochodu, które pozwala planować wydatki z wyprzedzeniem.</p>
        
          <div className='separate'></div>
            <h2>Gotówkę - wysoki wkład początkowy</h2>
            <p>Sprzedaż na raty notarialne zapewnia Ci natychmiastowy dostęp do znacznej części kwoty w formie wysokiego wkładu początkowego. To gotówka, którą możesz wykorzystać od razu na swoje potrzeby lub inwestycje.</p>
          </>
        }
        />
        </div>
        <div className='separate'></div>
        <PropertyForm/>
    </div>
  )
}
