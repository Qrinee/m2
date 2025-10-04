import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useParams } from 'react-router-dom';
import './Profil.css'
import { FaEnvelope, FaPhone } from 'react-icons/fa';



const API_BASE_URL = "http://localhost:5000/api";

export default function Profil() {
      const { id } = useParams();
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono nieruchomości');
        }
        
        const userData = await response.json();
        setUser(userData);
        console.log(userData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);
  return (
    <div>
        <Header black/>
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                    <Breadcrumbs items={['Strona główna', "Profil"]} />
                    <div className='sm-separate'></div>
                    <div className="info-section ">
                       <div className='f'>
                            <img src={user && "http://localhost:5000" + user?.data.user.profilePicture} alt={user?.name || 'Avatar'} className="info-section__avatar" />
                            <div className='info-section__text'>
                                <h2 className="info-section__name">{user?.data.user.name} {user?.data.user.surname}</h2>
                                <p className='info-section__position'>{user?.data.user.position}</p>
                                 <p className="info-section__phone"><FaPhone style={{marginRight: '10px'}}/> {user?.data.user.phone}</p>
                                <p className="info-section__email"><FaEnvelope style={{marginRight: '10px'}}/> {user?.data.user.contactEmail}</p>
                               
                            </div>
                        </div> 
                        <div className='about'>
                        <h2>O mnie</h2>
                        <p className="info-section__bio">{user?.data.user.bio || 'Brak opisu'}</p>
                        </div>
                    
                      <div className="form">
                        <h3>Skontaktuj się ze mną</h3>
                        <form>
                          <input type="text" className='input' placeholder="Twoje imię" />
                          <input type="email" className='input' placeholder="Twój Adres e-mail" />
                          <input type="tel" className='input' placeholder="Twój Telefon" />
                          <textarea  className='input' placeholder="Twoja wiadomość"></textarea>
                          <label className="gdpr">
                            <input type="checkbox" /> Wyrażam zgodę na Warunki GDPR
                          </label>
                          <button type="submit" className='btn-submit'>Wyślij E-Mail</button>
                        </form>
                      </div>
                   
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
