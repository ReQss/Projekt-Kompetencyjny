import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
    selectedUser: '',
  });

  const [inventoryList, setInventoryList] = useState([]);
  const [purposesList, setPurposesList] = useState([]);
  const [returnDate, setReturnDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  let { itemId } = useParams();
  if (itemId === undefined) {
    console.log(1);
    itemId = -1;
  } else {
    formData.inventory = itemId;
  }

  console.log(`id przedmiotu: `, itemId);

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('role');

  useEffect(() => {
    fetchUsers();
    fetchInventory(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:9192/getUsersByRoles`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchInventory = async (ownerId) => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/inventoryByOwnerId?ownerId=${ownerId}`
      );

      if (response.ok) {
        const data = await response.json();
        setInventoryList(data);
      } else {
        console.error('Failed to fetch inventory');
      }
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  useEffect(() => {
    const fetchPurposes = async () => {
      try {
        const response = await fetch('http://localhost:9192/api/rentPurposes');

        if (response.ok) {
          const data = await response.json();
          setPurposesList(data);
        } else {
          console.error('Failed to fetch purposes');
        }
      } catch (error) {
        console.error('Error fetching purposes:', error);
      }
    };

    fetchPurposes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUserChange = (e) => {
    const selectedUserId = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedUser: selectedUserId,
    }));
    if (selectedUserId === '') {
      fetchInventory(userId);
    } else {
      fetchInventory(selectedUserId);
    }
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
      selectedUser,
    } = formData;

    const payload = {
      user: {
        id: selectedUser === '' ? Number(userId) : Number(selectedUser),
      },
      inventory: { id: Number(inventory) },
      rentPurpose: { id: Number(rentPurpose) },
      email,
      firstName,
      lastName,
      rentDescription,
      rentStatus: 'rented',
      returnDate: returnDate.toISOString(),
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
          inventory: '',
          rentPurpose: '',
          email: '',
          firstName: '',
          lastName: '',
          rentDescription: '',
          selectedUser: '', // Resetowanie selectedUser
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
      <Link to="/">
        {' '}
        <Button className={'back-btn'}>Powrót</Button>{' '}
      </Link>
      <h2>Wypożycz sprzęt</h2>
      <form onSubmit={handleSubmit}>
        {userRole === 'ADMIN' ? (
          <>
            <div className="form">
              <label htmlFor="userId">Właściciel:</label>
              <select
                id="userId"
                name="selectedUser"
                value={formData.selectedUser}
                onChange={handleUserChange}
                required
              >
                <option value="">Wybierz właściciela</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            {formData.selectedUser && (
              <div className="form">
                <label htmlFor="inventory">Część:</label>
                <select
                  id="inventory"
                  name="inventory"
                  value={formData.inventory}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Wybierz produkt</option>
                  {inventoryList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.itemName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <div className="form">
            <label htmlFor="inventory">Część:</label>
            {itemId != -1 ? (
              <select
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                required
              >
                {inventoryList.map(
                  (item) =>
                    item.id == itemId && (
                      <option key={item.id} value={item.id}>
                        {item.itemName}
                      </option>
                    )
                )}
              </select>
            ) : (
              <select
                id="inventory"
                name="inventory"
                value={formData.inventory}
                onChange={handleInputChange}
                required
              >
                <option value="">Wybierz produkt</option>

                {inventoryList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        <div className="form">
          <label htmlFor="rentPurpose">Powód wypożyczenia:</label>
          <select
            id="rentPurpose"
            name="rentPurpose"
            value={formData.rentPurpose}
            onChange={handleInputChange}
            required
          >
            <option value="">Wybierz przyczynę</option>
            {purposesList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.purpose}
              </option>
            ))}
          </select>
        </div>

        <div className="form">
          <label htmlFor="returnDate">Data zwrotu:</label>
          <DatePicker
            className="date-picker"
            id="returnDate"
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            locale={pl}
            weekStartsOn={1}
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
          <label htmlFor="firstName">Imię:</label>
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
          <label htmlFor="lastName">Nazwisko:</label>
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
          <label htmlFor="rentDescription">Opis wypożyczenia:</label>
          <textarea
            type="text"
            id="rentDescription"
            name="rentDescription"
            value={formData.rentDescription}
            onChange={handleInputChange}
            rows={4}
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
