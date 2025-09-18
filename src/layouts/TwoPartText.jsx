import React from 'react'
import './TwoPartText.css'
export default function TwoPartText({left,right}) {
  return (
    <div className='two-part-text'>
        <div className='left'>
            {left}
        </div>
        <div className='right'>
            {right}
        </div>
    </div>
  )
}
