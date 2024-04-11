import React from 'react'
import './item.css'
const Item = ({ src }) => {
  return (
    <div className='item'>
      <img src={src} alt="item" />
      <p>nazwa</p>
      <p>wlasciciel</p>
      <p>budynek</p>
      <p>nr sali</p>
      <button>WYPOŻYCZ</button>
    </div>
  )
}

export default Item
