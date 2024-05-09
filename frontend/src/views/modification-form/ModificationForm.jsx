import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./modificationForm.css";
import { Button } from "../../components";

const ModificationForm = () => {
  const { itemId } = useParams();
  const [itemInfo, setItemInfo] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:9192/api/category`);
        const data = await response.json();
        setCategories(data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    const fetchItemInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:9192/api/inventoryById/${itemId}`
        );
        const data = await response.json();
        setItemInfo(data);
        if (data.category) {
            if (data.category.id) {
                setSelectedCategory(data.category.id)
                console.log(selectedCategory)
            }
        }
      } catch (error) {
        console.error("Error fetching rent history:", error);
      }
    };

    fetchItemInfo();
  }, [itemId]);

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

    console.log(itemInfo);
    const item = itemInfo;
    let selCategory = null;

    categories.forEach((singleCat) => {
      if (singleCat.id == selectedCategory) selCategory = singleCat;
    });
    itemInfo.category = selCategory;

    try {
      const response = await fetch(
        `http://localhost:9192/api/updateInventory/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        alert("Modyfikacja udana!");
      } else {
        const errorMessage = await response.text();
        alert(`Błąd podczas wypożyczenia: ${errorMessage}`);
      }
    } catch (error) {
      alert("Wystąpił błąd podczas wypożyczania sprzętu.");
    }
  };

  return (
    <div className="form-container modification-form">
      <h2>Zmodyfikuj przedmiot</h2>
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
        <div className="form">
          <label htmlFor="ownerId">Id właściciela:</label>
          <input
            type="number"
            id="ownerId"
            name="ownerId"
            value={itemInfo.ownerId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form">
          <label htmlFor="rentStatus">Status wypożyczenia:</label>
          <select
            id="rentStatus"
            name="rentStatus"
            value={itemInfo.rentStatus}
            onChange={handleInputChange}
            required
          >
            {itemInfo.rentStatus == "available" ? (
              <>
                <option value="available">Dostępny</option>
                <option value="unavailable">Niedostępny</option>
              </>
            ) : (
              <>
                <option value="unavailable">Niedostępny</option>
                <option value="available">Dostępny</option>
              </>
            )}
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
            {itemInfo.category ? (
              <>
                <option key={itemInfo.category.id} value={itemInfo.category.id}>
                  {itemInfo.category.name}
                </option>
                {categories.map((category) =>
                  category.id != itemInfo.category.id ? (
                    <>
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    </>
                  ) : (
                    <></>
                  )
                )}
              </>
            ) : (
              <></>
            )}
          </select>
        </div>

        {/* Dodaj pozostałe pola w podobny sposób */}
        <div className="button">
          <Button type="submit">Zmodyfikuj</Button>
        </div>
      </form>
    </div>
  );
};

export default ModificationForm;
