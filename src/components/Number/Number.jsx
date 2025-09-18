import React from 'react'
import './Number.css'
export default function Number({num, desc}) {
  return (
    <div className='number-section'>
        <div className='number'>
            <h3 className='num'>{num}</h3>
            <p className='desc'>{desc}</p>
        </div>
    </div>
  )
}
