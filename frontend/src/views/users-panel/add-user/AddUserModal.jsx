import React, { useState } from 'react';
import { ModalContainer, ModalOverlay } from './AddUserModal.styles';
import Button from '../../../components/button/Button';

const AddUserModal = ({ onClose, onAddUser }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ email, firstName, lastName, login, password });
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>Add User</h2>
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
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Add User</Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddUserModal;
