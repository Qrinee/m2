import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import './NaszZespol.css'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const API_BASE_URL = import.meta.env.VITE_BACKEND + "/api";

export default function NaszZespol() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/users/team/admins`);

      if (!response.ok) {
        throw new Error('Błąd pobierania danych zespołu');
      }

      const result = await response.json();
      
      const filteredMembers = result.data.users.filter(
        member => member.contactEmail !== "kajman5021@gmail.com"
      );
      
      setTeamMembers(filteredMembers);
      
    } catch (err) {
      setError(err.message);
      console.error('Błąd pobierania zespołu:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header black/>
        <div className='separate'></div>
        <div className='section'>
          <div className="app">
            <div className="container">
              <Breadcrumbs items={['Strona główna', "Nasz Zespół"]} />
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Ładowanie zespołu...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header black/>
        <div className='separate'></div>
        <div className='section'>
          <div className="app">
            <div className="container">
              <Breadcrumbs items={['Strona główna', "Nasz Zespół"]} />
              <div className="error-container">
                <p>{error}</p>
                <button onClick={fetchTeamMembers} className="btn-primary">
                  Spróbuj ponownie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Header black/>
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                    <Breadcrumbs items={['Strona główna', "Nasz Zespół"]} />
                    <div className='page-header'>
                      <h1>Specjaliści, którzy poprowadzą Cię przez cały proces</h1>
                      <p className='page-subtitle'><b>Ludzie, których kompetencje uzupełniają się na każdym etapie Twojej inwestycji.</b></p>
                      <p>

W naszym zespole każdy odpowiada za inny, kluczowy obszar — dzięki temu współpraca z nami jest kompletna, precyzyjna i maksymalnie skuteczna. Tworzą go osoby z doświadczeniem w analizie nieruchomości, prawie, finansach, negocjacjach, inwestycjach deweloperskich oraz obsłudze klientów indywidualnych i biznesowych, a także specjaliści techniczni odpowiedzialni za część inżynieryjną i projektową.

                      </p>
            <p>Wspólnie tworzymy zespół, który potrafi kompleksowo poprowadzić każdy projekt — niezależnie od jego skali i stopnia złożoności. Dzięki temu masz pewność, że za każdym obszarem stoi osoba, która naprawdę się w nim specjalizuje.</p>                    
                    
                    
                    </div>
                    <div className='sm-separate'></div>
                    
                            {teamMembers.length === 0 ? (
                      <div className="no-members">
                        <p>Brak członków zespołu do wyświetlenia</p>
                      </div>
                    ) : (
                      <div className="team-grid">
                        {teamMembers.map(member => (
                            <Link to={`/estate_agent/${member._id}`} style={{textDecoration: 'none', color: 'inherit'}} key={member._id}>
                                <PhotoCard
                                  image={member.profilePicture ? `${import.meta.env.VITE_BACKEND}${member.profilePicture}` : '/default-avatar.png'}
                                  name={`${member.name} ${member.surname}`}
                                  position={member.position}
                                  description={member.bio}
                                  phoneNumber={member.phone}
                                  h={'300px'}
                                  email={member.contactEmail}
                                />
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
            </div>

        </div>

        <Footer/>
    </div>
  )
}