import { FaChartBar } from "react-icons/fa";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import InfoCard from "./components/InfoCard/InfoCard";
import Marquee from "./components/Marquee/Marquee";
import SearchBar from "./components/SearchBar/SearchBar";
import CardSection from "./sections/CardSection";
import AnnouncementSection from "./sections/AnnouncementSection";
import CitySection from "./sections/CitySection";
import TeamSection from "./sections/TeamSection";
import RateSection from "./sections/RateSection";
import TestimonialSection from "./components/TestimonialSection/TestimonialSection";
import ListingCard from "./components/ListingCard/ListingCard";
import ListingSection from "./sections/ListingSection";
import NumberSection from "./sections/NumberSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./components/Footer/Footer";
export default function App() {


  return (
      <>
      <Header/>
      <Hero
      img={"tlo-scaled.jpg"}
      content={
        <>
         <h1>Nieruchomości z gwarancją prawną.</h1>
        <p style={{color: 'white'}}>Bezpieczne nieruchomości. Kompleksowo. Profesjonalnie</p>
        </>
      }/>
      <SearchBar/>
            <Marquee
        text="Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381      Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381"
        speed={200}
        gap={64}
      />
      <CardSection />
      <ListingSection />
    <CitySection />
          <TeamSection/>

  

      <TestimonialSection/>
      <NumberSection/>
      <ContactSection/>
        <Footer/>
      </>
  )
}