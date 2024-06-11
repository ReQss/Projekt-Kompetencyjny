import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './rentHistory.css';
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

/**
 * Komponent RentHistory służący do wyświetlania historii wypożyczeń dla danego przedmiotu.
 * @function RentHistory
 * @returns {JSX.Element} Historia wypożyczeń dla danego przedmiotu
 */
const RentHistory = () => {
  const { itemId } = useParams();
  const [rentHistory, setRentHistory] = useState([]);


  /**
   * Funkcja pobierająca historię wypożyczeń dla danego przedmiotu z serwera.
   * @async
   * @function fetchRentHistory
   * @returns {void}
   */
  useEffect(() => {
    const fetchRentHistory = async () => {
      try {
        const response = await fetch(`http://localhost:9192/api/rentHistory/inventory/${itemId}`);
        const data = await response.json();
        setRentHistory(data);
      } catch (error) {
        console.error('Error fetching rent history:', error);
      }
    };

    fetchRentHistory();
  }, [itemId]);

  return (
    <div className='rent-history__wrapper'>
      <Link to="/"> <Button>Powrót</Button> </Link>
      <div className='rent-history'>
        {rentHistory.length > 0 ? (
          <h2>Historia wypożyczeń dla: <span className="red">{rentHistory[0].inventory.itemName}</span></h2>
        ) : (
          <h2>Ten przedmiot nie ma historii wypożyczeń</h2>
        )}
        {rentHistory.map((historyItem, index) => (
          <div className='rent-history__single-rental' key={index}>
            <p><strong>Właściciel:</strong> {historyItem.user.id}</p>
            <p><strong>Użytkownik:</strong> {historyItem.firstName} {historyItem.lastName}</p>
            <p><strong>Email użytkownika:</strong> {historyItem.email}</p>
            <p><strong>Data wypożyczenia:</strong> {new Date(historyItem.rentalDate).toLocaleDateString()}</p>
            <p><strong>Data zwrotu:</strong> {historyItem.returnDate? new Date(historyItem.returnDate).toLocaleDateString() : 'Nie zwrócony'}</p>
            <p><strong>Status wypożyczenia:</strong> {historyItem.rentStatus === 'rented'? 'Wypożyczony' : 'Zwrócony'}</p>
            <p><strong>Opis wypożyczenia:</strong> {historyItem.rentDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentHistory;

