import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import restauracje from './assets/ex/Restauracje.webp'
import handel from './assets/ex/Handel.webp'
import medyczne from './assets/ex/Medyczne.webp'
import { Link } from "react-router-dom";
import ModularForBusiness from "./components/ModularForBusiness/ModularForBusiness";
import NewProjects from "./components/NewProjects/NewProjects";
import ConstructionProcess from "./components/ConstructionProcess/ConstructionProcess";
import first from './assets/logistics.jpg'
import second from './assets/644729945574533_0.jpg'
import TwoPartText from "./layouts/TwoPartText";
import SplitLayout from "./layouts/SplitLayout";



export default function App() {
  return (
    <>
      <Header red/>
      <Hero
        leftBg={"2-5.jpg"}
        rightBg={"tlo-scaled.jpg"}
        rightContent={        
          <>
            <h2>Nieruchomości</h2>
            <p style={{color: 'white'}}>Bezpieczne nieruchomości. Kompleksowo. <br/>Profesjonalnie</p>
            <Link to={'/nieruchomosci'}><button className="btn-primary">Przeglądaj</button></Link> 
          </>}
        leftContent={
          <>
            <h2>Modułowe rozwiązania</h2>
            <p style={{color: 'white'}}>Budynki modułowe dla Twojej branży</p>
            <Link to={'/projekty-domow'}>
            <button className="btn-primary" style={{background: '#a81b16'}}>Przeglądaj</button>
            </Link>
          </>
        }
      />
      
      <ModularForBusiness  visibleCards={3} cards={[
    {
      id: 1,
      title: "Restauracje",
      image: restauracje,
      videoId: "abc123"
    },
    {
      id: 2,
      title: "Hotele",
      image: handel,
      videoId: "def456"
    },
    {
      id: 3,
      title: "Biura",
      image: medyczne,
      videoId: "ghi789"
    }
      ]}/>
      <div className="separate"></div>
      <h2 className="section-titled" >Budownictwo modułowe w zupełnie nowej formie</h2>
    <div className="m-container" style={{ marginBottom: 80}}>
      <SplitLayout
      
      leftContent={
        <div style={{padding: '20px'}}>
        <h1>Budownictwo modułowe bez pozwolenia do 70m2</h1>
        <p>
Na początku roku 2022 weszła w życie najlepsza obecnie dostępna na rynku, alternatywa prawna dla inwestorów w branży nieruchomości. Wprowadza poważne zmiany i uproszczenia zagospodarowania przestrzeni bez pozwolenia na budowę do 70m2. W M&W Construction Group szczycimy się w produkcji technologii prefabrykowanej, która jest solidna, energooszczędna, na miarę współczesnego designu a przede wszystkim szybka w realizacji. Czy to branża Turystyczna gdzie chcesz zwiekszyć swoja ofertę domków letniskowych, lub po prostu nadszedł czas na postawienie domu jednorodzinnego? Nasza firma oprócz budowy pomoże w potrzebnej dokumentacji i planowaniu. Zapraszamy do zapoznania się z nasza oferta!

        </p>
      </div>

      }
      rightBg="#ffffff"
      leftBg="#ffffff"
      rightContent={
        <div style={{padding: '20px'}} >
        <h1>Oferta</h1>
        <p>To doskonała alternatywa dla tradycyjnych metod budowlanych, które są dużo bardziej kosztowne – zarówno finansowo, jak i czasowo. Mając na uwadze precyzję wykonania składających się na kontenery elementów oraz czas realizacji i zwrotu inwestycji, nieustannie poszukujemy nowych rozwiązań, które spełnią oczekiwania naszych kontrahentów. Dzięki temu możemy zaoferować im indywidualne projekty o konkurencyjnym czasie realizacji, które wpisują się w charakter prowadzonej przez nich działalności. Oferta  M&W Construction to szeroki zakres tworzonych konstrukcji, w skład których wchodzą między innymi </p>
        </div>
      }
      />
      </div>
      <NewProjects projects={
        [
    {
      id: 1,
      image: first,
      title: "Dom jednorodzinny Modułowy",
      description: "Nowoczesny dom modułowy o powierzchni 120m2, gotowy w 3 miesiące. Energooszczędny i w pełni wyposażony."
    },
    {
      id: 2,
      image: second,
      title: "Pawilon handlowy",
      description: "Elegancki pawilon handlowy z możliwością szybkiej rozbudowy. Idealny dla sieci handlowych."
    },
    {
      id: 3,
      image: second,
      title: "Biuro kontenerowe",
      description: "Funkcjonalne biuro kontenerowe dla 10 osób. Gotowe do użytku w 2 tygodnie."
    },
    {
      id: 4,
      image: first,
      title: "Dom letniskowy",
      description: "Przytulny dom letniskowy nad jeziorem. Doskonały dla agroturystyki."
    },
  ]
      } />
      <ConstructionProcess />

      <Footer/>
    </>
  );
}