import React from 'react'
import './itemsWrapper.css'
import Item from '../item/Item'
import komputerImage from '../../assets/komputer.jpg';
import arduinoImage from '../../assets/arduino.jpg';
import krzesloImage from '../../assets/krzeslo.jpg';
import monitorImage from '../../assets/monitor.jpg';

const ItemsWrapper = () => {
  return (
    <div className='items-wrapper'>
      <Item src={komputerImage}/>
      <Item src={arduinoImage}/>
      <Item src={krzesloImage}/>
      <Item src={monitorImage}/>
      <Item src={krzesloImage}/>
      
    </div>
  )
}

export default ItemsWrapper
