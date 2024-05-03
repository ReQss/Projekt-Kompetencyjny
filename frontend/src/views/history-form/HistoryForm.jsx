import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importujemy Link
import './historyForm.css';
import { Button } from '../../components';

const HistoryForm = () => {
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

    return (
        <div className="form-container">
            <h2>Historia wypożyczeń</h2>
            <form>
                <div className="form">
                    <label htmlFor="user">ID przedmiotu:</label>
                    <input
                        type="number"
                        id="user"
                        name="user"
                        value={formData.user}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="button">
                    {/* Tutaj używamy Link do nawigacji */}
                    <Link to={`/rent-history/${formData.user}`}>
                        <Button>Przejdź do historii</Button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default HistoryForm;
