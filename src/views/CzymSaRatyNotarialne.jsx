import React from 'react'
import Hero from '../components/Hero/Hero'
import Background from '../assets/czymsaraty.jpg'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import FAQItem from '../components/FAQItem/FAQItem'
import Footer from '../components/Footer/Footer'
import './CzymSaRatyNotarialne.css'
import HeroNieruchomosci from '../components/HeroNieruchomosci/HeroNieruchomosci'
import { 
  FaHandshake, 
  FaFileContract, 
  FaHome, 
  FaUsers, 
  FaPiggyBank, 
  FaUserTie, 
  FaChartLine,
  FaBalanceScale,
  FaSearch,
  FaComments,
  FaPenAlt,
  FaKey,
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaRocket,
  FaStar
} from 'react-icons/fa'

export default function CzymSaRatyNotarialne() {


  
  return (
    <div className="notarial-installments-page">
      <Header/>
      <HeroNieruchomosci
        img={Background}
        content={
          <>
            <h1>CZYM SĄ <span style={{color: 'var(--secondary-color)'}}>RATY NOTARIALNE</span>?</h1>
          </>
        }
      />
      <div className='section-spacer-md'></div>
<div className='section-spacer-md'></div>

      {/* Sekcja główna - Czym są raty notarialne */}
      <div className="notarial-container">
        <div className="notarial-hero-cards">
          <div className="notarial-feature-card notarial-feature-card--primary">
            <div className="notarial-card-icon">
              <FaBalanceScale />
            </div>
            <div className="notarial-card-content">
              <h2 className="notarial-card-title">Czym są raty notarialne?</h2>
              <p>Raty notarialne to bezpieczna i przejrzysta forma finansowania zakupu nieruchomości, w której płatność zostaje rozłożona na ustalone raty, a cały proces regulowany jest aktem notarialnym. Takie rozwiązanie zapewnia pełną ochronę zarówno sprzedającemu, jak i kupującemu, gwarantując zgodność wszystkich ustaleń z prawem oraz ich formalne potwierdzenie.        Kluczowym elementem rat notarialnych jest akt notarialny, który precyzyjnie określa harmonogram spłat, warunki finansowe oraz zastosowane zabezpieczenia — dzięki czemu transakcja przebiega w sposób maksymalnie bezpieczny, transparentny i przewidywalny.</p>
 </div>
          </div>

          <div className="notarial-feature-card notarial-feature-card--accent">
            <div className="notarial-card-icon">
              <FaStar />
            </div>
            <div className="notarial-card-content">
              <h2 className="notarial-card-title">Unikalna oferta</h2>
              <p className="notarial-card-text">Jest to jedyna w Polsce kompleksowa usługa umożliwiająca zakup nieruchomości w systemie rat notarialnych. Dzięki doświadczeniu zespołu oraz współpracy z renomowanymi kancelariami notarialnymi każda transakcja przebiega w pełni bezpiecznie, transparentnie i z indywidualnym podejściem do potrzeb klienta.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja procesu krok po kroku */}
      <div className="notarial-container">
        <div className="notarial-section-header">
          <h2 className="notarial-section-title">Jak działa zakup nieruchomości na raty notarialne?</h2>
          <p className="notarial-section-subtitle">Proces zakupu nieruchomości na raty notarialne składa się z kilku prostych kroków:</p>
        </div>
        
        <div className="notarial-process-flow">
          <div className="notarial-process-step">
            <div className="notarial-step-badge">1</div>
            <div className="notarial-step-icon">
              <FaSearch />
            </div>
            <div className="notarial-step-content">
              <h3 className="notarial-step-title">Wybór nieruchomości</h3>
              <p className="notarial-step-description">Klient wybiera mieszkanie lub dom z naszej oferty dostępnej na raty notarialne. Współpracujemy wyłącznie z właścicielami, którzy akceptują to rozwiązanie.</p>
            </div>
          </div>

          <div className="notarial-process-step">
            <div className="notarial-step-badge">2</div>
            <div className="notarial-step-icon">
              <FaComments />
            </div>
            <div className="notarial-step-content">
              <h3 className="notarial-step-title">Negocjacje warunków płatności</h3>
              <p className="notarial-step-description">Ustalamy liczbę rat, ich wysokość, terminy płatności oraz ewentualne odsetki. Warunki dopasowujemy indywidualnie do możliwości finansowych kupującego oraz oczekiwań sprzedającego.</p>
            </div>
          </div>

          <div className="notarial-process-step">
            <div className="notarial-step-badge">3</div>
            <div className="notarial-step-icon">
              <FaFileContract />
            </div>
            <div className="notarial-step-content">
              <h3 className="notarial-step-title">Sporządzenie aktu notarialnego</h3>
              <p className="notarial-step-description">Kancelaria notarialna przygotowuje akt notarialny, w którym dokładnie określone są warunki umowy. Notariusz dba o zgodność dokumentu z przepisami prawa oraz zabezpiecza interesy obu stron.</p>
            </div>
          </div>

          <div className="notarial-process-step">
            <div className="notarial-step-badge">4</div>
            <div className="notarial-step-icon">
              <FaKey />
            </div>
            <div className="notarial-step-content">
              <h3 className="notarial-step-title">Podpisanie umowy i przekazanie nieruchomości</h3>
              <p className="notarial-step-description">Po podpisaniu aktu notarialnego kupujący staje się właścicielem nieruchomości, a spłata rat odbywa się zgodnie z ustalonym harmonogramem.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja dla kogo */}
      <div className="notarial-audience-section">
        <div className="notarial-container">
          <div className="notarial-section-header">
            <h2 className="notarial-section-title">Kto może skorzystać z rat notarialnych?</h2>
            <p className="notarial-section-subtitle">To rozwiązanie idealne dla:</p>
          </div>
          
          <div className="notarial-audience-grid">
            <div className="notarial-audience-card">
              <div className="notarial-audience-icon">
                <FaPiggyBank />
              </div>
              <h3 className="notarial-audience-title">Osób z oszczędnościami</h3>
              <p className="notarial-audience-description">Osób posiadających oszczędności, ale niemogących zapłacić pełnej kwoty od razu.</p>
            </div>

            <div className="notarial-audience-card">
              <div className="notarial-audience-icon">
                <FaUserTie />
              </div>
              <h3 className="notarial-audience-title">Przedsiębiorców</h3>
              <p className="notarial-audience-description">Przedsiębiorców unikających długoterminowych zobowiązań kredytowych.</p>
            </div>

            <div className="notarial-audience-card">
              <div className="notarial-audience-icon">
                <FaUsers />
              </div>
              <h3 className="notarial-audience-title">Rodzin</h3>
              <p className="notarial-audience-description">Rodzin szukających elastycznego sposobu finansowania zakupu mieszkania lub domu.</p>
            </div>

            <div className="notarial-audience-card">
              <div className="notarial-audience-icon">
                <FaChartLine />
              </div>
              <h3 className="notarial-audience-title">Inwestorów</h3>
              <p className="notarial-audience-description">Inwestorów, którzy chcą ominąć formalności i koszty związane z kredytem hipotecznym.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='section-spacer-lg'></div>

      {/* Sekcja korzyści */}
      <div className="notarial-container">
        <div className="notarial-benefits-grid">
          <div className="notarial-benefit-card">
            <div className="notarial-benefit-icon">
              <FaShieldAlt />
            </div>
            <h3 className="notarial-benefit-title">Pełne bezpieczeństwo</h3>
            <p className="notarial-benefit-description">Transakcja zabezpieczona aktem notarialnym gwarantującym ochronę prawną obu stronom.</p>
          </div>

          <div className="notarial-benefit-card">
            <div className="notarial-benefit-icon">
              <FaClock />
            </div>
            <h3 className="notarial-benefit-title">Szybki proces</h3>
            <p className="notarial-benefit-description">Brak skomplikowanych procedur bankowych - transakcja finalizowana w krótszym czasie.</p>
          </div>

          <div className="notarial-benefit-card">
            <div className="notarial-benefit-icon">
              <FaMoneyBillWave />
            </div>
            <h3 className="notarial-benefit-title">Niższe koszty</h3>
            <p className="notarial-benefit-description">Brak prowizji bankowych, ubezpieczeń i ukrytych opłat charakterystycznych dla kredytów.</p>
          </div>

          <div className="notarial-benefit-card">
            <div className="notarial-benefit-icon">
              <FaRocket />
            </div>
            <h3 className="notarial-benefit-title">Natychmiastowe zakwaterowanie</h3>
            <p className="notarial-benefit-description">Klucze do nieruchomości otrzymujesz od razu po podpisaniu aktu notarialnego.</p>
          </div>
        </div>
      </div>
