import React from 'react'
import Marquee from './../components/Marquee/Marquee';
import CardSection from './../sections/CardSection';
import ListingCard from './../components/ListingCard/ListingCard';
import CitySection from './../sections/CitySection';
import TeamSection from './../sections/TeamSection';
import TestimonialSection from './../components/TestimonialSection/TestimonialSection';
import NumberSection from './../sections/NumberSection';
import ContactSection from './../sections/ContactSection';
import Footer from './../components/Footer/Footer';
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import vid2 from '../assets/videos/vid2.mp4'
import HeroVideo from '../components/HeroVideo/HeroVideo';

export default function Nieruchomosci() {
  return (
    <div>

        <Header />
        <HeroVideo
        content={
                  <>
         <h1>Nieruchomości z gwarancją prawną.</h1>
        <p style={{color: 'white'}}>Bezpieczne nieruchomości. Kompleksowo. Profesjonalnie</p>
        </>
        }
        video={vid2}
          />
      <SearchBar/>
    <Marquee
        text="Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381"
        speed={200}
        gap={64}
      />
      <CardSection />
      <CitySection />
          <TeamSection/>

  

      <TestimonialSection/>
      <NumberSection/>
      <ContactSection/>
        <Footer/>
    </div>

    
  )
}
