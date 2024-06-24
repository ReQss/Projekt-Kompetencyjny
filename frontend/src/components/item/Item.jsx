import { useEffect, useState } from "react";
import "./item.css";
import Modal from "../modal/DetailsModal";
import Button from "../button/Button";
import { Link, useLocation } from "react-router-dom";

/**
 * Komponent Item - wyświetla szczegóły przedmiotu oraz obsługuje akcje takie jak usunięcie, detale, modyfikowanie, wypożyczenie i zwrot.
 *
 * @component
 * @param {Object} props - Właściwości przekazane do komponentu.
 * @param {Object} props.item - Obiekt reprezentujący przedmiot.
 * @param {string} props.src - Ścieżka do obrazka przedmiotu.
 * @returns {JSX.Element}
 */
const Item = ({ item, src }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showReturnConfirmation, setShowReturnConfirmation] = useState(false);
  const [itemId, setItemId] = useState(item.id);
  const [rentHistoryDescription, setRentHistoryDescription] = useState("");
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
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOwner(data);
        } else {
          console.error("Błąd podczas pobierania danych użytkownika");
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas wysyłania żądania:", error);
      }
    };

    fetchOwnerData();
  }, [ownerId]);

  /**
   * Otwiera modal z detalami przedmiotu.
   */
  const openModal = () => {
    setModalOpen(true);
  };

  /**
   * Zamknięcie modalu z detalami przedmiotu.
   */
  const closeModal = () => {
    setModalOpen(false);
  };

  /**
   * Pokazuje potwierdzenie usunięcia przedmiotu.
   */
  const showDeleteConfirmation1 = () => {
    setShowDeleteConfirmation(true);
    setItemId(id);
  };

  /**
   * Pokazuje potwierdzenie zwrotu przedmiotu.
   */
  const showGiveBackConfirmation1 = async () => {
    setRentHistoryDescription(description);
    setShowReturnConfirmation(true);
    setItemId(id);
  };

  /**
   * Ukrywa potwierdzenie zwrotu przedmiotu.
   */
  const hideReturnConfirmation = () => {
    setShowReturnConfirmation(false);
    setItemId(null);
  };

  /**
   * Ukrywa potwierdzenie usunięcia przedmiotu.
   */
  const hideDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setItemId(null);
  };

  /**
   * Obsługuje usunięcie przedmiotu.
   */
  const handleDeleteItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/deleteInventory/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Przedmiot o ID:", itemId, "został pomyślnie usunięty.");
      } else {
        const errorMessage = await response.text();
        console.error(
          "Wystąpił błąd podczas usuwania przedmiotu:",
          errorMessage
        );
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    } finally {
      hideDeleteConfirmation();
      window.location.reload();
    }
  };

  /**
   * Obsługuje zwrot przedmiotu.
   */
  const handleReturnItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:9192/api/updateInventoryDescription/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: rentHistoryDescription,
        }
      );

      if (response.ok) {
        console.log("Opis zwrotu został zaktualizowany");
      } else {
        const errorMessage = await response.json();
        console.error(
          "Wystąpił błąd podczas aktualizacji opisu zwrotu:",
          errorMessage
        );
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    } finally {
      try {
        const response = await fetch(
          `http://localhost:9192/api/rentHistory/return/${itemId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Przedmiot o ID:", itemId, "został pomyślnie zwrócony.");
        } else {
          const errorMessage = await response.text();
          console.error(
            "Wystąpił błąd podczas zwracania przedmiotu:",
            errorMessage
          );
        }
      } catch (error) {
        console.error("Wystąpił błąd podczas wysyłania żądania:", error);
      } finally {
        hideReturnConfirmation();
        window.location.reload();
      }
    }
  };

  /**
   * Obsługuje zmianę wartości opisu zwrotu.
   * @param {Event} e - Event zmiany wartości.
   */
  const handleInputChange = (e) => {
    setRentHistoryDescription(e.target.value);
  };

  const rentStatusText =
    rentStatus === "available" ? "dostępny" : "niedostępny";
  const rentStatusColor = rentStatus === "available" ? "green" : "red";

  return (
    <div className="item">
      <div className="item__content">
        <div className="item__image">
          <img src={src} alt="item" />
        </div>
        <div className="item__text">
          <div className="details">
            <div className="owner">ID: {owner ? `${id} ` : "Ładowanie..."}</div>
            <div className="owner">
              Właściciel:{" "}
              {owner ? `${owner.firstName} ${owner.lastName}` : "Ładowanie..."}
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
        {localStorage.getItem("token") === null ? (
          <></>
        ) : location.pathname === "/modify" ? (
          <Link to={`/modification-form/${id}`}>
            <Button>Modyfikuj</Button>
          </Link>
        ) : location.pathname === "/delete" ? (
          <Button onClick={showDeleteConfirmation1}>Usuń</Button>
        ) : location.pathname === "/user-items" ? (
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
            {rentStatus === "unavailable" ? (
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
            {rentStatus === "unavailable" ? (
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
