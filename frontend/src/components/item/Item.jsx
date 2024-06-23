import { useEffect, useState } from 'react';
import './item.css';
import Modal from '../modal/DetailsModal';
import Button from '../button/Button';
import { Link, useLocation, useParams } from 'react-router-dom';

const Item = ({ item, src }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [itemId, setItemId] = useState(item.id);
  const [rentHistoryDescription, setRentHistoryDescription] = useState('');
  const [owner, setOwner] = useState(null);

  const {
    id,
    itemName,
    description,
    rentStatus,
    ownerName,
    ownerLastName,
    building,
    room,
    ownerId,
  } = item;

  const location = useLocation();

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:9192/getUser/${ownerId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOwner(data);
        } else {
          console.error('Błąd podczas pobierania danych użytkownika');
        }
      } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania żądania:', error);
      }
    };

    fetchOwnerData();
  }, [ownerId]);

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

  const showGiveBackConfirmation1 = async () => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/rentHistory/currentRentingByInventoryId/${itemId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        let rentHistoryDescFromData = data.rentDescription;
        setRentHistoryDescription(rentHistoryDescFromData);
      } else {
        const errorMessage = await response.json();
        console.error(
          'Wystąpił błąd podczas sprwadzania historii:',
          errorMessage
        );
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania żądania:', error);
    } finally {
      setShowReturnConfirmation(true);
      setItemId(id);
    }
  };

  const hideReturnConfirmation = () => {
    setShowReturnConfirmation(false);
    setItemId(null);
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

  const handleReturnItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/rentHistory/modifyDescription/${itemId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: rentHistoryDescription,
        }
      );

      if (response.ok) {
        // const data = await response.json();
      } else {
        const errorMessage = await response.json();
        console.error(
          'Wystąpił błąd podczas sprwadzania historii:',
          errorMessage
        );
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania żądania:', error);
    } finally {
      try {
        const response = await fetch(
          `http://localhost:9192/api/rentHistory/return/${itemId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          console.log('Przedmiot o ID:', itemId, 'został pomyślnie zwrócony.');
        } else {
          const errorMessage = await response.text();
          console.error(
            'Wystąpił błąd podczas zwracania przedmiotu:',
            errorMessage
          );
        }
      } catch (error) {
        console.error('Wystąpił błąd podczas zwracania żądania:', error);
      } finally {
        hideReturnConfirmation();
        window.location.reload();
      }
    }
  };

  const handleInputChange = (e) => {
    setRentHistoryDescription(e.target.value);
  };

  const rentStatusText =
    rentStatus === 'available' ? 'dostępny' : 'niedostępny';
  const rentStatusColor = rentStatus === 'available' ? 'green' : 'red';

  return (
    <div className="item">
      <div className="item__content">
        <div className="item__image">
          <img src={src} alt="item" />
        </div>
        <div className="item__text">
          <div className="details">
            <div className="owner">ID: {owner ? `${id} ` : 'Ładowanie...'}</div>
            <div className="owner">
              Właściciel:{' '}
              {owner ? `${owner.firstName} ${owner.lastName}` : 'Ładowanie...'}
            </div>
            <p className="name">Nazwa: {itemName}</p>
            <div className="item__description">
              <p>Opis: {description} </p>
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
        ) : location.pathname === '/user-items' ? (
          <>
            <Link to={`/modification-form/${id}`}>
              <Button>Modyfikuj</Button>
            </Link>
            <>
              <Button onClick={openModal}>Detale</Button>
            </>
            <>
              <Button onClick={showDeleteConfirmation1}>Usuń</Button>
            </>
            {rentStatus === 'unavailable' ? (
              <Link to={`/user-items`}>
                <Button onClick={showGiveBackConfirmation1}> Zwróć </Button>
              </Link>
            ) : (
              <Link to={`/rent-form/${id}`}>
                <Button> Wypożycz </Button>
              </Link>
            )}
            <Link to={`/rent-history/${id}`}>
              <Button>Historia wypożyczeń</Button>
            </Link>
            
          </>
        ) : (
          <>
            <Button onClick={openModal}>Detale</Button>
            {rentStatus === 'unavailable' ? (
              <Button onClick={showGiveBackConfirmation1}> Zwróć </Button>
            ) : null}
          </>
        )}

        <p style={{ color: rentStatusColor }}>
          Stan wypożyczenia: {rentStatusText}
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
      {showReturnConfirmation && (
        <div className="modal-overlay">
          <div className="delete-modal ">
            <div className="return-description-modal__text ">
              <label htmlFor="description">Opis zwrotu:</label>
              <textarea
                id="description"
                name="description"
                rows="8"
                value={rentHistoryDescription}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="delete-modal__buttons">
              <Button onClick={handleReturnItem}>Zwróć</Button>
              <Button onClick={hideReturnConfirmation}>Anuluj</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
