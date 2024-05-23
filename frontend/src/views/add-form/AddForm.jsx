import { useState, useEffect } from 'react';
import { Button } from '../../components';
import './addForm.css';

function AddForm() {
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const [itemInfo, setItemInfo] = useState({
    ownerId: userRole !== 'ADMIN' ? userId : '',
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:9192/api/category`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:9192/getUsersByRoles`);
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = itemInfo;
    let selCategory = null;

    categories.forEach((singleCat) => {
      if (singleCat.name == selectedCategory) selCategory = singleCat;
    });
    item.category = selCategory;

    try {
      const response = await fetch(`http://localhost:9192/api/addInventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        alert('Dodawanie powiodło się!');
      } else {
        const errorMessage = await response.text();
        alert(`Błąd podczas dodawania: ${errorMessage}`);
      }
    } catch (error) {
      alert('Wystąpił błąd podczas dodawania przedmiotu.');
    }
  };

  return (
    <div className="form-container add-item-form">
      <h2>Dodaj przedmiot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label htmlFor="description">Opis:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={itemInfo.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="itemName">Nazwa przedmiotu:</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemInfo.itemName}
            onChange={handleInputChange}
            required
          />
        </div>
        {userRole === 'ADMIN' ? (
          <div className="form">
            <label htmlFor="ownerId">Właściciel:</label>
            <select
              id="ownerId"
              name="ownerId"
              value={itemInfo.ownerId}
              onChange={handleInputChange}
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
        ) : null}

        <div className="form">
          <label htmlFor="rentStatus">Status wypożyczenia:</label>
          <select
            id="rentStatus"
            name="rentStatus"
            value={itemInfo.rentStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Wybierz status</option>
            <option value="available">Dostępny</option>
            <option value="unavailable">Niedostępny</option>
          </select>
        </div>
        <div className="form">
          <label htmlFor="room">Sala:</label>
          <input
            type="text"
            id="room"
            name="room"
            value={itemInfo.room}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="building">Budynek:</label>
          <input
            type="text"
            id="building"
            name="building"
            value={itemInfo.building}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="inventoryDate">Data dodania:</label>
          <input
            type="date"
            id="inventoryDate"
            name="inventoryDate"
            value={itemInfo.inventoryDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="value">Wartość:</label>
          <input
            type="text"
            id="value"
            name="value"
            value={itemInfo.value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="inventoryNumber">Numer przedmiotu:</label>
          <input
            type="text"
            id="inventoryNumber"
            name="inventoryNumber"
            value={itemInfo.inventoryNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="invoiceNumber">Numer faktury:</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={itemInfo.invoiceNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="fundingSource">Źródło funduszy:</label>
          <input
            type="text"
            id="fundingSource"
            name="fundingSource"
            value={itemInfo.fundingSource}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="supplierDocument">Dokument dostawcy:</label>
          <input
            type="text"
            id="supplierDocument"
            name="supplierDocument"
            value={itemInfo.supplierDocument}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="invoicePosition">Pozycja faktury:</label>
          <input
            type="text"
            id="invoicePosition"
            name="invoicePosition"
            value={itemInfo.invoicePosition}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="serialNumber">Numer seryjny:</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={itemInfo.serialNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="category">Kategoria:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="button">
          <Button type="submit">Dodaj</Button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
