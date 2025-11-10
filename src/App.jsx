import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import kaf1 from './assets/kafelki/1.png'
import kaf2 from './assets/kafelki/2.png'
import kaf3 from './assets/kafelki/3.png'

import { Link } from "react-router-dom";
import ModularForBusiness from "./components/ModularForBusiness/ModularForBusiness";
import NewProjects from "./components/NewProjects/NewProjects";
import ConstructionProcess from "./components/ConstructionProcess/ConstructionProcess";
import first from './assets/pawilony/5/Bez nazwy-2.png'
import second from './assets/pawilony/3/1.png'
import third from './assets/pawilony/2/Bez nazwy-2.png'
import TwoPartText from "./layouts/TwoPartText";
import SplitLayout from "./layouts/SplitLayout";
import Reels from "./views/Reels/Reels";
import para from './assets/para.png'
import ChatBubble from "./components/ChatBubble/ChatBubble";
import PromoBanner from "./components/PromoBanner/PromoBanner";



export default function App() {
  return (
    <>
      <Header/>

      <ChatBubble/>
      <Hero
        leftBg={"house-1477041_1280.jpg"}
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
            <PromoBanner imageSrc={para}/>

        <ModularForBusiness  visibleCards={3} cards={[
    {
      id: 1,
      title: "Restauracje",
      image: kaf1,
      videoId: "abc123"
    },
    {
      id: 2,
      title: "Hotele",
      image: kaf2,
      videoId: "def456"
    },
    {
      id: 3,
      title: "Biura",
      image: kaf2,
      videoId: "ghi789"
    }
      ]}/>
      <div className="separate"></div>
      <h2 className="section-titled" >Budownictwo modułowe w zupełnie nowej formie</h2>
      <h2 className="section-titled" style={{border: 0, color: 'var(--primary-color)'}}>Zaprojektuj swoje marzenia</h2>
      <div className="m-container" style={{ marginBottom: 80}}>
      </div>
      <NewProjects projects={
        [
    {
      id: 1,
      image: first,
      title: 'Dom mieszkalny modułowy',
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
      image: third,
      title: "Biuro kontenerowe",
      description: "Funkcjonalne biuro kontenerowe dla 10 osób. Gotowe do użytku w 2 tygodnie."
    },
  ]
      } />
      <ConstructionProcess />

      <Footer/>
    </>
  );
}