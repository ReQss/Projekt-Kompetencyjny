import React, { useState } from "react";
import "./item.css";
import Modal from "../modal/DetailsModal";

const Item = ({ src, id, name, description, rentStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  console.log(item);
  
  const closeModal = () => {
    setModalOpen(false);
  };

  const rentStatusColor = rentStatus === "available" ? "green" : "red";

  return (
    <div className="item">
      <img src={src} alt="item" className="item-image" />
      <div className="item-content">
        <div className="item-header">
          <p>ID: {id}</p>
          <p>Nazwa: {name}</p>
          <p style={{ color: rentStatusColor }}>Stan wypożyczenia: {rentStatus}</p>
          <button onClick={openModal}>Details</button>
        </div>
        <div className="item-description">
          <p>{description}</p>
        </div>
      </div>
      {modalOpen && (
        <Modal item={{ id, name, description, rentStatus }} onClose={closeModal}>
          {/* Tutaj możesz przekazać więcej informacji, jeśli modal ma wyświetlać więcej danych */}
        </Modal>
      )}
    </div>
  );
};

export default Item;
