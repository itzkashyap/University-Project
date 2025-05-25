import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../navigations/Routes';
import './Register.css'; // Add a CSS file for styling

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function registeruser() {
    try {
      axios.post('https://university-project-44ul.onrender.com/user', form).then((d) => {
        alert(d.data.message);
        navigate(ROUTES.login.name);
      });
    } catch (error) {
      alert('Unable to access API !!');
    }
  }

  function onSubmitUser() {
    let errors = false;
    let error = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (form.firstName.trim().length === 0) {
      errors = true;
      error = { ...error, firstName: 'First name is empty' };
    }
    if (form.lastName.trim().length === 0) {
      errors = true;
      error = { ...error, lastName: 'Last name is empty' };
    }
    if (form.email.trim().length === 0) {
      errors = true;
      error = { ...error, email: 'Email is empty' };
    }
    if (form.password.trim().length === 0) {
      errors = true;
      error = { ...error, password: 'Password is empty' };
    }
    if (form.confirmPassword.trim().length === 0) {
      errors = true;
      error = { ...error, confirmPassword: 'Confirm password is empty' };
    }
    if (form.password !== form.confirmPassword) {
      errors = true;
      error = { ...error, confirmPassword: 'Passwords do not match' };
    }
    if (!(form.password.trim().length >= 8 && form.password.trim().length <= 12)) {
      errors = true;
      error = { ...error, password: 'Password must be 8 to 12 characters long' };
    }
    if (errors) setFormError(error);
    else {
      setFormError(error);
      registeruser();
    }
  }

  return (
    <>
      <NavBar />
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Create an Account</h2>
            <p>Join us to explore more</p>
          </div>
          <div className="register-body">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter your first name"
                onChange={ChangeHandler}
              />
              {formError.firstName && <small className="error-text">{formError.firstName}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter your last name"
                onChange={ChangeHandler}
              />
              {formError.lastName && <small className="error-text">{formError.lastName}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                onChange={ChangeHandler}
              />
              {formError.email && <small className="error-text">{formError.email}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={ChangeHandler}
              />
              {formError.password && <small className="error-text">{formError.password}</small>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={ChangeHandler}
              />
              {formError.confirmPassword && <small className="error-text">{formError.confirmPassword}</small>}
            </div>
            <button className="btn btn-primary" onClick={onSubmitUser}>
              Register
            </button>
          </div>
          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <a href="#" onClick={() => navigate(ROUTES.login.name)}>
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;