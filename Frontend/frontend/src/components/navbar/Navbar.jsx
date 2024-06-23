import './navbar.css';
import logo from '../../assets/logo.png';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    if (localStorage.getItem('token') === null) navigate('/');
  };

  return (
    <div className="navbar">
      <div className="img">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <ul>
        {localStorage.getItem('role') === 'ADMIN' ? (
          <Link to="/users-panel">
            <Button> Zarządzaj użytkownikami </Button>
          </Link>
        ) : null}
      </ul>

      <ul>
        {localStorage.getItem('token') === null ? (
          <>
            <Link to="/login">
              <Button> Zaloguj się </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <Button onClick={logoutUser}> Wyloguj się </Button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
