import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import {useNavigate}from'react-router-dom'
import axios from 'axios';
import ROUTES from '../../navigations/Routes';

function Login() {

  const[form,setForm]=useState({email:"",password:""});
  const[formError,setFormError]=useState({email:"",password:""});

  const navigate=useNavigate();
  
  const ChangeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  }

  function loginCheck(){
    try {
      axios.post("http://127.0.0.1:8080/login",form).then((d)=>{
        localStorage.setItem("id",d.data.id);
        localStorage.setItem("role",d.data.role);

        if(d.data.role=="admin") navigate(ROUTES.universityAdmin.name)
          else navigate (ROUTES.userhome.name);
      }).catch((e)=>{
        alert("wrong user/pwd");
        setForm({email:"",password:""});
      });
    } catch (error) {
      alert(error?.message);
    }
  }
  
  function onLoginSubmit(){
    let errors=false;
    let error={email:"",password:""}
    if(form.email.trim().length==0){
      errors=true;
      error={...error,email:"UserName Empty"};
    }
    if(form.password.trim().length==0){
      errors=true;
      error={...error,password:"UserName Empty"};
    }
    if(errors)setFormError(error);
    else{
      setFormError(error);
      loginCheck();
    }
  }
  
 
  return (
    <>
      <NavBar />
      <div className='row p-2 m-2'>
      <div class="card text-center mx-auto">
        <div class="card-header bg-info text-white">Login</div>
        <div class="card-body">
          <div className='form-group row'>
            <label className='col-4'>UserName</label>
            <div className='col-8'>
              <input className='form-control' type='text' name="email" onChange={ChangeHandler}></input>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-4'>Password</label>
            <div className='col-8'>
              <input className='form-control' type='password' name="password" onChange={ChangeHandler}></input>
            </div>
          </div>
          <button  className='btn btn-success col-4 mx-auto' onClick={()=>{onLoginSubmit()}}>Login</button>
        </div>        
      </div>
      </div>
    </>
  );
}

export default Login