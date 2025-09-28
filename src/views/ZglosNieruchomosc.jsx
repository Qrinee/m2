import React from 'react'
import Header from '../components/Header/Header'
import Add from '../components/Add/Add'
import Footer from '../components/Footer/Footer'

export default function ZglosNieruchomosc() {
  return (
    <div>
        <Header black/>
        <div className='separate'></div>
        <Add/>
        <Footer/>
    </div>
  )
}
