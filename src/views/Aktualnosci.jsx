import React from 'react'
import Header from '../components/Header/Header'
import ListingCard from '../components/ListingCard/ListingCard'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import NewsCard from '../components/NewsCard/NewsCard'

export default function Aktualnosci() {
  return (
    <div>
        <Header black/>
        <div className='separate'></div>

        <div className='section'>
            <div className="app">
              <div className="container">
                    <Breadcrumbs items={['Strona główna', "Aktualnosci"]} />
                    <div className='sm-separate'></div>
                    <div className="info-section ">
                        <NewsCard title={"fsda fsad fsda fsdfas fsdafsd"} date={"21.04.2025"} excerpt={"asdionas dniasnid inoasdnio asinodnaios niodasnio"}/>   
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
