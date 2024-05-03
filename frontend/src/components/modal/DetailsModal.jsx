import React from "react";
import "./detailsModal.css";

const Modal = ({ item, img, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="item-section">
                    <img src={img} alt="Item Image" className="modal-image" />
                    <div className="details">
                        <h2>{item.itemName}</h2>
                        <h3>Szczegóły:</h3>
                        <p><strong>Opis:</strong> {item.description}</p>
                        <p><strong>Status wypożyczenia:</strong> {item.rentStatus}</p>
                        <p><strong>Data dodania:</strong> {item.inventoryDate}</p>
                        <p><strong>Wartość:</strong> {item.value}</p> 
                        <p><strong>Numer przedmiotu:</strong> {item.inventoryNumber}</p>
                        <p><strong>Numer faktury:</strong> {item.invoiceNumber}</p>
                        <p><strong>Źródło funduszy:</strong> {item.fundingSource}</p>
                        <p><strong>Dokument dostawcy:</strong> {item.supplierDocument}</p>
                        <p><strong>Pozycja faktury:</strong> {item.invoicePosition}</p>
                        <p><strong>Numer seryjny:</strong> {item.serialNumber}</p> 
                        <p><strong>ID kategorii:</strong> {item.category}</p>
                    </div>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
