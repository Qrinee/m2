import React from "react";
import "./ConstructionProcess.css";
import f from '../../assets/etapy/1.jpg'
import f1 from '../../assets/etapy/2.jpg'
import f2 from '../../assets/etapy/3.jpg'
import f3 from '../../assets/etapy/4.jpg'
import f4 from '../../assets/etapy/5.jpg'
import f5 from '../../assets/etapy/6.jpg'

const ConstructionProcess = () => {
const processSteps = [
  {
    step: 1,
    title: "Szybko proces produkcji",
    description: `
    
    Budynki modułowe powstają w halach produkcyjnych, gdzie wszystkie etapy realizowane są w stabilnych i kontrolowanych warunkach. Pozwala to prowadzić prace równolegle z przygotowaniem terenu, dzięki czemu cały proces trwa znacznie krócej niż w budownictwie tradycyjnym.                                                           Standardowy czas wytworzenia modułów to około 12–24 tygodnie, a sama instalacja na przygotowanych fundamentach zajmuje już tylko kilka dni. Tak zoptymalizowany proces gwarantuje szybkie, precyzyjne i powtarzalne wykonanie, przy jednoczesnym ograniczeniu kosztów i ryzyka opóźnień.
    `,
    image: f
  },
  {
    step: 2,
    title: "Logistyka na najwyższym poziomie",
    description: `
    Po zakończeniu etapu prefabrykacji gotowe moduły są dostarczane bezpośrednio na plac budowy. Transport odbywa się z użyciem odpowiednio przystosowanych pojazdów niskopodwoziowych, które gwarantują stabilność i bezpieczeństwo podczas jazdy.                                         Przewóz dużych elementów konstrukcyjnych bywa wymagający, jednak odpowiednie zabezpieczenie modułów — często już wyposażonych w instalacje i elementy wykończenia — pozwala na ich bezpieczne dostarczenie zarówno drogą lądową, jak i morską. Dzięki temu gotowe budynki modułowe mogą bez przeszkód dotrzeć niemal w każdy region.
    `, 
    
    image: f1
  },
  {
    step: 3,
    title: "Kompleksy modułowe dla biznesu i deweloperów",
    description: `
    Budownictwo modułowe to rozwiązanie, które sprawdza się zarówno u klientów indywidualnych, jak i deweloperów. W kontrolowanych warunkach produkcyjnych powstają nie tylko domy czy domki letniskowe, ale także biura, pawilony handlowe, punkty usługowe, a nawet całe kompleksy osiedlowe.        Proces produkcji opiera się na przygotowaniu modułów bazowych, z których następnie powstają wszystkie elementy finalnego obiektu. Dzięki temu możliwe jest szybkie tworzenie funkcjonalnych przestrzeni — od budynków mieszkalnych po rozbudowane powierzchnie handlowe — w wyjątkowo krótkim czasie.
    
    `,
    image: f2
  },
  {
    step: 4,
    title: "Fundamenty przygotowane do modułów",
    description: `Proces realizacji prowadzimy dwutorowo, aby maksymalnie skrócić czas budowy. Podczas gdy moduły powstają w kontrolowanych warunkach produkcyjnych, równolegle przygotowywany jest teren pod ich montaż.
Dzięki temu gotowe budynki — domy modułowe, pawilony handlowe, biura, obiekty gastronomiczne czy moduły usługowe — mogą być osadzane na wcześniej wykonanych fundamentach bez zbędnej zwłoki.
Gdy fundamenty oraz przyłącza mediów są gotowe, przystępujemy do szybkiego montażu modułów. Samo ustawienie budynku na przygotowanej podstawie zajmuje zwykle zaledwie od 3 do 7 dni.`,
    image: f3
  },
  {
    step: 5,
    title: "Energooszczędne rozwiązania w budownictwie modułowym",
    description: `Budownictwo modułowe to nie tylko oszczędność czasu, ale także realna korzyść dla środowiska. Dzięki precyzyjnej prefabrykacji zużywane jest znacznie mniej materiałów, energii i wody, co zmniejsza ślad węglowy całej inwestycji. To rozwiązanie idealne zarówno dla klientów prywatnych, jak i inwestorów planujących domy modułowe, pawilony usługowe, obiekty gastronomiczne, biura czy większe kompleksy handlowe i hotelowe.                Skrócony czas produkcji modułów oraz ich powtarzalna jakość sprawiają, że cały proces budowy jest bardziej ekonomiczny i przewidywalny. Z kolei zastosowanie nowoczesnych, ekologicznych materiałów dodatkowo podnosi standard wykonania i wpływa korzystnie na środowisko.                                    Budownictwo modułowe to sposób na nowoczesne, trwałe i przyjazne naturze realizacje — zarówno małe obiekty usługowe, jak i duże inwestycje komercyjne.`,
    image: f4
  },
  {
    step: 6,
    title: "Ekspresowy montaż inwestycji",
    description: `W budownictwie modułowym kluczową rolę odgrywa czas — gotowe elementy powstają wcześniej, a na placu budowy pozostaje jedynie szybkie złożenie całości. Dzięki temu cały proces jest nie tylko sprawny, ale również trwały i precyzyjny.                                                Montaż budynku modułowego średniej wielkości, takiego jak dom, biuro czy mały obiekt usługowy, zazwyczaj zajmuje zaledwie 1-2 dni. W przypadku większych realizacji, takich jak obiekty handlowe, kontenery użytkowe czy większe pawilony, czas montażu liczony jest w kilku dniach.                                           Kompletne, gotowe do użycia osiedle modułowe może zostać złożone w około dwa - trzy tygodnie, co stanowi ogromną przewagę nad tradycyjnymi metodami budowy.`,
    image: f5
  },
];

  return (
    <section className="construction-process">
      <div className="m-container">
        <h2 className="section-titled">Jak powstają budynki modułowe</h2>
        
        <div className="process-grid">
          {processSteps.map((step) => (
            <div key={step.step} className="process-card">
              <div className="card-image">
                <img src={step.image} alt={step.title} />
                <div className="step-badge">{step.step}</div>
              </div>
              <div className="card-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionProcess;