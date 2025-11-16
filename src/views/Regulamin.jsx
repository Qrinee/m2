import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'

export default function RegulaminSerwisu() {
  return (
    <div>
        <Header black />
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                <Breadcrumbs items={['Strona główna', "Regulamin Serwisu"]} />
                <div className='sm-separate'></div>
                    <h1>REGULAMIN SERWISU M2 NOTARIALNIE</h1>
                    <div className='polityka'>
                    
                    <h2>I. DEFINICJE</h2>
                    <p>W niniejszym Regulaminie używa się następujących pojęć:</p>
                    
                    <h3>1. Usługodawca / Administrator</h3>
                    <p>FREY&KISIO ESTATE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</p>
                    <p>Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa, Polska</p>
                    <p>kontakt@m2notarialnie.pl tel: +48 728-866-825, +48 696-266-381</p>
                    <p>REGON: 528946180</p>
                    <p>NIP: 5253007302</p>
                    <p>KRS: 0001111768</p>
                    <p>Wpisana do rejestru przedsiębiorców przez SĄD REJONOWY DLA M.ST. WARSZAWY W WARSZAWY, XII WYDZIAŁ GOSPODARCZY KRAJOWEGO REJESTRU SĄDOWEGO</p>
                    
                    <h3>2. Serwis / Platforma</h3>
                    <p>Serwis internetowy dostępny pod adresem M2Notarialnie.pl, służący do publikacji ogłoszeń, prezentacji ofert nieruchomości, komunikacji, wycen, obsługi rat notarialnych, konfiguratorów oraz usług informacyjnych.</p>
                    
                    <h3>3. Użytkownik</h3>
                    <p>Każda osoba, która korzysta z Serwisu, zakłada Konto, przegląda oferty, publikuje ogłoszenia, dokonuje płatności lub korzysta z usług dodatkowych.</p>
                    
                    <h3>4. Przedsiębiorca</h3>
                    <p>Użytkownik prowadzący działalność gospodarczą, podający dane firmy (NIP, REGON, KRS).</p>
                    
                    <h3>5. Konto</h3>
                    <p>Panel użytkownika umożliwiający publikację ogłoszeń, zarządzanie danymi, komunikację oraz korzystanie z usług płatnych i bezpłatnych.</p>
                    
                    <h3>6. Ogłoszenie</h3>
                    <p>Treść zamieszczona przez Użytkownika dotycząca nieruchomości na sprzedaż, zakup, wynajem, raty notarialne lub współpracy.</p>
                    
                    <h3>7. Usługi</h3>
                    <p>Wszystkie funkcjonalności Serwisu, w tym: ogłoszenia, płatności, promocje, konfiguratory, wyceny, newsletter, raty notarialne, weryfikacje, informatory.</p>
                    
                    <h3>8. Usługi płatne</h3>
                    <p>Usługi dodatkowe dostępne za opłatą, takie jak: promocja ogłoszeń, pakiety, podbicia, wyróżnienia, moduły konfiguracyjne.</p>
                    
                    <h3>9. Formularz</h3>
                    <p>Interaktywny moduł umożliwiający przesyłanie danych: kontaktowych, wyceny, zapytań, konfiguracji</p>
                    
                    <h3>10. Newsletter</h3>
                    <p>Usługa polegająca na wysyłaniu informacji handlowych i branżowych po wyrażeniu zgody.</p>
                    
                    <hr></hr>
                    
                    <h2>II. POSTANOWIENIA OGÓLNE</h2>
                    <p><b>1.</b> Niniejszy Regulamin określa warunki korzystania z Serwisu M2Notarialnie.pl, w szczególności zasady:</p>
                    <ul>
                        <li>rejestracji i prowadzenia Konta Użytkownika,</li>
                        <li>publikacji Ogłoszeń,</li>
                        <li>korzystania z usług odpłatnych i nieodpłatnych,</li>
                        <li>dokonywania płatności za usługi świadczone przez Serwis,</li>
                        <li>postępowania reklamacyjnego.</li>
                    </ul>
                    
                    <p><b>2.</b> Każda osoba korzystająca z Serwisu zobowiązana jest do zapoznania się z treścią Regulaminu. Rozpoczęcie korzystania z Serwisu (w szczególności rejestracja Konta lub publikacja Ogłoszenia) oznacza akceptację Regulaminu.</p>
                    
                    <p><b>3.</b> Goście (osoby niezalogowane) mogą korzystać z ograniczonych funkcji Serwisu, w szczególności przeglądać Ogłoszenia oraz korzystać z wybranych formularzy kontaktowych, z poszanowaniem przepisów prawa i zasad współżycia społecznego.</p>
                    
                    <p><b>4.</b> Treści publikowane w Serwisie, w szczególności Ogłoszenia i inne materiały tekstowe, graficzne, wideo oraz układ i funkcjonalność Serwisu, stanowią przedmiot ochrony praw własności intelektualnej – należących do FREY&KISIO ESTATE sp. z o.o., Użytkowników lub podmiotów trzecich. Jakiekolwiek ich wykorzystywanie, kopiowanie, agregowanie, masowe pobieranie lub dalsze udostępnianie poza Serwisem bez uprzedniej pisemnej zgody uprawnionego jest zabronione.</p>
                    
                    <p><b>5.</b> Zabrania się w szczególności:</p>
                    <ul>
                        <li>agregowania i przetwarzania danych oraz innych informacji dostępnych w Serwisie w celu ich dalszego udostępniania w innych serwisach internetowych lub poza Internetem,</li>
                        <li>wykorzystywania oznaczeń M2 Notarialnie, nazwy Serwisu, logotypów oraz charakterystycznych elementów grafiki bez zgody FREY&KISIO ESTATE sp. z o.o.,</li>
                        <li>automatycznego pobierania danych (scraping, crawling, boty) oraz tworzenia na ich podstawie baz danych.</li>
                    </ul>
                    
                    <p><b>6.</b> Z zastrzeżeniem licencji udzielanych na rzecz FREY&KISIO ESTATE zgodnie z postanowieniami Regulaminu, żaden zapis Regulaminu nie stanowi udzielenia zgody na korzystanie z praw własności intelektualnej FREY&KISIO ESTATE lub praw osób trzecich ponad zakres wynikający z normalnego korzystania z Serwisu.</p>
                    
                    <p><b>7.</b> FREY&KISIO ESTATE sp. z o.o. nie jest stroną umów sprzedaży, najmu, dzierżawy lub innych umów dotyczących nieruchomości zawieranych pomiędzy Użytkownikami za pośrednictwem Serwisu lub w związku z korzystaniem z Serwisu, w tym również w ramach ofert zakupu na raty notarialne. Serwis ma charakter informacyjny i ogłoszeniowy.</p>
                    
                    <p><b>8.</b> Użytkownicy mogą nawiązywać kontakt i zawierać umowy:</p>
                    <ul>
                        <li>bezpośrednio między sobą, korzystając z danych kontaktowych udostępnionych w Ogłoszeniu, formularzy kontaktowych Serwisu lub innych ustalonych przez siebie form komunikacji,</li>
                        <li>za pośrednictwem wybranych partnerów Serwisu (np. kancelarii notarialnych, doradców kredytowych), na warunkach ustalonych bezpośrednio z tymi podmiotami.</li>
                    </ul>
                    
                    <p><b>9.</b> W ramach Serwisu dostępne są w szczególności następujące funkcjonalności:</p>
                    <ul>
                        <li>przeglądanie zawartości Serwisu i wyszukiwanie Ogłoszeń,</li>
                        <li>rejestracja Konta i korzystanie z panelu Użytkownika,</li>
                        <li>publikacja Ogłoszeń bezpłatnych i płatnych,</li>
                        <li>korzystanie z usług dodatkowych (np. promowania Ogłoszeń, wyceny nieruchomości, konfiguratorów ofert, usług związanych z ratami notarialnymi),</li>
                        <li>zapis do newslettera i otrzymywanie informacji marketingowych – po wyrażeniu zgody.</li>
                    </ul>
                    
                    <p><b>10.</b> Usługi polegające na przeglądaniu Ogłoszeń, założeniu i prowadzeniu Konta oraz publikacji Ogłoszeń w ramach limitów bezpłatnych są świadczone nieodpłatnie. Zakres i rodzaje usług odpłatnych określa Regulamin oraz cennik udostępniony w Serwisie.</p>
                    
                    <p><b>11.</b> Usługi płatności online za usługi świadczone przez Serwis realizowane są przez zewnętrznych operatorów płatności, na podstawie odrębnych regulaminów tych podmiotów. FREY&KISIO ESTATE sp. z o.o. nie jest stroną umów zawieranych pomiędzy Użytkownikiem a operatorem płatności.</p>
                    
                    <p><b>12.</b> Do korzystania z Serwisu w pełnym zakresie wymagane jest:</p>
                    <ul>
                        <li>posiadanie urządzenia z dostępem do Internetu,</li>
                        <li>aktualnej przeglądarki internetowej obsługującej standard HTML5, CSS3 oraz JavaScript,</li>
                        <li>włączona obsługa plików cookies,</li>
                        <li>aktywny adres e-mail.</li>
                    </ul>
                    
                    <p><b>13.</b> Usługodawca dokłada należytej staranności, aby zapewnić ciągłość działania Serwisu. Dążąc do poprawy jakości usług, Usługodawca ma prawo do wprowadzania przerw technicznych, w szczególności w godzinach nocnych, podczas których niektóre funkcje Serwisu mogą być czasowo ograniczone lub niedostępne.</p>
                    
                    <p><b>14.</b> Użytkownik przyjmuje do wiadomości, że mogą wystąpić awarie techniczne, w szczególności z przyczyn niezależnych od Usługodawcy (awarie dostawców Internetu, serwerów, ataki zewnętrzne). W przypadku poważnej awarii technicznej Usługodawca może przedłużyć czas emisji aktywnych Ogłoszeń o okres odpowiadający czasowi jej trwania lub o inny rozsądny okres, według własnego uznania.</p>
                    
                    <hr></hr>
                    
                    <h2>III. KONTO</h2>
                    <p><b>1.</b> W celu uzyskania pełnej funkcjonalności Serwisu Użytkownik powinien:</p>
                    <ul>
                        <li>dokonać rejestracji Konta,</li>
                        <li>określić, czy korzysta z Serwisu jako osoba prywatna czy jako przedsiębiorca,</li>
                        <li>korzystać z Serwisu jako Użytkownik zalogowany.</li>
                    </ul>
                    
                    <p><b>2.</b> Konto umożliwia w szczególności:</p>
                    <ul>
                        <li>publikowanie i edytowanie Ogłoszeń,</li>
                        <li>przeglądanie historii własnych Ogłoszeń,</li>
                        <li>zarządzanie usługami płatnymi i fakturami,</li>
                        <li>odbieranie wiadomości od innych Użytkowników,</li>
                        <li>korzystanie z dodatkowych funkcji Serwisu (np. konfiguratorów, zapisanych wyszukiwań, preferencji).</li>
                    </ul>
                    
                    <p><b>3.</b> Użytkownikiem może być:</p>
                    <ul>
                        <li>osoba fizyczna posiadająca pełną zdolność do czynności prawnych,</li>
                        <li>osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, której ustawa przyznaje zdolność prawną – działająca przez należycie umocowanego przedstawiciela.</li>
                    </ul>
                    
                    <p><b>4.</b> Użytkownik może posiadać jedno Konto prywatne oraz – w razie potrzeby – odrębne Konto firmowe. Zakazane jest tworzenie wielu Kont wyłącznie w celu obchodzenia limitów, zasad lub płatności.</p>
                    
                    <p><b>5.</b> Rejestracja Konta wymaga:</p>
                    <ul>
                        <li>wypełnienia formularza rejestracyjnego i podania wymaganych danych (w tym adresu e-mail oraz hasła) lub rejestracji za pomocą zewnętrznych usług (np. Google, Facebook),</li>
                        <li>zapoznania się z Regulaminem i Polityką Prywatności oraz ich akceptacji.</li>
                    </ul>
                    
                    <p><b>6.</b> Użytkownik zobowiązany jest podawać dane prawdziwe, aktualne i zgodne z prawem oraz aktualizować je w razie zmiany. Usługodawca ma prawo zablokować Konto w przypadku uzasadnionych wątpliwości co do prawdziwości danych.</p>
                    
                    <p><b>7.</b> Użytkownik jest zobowiązany do zachowania poufności danych dostępowych do Konta. W razie podejrzenia, że dane te zostały przejęte przez osoby trzecie, Użytkownik powinien niezwłocznie zmienić hasło i poinformować Usługodawcę.</p>
                    
                    <p><b>8.</b> Umowa o prowadzenie Konta zawierana jest na czas nieokreślony i może zostać rozwiązana:</p>
                    <ul>
                        <li>przez Użytkownika – poprzez usunięcie Konta w panelu lub złożenie odpowiedniego żądania,</li>
                        <li>przez Usługodawcę – w przypadkach przewidzianych w Regulaminie, w szczególności w razie rażącego naruszenia jego postanowień.</li>
                    </ul>
                    
                    <p><b>9.</b> Usunięcie Konta powoduje utratę dostępu do historii Ogłoszeń i zgromadzonych danych, z zastrzeżeniem danych, które Usługodawca ma obowiązek przechowywać na podstawie przepisów prawa.</p>
                    
                    <hr></hr>
                    
                    <h2>IV. ZASADY PUBLIKACJI OGŁOSZEŃ</h2>
                    <p><b>1.</b> Usługodawca umożliwia Użytkownikom publikację Ogłoszeń dotyczących nieruchomości, w szczególności sprzedaży, najmu, dzierżawy, sprzedaży w ratach notarialnych oraz innych form związanych z obrotem nieruchomościami.</p>
                    
                    <p><b>2.</b> Ogłoszenie publikowane jest po wypełnieniu formularza oraz – w przypadku usług odpłatnych – po dokonaniu wymaganej płatności.</p>
                    
                    <p><b>3.</b> Ogłoszenie powinno zawierać prawdziwe, rzetelne i aktualne informacje, w szczególności:</p>
                    <ul>
                        <li>stan prawny nieruchomości,</li>
                        <li>podstawowe parametry (powierzchnia, liczba pomieszczeń, rodzaj zabudowy itd.),</li>
                        <li>lokalizację w stopniu umożliwiającym identyfikację oferty (np. miejscowość, dzielnica),</li>
                        <li>informacje o cenie oraz ewentualnych innych kosztach,</li>
                        <li>opis nieruchomości,</li>
                        <li>realne zdjęcia lub inne materiały prezentujące nieruchomość (jeżeli są dodawane).</li>
                    </ul>
                    
                    <p><b>4.</b> Zabronione jest:</p>
                    <ul>
                        <li>publikowanie nieruchomości, do których Użytkownik nie ma prawa dysponowania,</li>
                        <li>dodawanie fałszywych, fikcyjnych lub wprowadzających w błąd Ogłoszeń,</li>
                        <li>publikowanie treści sprzecznych z prawem, dobrymi obyczajami lub naruszających prawa osób trzecich,</li>
                        <li>zamieszczanie w Ogłoszeniu treści reklamowych innych serwisów ogłoszeniowych lub linków służących omijaniu Serwisu,</li>
                        <li>duplikowanie Ogłoszeń dotyczących tej samej nieruchomości w sposób sztucznie zwiększający ich liczbę.</li>
                    </ul>
                    
                    <p><b>5.</b> Usługodawca ma prawo:</p>
                    <ul>
                        <li>dokonywać wstępnej moderacji Ogłoszeń,</li>
                        <li>usuwać lub blokować Ogłoszenia naruszające Regulamin lub przepisy prawa,</li>
                        <li>zmieniać kategorie przypisane do Ogłoszenia, jeżeli zostało ono błędnie zakwalifikowane.</li>
                    </ul>
                    
                    <p><b>6.</b> Publikacja Ogłoszeń odbywa się na czas określony wskazany w Serwisie (np. 30 dni), z możliwością przedłużenia lub ponownej publikacji zgodnie z obowiązującym cennikiem.</p>
                    
                    <p><b>7.</b> Usługodawca nie ponosi odpowiedzialności za treści ogłoszeń (art. 14 UŚUE – wyłączenie odpowiedzialności hostingodawcy)</p>
                    
                    <p><b>8.</b> Serwis ma prawo:</p>
                    <ul>
                        <li>moderować treści,</li>
                        <li>usuwać ogłoszenia niezgodne z Regulaminem,</li>
                        <li>wstrzymać publikację do czasu weryfikacji.</li>
                    </ul>
                    
                    <hr></hr>
                    
                    <h2>V. OGŁOSZENIA BEZPŁATNE I PŁATNE</h2>
                    <p><b>1.</b> Serwis może udostępniać Użytkownikom:</p>
                    <ul>
                        <li>limit bezpłatnych Ogłoszeń w określonych kategoriach,</li>
                        <li>Ogłoszenia płatne – po wykorzystaniu limitu lub w kategoriach w pełni odpłatnych.</li>
                    </ul>
                    <p>Zakres limitów, czas emisji oraz rodzaje usług promowania Ogłoszeń określa cennik lub załącznik do Regulaminu dostępny w Serwisie.</p>
                    <p>Ogłoszenia promowane (wyróżnienia, podbicia, pakiety) są usługami odpłatnymi i nie gwarantują zawarcia umowy sprzedaży ani konkretnego efektu.</p>
                    
                    <h3>2. Usługi specjalne – „RATY NOTARIALNE” - doradztwo, analiza</h3>
                    <p>Serwis umożliwia:</p>
                    <ul>
                        <li>publikowanie ofert sprzedaży na raty notarialne,</li>
                        <li>kontakt z kancelariami notarialnymi,</li>
                        <li>przekazanie danych do obsługi transakcji</li>
                    </ul>
                    
                    <hr></hr>
                    
                    <h2>VI. PŁATNOŚCI ZA USŁUGI SERWISU</h2>
                    <p><b>1.</b> Płatności za usługi Serwisu M2 Notarialnie są realizowane wyłącznie za pośrednictwem zewnętrznych operatorów płatności, którzy działają zgodnie z prawem Unii Europejskiej, w szczególności z:</p>
                    <ul>
                        <li>dyrektywą PSD2,</li>
                        <li>przepisami o usługach płatniczych,</li>
                        <li>przepisami dotyczącymi przeciwdziałania praniu pieniędzy i finansowaniu terroryzmu.</li>
                    </ul>
                    <p>Operator płatności zapewnia bezpieczeństwo transakcji oraz szyfrowanie danych zgodne z aktualnymi standardami technologicznymi.</p>
                    
                    <p><b>2.</b> Użytkownik może dokonać płatności za usługi udostępniane w Serwisie za pomocą udostępnionych metod, w szczególności:</p>
                    <ul>
                        <li>płatności online (Pay-by-link),</li>
                        <li>płatności BLIK,</li>
                        <li>kart płatniczych (debetowych i kredytowych),</li>
                        <li>przelewu tradycyjnego (jeżeli jest dostępny),</li>
                        <li>innych metod udostępnionych przez operatora płatności.</li>
                    </ul>
                    
                    <p><b>3.</b> Rozpoczęcie publikacji Ogłoszenia lub uruchomienie usługi płatnej następuje dopiero po zaksięgowaniu płatności przez operatora płatności.</p>
                    <p>Brak płatności → brak publikacji Ogłoszenia lub brak aktywacji usługi.</p>
                    
                    <p><b>4.</b> Po dokonaniu płatności Użytkownik otrzymuje:</p>
                    <ul>
                        <li>elektroniczne potwierdzenie płatności,</li>
                        <li>dokument księgowy (paragon lub fakturę) wysyłany na podany adres e-mail lub dostępny w panelu Użytkownika.</li>
                    </ul>
                    
                    <p><b>5.</b> Usługi płatne w Serwisie mają charakter cyfrowy i są realizowane w momencie aktywacji.</p>
                    <p>Dlatego – zgodnie z przepisami o prawach konsumenta – nie podlegają zwrotowi po ich wykonaniu, tzn. po aktywowaniu ogłoszenia lub usługi promowanej.</p>
                    <p>Przed dokonaniem płatności Użytkownik jest informowany, że wykonanie usługi cyfrowej przed upływem terminu odstąpienia od umowy powoduje utratę prawa odstąpienia.</p>
                    
                    <p><b>6.</b> Usługodawca nie przechowuje ani nie przetwarza danych kart płatniczych.</p>
                    <p>Wszystkie operacje na kartach odbywają się wyłącznie w systemie operatora płatności, przy wykorzystaniu tokenizacji lub innych technologii zabezpieczeń.</p>
                    
                    <p><b>7.</b> W przypadku problemów z płatnością Użytkownik powinien:</p>
                    <ul>
                        <li>upewnić się, że bank nie blokuje płatności internetowych,</li>
                        <li>sprawdzić poprawność danych,</li>
                        <li>powiadomić operatora płatności,</li>
                        <li>skontaktować się z działem obsługi Serwisu poprzez formularz lub adres kontaktowy.</li>
                    </ul>
                    
                    <p><b>8.</b> Serwis nie odpowiada za opóźnienia lub brak możliwości realizacji płatności wynikające z przyczyn niezależnych, takich jak:</p>
                    <ul>
                        <li>awarie banków,</li>
                        <li>przerwy techniczne operatorów,</li>
                        <li>problemy techniczne po stronie Użytkownika.</li>
                    </ul>
                    
                    <p><b>9.</b> Ceny usług są określone w cenniku dostępnym w Serwisie i mogą ulegać zmianom.</p>
                    <p>Zmiany cen nie dotyczą usług już opłaconych.</p>
                    
                    <p><b>10.</b> W przypadku nadużyć finansowych (np. chargeback, próby oszustwa) Usługodawca ma prawo:</p>
                    <ul>
                        <li>czasowo zablokować Konto,</li>
                        <li>odmówić realizacji kolejnych usług,</li>
                        <li>przekazać sprawę operatorowi płatności lub odpowiednim organom,</li>
                        <li>domagać się odszkodowania.</li>
                    </ul>
                    
                    <p><b>11.</b> Usługi płatne nie podlegają zwrotowi po ich realizacji.</p>
                    <p><b>12.</b> Serwis nie jest stroną umowy sprzedaży.</p>
                    
                    <hr></hr>
                    
                    <h2>VII. FORMULARZE I PRZEKAZYWANIE DANYCH</h2>
                    <p><b>1.</b> Dane przesłane przez formularze przekazywane są sprzedającym, doradcom lub partnerom — wyłącznie za zgodą użytkownika.</p>
                    <p><b>2.</b> Serwis nie odpowiada za kontakt między użytkownikami.</p>
                    <p><b>3.</b> Przesłanie formularza jest dobrowolne.</p>
                    
                    <hr></hr>
                    
                    <h2>VIII. NEWSLETTER I MARKETING</h2>
                    <p><b>1.</b> Newsletter jest wysyłany wyłącznie po wyrażeniu zgody.</p>
                    <p><b>2.</b> Użytkownik może w każdej chwili zrezygnować.</p>
                    <p><b>3.</b> Serwis może wysyłać:</p>
                    <ul>
                        <li>oferty,</li>
                        <li>aktualności,</li>
                        <li>informacje o promocjach,</li>
                        <li>powiadomienia o zmianach w serwisie.</li>
                    </ul>
                    
                    <hr></hr>
                    
                    <h2>IX. ODPOWIEDZIALNOŚĆ</h2>
                    <p><b>1.</b> Serwis nie odpowiada za:</p>
                    
                    <p><b>a) Treści i prawdziwość ogłoszeń</b></p>
                    <ul>
                        <li>dane, zdjęcia, opisy, parametry, stan prawny nieruchomości,</li>
                        <li>ukryte wady nieruchomości,</li>
                        <li>błędne, nieaktualne lub nieprecyzyjne informacje podane przez użytkownika.</li>
                    </ul>
                    
                    <p><b>b) Działania użytkowników</b></p>
                    <ul>
                        <li>zachowania sprzedających i kupujących,</li>
                        <li>brak kultury komunikacji,</li>
                        <li>błędne interpretacje ofert.</li>
                    </ul>
                    
                    <p><b>c) Decyzje sprzedażowe, finansowe i prawne użytkowników</b></p>
                    <ul>
                        <li>decyzje inwestycyjne, kredytowe, notarialne,</li>
                        <li>ustalone warunki sprzedaży, ceny, zadatki, umowy,</li>
                        <li>skutki umów cywilnoprawnych zawieranych pomiędzy użytkownikami.</li>
                    </ul>
                    
                    <p><b>d) Nieprawidłowości techniczne niezależne od Serwisu</b></p>
                    <ul>
                        <li>awarie Internetu lub operatorów telekomunikacyjnych,</li>
                        <li>przerwy techniczne, aktualizacje systemowe,</li>
                        <li>błędy przeglądarek użytkownika, urządzeń lub systemów zewnętrznych.</li>
                    </ul>
                    
                    <p><b>e) Szkody spowodowane siłą wyższą</b></p>
                    <ul>
                        <li>zdarzenia losowe, klęski żywiołowe, ingerencje osób trzecich,</li>
                        <li>ataki DDoS, włamania hakerskie, których nie można było przewidzieć.</li>
                    </ul>
                    
                    <p><b>f) Przetwarzanie danych przez użytkowników lub podmioty trzecie</b></p>
                    <ul>
                        <li>przetwarzanie danych osobowych przez ogłoszeniodawcę po udostępnieniu mu ich przez formularz,</li>
                        <li>nadużycia danych przez użytkowników.</li>
                    </ul>
                    
                    <p><b>g) Straty wynikłe z braku kontaktu między użytkownikami</b></p>
                    <ul>
                        <li>brak odpowiedzi na wiadomości,</li>
                        <li>brak chęci sprzedaży po wstępnych ustaleniach,</li>
                        <li>brak finalizacji transakcji mimo zainteresowania.</li>
                    </ul>
                    
                    <p><b>h) Wszelkie szkody wynikające z naruszenia Regulaminu przez Użytkownika</b></p>
                    <p><b>i) Oferty pochodzące od zewnętrznych deweloperów, inwestorów lub partnerów</b></p>
                    
                    <p><b>2.</b> Serwis nie gwarantuje:</p>
                    <ul>
                        <li>sprzedaży nieruchomości,</li>
                        <li>uzyskania kontaktu od potencjalnych klientów,</li>
                        <li>zwiększenia zainteresowania ofertą,</li>
                        <li>efektów publikacji ogłoszeń,</li>
                        <li>aktualności ofert publikowanych przez użytkowników,</li>
                        <li>że oferta nie zostanie sprzedana w innym miejscu.</li>
                    </ul>
                    
                    <p><b>3.</b> Serwis nie świadczy usług:</p>
                    <ul>
                        <li>pośrednictwa nieruchomości,</li>
                        <li>doradztwa kredytowego, podatkowego, finansowego ani prawnego,</li>
                        <li>gwarancji stanu prawnego nieruchomości.</li>
                    </ul>
                    
                    <p><b>4.</b> Serwis nie jest stroną transakcji pomiędzy użytkownikami</p>
                    <p>Serwis nie uczestniczy w umowie sprzedaży, najmu czy zakupu nieruchomości, nie pobiera prowizji, należności ani zadatków.</p>
                    
                    <p><b>5.</b> Użytkownik korzysta z Serwisu na własne ryzyko i własną odpowiedzialność</p>
                    <p>Ograniczenia odpowiedzialności wobec konsumentów obowiązują tylko w zakresie dopuszczalnym przez prawo.</p>
                    
                    <hr></hr>
                    
                    <h2>X. PRAWA AUTORSKIE</h2>
                    <p><b>1.</b> Wszystkie treści Serwisu, w tym w szczególności:</p>
                    <ul>
                        <li>grafiki, zdjęcia, dokumenty, materiały informacyjne,</li>
                        <li>teksty, opisy, formularze, narzędzia, konfiguratory,</li>
                        <li>układ strony, struktura danych, układ treści,</li>
                        <li>logo, elementy identyfikacji wizualnej, nazwa „M2 Notarialnie",</li>
                        <li>elementy interfejsu użytkownika, moduły funkcjonalne,</li>
                    </ul>
                    <p>należą do FREY&KISIO ESTATE sp. z o.o. i są chronione przepisami prawa autorskiego oraz praw pokrewnych, w tym ustawą o prawie autorskim i prawach pokrewnych.</p>
                    
                    <p><b>2.</b> Zabrania się bez zgody Usługodawcy:</p>
                    <ul>
                        <li>kopiowania, pobierania, utrwalania lub powielania treści Serwisu,</li>
                        <li>modyfikowania, przetwarzania lub tłumaczenia treści,</li>
                        <li>wykorzystywania materiałów w celach komercyjnych, marketingowych lub zawodowych,</li>
                        <li>publikacji treści poza Serwisem,</li>
                        <li>automatycznego pobierania danych (scraping, crawling, bots),</li>
                        <li>tworzenia baz danych z wykorzystaniem treści M2 Notarialnie,</li>
                        <li>używania elementów identyfikacji wizualnej Serwisu (logo, grafiki, nazwy) bez pisemnej zgody.</li>
                    </ul>
                    
                    <p><b>3.</b> Materiały zamieszczane przez użytkowników</p>
                    <p>Użytkownik oświadcza, że:</p>
                    <ul>
                        <li>jest właścicielem praw autorskich do treści, zdjęć, opisów i materiałów, które publikuje,</li>
                        <li>materiały nie naruszają praw osób trzecich,</li>
                        <li>ponosi pełną odpowiedzialność za opublikowane materiały.</li>
                    </ul>
                    <p>Użytkownik udziela Serwisowi:</p>
                    <p>niewyłącznej, nieodpłatnej licencji na korzystanie z opublikowanych treści, w zakresie niezbędnym do:</p>
                    <ul>
                        <li>wyświetlania ogłoszeń w Serwisie,</li>
                        <li>promowania ogłoszeń i Serwisu (np. social media, newsletter),</li>
                        <li>współpracy z partnerami (np. portale partnerskie, narzędzia marketingowe),</li>
                        <li>archiwizacji i prowadzenia działalności Serwisu.</li>
                    </ul>
                    <p>Licencja obowiązuje przez cały okres publikacji ogłoszenia, a po jego usunięciu — wyłącznie w celach archiwizacyjnych i dowodowych.</p>
                    
                    <p><b>4.</b> Naruszenia praw autorskich</p>
                    <p>W przypadku naruszenia praw autorskich Usługodawca ma prawo do:</p>
                    <ul>
                        <li>natychmiastowego usunięcia treści,</li>
                        <li>zablokowania lub usunięcia konta użytkownika,</li>
                        <li>dochodzenia odszkodowania na podstawie art. 79 ustawy o prawie autorskim,</li>
                        <li>zgłoszenia sprawy organom ścigania, jeśli naruszenie ma charakter przestępczy.</li>
                    </ul>
                    
                    <p><b>5.</b> Prawa do nazw i znaków</p>
                    <p>Nazwa „M2 Notarialnie", logo, branding oraz wszelkie elementy identyfikacji wizualnej są chronione prawem i nie mogą być wykorzystywane bez pisemnej zgody FREY&KISIO ESTATE sp. z o.o.</p>
                    
                    <p><b>6.</b> Zabrania się:</p>
                    <ul>
                        <li>kopiowania,</li>
                        <li>powielania,</li>
                        <li>wykorzystywania w celach komercyjnych,</li>
                        <li>publikacji treści poza Serwisem bez zgody.</li>
                    </ul>
                    
                    <hr></hr>
                    
                    <h2>XI. OCHRONA BAZY DANYCH</h2>
                    <p><b>1.</b> Baza danych Serwisu M2 Notarialnie, obejmująca w szczególności:</p>
                    <ul>
                        <li>ogłoszenia użytkowników,</li>
                        <li>dane kontaktowe podawane w ogłoszeniach,</li>
                        <li>opisy, zdjęcia, parametry nieruchomości,</li>
                        <li>historię publikacji,</li>
                        <li>statystyki, metadane i strukturę informacji,</li>
                    </ul>
                    <p>jest chroniona na podstawie ustawy z dnia 27 lipca 2001 r. o ochronie baz danych, jak również innych przepisów prawa powszechnie obowiązującego.</p>
                    
                    <p><b>2.</b> Zabrania się bez zgody FREY&KISIO ESTATE sp. z o.o.:</p>
                    <ul>
                        <li>pobierania, kopiowania, odtwarzania lub przetwarzania bazy danych w całości lub w istotnej części,</li>
                        <li>pobierania danych automatycznymi narzędziami, w tym:</li>
                        <ul>
                            <li>botami, crawlerami, scraperami, parserami,</li>
                            <li>narzędziami monitorującymi ogłoszenia,</li>
                            <li>systemami tworzącymi katalogi lub archiwa ogłoszeń,</li>
                        </ul>
                        <li>wykorzystywania danych w celach komercyjnych, statystycznych, marketingowych lub jakichkolwiek innych niż osobiste,</li>
                        <li>tworzenia nowych baz danych, serwisów, aplikacji lub zestawień przy użyciu danych z Serwisu,</li>
                        <li>sprzedaży, udostępniania, publikowania lub eksportowania danych uzyskanych z M2 Notarialnie,</li>
                        <li>wykorzystania danych ogłoszeń do prowadzenia działalności konkurencyjnej,</li>
                        <li>podejmowania prób obejścia zabezpieczeń technicznych lub logicznych Serwisu.</li>
                    </ul>
                    
                    <p><b>3.</b> Każdy przypadek naruszenia bazy danych stanowi podstawę do:</p>
                    <ul>
                        <li>natychmiastowej blokady lub usunięcia konta użytkownika,</li>
                        <li>odmowy dalszego świadczenia usług,</li>
                        <li>dochodzenia roszczeń odszkodowawczych na podstawie ustawy o ochronie baz danych (art. 8–11),</li>
                        <li>zgłoszenia sprawy właściwym organom, jeżeli naruszenie nosi znamiona przestępstwa,</li>
                        <li>dochodzenia roszczeń cywilnych, w tym za szkody majątkowe wynikłe z naruszenia.</li>
                    </ul>
                    
                    <p><b>4.</b> Dopuszczalne jest jedynie korzystanie z danych Serwisu w zakresie:</p>
                    <ul>
                        <li>osobistego przeglądania ogłoszeń,</li>
                        <li>kontaktowania się z ogłoszeniodawcami w celu zawarcia transakcji,</li>
                        <li>korzystania z funkcji Serwisu zgodnie z Regulaminem.</li>
                    </ul>
                    
                    <p><b>5.</b> Użytkownik, korzystając z Serwisu, akceptuje ochronę bazy danych i zobowiązuje się do jej przestrzegania.</p>
                    <p>Przetwarzanie danych odbywa się zgodnie z:</p>
                    <ul>
                        <li>RODO</li>
                        <li>Polityką Prywatności</li>
                        <li>UŚUDE</li>
                        <li>Ustawą o ochronie danych osobowych</li>
                    </ul>
                    <p>Zakres, cele, podstawy prawne i prawa użytkownika opisane są szczegółowo w Polityce Prywatności M2 Notarialnie.</p>
                    
                    <hr></hr>
                    
                    <h2>XII. POSTANOWIENIA KOŃCOWE</h2>
                    <p><b>1.</b> Regulamin może być okresowo aktualizowany w związku ze zmianami przepisów prawa, rozwojem funkcjonalności Serwisu lub koniecznością dostosowania go do standardów bezpieczeństwa.</p>
                    <p><b>2.</b> Każda zmiana Regulaminu obowiązuje od momentu publikacji w Serwisie.</p>
                    <p><b>3.</b> W sprawach nieuregulowanych stosuje się:</p>
                    <ul>
                        <li>Kodeks cywilny,</li>
                        <li>ustawę o świadczeniu usług drogą elektroniczną,</li>
                        <li>ustawę o prawach konsumenta,</li>
                        <li>przepisy RODO.</li>
                    </ul>
                    <p><b>4.</b> Wszelkie spory rozstrzyga sąd właściwy dla siedziby Usługodawcy.</p>
                    
                    </div>
             
             </div> 
            </div>
        </div>
        <Footer/>
    </div>
  )
}