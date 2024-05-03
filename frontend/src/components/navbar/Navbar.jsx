import './navbar.css';
import logo from '../../assets/logo.png';
import Button from '../button/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    window.location.reload();
  };

  return (
    <div className="navbar">
      <a href="#">
        <img src={logo} alt="Logo" />
      </a>
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
