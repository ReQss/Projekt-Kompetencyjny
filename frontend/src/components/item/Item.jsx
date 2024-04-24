import React from 'react'
import './item.css'
import Button from '../button/Button'

const Item = ({ src, name, owner, building, room  }) => {
  return (
    <div className='item'>
      <img src={src} alt="item" />
      <p>{name}</p>
      <p>{owner}</p>
      <p>{building}</p>
      <p>{room}</p>
    </div>
  )
}

export default Item
