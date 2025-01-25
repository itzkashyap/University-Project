import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';



function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserProduct() {
  const query=useQuery();
  const [products,setProducts]=useState(null);
  const navigate =useNavigate();

  function GetProductByDepartmentId(){
    try {
      axios.get("http://127.0.0.1:8080/product?id="+query.get("id"))
      .then((d)=>{
        setProducts(d.data.prdData);
      });
    } catch (error) {
      alert("unable to access api !!")
    }
  };

  useEffect(()=>{
    GetProductByDepartmentId();
  },[]);

function renderProducts(){
return products?.map((item)=>{
  return (
    <div className="col-3">
      <div class="card" >
        <img class="card-img-top" src={"http://127.0.0.1:8080/" + item.images} height="150px" width="250px" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{item.name}</h5>
          
          <a
                onClick={() => {
                  navigate(ROUTES.productDetail.name + "?id=" + item._id);
                }}
                className="btn btn-primary"
              >
                View Product
              </a>
        </div>
      </div>
    </div>
  );
})
}

  return (
    <>
    <NavBar/>
    <div className='row p-2 m-2'>
      {renderProducts()}
    </div>
    </>
  )
}

export default UserProduct