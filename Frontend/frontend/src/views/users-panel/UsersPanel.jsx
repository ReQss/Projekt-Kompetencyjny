import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyledPanelContainer } from "./UsersPanel.styles";
import AddUserModal from "./add-user/AddUserModal";
import Button from "../../components/button/Button";

/**
 * Komponent UsersPanel - panel do zarządzania użytkownikami.
 * Renderuje listę użytkowników z możliwością dodawania, edycji i usuwania.
 *
 * @component
 * @returns {JSX.Element}
 */
const UsersPanel = () => {
  const [users, setUsers] = useState([]); // Stan przechowujący listę użytkowników
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan określający, czy modalne okno jest otwarte
  const [selectedUser, setSelectedUser] = useState(null); // Stan przechowujący wybranego użytkownika do edycji

  // Efekt pobierający listę użytkowników z serwera przy pierwszym renderowaniu komponentu
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:9192/getAllUsers");
        const activeUsers = response.data.filter((user) => !user.deleted); // Filtruj aktywnych użytkowników
        setUsers(activeUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Obsługa dodawania użytkownika
  const handleAddUser = async (user) => {
    try {
      const response = await axios.post("http://localhost:9192/addUser", user);
      setUsers([...users, response.data]); // Dodaj nowego użytkownika do listy
      setIsModalOpen(false); // Zamknij modalne okno
      alert("Dodano użytkownika");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Obsługa edycji użytkownika
  const handleEditUser = async (user) => {
    try {
      const response = await axios.put(
        `http://localhost:9192/updateUser/${user.id}`,
        user
      );
      setUsers(users.map((u) => (u.id === user.id ? response.data : u))); // Zaktualizuj dane użytkownika w liście
      setIsModalOpen(false); // Zamknij modalne okno
      alert("Edycja udana");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Obsługa usuwania użytkownika
  const handleDeleteUser = async (userId) => {
    try {
      await axios.put(`http://localhost:9192/deleteUser/${userId}`);
      setUsers(users.filter((user) => user.id !== userId)); // Usuń użytkownika z listy
      alert("Użytkownik został usunięty");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Otwórz modalne okno do edycji użytkownika
  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <StyledPanelContainer>
      <h1 className="title">Zarządzaj użytkownikami</h1>
      {/* Przycisk do otwierania modalnego okna dodawania użytkownika */}
      <Button onClick={() => setSelectedUser(null) || setIsModalOpen(true)}>
        Dodaj użytkownika
      </Button>
      <div className="users-container">
        {/* Wyświetlanie kart użytkowników */}
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-details">
              <strong>ID:</strong> {user.id}
            </div>
            <div className="user-details">
              <strong>Email:</strong> {user.email}
            </div>
            <div className="user-details">
              <strong>Login:</strong> {user.login}
            </div>
            <div className="user-details">
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div className="user-details">
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div className="user-details">
              <strong>Role:</strong> {user.role}
            </div>
            {/* Przyciski do edycji i usuwania użytkownika */}
            <Button className="edit-button" onClick={() => openEditModal(user)}>
              Edytuj
            </Button>
            <Button
              className="delete-button"
              onClick={() => handleDeleteUser(user.id)}
            >
              Usuń
            </Button>
          </div>
        ))}
      </div>
      {/* Modalne okno do dodawania/edycji użytkownika */}
      {isModalOpen && (
        <AddUserModal
          onClose={() => setIsModalOpen(false)}
          onAddUser={selectedUser ? handleEditUser : handleAddUser}
          user={selectedUser}
        />
      )}
    </StyledPanelContainer>
  );
};

export default UsersPanel;
