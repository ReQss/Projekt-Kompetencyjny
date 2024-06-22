import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledPanelContainer } from './UsersPanel.styles';
import AddUserModal from './add-user/AddUserModal';
import Button from '../../components/button/Button';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9192/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:9192/addUser', user);
      setUsers([...users, response.data]);
      setIsModalOpen(false);
      alert('Dodano użytkownika');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (user) => {
    try {
      const response = await axios.put(
        `http://localhost:9192/updateUser/${user.id}`,
        user
      );
      setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
      setIsModalOpen(false);
      alert('Edycja udana');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <StyledPanelContainer>
      <h1 className="title">Zarządzaj użytkownikami</h1>
      <Button onClick={() => setSelectedUser(null) || setIsModalOpen(true)}>
        Dodaj użytkownika
      </Button>
      <div className="users-container">
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
            <Button className="edit-button" onClick={() => openEditModal(user)}>
              Edytuj
            </Button>
            <Button className="edit-button" onClick={() => openEditModal(user)}>
              Usuń
            </Button>
          </div>
        ))}
      </div>
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
