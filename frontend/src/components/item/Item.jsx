/* eslint-disable react/prop-types */
import { useState } from 'react';
import './item.css';
import Modal from '../modal/DetailsModal';
import Button from '../button/Button';
import { Link, useLocation } from 'react-router-dom';

const Item = ({ item, src }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemId, setItemId] = useState(null);

  const {
    id,
    itemName,
    description,
    rentStatus,
    ownerName,
    ownerLastName,
    building,
    room,
  } = item;

  const location = useLocation();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showDeleteConfirmation1 = () => {
    setShowDeleteConfirmation(true);
    setItemId(id);
  };

  const hideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setItemId(null);
  };

  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/deleteInventory/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Przedmiot o ID:', itemId, 'został pomyślnie usunięty.');
      } else {
        const errorMessage = await response.text();
        console.error(
          'Wystąpił błąd podczas usuwania przedmiotu:',
          errorMessage
        );
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania żądania:', error);
    } finally {
      hideDeleteConfirmation();
      window.location.reload();
    }
  };

  const rentStatusColor = rentStatus === 'available' ? 'green' : 'red';

  return (
    <div className="item">
      <div className="item__content">
        <div className="item__image">
          <img src={src} alt="item" />
        </div>
        <div className="item__text">
          <div className="details">
            <div className="owner">
              Właściciel: {ownerName} {ownerLastName}
            </div>
            <p className="name">Nazwa: {itemName}</p>
            <div className="item__description">
              <p>Opis: {description} lorem300 </p>
            </div>
          </div>
          <div className="building">
            <div className="location">
              <div>Budunek: {building}</div>
              <div>Pokój: {room}</div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && <Modal item={item} img={src} onClose={closeModal}></Modal>}

      <div className="item__btn">
        {localStorage.getItem('token') === null ? (
          <></>
        ) : location.pathname === '/modify' ? (
          <Link to={`/modification-form/${id}`}>
            <Button>Modyfikuj</Button>
          </Link>
        ) : location.pathname === '/delete' ? (
          <Button onClick={showDeleteConfirmation1}>Usuń</Button>
        ) : (
          <>
            <Button onClick={openModal}>Details</Button>
          </>
        )}

        <p style={{ color: rentStatusColor }}>
          Stan wypożyczenia: {rentStatus}
        </p>
      </div>
      {showDeleteConfirmation && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal__text">
              <p>Czy napewno chcesz usunąć przedmiot?</p>
            </div>
            <div className="delete-modal__buttons">
              <Button onClick={handleDeleteItem}>Tak</Button>
              <Button onClick={hideDeleteConfirmation}>Nie</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
