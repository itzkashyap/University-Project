import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ProductDetail() {

  const query=useQuery();
  const navigate=useNavigate();
  const[prd,setPrd]=useState(null);


  function getProductDetail(){
   try {
    axios.get("http://127.0.0.1:8080/productDetails?id=" + query.get("id")).then((res)=>{
      // console.log(res.data);
      setPrd(res.data.prdData);
    })
   } catch (error) {
    alert("not fetcdfhhgk")
   }
  
  }

  useEffect(()=>{
    getProductDetail();
  },[]);

 function renderImage(){
  return prd?.images.map((item)=>{
    return(
      <img className='mx-auto' src={"http://127.0.0.1:8080/"+ item} height="150px" width="300px"/>
    )
  });
 }
  
 

  return (
    <>
      <NavBar />
      <div className="row p2 m-2">
        <div class="card mx-auto" >
         <div style={{display:"flex",flexDirection:"row"}}>
          {renderImage()}
         </div>
          <div class="card-body">
           <h4> <label class="card-title">Product Name</label> {prd?.name}</h4>
            <h5 class="card-title"> Description: {prd?.description}</h5>
            <h5 class="card-title">Product Price: {prd?.price}</h5>
           <label>Quantity</label>
           <input type='number'  value={prd?.qty} />

            
            <a  class="btn btn-primary form-control">
             Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail