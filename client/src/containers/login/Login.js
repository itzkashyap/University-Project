import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../navigations/Routes';
import './login.css'; 

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function loginCheck() {
    try {
      axios
        .post('http://127.0.0.1:8080/login', form)
        .then((d) => {
          localStorage.setItem('id', d.data.id);
          localStorage.setItem('role', d.data.role);

          if (d.data.role === 'admin') navigate(ROUTES.universityAdmin.name);
          else navigate(ROUTES.userhome.name);
        })
        .catch((e) => {
          alert('Wrong username/password');
          setForm({ email: '', password: '' });
        });
    } catch (error) {
      alert(error?.message);
    }
  }

  function onLoginSubmit() {
    let errors = false;
    let error = { email: '', password: '' };
    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: 'Username is empty' };
    }
    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: 'Password is empty' };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      loginCheck();
    }
  }

  
  function clearForm() {
    setForm({ email: '', password: '' });
  }

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome</h2>
            <p>Sign in to continue</p>
          </div>
          <div className="login-body">
            <div className="form-group">
              <label htmlFor="email">User Name</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your username"
                onChange={ChangeHandler}
              />
              {formError.email && <small className="error-text">{formError.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={ChangeHandler}
              />
              {formError.password && <small className="error-text">{formError.password}</small>}
            </div>
            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              
            </div>
            <button className="btn btn-primary" onClick={onLoginSubmit}>
              Sign In
            </button>
            </div>
          <div className="login-footer">
            <p>
              Don't have an account? <a href="" onClick={()=>navigate('/register')}>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;