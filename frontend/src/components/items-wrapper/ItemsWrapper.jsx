import React, { useState, useEffect } from 'react';
import './itemsWrapper.css';
import Item from '../item/Item';
import komputerImage from '../../assets/komputer.jpg';

const ItemsWrapper = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          key={item.id}
          src={item.photoUrl ? item.photoUrl : komputerImage} // Zakładając, że klucz to 'photoUrl'
          id={item.id}
          name={item.itemName}
          description={item.description}
          rentStatus={item.rentStatus}
          // Przekaż dodatkowe dane potrzebne do modalu
        />
      ))}
    </div>
  );
};

export default ItemsWrapper;
