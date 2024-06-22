import React, { useState, useEffect } from 'react';
import { ModalContainer, ModalOverlay } from './AddUserModal.styles';
import Button from '../../../components/button/Button';

const AddUserModal = ({ onClose, onAddUser, user }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setLogin(user.login);
      setRole(user.role);
      setPassword('');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, firstName, lastName, login, password, role };
    if (user) {
      userData.id = user.id;
    }
    onAddUser(userData);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
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
            required={!user}
          />
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <Button type="submit">{user ? 'Zmień' : 'Dodaj'}</Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default AddUserModal;
