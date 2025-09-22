import React from 'react'
import './CardSection.css'
import InfoCard from '../components/InfoCard/InfoCard'
import { FaChartBar, FaHandHolding, FaShieldAlt } from 'react-icons/fa'
export default function CardSection() {
  return (
    <div className='card-section-wrapper'>
        <div className='card-section__header'>
        <h2 className='h2'>Raty notarialne – bezpieczna droga do własnej nieruchomości</h2>
        <p  className='p'>
          <b>  Spełnij marzenie o własnym M – bez kredytu i bez stresu. </b>
Dzięki notarialnym ratom od M2Notarialnie, możesz kupić sprawdzoną nieruchomość bez weryfikacji zdolności kredytowej i z pełnym wsparciem prawnym.
        </p>
        </div>
        <div  className='card-section'>
      <InfoCard
        icon={<FaChartBar width={40} height={40} />}
        title="Stała rata miesięczna"
        description="Przejrzyste zasady i jasny harmonogram spłaty."
        features={[
          "Raty dopasowane do Twoich możliwości",
          "Bez ukrytych kosztów",
          "Harmonogram podany z góry – 100% przejrzystości"
        ]}
        buttonText="Oblicz ratę"
        onButtonClick={() => alert("Kliknięto oblicz ratę")}
      />
    <InfoCard
        icon={<FaHandHolding width={40} height={40} />}
        title="Decyzja w Twoich rękach"
        description="Kupno nieruchomości nigdy nie było prostsze – u nas to Ty decydujesz."
        features={[
          "Nie sprawdzamy zdolności kredytowej",
          "Nie analizujemy BIK, BIG ani KRD",
          "Wystarczy Twoja decyzja i chęć zakupu"
        ]}
        buttonText="Dowiedz się więcej"
        onButtonClick={() => alert("Kliknięto oblicz ratę")}
      />
    <InfoCard
        icon={<FaShieldAlt width={40} height={40} />}
        title="Pełna ochrona notarialna"
        description="Bezpieczna forma zakupu pod nadzorem kancelarii."
        features={[
          "Proces prowadzony z udziałem adwokatów i notariuszy",
          "Umowy zabezpieczone prawnie",
          "Obsługa transakcji od A do Z"
        ]}
        onButtonClick={() => alert("Kliknięto oblicz ratę")}
      />
</div>
    </div>
  )
}
