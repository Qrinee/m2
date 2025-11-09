import React from 'react'
import Number from '../components/Number/Number'

export default function NumberSection() {
  return (
    <div>
        <div className='separate'></div>
        <div className='card-section__header number-section'>
            <h2 className='h2'>Nasze liczby mówią same za siebie</h2>
            <div className='num-wrapper'>
                <Number num={'98%'} desc={'klientów poleca nas dalej'} />
                <Number num={'+200'} desc={'bezpiecznie przeprowadzonych transakcji'} />
                <Number num={'10 lat'} desc={'doświadczenia w nieruchomościach i prawie'} />
            </div>
        </div>

    </div>
  )
}
