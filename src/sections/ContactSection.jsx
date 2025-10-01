import React from 'react'
import SplitLayout from '../layouts/SplitLayout'
import city from '../assets/city_contact3-2.jpeg'
import './ContactSection.css'
export default function ContactSection() {
  return (
    <div>
            <SplitLayout
      rightContent={
      <div>
        <div className='contact-section__header'>
      <p>
          Wypełnij krótki formularz, a nasi agenci odezwą się do Ciebie w mniej niż 24 godziny.
      </p>
      <h2 className='h2'>Chętnie Ci pomożemy</h2>
      </div>
      <form className='contact-form'>
        <input type="text" placeholder="Imię i nazwisko" required className='input' />
        <input type="email" placeholder="Email" required className='input' />
        <input type="tel" placeholder="Telefon" required className='input' />
        <textarea placeholder="Wiadomość" required className='textarea' ></textarea>
        <label className='label' >
          <input type="checkbox" required style={{marginRight: '10px'}} />
          Akceptuję <a href="/terms" className='a'>regulamin</a> i <a className='a' href="/privacy">politykę prywatności</a>
          </label>
        <button className='button' style={{marginTop: '20px'}} type="submit">Wyślij wiadomość</button>
      </form>
      </div>
      }
      leftBg={city}
      rightBg="#F8F8F8"
    />
    </div>
  )
}
