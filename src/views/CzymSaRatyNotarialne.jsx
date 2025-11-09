import React from 'react'
import Hero from '../components/Hero/Hero'
import Background from '../assets/pexels-pixabay-48148.jpg'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import FAQItem from '../components/FAQItem/FAQItem'
import Footer from '../components/Footer/Footer'
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
            <h1>Raty notarialne - <span style={{color: 'var(--secondary-color)'}}>M2Notarialnie</span></h1>
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
              <p className="notarial-card-text">Raty notarialne to alternatywny sposób finansowania zakupu nieruchomości, w którym płatności rozkładane są na wygodne raty, a cały proces zostaje sformalizowany aktem notarialnym. Dzięki temu zarówno sprzedający, jak i kupujący, zyskują pełne bezpieczeństwo i transparentność transakcji.</p>
              <p className="notarial-card-text">Kluczowym elementem rat notarialnych jest właśnie akt notarialny, który precyzyjnie określa warunki płatności, terminy oraz ewentualne zabezpieczenia.</p>
            </div>
          </div>

          <div className="notarial-feature-card notarial-feature-card--accent">
            <div className="notarial-card-icon">
              <FaStar />
            </div>
            <div className="notarial-card-content">
              <h2 className="notarial-card-title">Unikalna oferta</h2>
              <p className="notarial-card-text">Nasze biuro nieruchomości jest jedynym w Polsce, które oferuje kompleksową obsługę zakupu nieruchomości na raty notarialne. Dzięki doświadczeniu oraz współpracy z renomowanymi kancelariami notarialnymi gwarantujemy pełne bezpieczeństwo transakcji i indywidualne podejście do każdego klienta.</p>
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

      {/* Sekcja FAQ */}
      <div className='notarial-faq-section'>
        <div className="notarial-container">
          <h2 className="notarial-faq-title">Często zadawane pytania</h2>
          <p className="notarial-faq-subtitle">Szukasz odpowiedzi na swoje pytanie? Sprawdź tutaj!</p>
          <div className="notarial-faq-container">
            <FAQItem question={'Kto może kupić nieruchomość na raty notarialne?'} answer={'Każda osoba pełnoletnia z polskim obywatelstwem. Zarówno osoba pracująca na etacie jak i taka, która prowadzi własny biznes. Nie ma żadnych ograniczeń. Nie weryfikujemy zdolności kredytowej ani raportów BIK, BIG, KRD.'} />
            <FAQItem question={'Czym są raty notarialne / prywatne?'} answer={'Raty notarialne, zwane także prywatnymi, to forma rozłożonej płatności za zakup nieruchomości, która jest regulowana na mocy aktu notarialnego. Kupujący i sprzedający ustalają harmonogram spłat, które są zabezpieczone odpowiednimi zapisami w księdze wieczystej nieruchomości. Taka forma pozwala kupującemu na zakup bez kredytu bankowego, a sprzedającemu zapewnia prawną ochronę transakcji.'} />
            <FAQItem question={'Czy raty notarialne są tańsze od kredytu hipotecznego?'} answer={'Raty notarialne są tańszą alternatywą dla kredytu bankowego, ponieważ nie wiążą się z dodatkowymi kosztami, takimi jak prowizje, ubezpieczenia czy odsetki narzucone przez bank. Co więcej, warunki spłaty można negocjować bezpośrednio ze sprzedającym, co daje większą elastyczność i brak ukrytych opłat.'} />
            <FAQItem question={'Kiedy otrzymam klucze od swojej nowej nieruchomości?'} answer={'Klucze do nieruchomości otrzymasz od razu po podpisaniu aktu notarialnego, co oznacza, że możesz natychmiast zacząć korzystać z nowego lokum! To niezwykle wygodne i szybkie rozwiązanie.'} />
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}