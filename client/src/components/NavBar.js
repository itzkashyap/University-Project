import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from '../navigations/Routes';
import './Navbar.css'; 

function NavBar() {
  const [user, setUser] = useState({ id: null, role: null });
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem('id');
    let role = localStorage.getItem('role');
    if (id) setUser({ id: id, role: role });
  }, []);

  function renderMenu() {
    if (user?.role === 'admin') {
      return (
        <ul className="navbar-menu">
          <li>
            <Link to={ROUTES.universityAdmin.name}>University Management</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-menu">
          <li>
            <Link to={ROUTES.userhome.name}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.about.name}>About</Link>
          </li>
          <li>
            <Link to={ROUTES.contact.name}>Contact</Link>
          </li>
          <li>
            <Link to={ROUTES.support.name}>Support</Link>
          </li>
          <li>
            <Link to={ROUTES.userCart.name}>
              <i className="fa fa-shopping-cart"></i>
            </Link>
          </li>
        </ul>
      );
    }
  }

  function renderButton() {
    if (user?.id) {
      return (
        <button
          className="btn1 btn-logout "
          onClick={() => {
            localStorage.clear();
            navigate(ROUTES.login.name);
          }}
        >
          Logout
        </button>
      );
    } else {
      return (
        <div className="auth-buttons">
          <button
            className="btn1 btn-register"
            onClick={() => {
              navigate(ROUTES.register.name);
            }}
          >
            Register
          </button>
          <button
            className="btn1 btn-login"
            onClick={() => {
              navigate(ROUTES.login.name);
            }}
          >
            Login
          </button>
        </div>
      );
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {renderMenu()}
        {renderButton()}
      </div>
    </nav>
  );
}

export default NavBar;