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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log('siema');
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9192/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      if (response.status === 202) {
        console.log('Zalogowano pomyślnie!');
        console.log(response);
        localStorage.setItem('token', response.data.token);
        navigate('/');
        window.location.reload();
      } else {
        console.log('Błąd logowania. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania:', error);
      console.log('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
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
