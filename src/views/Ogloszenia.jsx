import React from 'react'

import { Link } from 'react-router-dom';
import Add from '../components/Add/Add';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';


export default function Ogloszenia() {




  return (
    <div>
        <Header black />  
        <div className='separate'></div>
        <Add/>
      
        <Footer/>
    </div>
  )
}
