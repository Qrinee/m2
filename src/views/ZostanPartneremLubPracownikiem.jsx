import React from 'react'
import Hero from '../components/Hero/Hero'
import Header from '../components/Header/Header'
import Marquee from '../components/Marquee/Marquee'
import TwoPartText from '../layouts/TwoPartText'
import TeamSection from '../sections/TeamSection'
import NumberSection from '../sections/NumberSection'

export default function ZostanPartneremLubPracownikiem() {
  return (
    <div>
        <Header />
        <Hero img={
            'partner-scaled.jpg'
        }
        content={
            <>
                    <div className='card-section__header'>
                <h1>Zostań partnerem lub pracownikiem</h1>
                <p style={{color: 'white'}}>Jesteśmy zespołem łączącym doświadczenie prawne z praktyczną znajomością rynku nieruchomości, by zapewnić klientom kompleksową i bezpieczną obsługę. Jeśli chcesz rozwijać się razem z nami, zapraszamy do współpracy!</p>
                </div>
            </>
        }
        />

        <div className='separate'></div>
        <Marquee text='Nie znalazłeś odpowiedniej oferty? Skontaktuj się z nami – dysponujemy wieloma nieruchomościami, które nie zostały jeszcze opublikowane. Telefon: 696 266 381'/>
                <div className='separate'></div>
                <div className='card-section__header'>
                <h2>Jak dołączyć?</h2>
                <p>Wyślij swoje CV lub propozycję współpracy na adres: kontakt@m2notarialnie.pl lub skorzystaj z poniższego formularza kontaktowego. Skontaktujemy się z Tobą, aby omówić szczegóły.</p>
                </div>

        <TwoPartText
        left={
            <>
                <h2>Zostań partnerem M2Notarialnie</h2>
                <p>Jako partner biznesowy dołączasz do zespołu, który łączy doświadczenie prawne i praktyczną znajomość rynku nieruchomości. Razem budujemy markę, która oferuje klientom kompleksową i bezpieczną obsługę.</p>
            </>
        }
        right={
            <>
                <h2>Zostań pracownikiem M2Notarialnie</h2>
                <p>Jeśli chcesz rozwijać się w branży nieruchomości i prawa, dołącz do naszego zespołu. Szukamy osób, które cenią profesjonalizm, rzetelność i bezpieczeństwo w obsłudze klientów.</p>
            </>
        }/>

        <TwoPartText
        left={
            <>
                <h2>Kogo szukamy?</h2>
                <ul>
                        <li>Partnerów biznesowych z branży nieruchomości i prawa</li>
                        <li>Osób zorientowanych na profesjonalną, długofalową współpracę</li>
                        <li>Partnerów chcących rozwijać się i wspierać naszych klientów</li>
                </ul>
            </>
               
        }
        right={
            <>
                <h2>Kogo szukamy?</h2>
                <ul>
                    <li>Prawników, notariuszy i specjalistów rynku nieruchomości</li>
                    <li>Osób odpowiedzialnych i zorientowanych na klienta</li>
                    <li>Kandydatów gotowych na rozwój zawodowy i współpracę zespołową</li>
                </ul>
            </>
        }
        />

        <TwoPartText
            left={<h3>Razem możemy stworzyć coś więcej niż tylko współpracę — możemy zbudować partnerstwo oparte na wzajemnym rozwoju i zaufaniu, które przyniesie korzyści nie tylko nam, ale przede wszystkim naszym klientom.</h3>}
            right={<h3>W M2Notarialnie wierzymy, że sukces to efekt wspólnej pracy, pasji i ciągłego rozwoju — dołączając do nas, stajesz się częścią zespołu, który naprawdę dba o Twój rozwój i satysfakcję z pracy.</h3> }
        />

        {/* Sekcja z formularzami */}
        <TwoPartText
            left={
                <form className="contact-form">
                    <h3>Formularz partnerski</h3>
                    
                    <div className="form-group">
                        <label htmlFor="company-name">Imię i nazwisko / nazwa firmy *</label>
                        <input 
                            type="text" 
                            id="company-name"
                            name="company-name"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="partner-email">Adres e-mail *</label>
                        <input 
                            type="email" 
                            id="partner-email"
                            name="partner-email"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="partner-phone">Numer telefonu *</label>
                        <input 
                            type="tel" 
                            id="partner-phone"
                            name="partner-phone"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="partner-message">Propozycja współpracy / wiadomość *</label>
                        <textarea 
                            id="partner-message"
                            name="partner-message"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Wyślij propozycję współpracy
                    </button>
                </form>
            }
            right={
                <form className="contact-form">
                    <h3>Formularz rekrutacyjny</h3>
                    
                    <div className="form-group">
                        <label htmlFor="full-name">Imię i nazwisko *</label>
                        <input 
                            type="text" 
                            id="full-name"
                            name="full-name"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-email">Adres e-mail *</label>
                        <input 
                            type="email" 
                            id="employee-email"
                            name="employee-email"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-phone">Numer telefonu *</label>
                        <input 
                            type="tel" 
                            id="employee-phone"
                            name="employee-phone"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-message">Krótka wiadomość / list motywacyjny *</label>
                        <textarea 
                            id="employee-message"
                            name="employee-message"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cv-upload">Załącz swoje CV (PDF, DOC, max 5MB) *</label>
                        <input 
                            type="file" 
                            id="cv-upload"
                            name="cv-upload"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                        <small>Akceptowane formaty: PDF, DOC, DOCX. Maksymalny rozmiar: 5MB</small>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Wyślij aplikację
                    </button>
                </form>
            }
        />


                
    <TeamSection />
    <NumberSection/>
    </div>
  )
}