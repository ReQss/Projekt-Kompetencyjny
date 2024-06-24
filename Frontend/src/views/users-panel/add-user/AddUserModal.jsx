import React, { useState, useEffect } from "react";
import { ModalContainer, ModalOverlay } from "./AddUserModal.styles";
import Button from "../../../components/button/Button";

/**
 * Komponent AddUserModal - modalne okno do dodawania i edycji użytkownika.
 *
 * @component
 * @param {Object} props - Właściwości komponentu.
 * @param {Function} props.onClose - Funkcja wywoływana przy zamknięciu okna modalnego.
 * @param {Function} props.onAddUser - Funkcja do dodawania lub edycji użytkownika.
 * @param {Object} props.user - Obiekt reprezentujący użytkownika do edycji (null, jeśli dodajemy nowego użytkownika).
 * @returns {JSX.Element}
 */
const AddUserModal = ({ onClose, onAddUser, user }) => {
  const [email, setEmail] = useState(""); // Stan dla pola Email użytkownika
  const [firstName, setFirstName] = useState(""); // Stan dla pola Imię użytkownika
  const [lastName, setLastName] = useState(""); // Stan dla pola Nazwisko użytkownika
  const [login, setLogin] = useState(""); // Stan dla pola Login użytkownika
  const [password, setPassword] = useState(""); // Stan dla pola Hasło użytkownika
  const [role, setRole] = useState("USER"); // Stan dla pola Rola użytkownika

  // Efekt ustawiający wartości pól formularza na dane użytkownika do edycji
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setLogin(user.login);
      setRole(user.role);
      setPassword("");
    }
  }, [user]);

  // Obsługa wysyłki formularza
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, firstName, lastName, login, password, role };
    if (user) {
      userData.id = user.id;
    }
    onAddUser(userData); // Wywołanie funkcji przekazanej przez props onAddUser z danymi użytkownika
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>{user ? "Edytuj użytkownika" : "Dodaj użytkownika"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <label>Imię</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Nazwisko</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {!user && (
            <React.Fragment>
              <label>Hasło</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </React.Fragment>
          )}
          <label>Rola</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="USER">Użytkownik</option>
            <option value="ADMIN">Administrator</option>
          </select>
          <Button type="submit">{user ? "Zmień" : "Dodaj"}</Button>
          <Button type="button" onClick={onClose}>
            Anuluj
          </Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddUserModal;
