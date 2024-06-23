import { useState, useEffect } from 'react';
import './itemsWrapper.css';
import Item from '../item/Item';
import komputerImage from '../../assets/komputer.jpg';
import { useLocation } from 'react-router-dom';

const ItemsWrapper = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  const loggedInUserId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('role');

  const filteredItems = items
    .filter((item) => {
      if (userRole === 'ADMIN') {
        console.log('full access');
      } else if (
        location.pathname === '/modify' ||
        location.pathname === '/delete' ||
        location.pathname === '/user-items'
      ) {
        return item.ownerId === parseInt(loggedInUserId);
      }
      return true;
    })
    .filter(
      (item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  useEffect(() => {
    fetch('http://localhost:9192/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const processedData = data.map((item) => {
          if (typeof item.category === 'object' && item.category !== null) {
            return {
              ...item,
              category: item.category.name,
            };
          }
          return item;
        });
        setItems(processedData);
      })
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="items-wrapper">
      <input
        type="text"
        placeholder="Search by name, description or category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      {filteredItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          src={
            item.photo ? `data:image/jpeg;base64,${item.photo}` : komputerImage
          } // Assuming the key is 'photo' and the value is base64
        />
      ))}
    </div>
  );
};

export default ItemsWrapper;
