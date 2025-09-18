import React from 'react'
import Hero from '../components/Hero/Hero'
import Background from '../assets/bread-scaled-1-scaled.jpg'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import TwoPartText from '../layouts/TwoPartText'
import FAQItem from '../components/FAQItem/FAQItem'
import Footer from '../components/Footer/Footer'
export default function CzymSaRatyNotarialne() {
  return (
    <div>
      <Header/>
        <Hero
        img={Background}
        content={
            <>
                <h1>Twoje marzenia, nasze możliwości.</h1>
            </>
        }
        />
        <div className='separate'></div>
        <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381'/>
       <div className='separate'></div>
        <TwoPartText left={
          <>
          <h2>Jak działa zakup nieruchomości na raty notarialne?</h2>
          <p>
            Proces zakupu nieruchomości na raty notarialne składa się z kilku prostych kroków:
          </p>
          <ol>
            <li>
            <b>Wybór nieruchomości</b>
            <p>
              Klient wybiera mieszkanie lub dom z naszej oferty dostępnej na raty notarialne. Współpracujemy wyłącznie z właścicielami, którzy akceptują to rozwiązanie.
              </p>
            </li>
            <li>
            <b>Negocjacje warunków płatności</b>
            <p>
              Ustalamy liczbę rat, ich wysokość, terminy płatności oraz ewentualne odsetki. Warunki dopasowujemy indywidualnie do możliwości finansowych kupującego oraz oczekiwań sprzedającego.
              </p>
            </li>
               <li>
            <b>Sporządzenie aktu notarialnego</b>
            <p>
              Kancelaria notarialna przygotowuje akt notarialny, w którym dokładnie określone są warunki umowy. Notariusz dba o zgodność dokumentu z przepisami prawa oraz zabezpiecza interesy obu stron.
              </p>
            </li>    
            <li>
              <b>Podpisanie umowy i przekazanie nieruchomości</b>
             <p>Podpisanie umowy i przekazanie nieruchomości
Po podpisaniu aktu notarialnego kupujący staje się właścicielem nieruchomości, a spłata rat odbywa się zgodnie z ustalonym harmonogramem.</p>
             </li> 
          </ol>
                    <div className='separate'></div>
                    <h2>Kto może skorzystać z rat notarialnych?</h2>
                    <p>To rozwiązanie idealne dla:</p>
                    <ul>
                      <li><p>Osób posiadających oszczędności, ale niemogących zapłacić pełnej kwoty od razu.</p></li>
                      <li><p>Przedsiębiorców unikających długoterminowych zobowiązań kredytowych.</p></li>
                      <li><p>Rodzin szukających elastycznego sposobu finansowania zakupu mieszkania lub domu.</p></li>
                      <li><p>Inwestorów, którzy chcą ominąć formalności i koszty związane z kredytem hipotecznym.</p></li>
                    </ul>
                                     <div className='separate'></div>
          </>
        }
        
        right={
          <>
          <h2>Czym są raty notarialne?</h2>
          <p>Raty notarialne to alternatywny sposób finansowania zakupu nieruchomości, w którym płatności rozkładane są na wygodne raty, a cały proces zostaje sformalizowany aktem notarialnym. Dzięki temu zarówno sprzedający, jak i kupujący, zyskują pełne bezpieczeństwo i transparentność transakcji.
Kluczowym elementem rat notarialnych jest właśnie akt notarialny, który precyzyjnie określa warunki płatności, terminy oraz ewentualne zabezpieczenia.</p>
          <p>Nasze biuro nieruchomości jest jedynym w Polsce, które oferuje kompleksową obsługę zakupu nieruchomości na raty notarialne. Dzięki doświadczeniu oraz współpracy z renomowanymi kancelariami notarialnymi gwarantujemy pełne bezpieczeństwo transakcji i indywidualne podejście do każdego klienta.</p>
          <div className='separate'></div>
          <p>Zakup mieszkania lub domu to jedna z najważniejszych decyzji w życiu. Często przeszkodą w realizacji tego marzenia jest brak możliwości jednorazowego uiszczenia pełnej kwoty. Na szczęście istnieje rozwiązanie, które pozwala kupić nieruchomość bez konieczności zaciągania kredytu bankowego — raty notarialne.
Nasze biuro nieruchomości jest jedynym w Polsce, które specjalizuje się w tego rodzaju transakcjach, oferując unikalne i elastyczne podejście do zakupu mieszkań i domów.</p>
          </>
        }
        />
            <div className='card-section-wrapper'>
              <h2>Często zadawane pytania</h2>
              <p>Szukasz odpowiedzi na swoje pytanie? Sprawdź tutaj!</p>
              <div style={{width: 'calc(40% + 150px)'}}>
                <FAQItem question={'Kto może kupić nieruchomość na raty notarialne?'} answer={'Każda osoba pełnoletnia z polskim obywatelstwem. Zarówno osoba pracująca na etacie jak i taka, która prowadzi własny biznes. Nie ma żadnych ograniczeń. Nie weryfikujemy zdolności kredytowej ani raportów BIK, BIG, KRD.'} />
                <FAQItem question={'Czym są raty notarialne / prywatne?'} answer={'Raty notarialne, zwane także prywatnymi, to forma rozłożonej płatności za zakup nieruchomości, która jest regulowana na mocy aktu notarialnego. Kupujący i sprzedający ustalają harmonogram spłat, które są zabezpieczone odpowiednimi zapisami w księdze wieczystej nieruchomości. Taka forma pozwala kupującemu na zakup bez kredytu bankowego, a sprzedającemu zapewnia prawną ochronę transakcji. Wygodna i bezpieczna forma finansowania zakupu nieruchomości, szczególnie dla osób, które nie chcą lub nie mogą skorzystać z tradycyjnego kredytu hipotecznego. Dzięki nim, transakcja odbywa się bez udziału banku, co może przyspieszyć proces zakupu. Raty notarialne dają także większą elastyczność w negocjacjach warunków płatności, umożliwiając dostosowanie harmonogramu do indywidualnych potrzeb kupującego. Dodatkowo, cała umowa jest notarialnie poświadczona, co zapewnia pełną ochronę prawną zarówno dla kupującego, jak i sprzedającego, minimalizując ryzyko jakichkolwiek nieporozumień czy sporów w przyszłości.'} />
                <FAQItem question={'Czy raty notarialne są tańsze od kredytu hipotecznego?'} answer={'Raty notarialne są tańszą alternatywą dla kredytu bankowego, ponieważ nie wiążą się z dodatkowymi kosztami, takimi jak prowizje, ubezpieczenia czy odsetki narzucone przez bank. Co więcej, warunki spłaty można negocjować bezpośrednio ze sprzedającym, co daje większą elastyczność i brak ukrytych opłat. To doskonałe rozwiązanie dla osób, które chcą uniknąć skomplikowanych procedur i oszczędzić na kosztach finansowania.'} />
                <FAQItem question={'Kiedy otrzymam klucze od swojej nowej nieruchomości?'} answer={'Klucze do nieruchomości otrzymasz od razu po podpisaniu aktu notarialnego, co oznacza, że możesz natychmiast zacząć korzystać z nowego lokum! To niezwykle wygodne i szybkie rozwiązanie, które pozwala uniknąć zbędnego oczekiwania na finalizację formalności. Dzięki temu możesz cieszyć się swoją nową nieruchomością od pierwszego dnia!'} />
                <FAQItem question={'Jak kupić krok po kroku mieszkanie lub dom na raty notarialne?'} answer={'To proste! Zacznij od sprawdzenia dostępnych mieszkań i domów na naszej stronie. Znajdź nieruchomość dla siebie, którą pokochasz od pierwszego zobaczenia! Mieszkania i domy na raty notarialne znajdziesz klikając tutaj. Przy każdej nieruchomości znajduje się formularz. Wypełnij go, abyśmy mogli zacząć działać. Umówimy się z Tobą na prezentację nieruchomości. Jeden z naszych przemiłych i pomocnych Agentów skontaktuje się z Tobą, aby umówić dogodny termin prezentacji. Po prezentacji i przedstawieniu warunków zakupu nieruchomości na raty notarialne, jeżeli poczujesz że ta nieruchomość to jest to, czego szukasz, Agent zaprosi Cię do naszego biura w celu podpisania umowy rezerwacyjnej. Od razu po podpisaniu umowy rezerwacyjnej, przystąpimy do działań. Skomplementujemy niezbędną dokumentację dotyczącą nieruchomości, a nasi prawnicy sporządzą odpowiednią umowę, z którą spotkamy się u notariusza. Za nim jednak umówimy termin u notariusza, prześlemy Ci draft takiego dokumentu do wglądu. Nasze biuro nieruchomości działa reprezentując obie strony – sprzedającego i kupującego. Chcemy, aby u notariusza było dopięte wszystko na ostatni guzik, a każda ze stron w pełni świadoma warunków transakcji. Ostatni etap to ten najbardziej wyczekiwany – spotkanie u notariusza. To tutaj zostanie zawarta umowa między sprzedającym, a kupującym. Dopilnujemy wszystkich formalności (w tym także przekazanie do sprzedającego wkładu początkowego), a Ty – otrzymasz klucze od swojej nowej nieruchomości! Jesteśmy z Tobą na każdym etapie współpracy. My, jako eskperci na rynku nieruchomości jesteśmy po to, aby zadbać o wszelkie aspekty, ale także o to, abyś Ty – jako nasz klient, został profesjonalnie obsłużony. Zakup nieruchomości to nierzadko jedna z najważniejszych decyzji w życiu. Jesteśmy po to, aby być z Tobą w tych emocjonujących chwilach od początku do końca, a w razie jakichkolwiek pytań lub wątpliwości, doradzać najlepsze rozwiązania.'} />
                <FAQItem question={'Czy mogę sprzedać nieruchomość, którą kupiłem na raty notarialne?'} answer={'Oczywiście, że tak. Jeśli nieruchomość została w pełni przez Ciebie spłacona, to jesteś jej pełnoprawnym właścicielem i masz prawo do jej sprzedaży lub przekazania na dowolnych warunkach. W takim przypadku możesz sprzedać nieruchomość, wynająć ją lub dokonać jakiejkolwiek innej transakcji, która nie będzie ograniczona żadnymi zobowiązaniami finansowymi. Warto pamiętać, że w momencie, gdy cała kwota została uregulowana, procedura sprzedaży nieruchomości nie różni się od standardowej sprzedaży nieruchomości, którą posiadasz w pełni na własność. Jeśli jesteś w trakcie spłaty nieruchomości, sprzedaż jest nadal możliwa, ale wymaga spełnienia określonych formalności. W takim przypadku możesz przeprowadzić tzw. cesję umowy, czyli przenieść obowiązki związane ze spłatą na inną osobę. Nabywca nieruchomości staje się nowym dłużnikiem, a Ty, jako dotychczasowy właściciel, zobowiązujesz się do uregulowania reszty rat lub do przekazania tych obowiązków nowemu nabywcy. Cesja umowy wymaga zgody zarówno sprzedającego, jak i instytucji, która nadzoruje spłatę rat (np. notariusza czy banku, jeśli taka instytucja jest zaangażowana w proces). Przed podjęciem decyzji o sprzedaży nieruchomości w trakcie spłaty, zaleca się skontaktowanie się z prawnikiem lub notariuszem, aby upewnić się, że wszystkie procedury zostaną przeprowadzone zgodnie z przepisami prawa, a wszystkie strony będą odpowiednio chronione. W przypadku sprzedaży nieruchomości, na której ciąży jeszcze obowiązek spłaty, warto również sprawdzić, czy nowy nabywca spełnia wymagania dotyczące przejęcia zobowiązań oraz czy nie wpłynie to na warunki umowy.'} />
                <FAQItem question={'Czy istnieje możliwość wcześniejszej spłaty nieruchomości na raty notarialne?'} answer={'Jak najbardziej jest taka możliwość. Masz pełną dowolność jeśli chodzi o wcześniejszą spłatę. Najważniejsze jest to, aby nie dopuszczać do opóźnienień w płatnościach.'} />
                <FAQItem question={'Jakie są koszty związane z zakupem nieruchomości na raty notarialne?'} answer={'W przypadku rat notarialnych nie występują dodatkowe koszty związane z oprocentowaniem kredytu bankowego, co czyni tę formę finansowania bardziej przejrzystą i często tańszą w porównaniu z tradycyjnym kredytem hipotecznym. Kupująch nieruchomość na raty notarialne za pośrednictwem naszego biura nieruchomości, nie ponosisz żadnych dodatkowych kosztów! Podane ceny na naszej stronie są cenami już finalnymi!'} />
                <FAQItem question={'Co się dzieje w przypadku opóźnienia w spłacie raty?'} answer={'W sytuacji opóźnienia w spłacie raty, obowiązują postanowienia zawarte w akcie notarialnym. Zazwyczaj umowa precyzuje: Okres karencji: czas, w którym opóźnienie jest akceptowalne bez konsekwencji. Odsetki za zwłokę: wysokość dodatkowych opłat naliczanych za każdy dzień opóźnienia. Możliwe sankcje: w skrajnych przypadkach, przy długotrwałym braku płatności, sprzedający może dochodzić swoich praw na drodze sądowej, co może skutkować rozwiązaniem umowy i utratą prawa do nieruchomości przez kupującego. Aby uniknąć nieporozumień, ważne jest dokładne zapoznanie się z warunkami umowy i terminowe regulowanie zobowiązań. W przypadku przewidywanych trudności finansowych zaleca się niezwłoczny kontakt ze sprzedającym w celu wypracowania ewentualnych rozwiązań.'} />
              </div>
          </div>
          <Footer/>
    </div>
  )
}
