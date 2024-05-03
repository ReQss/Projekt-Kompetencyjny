import React, { useState } from "react";
import "./item.css";
import Modal from "../modal/DetailsModal";
import Button from "../button/Button";
import { Link, useLocation } from 'react-router-dom';


const Item = ({item, src, id, name, description, rentStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();

  const openModal = () => {
    setModalOpen(true);
  };

  
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
          
          {/* {localStorage.getItem('token') === null ? (
            <></>
          ) : (
            <button onClick={openModal}>Details</button>
          )} */}

        {localStorage.getItem('token') === null ? (
            <></>
          ) : (
            location.pathname === '/modify' ? (
              <Link to="/modification-form">
                <Button > Modyfikuj </Button>
              </Link>
            ) : (
              <>
                <Link to="/modify">
                  <Button onClick={openModal}> Details </Button>
                </Link>
            </>
            )
          )}
        </div>
        
        <div className="item-description">
          <p>{description}</p>
        </div>
      </div>
      {modalOpen && (
        <Modal item={item} img={src}  onClose={closeModal}>
          {/* Tutaj możesz przekazać więcej informacji, jeśli modal ma wyświetlać więcej danych */}
        </Modal>
      )}
    </div>
  );
};

export default Item;
