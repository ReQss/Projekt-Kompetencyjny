import "./login.css";
import { Button, LoginPanel } from "../../components";
import { Link } from "react-router-dom";

/**
 * Komponent Login renderujący panel logowania.
 * @function Login
 * @returns {JSX.Element} Panel logowania
 */
const Login = () => {
  return (
    <div className="login">
      <Link to="/">
        {" "}
        <Button className={"back-btn"}>Powrót</Button>{" "}
      </Link>
      <LoginPanel />
    </div>
  );
};

export default Login;
