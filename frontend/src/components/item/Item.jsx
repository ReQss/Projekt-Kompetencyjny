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
      <div className="item__content">
        <div className="item__image">
          <img src={src} alt="item" />
        </div>
          <div className="item__text">
            <p>ID: {id}</p>
            <p>Nazwa: {name}</p>
            <div className="item__description">
              <p>{description}</p>
            </div>
          </div>
        </div>
        {modalOpen && (
        <Modal item={item} img={src}  onClose={closeModal}>
        </Modal>
      )}

      <div className="item__btn">
            
        {localStorage.getItem('token') === null ? (
          <></>
            ) : (
              location.pathname === '/modify' ? (
                <Link to={`/modification-form/${id}`}>
                  <Button > Modyfikuj </Button>
                </Link>
              ) : (
                <>
                <Button onClick={openModal}> Details </Button>
              </>
              )
            )}
            
        <p style={{ color: rentStatusColor }}>Stan wypożyczenia: {rentStatus}</p>

      </div>
    </div>
  );
};

export default Item;
