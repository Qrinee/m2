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
                    <h1>Polityka Prywatności</h1>
                    <div className='polityka'>
                    <p><b>Data obowiązywania: 26 czerwca 2025</b></p>
                    <p>Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych przez FREY&KISIO ESTATE Sp. z o.o. z siedzibą w Warszawie, przy al. Prymasa Tysiąclecia 83A/310, 01-242 Warszawa, wpisaną do Krajowego Rejestru Sądowego pod numerem KRS: 0001111768, NIP: 5253007302, REGON: 528946180.</p>
                    <hr></hr>
                    <h2>1. Administrator danych osobowych</h2>
                    <p>Administratorem danych osobowych jest FREY&KISIO ESTATE Sp. z o.o.</p>
                    <p><a href='mailto:kontakt@frey-kisio.pl'>kontakt@frey-kisio.pl</a></p>
                    <p><a href='https://frey-kisio.pl' target='_blank'>https://frey-kisio.pl</a></p>
                    <hr></hr>
                    <h2>2. Zakres przetwarzanych danych</h2>
                    <p>Podczas korzystania z naszej strony internetowej możemy zbierać następujące dane:</p>
                    <ul>
                        <li>Imię i nazwisko</li>
                        <li>Adres e-mail</li>
                        <li>Numer telefonu</li>
                        <li>Dane dotyczące zapytań o nieruchomości</li>
                        <li>CV i dane aplikacyjne (w przypadku formularza rekrutacyjnego)</li>
                        <li>Adres IP, dane przeglądarki, cookies (w celach analitycznych i statystycznych)</li>
                    </ul>
                    <hr></hr>
                    <h2>3. Cele przetwarzania danych</h2>
                    <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
                    <p>realizacja usług związanych z pośrednictwem nieruchomości</p>
                    <p>kontakt z użytkownikiem na podstawie wysłanego formularza</p>
                    <p>prowadzenie działań marketingowych (za zgodą)</p>
                    <p>rekrutacja pracowników lub partnerów biznesowych</p>
                    <p>prowadzenie analiz statystycznych dotyczących korzystania z serwisu</p>
                    <p>zapewnienie bezpieczeństwa i zgodności z przepisami</p>
                    <hr></hr>
                    <h2>4. Podstawa prawna przetwarzania</h2>
                    <p>Dane przetwarzane są na podstawie:</p>
                    <p>art. 6 ust. 1 lit. b RODO – realizacja umowy lub podjęcie działań przed jej zawarciem</p>
                    <p>art. 6 ust. 1 lit. a RODO – dobrowolna zgoda (np. newsletter, CV)</p>
                    <p>art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes administratora (np. analizy, marketing bezpośredni)</p>
                    <hr></hr>
                    <h2>5. Odbiorcy danych</h2>
                    <p>Twoje dane mogą być przekazywane następującym kategoriom odbiorców:</p>
                    <p>uprawnionym pracownikom i współpracownikom spółki</p>
                    <p>dostawcom usług IT i hostingowych</p>
                    <p>kancelariom prawnym, notarialnym i partnerom biznesowym</p>
                    <p>podmiotom świadczącym usługi księgowe i administracyjne</p>
                    <p>Dane nie będą przekazywane poza Europejski Obszar Gospodarczy (EOG), chyba że użytkownik korzysta z funkcji zewnętrznych narzędzi (np. formularzy Google, systemów mailingowych).</p>
                    <hr></hr>
                    <h2>6. Okres przechowywania danych</h2>
                    <p>Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane, a także zgodnie z obowiązującymi przepisami prawa (np. podatkowymi). W przypadku danych przetwarzanych na podstawie zgody, dane będą przechowywane do momentu jej wycofania.</p>
                    <hr></hr>
                    <h2>7. Prawa użytkowników</h2>
                    <p>Masz prawo do:</p>
                    <p>dostępu do swoich danych osobowych</p>
                    <p>prostowania nieprawidłowych danych</p>
                    <p>usunięcia danych (prawo do bycia zapomnianym)</p>
                    <p>ograniczenia przetwarzania danych</p>
                    <p>przenoszenia danych</p>
                    <p>wniesienia sprzeciwu wobec przetwarzania danych</p>
                    <hr></hr>
                    <h2>8. Pliki cookies</h2>
                    <p>Strona internetowa może korzystać z plików cookies w celu:</p>
                    <p>prawidłowego działania serwisu</p>
                    <p>analizy ruchu (np. Google Analytics)</p>
                    <p>optymalizacji strony i jej bezpieczeństwa</p>
                    <p>działań remarketingowych (np. Facebook Ads, Google Ads)</p> 
                    <p>Użytkownik może w każdej chwili zmienić ustawienia dotyczące cookies w przeglądarce internetowej.</p>
                    <hr></hr>
                    <h2>9. Zabezpieczenie danych</h2>
                    <p>Dane osobowe są przechowywane w sposób bezpieczny. Stosujemy środki organizacyjne i techniczne zgodne z obowiązującymi przepisami prawa i najlepszymi praktykami w zakresie ochrony danych.</p>
                    <hr></hr>
                    <h2>10. Zmiany w polityce prywatności</h2>
                    <p>Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. Aktualna wersja dokumentu będzie zawsze dostępna na stronie internetowej https://frey-kisio.pl.</p>
                    <hr></hr>
                    <p>Masz pytania dotyczące przetwarzania Twoich danych? Skontaktuj się z nami: kontakt@frey-kisio.pl</p>
                    </div>
             
             </div> 
            </div>
        </div>
        <Footer/>
    </div>
  )
}
