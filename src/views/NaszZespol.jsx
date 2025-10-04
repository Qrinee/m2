import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import PhotoCard from '../components/PhotoCard/PhotoCard'
import './NaszZespol.css'
import { Link } from 'react-router-dom'

const API_BASE_URL = "http://localhost:5000/api";

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
      
      // Użyj nowego publicznego endpointu
      const response = await fetch(`${API_BASE_URL}/users/team/admins`);

      if (!response.ok) {
        throw new Error('Błąd pobierania danych zespołu');
      }

      const result = await response.json();
      
      // Użyj danych bezpośrednio z odpowiedzi (już przefiltrowane)
      setTeamMembers(result.data.users);
      
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
                      <h1>Poznaj nasz zespół</h1>
                      <p className='page-subtitle'>Nasi doświadczeni agenci są gotowi pomóc Ci znaleźć wymarzoną nieruchomość</p>
                    </div>
                    <div className='sm-separate'></div>
                    
                    {teamMembers.length === 0 ? (
                      <div className="no-members">
                        <p>Brak członków zespołu do wyświetlenia</p>
                      </div>
                    ) : (
                      <div className="team-grid">
                        {teamMembers.map(member => (
                            <Link to={`/estate_agent/${member._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                <PhotoCard
                                  key={member._id}
                                  image={member.profilePicture ? `http://localhost:5000${member.profilePicture}` : '/default-avatar.png'}
                                  name={`${member.name} ${member.surname}`}
                                  position={member.position}
                                  description={member.bio}
                                  phone={member.phone}
                                  email={member.contactEmail}
                                />
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}