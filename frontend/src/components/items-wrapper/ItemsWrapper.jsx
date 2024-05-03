import React, { useState, useEffect } from 'react';
import './itemsWrapper.css';
import Item from '../item/Item';
import komputerImage from '../../assets/komputer.jpg';

const ItemsWrapper = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9192/api/inventory')
     .then(response => response.json())
     .then(data => {
        // Przetwarzanie danych po pobraniu
        const processedData = data.map(item => {
          // Sprawdź, czy category to obiekt
          if (typeof item.category === 'object' && item.category!== null) {
            // Przekształć category w nazwę kategorii
            return {
             ...item,
              category: item.category.name // Użyj tylko nazwy kategorii
            };
          }
          // Jeśli category to już pojedyncza wartość, zwróć go bez zmian
          return item;
        });
        setItems(processedData);
      })
     .catch(error => console.error('Error fetching items:', error));
  }, []);

  

  return (
    <div className='items-wrapper'>
      {items.map(item => (
        <Item 
          item={item}
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
