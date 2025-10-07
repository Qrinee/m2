import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import { useParams } from 'react-router-dom';
import './Profil.css'
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import './Wpis.css'


const API_BASE_URL = `${import.meta.env.VITE_BACKEND}/api`;

export default function Wpis() {
      const { id } = useParams();
      const [blog, setBlog] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/blog/${id}`);
        
        if (!response.ok) {
          throw new Error('Nie znaleziono nieruchomości');
        }
        
        const blogData = await response.json();
        setBlog(blogData);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);
  return (
    <div>
        <Header black/>
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                    <Breadcrumbs items={['Strona główna', "Wpis"]} />
                    <div className='sm-separate'></div>
                    <div className="info-section ">
                          {blog && (
                            <div className='blog-post'>
                                  <img src={import.meta.env.VITE_BACKEND + blog?.data.image} alt={'Blog Image'} className="blog-post__image" />
                                <h1 className="blog-post__title">{blog?.data.title}</h1>
                                <p className="blog-post__date">{new Date(blog?.data.date || blog?.data.createdAt).toLocaleDateString('pl-PL')}</p>
                                <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: blog?.data.content }}></div>
                            </div>
                            
                            )}
                                
                              
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
