import React, { useState, useEffect } from 'react';
import './itemsWrapper.css';
import Item from '../item/Item';
import komputerImage from '../../assets/komputer.jpg';

const ItemsWrapper = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9192/api/inventory')  // Upewnij się, że URL jest poprawny!
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className='items-wrapper'>
      {items.map(item => (
        <Item 
          key={item.id}
          src={item.photoUrl ? item.photoUrl : komputerImage} // Podstawowe zdjęcie, gdy brak photoUrl
          name={item.itemName}
          owner={item.ownerId} // Tutaj możesz potrzebować dodatkowego zapytania/API do przekształcenia ID właściciela na imię
          building={item.building}
          room={item.room}
        />
      ))}
    </div>
  );
};

export default ItemsWrapper;
