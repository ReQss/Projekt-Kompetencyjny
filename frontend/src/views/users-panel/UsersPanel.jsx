import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    <PanelContainerStyled>
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
    </PanelContainerStyled>
  );
};

export default UsersPanel;

const PanelContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .title {
    margin-bottom: 20px;
  }

  .users-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    .user-card {
      display: flex;
      flex-direction: column;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      width: 250px;

      .user-details {
        margin-bottom: 10px;
      }
    }
  }
`;
