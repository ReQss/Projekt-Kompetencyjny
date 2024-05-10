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
  const [userId, setUserId] = useState(null);
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
        localStorage.setItem('userId', data.user.id); // Ustawienie ID zalogowanego użytkownika
        localStorage.setItem('email', data.user.email); // Ustawienie ID zalogowanego użytkownika
        setUserId(data.userId); // Ustawienie ID zalogowanego użytkownika w stanie
        navigate('/');
        // Optionally reload page if necessary
        // window.location.reload();
      } else {
        console.log('Login error. Please try again.');
      }
    } catch (error) {
      console.error('Error during login request:', error);
      console.log('An error occurred during login. Please try again later.');
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
        <a href="#">Zapomniałeś hasła?</a>
        <Button type="submit">Zaloguj się</Button>
      </form>
    </div>
  );
};

export default LoginPanel;
