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
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setError(error.toString());
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items: {error}</p>;

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
