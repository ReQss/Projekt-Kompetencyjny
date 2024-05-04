import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./modificationForm.css";
import { Button } from '../../components';

const ModificationForm = () => {
    const { itemId } = useParams();
    const [itemInfo, setItemInfo] = useState([]);


    useEffect(() => {
        const fetchItemInfo = async () => {
          try {
            const response = await fetch(`http://localhost:9192/api/inventoryById/${itemId}`);
            const data = await response.json();
            setItemInfo(data);
          } catch (error) {
            console.error('Error fetching rent history:', error);
          }
        };
    
        fetchItemInfo();
      }, [itemId]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemInfo(prevState => ({
           ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const item = itemInfo;
        console.log(JSON.stringify(item))


        try {
            const response = await fetch(`http://localhost:9192/api/updateInventory/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (response.ok) {
                console.log('działa');
                alert('Modyfikacja udana!');
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
                    <input
                        type="text"
                        id="rentStatus"
                        name="rentStatus"
                        value={itemInfo.rentStatus}
                        onChange={handleInputChange}
                        required
                    />
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
                        type="number"
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
                    <label htmlFor="category">Id ketegorii:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={itemInfo.category? itemInfo.category.id : ''}
                        onChange={handleInputChange}
                        required
                    />
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
