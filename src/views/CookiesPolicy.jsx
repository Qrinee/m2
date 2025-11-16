import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'

export default function CookiesPolicy() {
  return (
    <div>
        <Header black />
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                <Breadcrumbs items={['Strona główna', "Polityka Prywatności"]} />
                <div className='sm-separate'></div>
                    <h1>Polityka prywatności i Cookies – M2Notarialnie.pl</h1>
                    <div className='polityka'>
                    <p><b>PROSIMY O DOKŁADNE ZAPOZNANIE SIĘ Z NINIEJSZĄ POLITYKĄ DOTYCZĄCĄ PLIKÓW COOKIES I PODOBNYCH TECHNOLOGII PRZED SKORZYSTANIEM Z TEJ STRONY LUB APLIKACJI</b></p>
                    <p><b>Zaktualizowano: 14 listopada 2025 r.</b></p>
                    
                    <hr></hr>
                    <h2>Podstawowe Informacje</h2>
                    
                    <h3>Czym są pliki cookies?</h3>
                    <p>Pliki cookies (tzw. „ciasteczka”) to niewielkie pliki tekstowe zapisywane na urządzeniu użytkownika (komputerze, smartfonie, tablecie) podczas korzystania ze stron internetowych. Cookies umożliwiają stronie rozpoznanie urządzenia i zapamiętanie określonych informacji dotyczących wizyty użytkownika – na przykład jego preferencji, ustawień, sposobu korzystania z serwisu czy historii aktywności.</p>
                    <p>Pliki cookies nie służą identyfikacji użytkownika w sposób bezpośredni – nie pozwalają ustalić imienia czy nazwiska. Zawierają jednak informacje techniczne, które w połączeniu z innymi danymi mogą stanowić dane osobowe (np. adres IP, identyfikator urządzenia, identyfikator sesji).</p>
                    <p>Cookies są powszechnie stosowane, ponieważ umożliwiają:</p>
                    <ul>
                        <li>prawidłowe działanie strony internetowej,</li>
                        <li>zwiększenie bezpieczeństwa serwisu,</li>
                        <li>analizę sposobu korzystania z witryny przez użytkowników,</li>
                        <li>zapamiętanie ustawień i preferencji,</li>
                        <li>personalizację treści,</li>
                        <li>wyświetlanie reklam dopasowanych do potrzeb i zainteresowań użytkownika,</li>
                        <li>poprawę szybkości działania strony.</li>
                    </ul>

                    <hr></hr>
                    <h2>Dlaczego używamy plików cookies?</h2>
                    <p>Administrator wykorzystuje pliki cookies w następujących celach:</p>
                    
                    <h3>a) Prawidłowe funkcjonowanie serwisu</h3>
                    <ul>
                        <li>umożliwiają działanie podstawowych elementów strony (nawigacja, logowanie, formularze),</li>
                        <li>zapamiętują wybory użytkownika (np. preferencje wyszukiwania),</li>
                        <li>wspierają konfigurację ofert i prezentacji nieruchomości.</li>
                    </ul>

                    <h3>b) Zapewnienie bezpieczeństwa</h3>
                    <ul>
                        <li>wykrywają nadużycia i boty,</li>
                        <li>chronią formularze przed spamem,</li>
                        <li>wspierają procesy autoryzacji i weryfikacji sesji.</li>
                    </ul>

                    <h3>c) Usprawnienie działania usług</h3>
                    <ul>
                        <li>poprawiają wydajność strony,</li>
                        <li>zmniejszają czas ładowania,</li>
                        <li>pozwalają na działanie konfiguratorów i narzędzi analitycznych.</li>
                    </ul>

                    <h3>d) Analiza i statystyka</h3>
                    <ul>
                        <li>pozwalają badać ruch na stronach M2Notarialnie,</li>
                        <li>analizować skuteczność formularzy i ogłoszeń,</li>
                        <li>sprawdzać, skąd użytkownicy trafiają na stronę,</li>
                        <li>analizować, jakie treści są najczęściej przeglądane.</li>
                    </ul>

                    <h3>e) Personalizacja treści</h3>
                    <ul>
                        <li>umożliwiają dopasowanie prezentowanych nieruchomości do preferencji użytkownika,</li>
                        <li>wspierają tworzenie profilu użytkownika,</li>
                        <li>umożliwiają zapamiętywanie ostatnio przeglądanych ofert lub filtrów wyszukiwania.</li>
                    </ul>

                    <h3>f) Marketing i reklama</h3>
                    <ul>
                        <li>umożliwiają wyświetlanie reklam dopasowanych do użytkownika,</li>
                        <li>pozwalają mierzyć skuteczność kampanii marketingowych,</li>
                        <li>wspierają remarketing (np. Google, Meta),</li>
                        <li>umożliwiają analizowanie, które treści reklamowe były interesujące.</li>
                    </ul>

                    <h3>g) Integracja funkcji zewnętrznych</h3>
                    <ul>
                        <li>obsługa map (np. Google Maps dla lokalizacji nieruchomości),</li>
                        <li>obsługa narzędzi wideo i multimediów,</li>
                        <li>integracja wtyczek społecznościowych.</li>
                    </ul>

                    <hr></hr>
                    <h2>Jakie rodzaje plików cookies wykorzystujemy? (z opisami)</h2>
                    <p>W serwisie stosowane są następujące kategorie plików cookies:</p>

                    <h3>1) Cookies niezbędne (techniczne / wymagane)</h3>
                    <p>Te pliki są konieczne do prawidłowego działania strony i nie mogą być wyłączone w panelu zarządzania zgodami.</p>
                    <p>Umożliwiają:</p>
                    <ul>
                        <li>działanie podstawowych funkcji serwisu,</li>
                        <li>obsługę formularzy kontaktowych i zgłoszeniowych,</li>
                        <li>zapamiętanie sesji użytkownika,</li>
                        <li>przełączanie między stronami serwisu,</li>
                        <li>zabezpieczenie danych i komunikacji.</li>
                    </ul>
                    <p>Bez nich korzystanie z serwisu byłoby niemożliwe lub bardzo ograniczone.</p>

                    <h3>2) Cookies funkcjonalne</h3>
                    <p>Zapewniają wygodę korzystania ze strony i pozwalają zapamiętać:</p>
                    <ul>
                        <li>preferencje użytkownika (np. tryb widoku, filtry wyszukiwania),</li>
                        <li>ostatnio przeglądane ogłoszenia i konfiguracje,</li>
                        <li>preferencje dotyczące ustawień serwisu,</li>
                        <li>personalizację treści.</li>
                    </ul>
                    <p>Wyłączenie ich zmniejsza komfort korzystania z portalu.</p>

                    <h3>3) Cookies analityczne i statystyczne</h3>
                    <p>Służą analizie:</p>
                    <ul>
                        <li>zachowania użytkowników na stronie,</li>
                        <li>efektywności formularzy i ogłoszeń,</li>
                        <li>ścieżek użytkowników,</li>
                        <li>liczby odwiedzin podstron,</li>
                        <li>czasu spędzonego na stronie.</li>
                    </ul>
                    <p>Najczęściej pochodzą od dostawców takich jak:</p>
                    <ul>
                        <li>Google Analytics</li>
                        <li>narzędzia heatmap i nagrywania sesji (tylko w wersji uproszczonej, zgodnej z RODO)</li>
                    </ul>
                    <p>Dzięki nim Administrator poprawia jakość i skuteczność usług.</p>

                    <h3>4) Cookies marketingowe / reklamowe</h3>
                    <p>Pliki te pozwalają:</p>
                    <ul>
                        <li>dopasować reklamy do zainteresowań użytkownika,</li>
                        <li>mierzyć skuteczność kampanii,</li>
                        <li>tworzyć grupy odbiorców (remarketing),</li>
                        <li>analizować zachowania zakupowe lub preferencje nieruchomościowe.</li>
                    </ul>
                    <p>Stosowane technologie mogą obejmować:</p>
                    <ul>
                        <li>Google Ads,</li>
                        <li>Meta Pixel (Facebook/Instagram),</li>
                        <li>systemy remarketingowe.</li>
                    </ul>
                    <p>Ich celem jest dopasowanie komunikacji marketingowej do potrzeb użytkownika.</p>

                    <h3>5) Cookies społecznościowe</h3>
                    <p>Umożliwiają integrację z platformami:</p>
                    <ul>
                        <li>Facebook,</li>
                        <li>Instagram,</li>
                        <li>YouTube,</li>
                        <li>Messenger itp.</li>
                    </ul>
                    <p>Dzięki nim możliwe jest:</p>
                    <ul>
                        <li>udostępnianie treści,</li>
                        <li>wyświetlanie wtyczek,</li>
                        <li>logowanie za pomocą zewnętrznych usług (jeśli dostępne).</li>
                    </ul>

                    <h3>6) Cookies związane z profilowaniem użytkowników</h3>
                    <p>Te pliki wspierają:</p>
                    <ul>
                        <li>tworzenie indywidualnego profilu użytkownika,</li>
                        <li>dopasowanie ofert nieruchomości,</li>
                        <li>analizę zainteresowań na podstawie aktywności,</li>
                        <li>wyświetlanie treści adekwatnych do potrzeb.</li>
                    </ul>
                    <p>Są to kluczowe pliki w branży nieruchomości, gdzie personalizacja odgrywa dużą rolę.</p>

                    <h3>7) Cookies podmiotów trzecich</h3>
                    <p>Są to pliki umieszczane przez partnerów świadczących usługi na rzecz serwisu:</p>
                    <ul>
                        <li>dostawcy analityki,</li>
                        <li>platformy reklamowe,</li>
                        <li>partnerzy technologiczni,</li>
                        <li>integracje map i wideo,</li>
                        <li>zewnętrzne wtyczki.</li>
                    </ul>
                    <p>Ich działanie regulowane jest dodatkowo politykami prywatności tych podmiotów.</p>

                    <hr></hr>
                    <h2>1. Administrator danych</h2>
                    <p>Administratorem danych osobowych użytkowników serwisu M2Notarialnie.pl oraz innych powiązanych kanałów komunikacji jest:</p>
                    <p><b>FREY&KISIO ESTATE Sp. z o.o.</b></p>
                    <p>Aleja Prymasa Tysiąclecia 83A lok. 310, 01-242 Warszawa</p>
                    <p>KRS: 0001111768 | NIP: 5253007302 | REGON: 528946180</p>
                    <p>Email kontaktowy: <a href='mailto:kontakt@m2notarialnie.pl'>kontakt@m2notarialnie.pl</a></p>
                    <p>Administrator odpowiada za prawidłowe i zgodne z RODO przetwarzanie danych użytkowników oraz zapewnia ich bezpieczeństwo i poufność.</p>

                    <hr></hr>
                    <h2>2. Jakie dane przetwarzamy</h2>
                    
                    <h3>2.1. Dane podane dobrowolnie</h3>
                    <ul>
                        <li>Imię i nazwisko</li>
                        <li>Numer telefonu</li>
                        <li>Adres e-mail</li>
                        <li>Treść zapytań i formularzy kontaktowych, wyceny nieruchomości, współpracy</li>
                        <li>Dane do newslettera (email + preferencje)</li>
                        <li>Dane przekazane w procesach ofertowych</li>
                        <li>Dane dotyczące nieruchomości (opis, zdjęcia, lokalizacja)</li>
                    </ul>

                    <h3>2.2. Dane zbierane automatycznie</h3>
                    <ul>
                        <li>Adres IP</li>
                        <li>Identyfikatory urządzenia</li>
                        <li>Pliki cookies</li>
                        <li>Dane o sesji, wizytach, kliknięciach, zachowaniach na stronie</li>
                        <li>Dane statystyczne i analityczne (Google Analytics, Meta Pixel – zgodne z przepisami UE)</li>
                    </ul>

                    <h3>2.3. Dane na potrzeby marketingu i profilowania</h3>
                    <ul>
                        <li>Historia aktywności użytkownika w serwisie</li>
                        <li>Preferencje dotyczące nieruchomości</li>
                        <li>Informacje dotyczące reakcji na newslettery i kampanie marketingowe</li>
                    </ul>

                    <hr></hr>
                    <h2>3. Cele i podstawy przetwarzania danych</h2>
                    
                    <h3>3.1. Realizacja usług i odpowiedzi na zapytania</h3>
                    <ul>
                        <li>Obsługa zapytań z formularzy kontaktowych</li>
                        <li>Przygotowanie ofert sprzedaży nieruchomości na raty notarialne</li>
                        <li>Kontakt telefoniczny lub mailowy</li>
                    </ul>
                    <p><b>Podstawa prawna:</b> art. 6 ust. 1 lit. b RODO (czynności przedumowne)</p>

                    <h3>3.2. Marketing, newsletter i wysyłka ofert</h3>
                    <ul>
                        <li>Wysyłanie informacji handlowych i newsletterów</li>
                        <li>Kampanie mailingowe, SMS i kontakt telefoniczny</li>
                    </ul>
                    <p><b>Podstawa prawna:</b> zgoda użytkownika (art. 6 ust. 1 lit. a RODO)</p>

                    <h3>3.3. Profilowanie</h3>
                    <ul>
                        <li>Dopasowanie ofert nieruchomości i rekomendowanie treści</li>
                        <li>Precyzyjne kampanie marketingowe</li>
                    </ul>
                    <p><b>Podstawa prawna:</b> art. 6 ust. 1 lit. a i f RODO</p>
                    <p>Profilowanie nie prowadzi do podejmowania decyzji prawnie wiążących wobec użytkownika.</p>

                    <h3>3.4. Statystyka, analityka, poprawa działania strony</h3>
                    <ul>
                        <li>Analiza ruchu, wydajności usług i popularności ofert</li>
                    </ul>
                    <p><b>Podstawa prawna:</b> prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO)</p>

                    <h3>3.5. Realizacja obowiązków prawnych</h3>
                    <ul>
                        <li>Realizacja obowiązków księgowych, podatkowych, sprawozdawczych</li>
                    </ul>
                    <p><b>Podstawa prawna:</b> art. 6 ust. 1 lit. c RODO</p>

                    <hr></hr>
                    <h2>4. Pliki cookies i technologie śledzące</h2>
                    
                    <h3>4.1. Czym są pliki cookies?</h3>
                    <p>Pliki cookies to niewielkie pliki tekstowe przechowywane na urządzeniu użytkownika podczas korzystania ze strony lub aplikacji. Umożliwiają personalizację treści, analizę ruchu oraz poprawę jakości usług.</p>

                    <h3>4.2. Rodzaje plików cookies</h3>
                    <ul>
                        <li><b>Niezbędne:</b> funkcjonowanie strony, logowanie, rejestracja, formularze, bezpieczeństwo (zgoda nie wymagana)</li>
                        <li><b>Analityczne / statystyczne:</b> analiza ruchu, popularność ofert, optymalizacja serwisu (wymagana zgoda)</li>
                        <li><b>Funkcjonalne:</b> zapamiętywanie preferencji, konfiguracja domów, personalizacja serwisu (wymagana zgoda)</li>
                        <li><b>Marketingowe / reklamowe:</b> kampanie remarketingowe, profilowanie reklam (Meta Pixel, Google Ads) (wymagana zgoda)</li>
                    </ul>

                    <h3>4.3. Inne technologie</h3>
                    <ul>
                        <li>Sygnalizatory sieciowe (web beacons)</li>
                        <li>Znakowanie urządzenia (device fingerprinting)</li>
                    </ul>

                    <h3>4.4. Pliki cookies własne i podmiotów trzecich</h3>
                    <ul>
                        <li><b>Własne:</b> funkcjonowanie strony, logowanie, rejestracja, konfiguracja ofert nieruchomości</li>
                        <li><b>Podmiotów trzecich:</b> wyświetlanie spersonalizowanych reklam, analityka i remarketing</li>
                    </ul>

                    <h3>4.5. Sesyjne i stałe pliki cookies</h3>
                    <ul>
                        <li><b>Sesyjne:</b> tymczasowe, usuwane po zakończeniu sesji, np. koszyk ofert</li>
                        <li><b>Stałe:</b> przechowywane do wygaśnięcia, zapamiętują preferencje logowania, konfiguracje i spersonalizowane treści</li>
                    </ul>

                    <h3>4.6. Zarządzanie zgodami</h3>
                    <p>Użytkownik może zaakceptować wszystkie pliki, odrzucić opcjonalne, wybrać kategorie indywidualnie oraz wycofać zgodę w dowolnym momencie.</p>

                    <hr></hr>
                    <h2>5. Newsletter i zgody marketingowe</h2>
                    <ul>
                        <li>Użytkownik może w każdej chwili wycofać zgodę poprzez link w mailu lub kontakt na adres kontakt@m2notarialnie.pl</li>
                        <li>Zgoda obejmuje wysyłkę e-mail, SMS, oferty nieruchomości i informacje o usługach</li>
                    </ul>

                    <hr></hr>
                    <h2>6. Odbiorcy danych</h2>
                    <p>Dane mogą być udostępniane: dostawcom usług IT i hostingu, firmom analitycznym i marketingowym, operatorom newsletterów i SMS, kancelariom prawnym współpracującym z M2Notarialnie, partnerom technologicznym</p>
                    <p><b>Uwaga:</b> dane nie są przekazywane poza EOG.</p>

                    <hr></hr>
                    <h2>7. Okres przechowywania danych</h2>
                    <ul>
                        <li>Korespondencja i zapytania: 24 miesiące</li>
                        <li>Dane marketingowe: do wycofania zgody</li>
                        <li>Dane z formularzy sprzedaży nieruchomości: do zakończenia obsługi</li>
                        <li>Cele księgowe: 5–6 lat</li>
                        <li>Dane analityczne i pliki cookies: zgodnie z ustawieniami użytkownika</li>
                    </ul>

                    <hr></hr>
                    <h2>8. Prawa użytkownika</h2>
                    <p>Użytkownik ma prawo do: dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu, przenoszenia danych, wycofania zgody</p>
                    <p><b>Skargi:</b> Prezes Urzędu Ochrony Danych Osobowych (UODO)</p>

                    <hr></hr>
                    <h2>9. Bezpieczeństwo danych</h2>
                    <ul>
                        <li>Dane przechowywane w sposób bezpieczny, z wykorzystaniem nowoczesnych systemów IT i zabezpieczeń fizycznych oraz technicznych</li>
                        <li>Techniki device fingerprinting i web beacons służą ochronie przed oszustwami i nadużyciami</li>
                        <li>Dostęp do danych mają wyłącznie osoby upoważnione</li>
                    </ul>

                    <hr></hr>
                    <h2>10. Technologie zewnętrzne</h2>
                    <ul>
                        <li>Google Analytics, Meta Pixel, narzędzia heatmap, narzędzia newsletterowe</li>
                        <li>Dane przetwarzane wyłącznie w UE/EOG</li>
                    </ul>

                    <hr></hr>
                    <h2>11. Zmiany polityki</h2>
                    <p>Administrator może aktualizować niniejszą Politykę. Aktualna wersja jest publikowana na stronie M2Notarialnie.pl</p>

                    <hr></hr>
                    <h2>12. Kontakt</h2>
                    <p>Email: <a href='mailto:kontakt@m2notarialnie.pl'>kontakt@m2notarialnie.pl</a></p>
                    <p>Adres: Aleja Prymasa Tysiąclecia 83A lok. 310, 01-242 Warszawa</p>
                    </div>
             
             </div> 
            </div>
        </div>
        <Footer/>
    </div>
  )
}