<div className='section-spacer-lg'></div>
<div className='reelsy' style={{display: 'flex', justifyContent: 'center'}}> 
<iframe width="337" height="554" src="https://www.youtube.com/embed/1hJchuEwB-s" title="Grilled appetizer ribs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="337" height="554" src="https://www.youtube.com/embed/1hJchuEwB-s" title="Grilled appetizer ribs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="337" height="554" src="https://www.youtube.com/embed/1hJchuEwB-s" title="Grilled appetizer ribs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="337" height="554" src="https://www.youtube.com/embed/1hJchuEwB-s" title="Grilled appetizer ribs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
<div className='section-spacer-lg'></div>
      {/* Sekcja FAQ */}
      <div className='notarial-faq-section'>
        <div className="notarial-container">
          <h2 className="notarial-faq-title">Często zadawane pytania</h2>
          <p className="notarial-faq-subtitle">Szukasz odpowiedzi na swoje pytanie? Sprawdź tutaj!</p>
<div className="notarial-faq-container">
  <FAQItem
    question={'Kto może kupić nieruchomość na raty notarialne?'}
    answer={
      <>
        <p>Nieruchomość w systemie rat notarialnych może kupić każda osoba pełnoletnia i posiadająca pełną zdolność do czynności prawnych, niezależnie od obywatelstwa czy formy zatrudnienia.</p>
        <p>Z tej formy finansowania mogą skorzystać osoby pracujące na etacie, przedsiębiorcy, osoby wykonujące umowy cywilnoprawne oraz osoby osiągające dochody z innych źródeł.</p>
        <p>Nie obowiązują limity dochodowe ani wymogi bankowe — nie sprawdzamy BIK, BIG ani KRD. Kluczowe jest jedynie to, aby kupujący mógł regularnie spłacać ustalone raty wynikające z aktu notarialnego.</p>
      </>
    }
  />

  <FAQItem
    question={'Czym są raty notarialne / prywatne?'}
    answer={
      <>
        <p>Raty notarialne, nazywane również prywatnymi, to forma zakupu nieruchomości polegająca na rozłożeniu płatności na ustalone raty, bez udziału banku.</p>
        <p>Cały proces jest formalizowany aktem notarialnym, w którym określa się harmonogram spłat, wysokość rat oraz zabezpieczenia.</p>
        <p>Płatności są zabezpieczone wpisami w księdze wieczystej, co chroni kupującego i sprzedającego.</p>
        <p>Taka forma finansowania umożliwia zakup nieruchomości bez kredytu hipotecznego, przy pełnej ochronie prawnej transakcji.</p>
      </>
    }
  />

  <FAQItem
    question={'Czy raty notarialne są tańsze od kredytu hipotecznego?'}
    answer={
      <>
        <p>Tak — raty notarialne są znacznie tańszą alternatywą dla kredytu hipotecznego.</p>
        <ul>
          <li>Brak kosztów bankowych: prowizji, marż, ubezpieczeń, produktów dodatkowych czy odsetek.</li>
          <li>Warunki spłaty są ustalane bezpośrednio ze sprzedającym.</li>
          <li>Brak ukrytych opłat.</li>
          <li>Harmonogram dopasowany do Twoich możliwości.</li>
          <li>Brak ryzyka wzrostu rat wynikających ze zmian stóp procentowych.</li>
        </ul>
        <p>W praktyce całkowity koszt zakupu jest znacznie niższy niż przy finansowaniu bankowym.</p>
      </>
    }
  />
  <FAQItem
    question={'Kiedy otrzymam klucze od swojej nowej nieruchomości?'}
    answer={
      <>
        <p>Klucze do nieruchomości przekazywane są bezpośrednio po podpisaniu aktu notarialnego.</p>
        <p>Oznacza to, że tego samego dnia możesz się wprowadzić lub rozpocząć korzystanie z lokalu.</p>
        <p>To jedna z największych zalet rat notarialnych — pełny dostęp bez oczekiwania na decyzję banku.</p>
      </>
    }
  />
</div>



        </div>
      </div>
      
      <Footer/>
    </div>
  )
}