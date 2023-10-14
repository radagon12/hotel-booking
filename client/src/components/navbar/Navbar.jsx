import { Link } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {  useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () =>
  {
    if(!user)
    {
      navigate('/login');
    }
  }

  const handleRegister = () =>
  {
    navigate('/register');
  }

  const handleLogout = () =>
  {
    dispatch({type:"LOGOUT"})
    console.log("User logged out")
    navigate('/');
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotel Dojo</span>
        </Link>
        {user ? (
          <div>
          {user.username}
          <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
