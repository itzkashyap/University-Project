import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ROUTES from '../../../navigations/Routes';

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
    axios.get("https://university-project-44ul.onrender.com/productDetails?id=" + query.get("id")).then((res)=>{
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
      <img className='mx-auto' src={"https://university-project-44ul.onrender.com/"+ item} height="150px" width="300px"/>
    )
  });
 }

// function addToCart() { 
  
//   const userId = localStorage.getItem("id");

//   if (!userId) {
//     alert("User not logged in!");
//     navigate(ROUTES.login.name);
//     return;
//   }

//   // Ensure prd object is properly defined
//   if (!prd?.id || !prd?.qty) {
//     alert("Product information is missing!");
//     return;
//   }

//   try {
//     axios.post("https://university-project-44ul.onrender.com/cart", {
//       userId: userId,
//       productId: prd._id,
//       quantity: prd.qty
//     })
//     .then((res) => {
//       alert("Product added to cart successfully!");
//       navigate(ROUTES.cart.name);
//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Failed to add product to cart!");
//     });
//   } catch (error) {
//     alert("Unable to access API!");
//   }
// }

const handleAddToCart = async () => {
  const userId = localStorage.getItem("id");

    if (!userId) {
      alert("User not logged in!");
      navigate(ROUTES.login.name);
      return;
    }
  

  try {    
    await axios.post("http://localhost:8080/add", {
          userId: localStorage.getItem("id"),  
          productId: prd._id,
          quantity: 1,
          price: prd.price
      }).then(()=>{
        alert("Added Successfully");
        navigate(ROUTES.userCart.name);
      })
  } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong. Please try again.");
  }
};



 
const ChangeHandler=(e)=>{
  setPrd({...prd,[e.target.name]:e.target.value});
};
  return (
    <>
      <NavBar />
      <div className="row p-2 m-2">
        <div className="card mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderImage()}
          </div>
          <div className="card-body">
            <h4>
              <label className="card-title">Product Name</label> {prd?.name}
            </h4>
            <h5 className="card-title">Description: {prd?.description}</h5>
            <h5 className="card-title">Product Price: {prd?.price}</h5>
            <label>Quantity</label>
            <input type="number" name='qty' value={prd?.qty}
            onClick={ChangeHandler} />
            <div className="row m-2">
              <button
                className="btn btn-info m-1"
                onClick={() => {
                  navigate(ROUTES.userhome.name);
                }}
              >
                Back to Home
              </button>

              <button
                className="btn btn-success"
                onClick={() => {handleAddToCart()}}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail