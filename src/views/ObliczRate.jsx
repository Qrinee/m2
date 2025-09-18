import React from 'react'
import Marquee from '../components/Marquee/Marquee'
import GoogleMapReact from 'google-map-react';
import Header from '../components/Header/Header';
import TwoPartText from './../layouts/TwoPartText';
import NotarialCalculator from '../components/NotarialCalculator/NotarialCalculator';
import Footer from '../components/Footer/Footer';

export default function ObliczRate() {

    return (
    <div>
        <Header black />
        <div className='separate'></div>
        <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381'/>

        <div className='separate'></div>
        <div className='card-section__header'>
            <h2>Raty notarialne czy kredyt hipoteczny?</h2>    
            <p>Co się bardziej opłaca, co jest tańsze i wygodniejsze? Sprawdź nasze szczegółowe porównanie!</p>
        </div>
        <TwoPartText
        left={<>
        <p>Przygotowaliśmy dla Ciebie kalkulator rat notarialnych, dzięki któremu w prosty sposób sprawdzisz, ile będzie wynosić Twoja miesięczna rata.</p>
        <div className='separate'></div>
        <p>Nasi Klienci często mówią, że obecnie płacą więcej za wynajem mieszkania niż mogliby płacić na ratę własnej nieruchomości. Oznacza to, że jeśli wynajmujesz, możesz mieć podobną lub nawet niższą miesięczną kwotę do zapłaty — z tą różnicą, że w tym przypadku inwestujesz we własne mieszkanie lub dom. Wybór wydaje się więc oczywisty.</p>
        </>}
        right={<>
        <NotarialCalculator/>
        </>}
        />

        <div className='separate'></div>
        <Footer/>
    </div>
  )
}
