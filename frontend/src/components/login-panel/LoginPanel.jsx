import { useState } from 'react';
import './loginPanel.css';
import logo from '../../assets/logo.png';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const LoginPanel = () => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting login...');
    setError('Wprowadziłeś niepoprawne dane!');

    try {
      const response = await fetch('http://localhost:9192/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 202) {
        console.log('Logged in successfully!');
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('role', data.user.role);
        navigate('/');
      } else if (response.status === 401) {
        console.log('Login error:', data.error);
      } else {
        console.log('Login error. Please try again.');
      }
    } catch (error) {
      console.error('Error during login request:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login_panel">
      <form onSubmit={handleSubmit}>
        <h1>Logowanie</h1>
        <a href="#" className="logo_holder">
          <img src={logo} alt="Logo" />
        </a>
        <input
          type="login"
          name="login"
          placeholder="login"
          value={formData.login}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {error && <div className="error">{error}</div>}{' '}
        <Button type="submit">Zaloguj się</Button>
      </form>
    </div>
  );
};

export default LoginPanel;
