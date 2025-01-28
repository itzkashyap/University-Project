import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import ROUTES from '../navigations/Routes';

function NavBar() {
  const[user,setUser]=useState({id:null,role:null})
  const navigate=useNavigate();

  useEffect(()=>{
    let id=localStorage.getItem("id");
    let role=localStorage.getItem("role");
    if(id) setUser({id:id,role:role});
   
  },[]);
  

  function renderMenu(){
    if(user?.role=="admin"){
      return(

        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <Link className='nav-link' to={ROUTES.universityAdmin.name}>UniversityManagement</Link>
        </li>        
      </ul>

      );
    }else{
      return (
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.userhome.name}>
              <h2>
                <i className="fa fa-home"></i>
              </h2>
            </Link>
          </li>
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.about.name}>
              About
            </Link>
          </li>
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.contact.name}>
              Contact
            </Link>
          </li>{" "}
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.support.name}>
              Support
            </Link>
          </li>
          <li class="nav-item active">
            <Link className="nav-link" to={ROUTES.userCart.name}>
              <h2>
                <i className="fa fa-shopping-cart"></i>
              </h2>
             
            </Link>
          </li>
        </ul>
      );
    }
  }

function renderButton() {
  if (user?.id) {
    return (
      <form class="form-inline my-2 my-lg-0">
        <button
          class="btn btn-success my-2 my-sm-0"
          onClick={() => {
            localStorage.clear();
            navigate(ROUTES.login.name);
          }}
        >
          Logout
        </button>
      </form>
    );
  } else {
    return (
      <>
        <form class="form-inline my-2 my-lg-0">
          <button
            class="btn btn-success my-2 my-sm-0"
            onClick={() => {
              navigate(ROUTES.register.name);
            }}
          >
            Register
          </button>
        </form>
        <form class="form-inline my-2 my-lg-0">
          <button
            class="btn btn-success my-2 my-sm-0"
            onClick={() => {
              navigate(ROUTES.login.name);
            }}
          >
            Login
          </button>
        </form>
      </>
    );
  }
}

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-info">
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {renderMenu()}
          {renderButton()}
        </div>
      </nav>
    </>
  );
}

export default NavBar