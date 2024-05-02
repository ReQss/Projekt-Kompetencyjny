import React, { useState } from "react";
import "./item.css";
import Button from "../button/Button";
import Modal from "../modal/DetailsModal";

const Item = ({ item, src, name, owner, building, room }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="item">
      <img src={src} alt="item" />
      <p>{name}</p>
      <p>{owner}</p>
      <p>{building}</p>
      <p>{room}</p>
      <button onClick={openModal}>Details</button>
      {modalOpen && (
        <Modal item = {item} img={src} onClose={closeModal}>
        </Modal>
      )}
    </div>
  );
};

export default Item;
