import React from "react";
import "./detailsModal.css";

const Modal = ({ item, img, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="item-section">
                    <img src={img} alt="Item Image" className="modal-image" />
                    <div className="details">
                        <h2>Szczegóły przedmiotu</h2>
                        <p><strong>Nazwa:</strong> {item.itemName}</p>
                        <p><strong>Opis:</strong> {item.description}</p>
                        <p><strong>Właściciel:</strong> {item.ownerId}</p>
                        <p><strong>Budynek:</strong> {item.building}</p>
                        <p><strong>Pokój:</strong> {item.room}</p>
                        <p><strong>Status wypożyczenia:</strong> {item.rentStatus}</p>
                        {/* <p><strong>Inventory Date:</strong> {item.inventoryDate}</p>
                        <p><strong>Value:</strong> {item.value}</p> 
                        <p><strong>Inventory Number:</strong> {item.inventoryNumber}</p>
                        <p><strong>Invoice Number:</strong> {item.invoiceNumber}</p>
                        <p><strong>Funding Source:</strong> {item.fundingSource}</p>
                        <p><strong>Supplier Document:</strong> {item.supplierDocument}</p>
                        <p><strong>Invoice Position:</strong> {item.invoicePosition}</p>
                        <p><strong>Serial Number:</strong> {item.serialNumber}</p> 
                        <p><strong>Category ID:</strong> {item.category}</p>*/}
                    </div>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
