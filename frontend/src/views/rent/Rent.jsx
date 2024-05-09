import { useState } from 'react';
import './rent.scss';
import { Button } from '../../components';

const Rent = () => {
  const [formData, setFormData] = useState({
    inventory: '',
    rentPurpose: '',
    email: '',
    firstName: '',
    lastName: '',
    rentDescription: '',
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

    const {
      inventory,
      rentPurpose,
      email,
      firstName,
      lastName,
      rentDescription,
    } = formData;

    const date = new Date('2024-06-29');
    const instantDate = date.toISOString();
    const userId = localStorage.getItem('userId');

    const payload = {
      user: { id: Number(userId) },
      inventory: { id: Number(inventory) },
      rentPurpose: { id: Number(rentPurpose) },
      email,
      firstName,
      lastName,
      rentDescription,
      rentStatus: 'rented',
      returnDate: instantDate,
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
          rentPurpose: '',
          email: '',
          firstName: '',
          lastName: '',
          rentDescription: '',
          rentStatus: '',
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
          <label htmlFor="inventory">Inventory ID:</label>
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
          <label htmlFor="rentPurpose">Rent Purpose ID:</label>
          <input
            type="number"
            id="rentPurpose"
            name="rentPurpose"
            value={formData.rentPurpose}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="rentDescription">Rent Description:</label>
          <input
            type="text"
            id="rentDescription"
            name="rentDescription"
            value={formData.rentDescription}
            onChange={handleInputChange}
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
