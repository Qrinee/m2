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
                      <h1>Poznaj nasz zespół</h1>
                      <p className='page-subtitle'><b>Twój zespół ekspertów od bezpiecznych nieruchomości</b></p>
                      <p className='page-subtitle'>Za każdą udaną transakcją stoją ludzie – doświadczeni, zaangażowani i pełni pasji do tego, co robią. Nasi agenci to nie tylko doradcy ds. nieruchomości, ale również osoby przeszkolone w zakresie prawa, negocjacji i obsługi klienta na najwyższym poziomie.</p>
                    <p className='page-subtitle'>Każdy z nich działa w oparciu o indywidualne podejście do klienta, analizując potrzeby, cele i możliwości. Pomagają nie tylko znaleźć idealne mieszkanie, dom czy działkę – ale przede wszystkim zadbać o to, by cały proces przebiegał spokojnie, bezpiecznie i bez stresu.</p>
                     <p className='page-subtitle'>Znają rynek lokalny od podszewki, rozumieją zmieniające się przepisy i potrafią odpowiednio doradzić – niezależnie od sytuacji. Współpraca z nimi to gwarancja, że masz po swojej stronie nie tylko pośrednika, ale prawdziwego partnera w całym procesie.</p>
                     <hr></hr>
                      <p className='page-subtitle'><b>Zobacz, kto czeka, by pomóc Ci zrobić kolejny krok w stronę nowej nieruchomości. Poznaj nasz zespół.</b></p>
                    
                    
                    
                    
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