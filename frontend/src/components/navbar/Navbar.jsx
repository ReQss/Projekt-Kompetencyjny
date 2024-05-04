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

    if(localStorage.getItem('token') === null)
      navigate("/")
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
