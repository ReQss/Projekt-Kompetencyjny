import React from 'react'
import './itemsWrapper.css'
import Item from '../item/Item'
import komputerImage from '../../assets/komputer.jpg';
import arduinoImage from '../../assets/arduino.jpg';
import krzesloImage from '../../assets/krzeslo.jpg';
import monitorImage from '../../assets/monitor.jpg';
import kabelImage from '../../assets/kabel.jpg';
import pojemnikImage from '../../assets/pojemnik.webp';

const ItemsWrapper = () => {
  return (
    <div className='items-wrapper'>
      <Item src={komputerImage} name={"Komputer"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={arduinoImage} name={"Płyta Arduino"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={krzesloImage} name={"Krzesło"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={monitorImage} name={"Monitor"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={kabelImage} name={"Kabel 1.5m"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={pojemnikImage} name={"Pojemnik plastikowy 50l"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={komputerImage} name={"Komputer"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      <Item src={arduinoImage} name={"Płyta Arduino"} owner={"Jan Kowalski"} building={"CTI"} room={"302"}/>
      
    </div>
  )
}

export default ItemsWrapper
