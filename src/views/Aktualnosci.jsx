import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import ListingCard from '../components/ListingCard/ListingCard'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import NewsCard from '../components/NewsCard/NewsCard'
import './Aktualnosci.css' // Stwórz plik CSS dla stylowania
import { Link } from 'react-router-dom'

export default function Aktualnosci() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/blog', {
        credentials: 'include'
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Używamy result.blogs lub result.data w zależności od struktury odpowiedzi
          setBlogPosts(result.blogs || result.data || [])
        }
      } else {
        throw new Error('Błąd podczas pobierania postów')
      }
    } catch (error) {
      console.error('Błąd pobierania blog postów:', error)
      setError('Nie udało się załadować aktualności')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div>
        <Header black/>
        <div className='separate'></div>
        <div className='section'>
          <div className="app">
            <div className="container">
              <Breadcrumbs items={['Strona główna', "Aktualności"]} />
              <div className='sm-separate'></div>
              <div className="loading-section">
                <p>Ładowanie aktualności...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Header black/>
        <div className='separate'></div>
        <div className='section'>
          <div className="app">
            <div className="container">
              <Breadcrumbs items={['Strona główna', "Aktualności"]} />
              <div className='sm-separate'></div>
              <div className="error-section">
                <p>{error}</p>
                <button onClick={fetchBlogPosts} className="btn-retry">
                  Spróbuj ponownie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header black/>
      <div className='separate'></div>

      <div className='section'>
        <div className="app">
          <div className="container">
            <Breadcrumbs items={['Strona główna', "Aktualności"]} />
            <div className='sm-separate'></div>
            
            <div className="page-header">
              <h1>Aktualności</h1>
              <p>Najnowsze wpisy i informacje</p>
            </div>

            <div className="news-grid-container">
              {blogPosts.length === 0 ? (
                <div className="empty-state">
                  <p>Brak aktualności do wyświetlenia</p>
                </div>
              ) : (
                <div className="news-grid">
                  {blogPosts.map((post) => (
                    <Link to={'/wpis/' + post._id} key={post._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <NewsCard 
                        key={post._id}
                        title={post.title}
                        date={new Date(post.date || post.createdAt).toLocaleDateString('pl-PL')}
                        excerpt={post.shortText || post.excerpt || post.content?.substring(0, 150) + '...'}
                        imageSrc={post.image}
                        id={post._id}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}