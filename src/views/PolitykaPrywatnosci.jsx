import React from 'react'
import Header from '../components/Header/Header'
import InfoSection from '../components/InfoSection/InfoSection'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'

export default function PolitykaPrywatnosci() {
  return (
    <div>
        <Header black />
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                <Breadcrumbs items={['Strona główna', "Polityka Prywatności"]} />
                <div className='sm-separate'></div>
                    <h1>POLITYKA PRYWATNOŚCI SERWISU M2 NOTARIALNIE</h1>
                    <div className='polityka'>
                    
                    <h2>WSTĘP</h2>
                    <p>Niniejsza Polityka Prywatności opisuje zasady przetwarzania danych osobowych użytkowników serwisu M2 Notarialnie, prowadzonego przez:</p>
                    <p><b>FREY&KISIO ESTATE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</b><br />
                    Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa, Polska<br />
                    REGON: 528946180<br />
                    NIP: 5253007302<br />
                    KRS: 0001111768<br />
                    Wpisana do rejestru przedsiębiorców przez SĄD REJONOWY DLA M.ST. WARSZAWY W WARSZAWIE, XII WYDZIAŁ GOSPODARCZY KRAJOWEGO REJESTRU SĄDOWEGO</p>

                    <p>Celem Polityki jest:</p>
                    <ul>
                        <li>wyjaśnienie, jakie dane zbieramy i dlaczego,</li>
                        <li>przedstawienie w jaki sposób dane są przetwarzane,</li>
                        <li>opisanie jakie prawa ma użytkownik,</li>
                        <li>wskazanie na jakich podstawach prawnych przetwarzamy dane,</li>
                        <li>wyjaśnienie procesów technicznych i organizacyjnych związanych z przetwarzaniem danych,</li>
                        <li>poinformowanie o podmiotach trzecich, którym dane mogą być przekazywane,</li>
                        <li>pokazanie pełnego cyklu „życia danych” w serwisie.</li>
                    </ul>

                    <p>Niniejsza polityka została przygotowana zgodnie z:</p>
                    <ul>
                        <li>RODO (Rozporządzeniem 2016/679),</li>
                        <li>Ustawą o ochronie danych osobowych,</li>
                        <li>Ustawą o świadczeniu usług drogą elektroniczną,</li>
                        <li>Ustawą o prawach konsumenta,</li>
                        <li>Ustawami podatkowymi i rachunkowymi.</li>
                    </ul>

                    <hr></hr>
                    <h2>1. DEFINICJE – SZCZEGÓŁOWE WYJAŚNIENIE</h2>
                    <p>W Polityce prywatności używane są następujące definicje:</p>
                    <p><b>1.1. Administrator danych</b>, w ramach serwisu M2notarialnie.pl jest podmiot FREY&KISIO ESTATE SPÓŁKA z o.o. Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa, Podmiot, który określa cele i sposoby przetwarzania danych osobowych w tym serwisie</p>
                    <p><b>1.2. Użytkownik</b><br />
                    Każda osoba, która:</p>
                    <ul>
                        <li>przegląda stronę,</li>
                        <li>zakłada konto,</li>
                        <li>kontaktuje się przez formularz,</li>
                        <li>publikuje ogłoszenia,</li>
                        <li>dokonuje płatności,</li>
                        <li>korzysta z konfiguratorów nieruchomości.</li>
                    </ul>
                    <p><b>1.3. Dane osobowe</b><br />
                    Każda informacja pozwalająca zidentyfikować osobę fizyczną, bezpośrednio lub pośrednio.</p>
                    <p><b>1.4. Przetwarzanie</b><br />
                    Każda operacja wykonywana na danych:</p>
                    <ul>
                        <li>zbieranie,</li>
                        <li>przechowywanie,</li>
                        <li>porządkowanie,</li>
                        <li>modyfikacja,</li>
                        <li>udostępnianie,</li>
                        <li>usuwanie,</li>
                        <li>profilowanie.</li>
                    </ul>
                    <p>Art. 4 pkt 2 RODO definiuje to szeroko.</p>
                    <p><b>1.5. Umowa</b><br />
                    Konto użytkownika, publikacja ogłoszenia, skorzystanie z usługi płatnej — to wszystko stanowi umowę zawartą elektronicznie.</p>
                    <p><b>1.6. Pliki cookies</b><br />
                    Dane techniczne zapisywane w urządzeniu użytkownika. Służą:</p>
                    <ul>
                        <li>logowaniu,</li>
                        <li>bezpieczeństwu,</li>
                        <li>analizie,</li>
                        <li>personalizacji treści,</li>
                        <li>działaniu funkcji strony.</li>
                    </ul>

                    <hr></hr>
                    <h2>2. ZASADY PRZETWARZANIA DANYCH – ART. 5 RODO (SZCZEGÓŁOWE OPISES)</h2>
                    <p><b>2.1. Zasada zgodności z prawem</b><br />
                    Dane przetwarzamy wyłącznie, kiedy mamy podstawę prawną (umowa, zgoda, prawo).</p>
                    <p><b>2.2. Zasada rzetelności</b><br />
                    Użytkownik zawsze ma prawo wiedzieć:</p>
                    <ul>
                        <li>jakie dane przetwarzamy,</li>
                        <li>dlaczego,</li>
                        <li>jak je przetwarzamy.</li>
                    </ul>
                    <p><b>2.3. Zasada przejrzystości</b><br />
                    Zgodnie z art. 12 RODO, forma przekazywania informacji musi być jasna i zrozumiała.</p>
                    <p><b>2.4. Zasada ograniczenia celu</b><br />
                    Każdy cel przetwarzania musi być jasno określony.</p>
                    <p><b>2.5. Zasada minimalizacji danych</b><br />
                    Przetwarzamy tylko to, co jest niezbędne.</p>
                    <p><b>2.6. Zasada prawidłowości</b><br />
                    Administrator musi dbać o aktualność danych.</p>
                    <p><b>2.7. Zasada ograniczenia przechowywania</b><br />
                    Po upływie określonego czasu dane są usuwane lub anonimizowane.</p>
                    <p><b>2.8. Zasada poufności i integralności</b><br />
                    Stosujemy szyfrowanie, zabezpieczenia techniczne i kontrolę dostępu.</p>

                    <hr></hr>
                    <h2>3. JAKIE DANE ZBIERAMY – SZCZEGÓŁOWE OPISES</h2>
                    <p><b>3.1. Dane przekazywane przez użytkownika</b></p>
                    <ul>
                        <li>imię i nazwisko,</li>
                        <li>e-mail,</li>
                        <li>numer telefonu,</li>
                        <li>hasło,</li>
                        <li>zdjęcia, opisy, dokumenty w ogłoszeniach,</li>
                        <li>dane do faktury,</li>
                        <li>zgody marketingowe,</li>
                        <li>zgłoszenia i reklamacje.</li>
                    </ul>
                    <p><b>3.2. Dane przedsiębiorców</b></p>
                    <ul>
                        <li>nazwa firmy,</li>
                        <li>NIP, REGON, KRS,</li>
                        <li>adres siedziby,</li>
                        <li>dane przedstawicieli.</li>
                    </ul>
                    <p><b>3.3. Dane techniczne (zbierane automatycznie)</b></p>
                    <ul>
                        <li>adres IP,</li>
                        <li>rodzaj urządzenia,</li>
                        <li>system operacyjny,</li>
                        <li>pliki cookies,</li>
                        <li>identyfikatory sesyjne,</li>
                        <li>lokalizacja (jeśli wyrażono zgodę).</li>
                    </ul>
                    <p><b>3.4. Dane transakcyjne</b></p>
                    <ul>
                        <li>status płatności,</li>
                        <li>numer transakcji,</li>
                        <li>sposób płatności,</li>
                        <li>czas, wartość transakcji.</li>
                    </ul>
                    <p><b>3.5. Dane w procesie sprzedaży nieruchomości</b></p>
                    <ul>
                        <li>dokumenty potwierdzające własność,</li>
                        <li>dane wrażliwe dotyczące nieruchomości,</li>
                        <li>dane przekazywane notariuszowi.</li>
                    </ul>

                    <hr></hr>
                    <h2>4. W JAKIM CELU PRZETWARZAMY DANE – KAŻDY PROCES KROK PO KROKU</h2>
                    <p><b>4.1. Realizacja usług serwisu M2 Notarialnie</b><br />
                    Dane przetwarzane są, aby:</p>
                    <ol>
                        <li>utworzyć konto,</li>
                        <li>umożliwić publikowanie ogłoszeń,</li>
                        <li>utrzymywać historię ogłoszeń i wiadomości,</li>
                        <li>prezentować ogłoszenia potencjalnym kupującym,</li>
                        <li>udostępniać dane kontaktowe użytkownikom,</li>
                        <li>umożliwiać filtrację, porównanie i zapis ogłoszeń,</li>
                        <li>wyświetlać nieruchomości dopasowane do preferencji.</li>
                    </ol>
                    <p><b>Podstawa prawna: art. 6 ust. 1 lit. b RODO.</b></p>

                    <p><b>4.2. Płatności i faktury</b><br />
                    Przetwarzamy dane, aby:</p>
                    <ul>
                        <li>obsługiwać płatności kartą, BLIK, przelewem, SMS,</li>
                        <li>generować faktury VAT,</li>
                        <li>prowadzić ewidencję księgową.</li>
                    </ul>
                    <p><b>Podstawa prawna:</b><br />
                    art. 6 ust. 1 lit. b – realizacja umowy<br />
                    art. 6 ust. 1 lit. c – obowiązki podatkowe</p>

                    <p><b>4.3. Kontakt użytkownika z administratorem</b><br />
                    Każda wiadomość wysyłana przez formularz jest przechowywana i analizowana.<br />
                    <b>Podstawa prawna: art. 6 ust. 1 lit. f – interes administratora.</b></p>

                    <p><b>4.4. Marketing – opis procesu</b><br />
                    Marketing odbywa się tylko za zgodą użytkownika:</p>
                    <ul>
                        <li>newsletter,</li>
                        <li>e-mail marketing,</li>
                        <li>SMS marketing,</li>
                        <li>powiadomienia o nowych ofertach,</li>
                        <li>kampanie remarketingowe.</li>
                    </ul>
                    <p><b>Podstawa prawna: art. 6 ust. 1 lit. a RODO.</b><br />
                    Zgodę można wycofać w każdej chwili (art. 7 ust. 3).</p>

                    <p><b>4.5. Profilowanie i personalizacja treści – opis procesu</b><br />
                    System analizuje:</p>
                    <ul>
                        <li>historię przeglądania,</li>
                        <li>zapisane ogłoszenia,</li>
                        <li>interakcje,</li>
                        <li>lokalizację.</li>
                    </ul>
                    <p>Profilowanie nie wywołuje skutków prawnych.<br />
                    <b>Podstawa prawna: art. 6 ust. 1 lit. f oraz art. 22 RODO.</b></p>

                    <p><b>4.6. Analityka i statystyka</b><br />
                    Analizujemy:</p>
                    <ul>
                        <li>ruch na stronie,</li>
                        <li>wydajność serwera,</li>
                        <li>ilość wyświetleń ogłoszeń,</li>
                        <li>konwersje.</li>
                    </ul>
                    <p><b>Podstawa: art. 6 ust. 1 lit. f.</b></p>

                    <p><b>4.7. Obowiązki prawne administratora</b><br />
                    Administrator musi przekazywać dane:</p>
                    <ul>
                        <li>US, ZUS — obowiązki podatkowe i księgowe,</li>
                        <li>Policja, prokuratura — postępowania,</li>
                        <li>Sądy, kancelarie, notariusze — gdy wynika to z prawa.</li>
                    </ul>
                    <p><b>Podstawa prawna: art. 6 ust. 1 lit. c.</b></p>

                    <hr></hr>
                    <h2>5. TRANSFER DANYCH POZA UE – ART. 44–49 RODO</h2>
                    <p>Transfer może nastąpić do USA, gdy korzystamy z:</p>
                    <ul>
                        <li>Google Analytics,</li>
                        <li>Google Maps,</li>
                        <li>Meta Pixel,</li>
                        <li>systemów mailingowych.</li>
                    </ul>
                    <p>Stosujemy:</p>
                    <ul>
                        <li>Standardowe Klauzule Umowne (SCC) – art. 46,</li>
                        <li>dodatkowe zabezpieczenia techniczne.</li>
                    </ul>

                    <hr></hr>
                    <h2>6. PRAWA UŻYTKOWNIKA – OPIS KAŻDEGO ARTYKUŁU RODO (ART. 12–23)</h2>
                    <p><b>Art. 12 – przejrzystość informacji</b><br />
                    Musimy informować prostym językiem.</p>

                    <p><b>Art. 13–14 – obowiązek informacyjny</b><br />
                    Podajemy kto, po co i jak przetwarza dane.</p>

                    <p><b>Art. 15 – dostęp do danych</b><br />
                    Masz prawo poznać swoje dane i sposoby ich przetwarzania.</p>

                    <p><b>Art. 16 – sprostowanie</b><br />
                    Możesz poprawić błędne dane.</p>

                    <p><b>Art. 17 – usunięcie</b><br />
                    Możesz żądać usunięcia danych jeśli:</p>
                    <ul>
                        <li>wycofasz zgodę,</li>
                        <li>dane nie są już potrzebne,</li>
                        <li>przetwarzanie było niezgodne z prawem.</li>
                    </ul>

                    <p><b>Art. 18 – ograniczenie przetwarzania</b><br />
                    Dane są wstrzymane, ale przechowywane.</p>

                    <p><b>Art. 19 – informowanie odbiorców</b><br />
                    Administrator musi poinformować inne podmioty o zmianach danych.</p>

                    <p><b>Art. 20 – przenoszenie danych</b><br />
                    Możesz otrzymać dane w formacie .json / .csv.</p>

                    <p><b>Art. 21 – sprzeciw</b><br />
                    Możesz sprzeciwić się:</p>
                    <ul>
                        <li>marketingowi,</li>
                        <li>analizie,</li>
                        <li>profilowaniu.</li>
                    </ul>

                    <p><b>Art. 22 – decyzje automatyczne</b><br />
                    Nie stosujemy systemów podejmujących decyzje prawne automatycznie.</p>

                    <hr></hr>
                    <h2>7. PODMIOTY, KTÓRE MOGĄ OTRZYMAĆ TWOJE DANE</h2>
                    <ul>
                        <li>firmy IT i hostingowe,</li>
                        <li>firmy księgowe,</li>
                        <li>kancelarie prawne i notarialne,</li>
                        <li>operatorzy płatności,</li>
                        <li>firmy analizujące statystyki,</li>
                        <li>podmioty marketingowe.</li>
                    </ul>

                    <hr></hr>
                    <h2>8. OKRESY PRZECHOWYWANIA DANYCH</h2>
                    <table style={{width: '100%', borderCollapse: 'collapse', margin: '20px 0'}}>
                        <thead>
                            <tr style={{backgroundColor: '#f5f5f5'}}>
                                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>DANE</th>
                                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>OKRES</th>
                                <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>PODSTAWA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Dane konta</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>do usunięcia</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>art. 6 ust. 1 lit.b</td>
                            </tr>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Ogłoszenia</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>12 mies. po usunięciu</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>art. 6 ust. 1 lit. f</td>
                            </tr>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Płatności</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>5 lat</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>ustawa o rachunkowości</td>
                            </tr>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Dokumenty sprzedaży</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>10 lat</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>obowiązki prawne</td>
                            </tr>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Logi Techniczne</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>3-24 msc.</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>art. 6 ust. 1 lit. f</td>
                            </tr>
                            <tr>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Zgody marketingowe</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>Do odwołania</td>
                                <td style={{border: '1px solid #ddd', padding: '8px'}}>art. 6 ust 1 lit. a</td>
                            </tr>
                        </tbody>
                    </table>

                    <hr></hr>
                    <h2>9. BEZPIECZEŃSTWO – ART. 32 RODO</h2>
                    <p>Stosujemy:</p>
                    <ul>
                        <li>szyfrowanie,</li>
                        <li>zapory sieciowe,</li>
                        <li>monitorowanie,</li>
                        <li>kontrolę dostępu,</li>
                        <li>audyty bezpieczeństwa,</li>
                        <li>polityki haseł.</li>
                    </ul>

                    <hr></hr>
                    <h2>10. REKLAMACJE</h2>
                    <p>Reklamacje należy kierować na:<br />
                    <a href='mailto:kontakt@M2Notarialnie.pl'>kontakt@M2Notarialnie.pl</a><br />
                    Czas odpowiedzi: do 30 dni.</p>

                    <hr></hr>
                    <h2>11. PRAWA AUTORSKIE I WŁASNOŚĆ INTELEKTUALNA</h2>
                    <p>Wszystkie treści serwisu są własnością:<br />
                    FREY&KISIO ESTATE SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ<br />
                    Aleja Prymasa Tysiąclecia 83A / 310, 01-242 Warszawa, Polska</p>
                    <p>Zakazane jest:</p>
                    <ul>
                        <li>kopiowanie,</li>
                        <li>powielanie,</li>
                        <li>wykorzystywanie w celach komercyjnych.</li>
                    </ul>

                    <hr></hr>
                    <h2>12. ODPOWIEDZIALNOŚĆ I SPORY</h2>
                    <p>Spory będą rozstrzygane przez sąd właściwy dla siedziby administratora.</p>

                    <hr></hr>
                    <h2>13. POSTANOWIENIA KOŃCOWE</h2>
                    <p>1. Administrator zastrzega sobie możliwość wprowadzania zmian w Polityce. Przy czym każda zmiana będzie publikowana w serwisie i obowiązuje od momentu publikacji na stronie.</p>
                    <p>3. W sprawach nieuregulowanych stosuje się:</p>
                    <ul>
                        <li>Kodeks cywilny,</li>
                        <li>przepisy RODO,</li>
                        <li>ustawę o świadczeniu usług drogą elektroniczną.</li>
                    </ul>

                    </div>
             
             </div> 
            </div>
        </div>
        <Footer/>
    </div>
  )
}