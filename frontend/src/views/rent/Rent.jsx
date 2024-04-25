import { useState } from 'react';
import './rent.scss';
import { Button } from '../../components';

const Rent = () => {
  const [formData, setFormData] = useState({
    user: '',
    inventory: '',
    rentStatus: '',
    indexNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user, inventory, rentStatus, indexNumber } = formData;

    const payload = {
      user: { id: Number(user) },
      inventory: { id: Number(inventory) },
      rentStatus,
      indexNumber: Number(indexNumber),
    };

    try {
      const response = await fetch('http://localhost:9192/api/rentHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('działa');
        setFormData({
          user: '',
          inventory: '',
          rentStatus: '',
          indexNumber: '',
        });

        alert('Wypożyczenie udane!');
      } else {
        const errorMessage = await response.text();
        alert(`Błąd podczas wypożyczenia: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error);
      alert('Wystąpił błąd podczas wypożyczania sprzętu.');
    }
  };

  return (
    <div className="form-container">
      <h2>Wypożycz sprzęt</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="user">Twoje ID:</label>
          <input
            type="number"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="inventory">ID części:</label>
          <input
            type="number"
            id="inventory"
            name="inventory"
            value={formData.inventory}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="rentStatus">Status wypożyczenia:</label>
          <input
            type="text"
            id="rentStatus"
            name="rentStatus"
            value={formData.rentStatus}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="indexNumber">Numer indexu wypożyczającego:</label>
          <input
            type="number"
            id="indexNumber"
            name="indexNumber"
            value={formData.indexNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button">
          <Button type="submit">Wypożycz</Button>
        </div>
      </form>
    </div>
  );
};

export default Rent;
