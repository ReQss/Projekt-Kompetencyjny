import React, { useState, useEffect } from 'react';
import './itemsWrapper.css';
import Item from '../item/Item';
import komputerImage from '../../assets/komputer.jpg';
import { useLocation } from 'react-router-dom';

const ItemsWrapper = () => {
  const [items, setItems] = useState([]);

  const location = useLocation();
  
  // Pobierz zalogowane Id użytkownika z localStorage
  const loggedInUserId = localStorage.getItem('userId');

  // Filtruj przedmioty na podstawie ownerId
  const filteredItems = items.filter(item => {
    // Jeżeli użytkownik jest na podstronie "/modify", zwróć tylko te przedmioty, które należą do niego
    if (location.pathname === '/modify') {
      return item.ownerId === parseInt(loggedInUserId);
    } else if (location.pathname === '/delete') {
      return item.ownerId === parseInt(loggedInUserId);
    } 
    // W innych przypadkach zwróć wszystkie przedmioty
    return true;
  });


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
      {filteredItems.map(item => (
        <Item 
          item={item}
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
