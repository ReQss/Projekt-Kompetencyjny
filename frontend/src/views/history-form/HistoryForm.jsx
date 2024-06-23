import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./historyForm.css";
import { Button } from "../../components";

const HistoryForm = () => {
  const [formData, setFormData] = useState({
    user: "",
    inventory: "",
    rentStatus: "",
    indexNumber: "",
  });
  const [fullRentHistory, setFullRentHistory] = useState([]);
  const [filter, setFilter] = useState("all");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchRentHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:9192/api/rentHistory/getAll`
        );
        const data = await response.json();
        setFullRentHistory(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching rent history:", error);
      }
    };

    fetchRentHistory();
  }, []);

  const filteredRentHistory = fullRentHistory.map((rentHistory) =>
    rentHistory.filter((historyItem) => {
      if (filter === "all") return true;
      return historyItem.rentStatus === filter;
    })
  );

  return (
    <>
      <div className="form-container">
        <Link to="/">
          {" "}
          <Button className={"back-btn"}>Powrót</Button>{" "}
        </Link>
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
            {formData.user ? (
              <Link to={`/rent-history/${formData.user}`}>
                <Button>Przejdź do historii</Button>
              </Link>
            ) : (
              <Button disabled>Przejdź do historii</Button>
            )}
          </div>
        </form>
      </div>
      <div className="history-container">
        <h1>
          Historia{" "}
          {filter === "all"
            ? "wszystkich"
            : filter === "rented"
            ? "wypożyczonych"
            : "zwróconych"}{" "}
          przedmiotów
        </h1>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Wszystkie
          </button>
          <button
            className={`filter-button ${filter === "rented" ? "active" : ""}`}
            onClick={() => setFilter("rented")}
          >
            Wypożyczone
          </button>
          <button
            className={`filter-button ${filter === "returned" ? "active" : ""}`}
            onClick={() => setFilter("returned")}
          >
            Zwrócone
          </button>
        </div>
        {filteredRentHistory.map((rentHistory, index) => (
          rentHistory.length > 0 && (
            <div key={index} className="rent-history">
              <h3>
                Historia wypożyczeń dla:{" "}
                <span className="red">{rentHistory[0].inventory.itemName}</span>
              </h3>
              {rentHistory.map((historyItem, index) => (
                <div className="rent-history__single-rental" key={index}>
                  <p>
                    <strong>Właściciel:</strong> {historyItem.user.id}
                  </p>
                  <p>
                    <strong>Użytkownik:</strong> {historyItem.firstName}{" "}
                    {historyItem.lastName}
                  </p>
                  <p>
                    <strong>Email użytkownika:</strong> {historyItem.email}
                  </p>
                  <p>
                    <strong>Data wypożyczenia:</strong>{" "}
                    {new Date(historyItem.rentalDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Data zwrotu:</strong>{" "}
                    {historyItem.returnDate
                      ? new Date(historyItem.returnDate).toLocaleDateString()
                      : "Nie zwrócony"}
                  </p>
                  <p>
                    <strong>Status wypożyczenia:</strong>{" "}
                    {historyItem.rentStatus === "rented"
                      ? "Wypożyczony"
                      : "Zwrócony"}
                  </p>
                  <p>
                    <strong>Opis wypożyczenia:</strong>{" "}
                    {historyItem.rentDescription}
                  </p>
                </div>
              ))}
            </div>
          )
        ))}
      </div>
    </>
  );
};

export default HistoryForm;
