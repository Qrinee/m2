import React from 'react'
import Header from '../components/Header/Header'
import Marquee from './../components/Marquee/Marquee';
import TwoPartText from './../layouts/TwoPartText';
import TeamSection from '../sections/TeamSection';
import NumberSection from '../sections/NumberSection';

export default function ONas() {
  return (
    <div>
      <Header black/>
      <div className='separate'></div>
            <div className='separate'></div>
      <Marquee text={"Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381"} />
          <div className='separate'></div>
        <div className='card-section__header'>
        <h2>Kim jesteśmy?</h2>
        <p>
Jesteśmy unikalnym połączeniem agencji nieruchomości oraz zespołu kancelarii prawnej. Specjalizujemy się w kompleksowej i bezpośredniej weryfikacji nieruchomości – zarówno pod względem prawnym, jak i faktycznym. Naszą misją jest zapewnienie klientom maksymalnego bezpieczeństwa i komfortu na każdym etapie transakcji.

        </p>
        </div>
      <TwoPartText
          left={
            <>
            <h3><b>Bezpieczeństwo i profesjonalizm</b></h3>
            <p>Dzięki obecności adwokatów w naszym zespole gwarantujemy najwyższy poziom obsługi prawnej i notarialnej. Nasze rozwiązania zostały wypracowane w oparciu o realne doświadczenia zebrane w pracy terenowej i biurowej. Niezależnie od tego, czy kupujesz, czy sprzedajesz – możesz mieć pewność, że Twoje interesy są w dobrych rękach.</p>
            </>
          }

          right={
            <>
            <h3><b>Podejście dopasowane do Ciebie</b></h3>
            <p>Rozumiemy, że każdy klient i każda nieruchomość to inna historia. Dlatego nasze podejście zawsze opiera się na indywidualnych potrzebach, wiedzy, doświadczeniu i pełnym bezpieczeństwie prawnym. Niezależnie od Twojej sytuacji – zaproponujemy Ci rozwiązania, które będą nie tylko skuteczne, ale i bezpieczne.</p>
            </>
          }
      />
      <div className='separate'></div>
            <TwoPartText
          left={
            <>
            <h3><b>Doświadczenie budowane latami</b></h3>
            <p>Od ponad 10 lat działamy w zmieniających się warunkach prawnych, finansowych i gospodarczych. Przetrwaliśmy najtrudniejsze okresy – przed pandemią, w jej trakcie i po niej – uważnie obserwując potrzeby rynku, klientów, banków i inwestorów. To doświadczenie pozwoliło nam zbudować wyjątkowe know-how i przewidywać trendy, zanim staną się standardem.</p>
            </>
          }

          right={
            <>
            <h3><b>Dlaczego my?</b></h3>
            <p>W świecie nieruchomości, gdzie zaufanie jest kluczowe, stawiamy na transparentność, realne doradztwo i bezpieczne rozwiązania. Nie jesteśmy po prostu pośrednikami – jesteśmy partnerami w procesie, który często jest jedną z najważniejszych decyzji w życiu naszych klientów. Łączymy wiedzę prawną z rynkowym doświadczeniem, by dawać Ci nie tylko oferty, ale realną wartość i poczucie bezpieczeństwa.</p>
            </>
          }
      />
      <div className='separate'></div>
      <TeamSection/>
      <NumberSection/>
    </div>
  )
}
