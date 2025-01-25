import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../navigations/Routes';


function Register() {

  const [form,setForm]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const [formError,setFormError]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const navigate=useNavigate();

  const ChangeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  function registeruser(){
    try {
      axios.post("http://127.0.0.1:8080/user",form).then((d)=>{
        alert(d.data.message);
        navigate(ROUTES.login.name);
      });
    } catch (error) {
      alert("unable to access API !!");
    }
  }

  function onSubmitUser(){
    let errors=false
    let error={
      firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    };
    
    if(form.firstName.trim().length==0){
      errors=true;
      error={...error,firstName:"First name is Empty"};
    }
    if(form.lastName.trim().length==0){
      errors=true;
      error={...error,lastName:"Last name is Empty"};
    }
    if(form.email.trim().length==0){
      errors=true;
      error={...error,email:"Email name is Empty"};
    }
    if(form.password.trim().length==0){
      errors=true;
      error={...error,password:"Password is Empty"};
    }
    if(form.confirmPassword.trim().length==0){
      errors=true;
      error={...error,confirmPassword:"Confirm Password is Empty"};
    }
    if(form.password !=form.confirmPassword){
      errors=true;
      error={...error,confirmPassword:"password and confirmPassword must be same"};
    }
    if(!(form.password.trim().length>=8 && form.password.trim().length<=12))
    {
      errors=true;
      error={...error,password:"Password length must be 6 to 12 char long!!"};

    }
    if(errors)setFormError(error);
    else{
      setFormError(error);
      registeruser();
     
    }
  }

  return (
    <>
      <NavBar />
      <div className="row p-2 m-2">
        <div class="card text-center mx-auto">
          <div class="card-header bg-info text-white">Register New User</div>
          <div class="card-body">
            <div className='form-group row'>
              <label className='col-4'>FirstName</label>
              <div className='col-8'>
                <input type='text' className='form-control' onChange={ChangeHandler} name="firstName"/>
              </div>
              <p className='text-danger'>{formError.firstName}</p>
            </div>
            <div className='form-group row'>
              <label className='col-4'>LastName</label>
              <div className='col-8'>
                <input type='text' className='form-control' onChange={ChangeHandler} name="lastName"/>
              </div>
              <p className='text-danger'>{formError.lastName}</p>
            </div>
            
            <div className='form-group row'>
              <label className='col-4'>Email</label>
              <div className='col-8'>
                <input type='text' className='form-control' onChange={ChangeHandler} name="email"/>
              </div>
              <p className='text-danger'>{formError.email}</p>
            </div>
           
         
          <div className='form-group row'>
              <label className='col-4'>Password</label>
              <div className='col-8'>
                <input type='password' className='form-control' onChange={ChangeHandler} name="password"/>
              </div>
              <p className='text-danger'>{formError.password}</p>
            </div>

            <div className='form-group row'>
              <label className='col-4'>Confirm Password</label>
              <div className='col-8'>
                <input type='password' className='form-control' onChange={ChangeHandler} name="confirmPassword"/>
              </div>
              <p className='text-danger'>{formError.confirmPassword}</p>
            </div>


          </div>
          <button className="btn btn-success" onClick={()=>{
            onSubmitUser();
            
          }}>Register</button>
        </div>
        </div>
      
    </>
  );
}

export default Register