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
    title: "Czas produkcji skrócony do minimum",
    description: `Co wyróżnia naszą ofertę budownictwa modułowego na tle standardowych, tradycyjnych metod wznoszenia budynków? W M2notarialnie produkcja odbywa się w nowoczesnych, doskonale wyposażonych halach produkcyjnych, a wszystkie jej procesy przebiegają taśmowo.

To natomiast pozwala znacznie skrócić czas tworzenia budynku. Podczas gdy na tradycyjne domy lub budynki użyteczności publicznej trzeba czekać co najmniej rok, nasze budynki modułowe powstają już w około 12 do 18 tygodni.

Pełne zoptymalizowanie procesu produkcji oraz możliwość zachowania jej stałych i ściśle kontrolowanych warunków to ogromna przewaga nad budownictwem tradycyjnym, ale też prawdziwe wyjście naprzeciw potrzebom nowoczesnego klienta.`,
    image: f
  },
  {
    step: 2,
    title: "Szybki i bezpieczny transport",
    description: `Po zakończonym procesie prefabrykacji z naszych hal produkcyjnych wysyłamy gotowe budynki modułowe na plac budowy. Transport odbywa się za pomocą odpowiednio zabezpieczonych niskopodłogowych samochodów.

Nierzadko stajemy również przed wyzwaniem przetransportowania gotowych części budynków modułowych zarówno drogą lądową, jak i morską. Doskonale zabezpieczone i odpowiednio przygotowane moduły - z gotowymi instalacjami, niekiedy także elementami wyposażenia, z powodzeniem docierają w niemal dowolny region świata.`,
    image: f1
  },
  {
    step: 3,
    title: "Modularyzacja w budownictwie",
    description: `Budownictwo modułowe to dobry wybór dla osób prywatnych, ale także doskonałe rozwiązanie dla deweloperów. W naszych halach produkcyjnych błyskawicznie powstają nie tylko pojedyncze domy modułowe czy domki letniskowe, ale całe kompleksy osiedli czy biurowców, a nawet ciągi sklepów modułowych – pawilon handlowy tworzących duże powierzchnie handlowe.

Do rozpoczęcia taśmowej produkcji potrzebujemy jedynie przygotować bazowe moduły, na podstawie których wykonamy pozostałe elementy całej serii. Dzięki budownictwu modułowemu istnieje możliwość stworzenia funkcjonalnych prefabrykowanych osiedli lub powierzchni handlowych w niezwykle krótkim czasie!`,
    image: f2
  },
  {
    step: 4,
    title: "Przygotowanie fundamentów",
    description: `Nasze działania prowadzimy dwutorowo, dzięki czemu jesteśmy w stanie dodatkowo skrócić czas trwania całej budowy. Cały proces planujemy w taki sposób, aby w trakcie prefabrykacji modułów inwestor prowadził już działania mające na celu optymalne przygotowanie terenu pod gotowe elementy.

Dzięki temu wykonane przez nas budynki modułowe - domy modułowe, pawilony handlowe, pawilony biurowe, pawilony gastronomiczne, sklepy modułowe, kontenery biurowe, hotele modułowe, kontenery gastronomiczne sklepy bezobsługowe wznoszone są na wcześniej przygotowanych fundamentach.

Kiedy już mamy gotowe fundamenty oraz przygotowany teren wraz z podpiętymi mediami, możemy przystąpić do szybkiego montażu budynków modułowych. Osadzanie modułów na fundamentach to proces trwający od 3 do 5 dni.`,
    image: f3
  },
  {
    step: 5,
    title: "Budownictwo ekologiczne",
    description: `Budownictwo modułowe to ogromna oszczędność czasu, a co za tym idzie wyjątkowa wygoda dla klienta, niezależnie od tego, czy jest to osoba prywatna, poszukująca dom modułowy czy pawilon handlowy, pawilon gastronomiczny, kontener handlowy, czy duży inwestor chcący wybudować sklepy modułowe, hotel modułowy, przedszkole modułowe, czy nawet szkoły modułowe oraz biura modułowe.

Istotnym walorem, wynikającym ze skróconego czasu produkcji naszych modułów, jest także znaczne ograniczenie zużycia materiałów, energii czy wody. To z kolei korzystnie wpływa nie tylko na budżet inwestycji, ale także na kondycję naszej planety.

Ekologiczny charakter budownictwa modułowego dopełnia także fakt, że w procesie prefabrykacji bardzo często używa się nowoczesnych ekomateriałów przyjaznych środowisku.`,
    image: f4
  },
  {
    step: 6,
    title: "Błyskawiczny montaż",
    description: `W D&W Development doskonale wiemy, jak ważny w dzisiejszych czasach jest czas. Liczy się przede wszystkim to, co można wykonać szybko i skutecznie, to co już po krótkim czasie przygotowania nadaje się do długotrwałego użytku.

Dokładnie tak prezentują się nasze budynki modułowe. Czas montażu średniej wielkości domku letniskowego lub małego sklepu modułowego to zaledwie jeden dzień, a na swój wymarzony dom modułowy czy nowe biuro modułowe, kontener biurowy lub pawilon handlowy - kontener handlowy wystarczy poczekać kilka dni.

Czas montażu gotowych modułów całego osiedla mieszkaniowego to około dwa tygodnie.`,
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