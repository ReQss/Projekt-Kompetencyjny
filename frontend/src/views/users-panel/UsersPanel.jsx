import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyledPanelContainer } from './UsersPanel.styles';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <StyledPanelContainer>
      <h1 className="title">Users Panel</h1>
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
          </div>
        ))}
      </div>
    </StyledPanelContainer>
  );
};

export default UsersPanel;
