import './login.css';
import { Button, LoginPanel } from '../../components';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <Link to="/">
        {' '}
        <Button className={'back-btn'}>Powrót</Button>{' '}
      </Link>
      <LoginPanel />
    </div>
  );
};

export default Login;
