import React, { useState } from 'react';
import { Button } from '../../components';

const DeletionForm = () => {
    const [formData, setFormData] = useState({ item: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:9192/api/deleteInventory/${formData.item}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('działa');
                alert('Usuwanie udane!');
            } else {
                const errorMessage = await response.text();
                alert(`Błąd podczas wypożyczenia: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Błąd podczas wysyłania żądania:', error);
            alert('Wystąpił błąd podczas usuwania sprzętu.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
           ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className="form-container">
            <h2>Usuń przedmiot</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <label htmlFor="item">ID przedmiotu:</label>
                    <input
                        type="number"
                        id="item"
                        name="item"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button">
                    <Button type="submit">Usuń</Button>
                </div>
            </form>
        </div>
    )
}

export default DeletionForm;
