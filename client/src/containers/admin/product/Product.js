import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}

function Product() {
  const query=useQuery();
  const[productId,setproductId]=useState(null);
  const[products,setProducts]=useState(null);
  const[form,setForm]=useState({
    name:"",
    images:null,
    departmentId:query.get("id"),
    description:"",
    qty:10,
    price:0,    
  });
  const[formError,setFormError]=useState({
    name:"",
    images:"",
    description:"",
    qty:"",
    price:"",
  });

  const ChangeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  function GetProductByDepartmentId(){
    try {
      axios.get("https://university-project-44ul.onrender.com/product?id="+query.get("id")).then((d)=>{
        setProducts(d.data.prdData);
       

    });
   } catch (error) {
      alert("Unable to access API !!");
      
    }
  };

  useEffect(()=>{
    GetProductByDepartmentId();
  },[]);

  function SaveProduct(){
    try { 
      debugger     
      const formData = new FormData();

      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i], form.images[i].name);
      }
      formData.append("name",form.name);
      formData.append("images",form.images);
      formData.append("departmentId",query.get("id"));
      formData.append("description",form.description);
      formData.append("qty",form.qty);
      formData.append("price",form.price);

      axios.post("https://university-project-44ul.onrender.com/product",formData,{
        'Content-Type': 'multipart/form-data'
      }).then((d)=>{
        alert(d.data.message);
        GetProductByDepartmentId();
        resetForm();
      });
    }catch(error){
      alert("Unable to access API !!");
    }
  };

  function resetForm(){
    setForm({
      name:"",
      images:null,
      department:query.get("id"),
      description:"",
      qty:10,
      price:0,
    });
  };

  
  function UpdateProduct(){
    try {
      const formData=new FormData();
      for (let i=0;i<form.images.length;i++){
        formData.append("images",form.images[i],form.images[i].name);
      }
      formData.append("name",form.name);
      formData.append("image",form.images.name);
      formData.append("department",query.get("id"));
      formData.append("description",form.description);
      formData.append("qty",form.qty);
      formData.append("price",form.price);
      formData.append("id",productId);

      axios.put("https://university-project-44ul.onrender.com/product",formData,{
        'Content-Type': 'multipart/form-data'
      }).then((d)=>{
        alert(d.data.message);
        GetProductByDepartmentId();
        resetForm();
      });
    }catch(error){
      alert("Unable to access API !!");
    }
  };

  function DeleteProduct(id){
    try {   

      axios.delete("https://university-project-44ul.onrender.com/product",{data:{_id:id}}).then((d)=>{
        alert(d.data.message);
        GetProductByDepartmentId();
        resetForm();
      });
    }catch(error){
      alert("Unable to access API !!");
    }
  };

  function OnProductSubmit(){
    let errors=false;
    let error={name:"",images:"",description:"",qty:"",price:""};
    if(form.name.trim().length==0){
      errors=true;
      error={...error,name:"Name is required!!"};
    }
    if(form.description.trim().length==0){
      errors=true;
      error={...error,description:"write the description please!!"};
    }
    if(form.qty==""|| form.qty==0){
      errors=true;
      error={...error,qty:"Quantity is required!!"};
    }
    if(form.price==""|| form.price==0){
      errors=true;
      error={...error,price:"Quantity is required!!"};
    }
    if(form.images==null){
      errors=true;
      error={...error,images:"Image is required!!"};
    }
    if(errors)
      setFormError(error);
      else{
        setFormError(error);
        productId? UpdateProduct():SaveProduct();
      }
    }
  
    function renderProducts(){
      return (
      products?.map((item)=>{
        return(
          <tr>
            <td>

               <img src={"https://university-project-44ul.onrender.com/" +item.images[0]} height="150px" width="250px"/>

              {/* <div id={`carousel${item._id}`} className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {item.images.map((img, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={"https://university-project-44ul.onrender.com/" + img} className="d-block w-100" alt={`Product ${index}`} style={{ width: '100px', height: '100px' }} />
                    </div>
                  ))}
                </div>
                <a className="carousel-control-prev" href={`#carousel${item._id}`} role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={`#carousel${item._id}`} role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div> */}
            </td>
             
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>

              <td>
                <button className="btn btn-info" onClick={()=>{
                  setproductId(item._id);
                  setForm({
                    ...form,
                    name:item.name,
                    images:item.images,
                    description:item.description,
                    price:item.price,
                    qty:item.qty,
                  });
                }}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={()=>{
                  DeleteProduct(item._id);}}>Delete</button>
              </td>


          </tr>
        )
      })
    )}

  return (
    <>
    <NavBar/>
    <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header bg-info text-white">
                {productId ? 'Edit Product' : 'New product'}
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-4 col-form-label">Department Name</label>
                  <div className="col-8">
                    <input type='text' className="form-control" value={query.get("name")} disabled/>
                                   
                  </div>               
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">Product Name</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Product Name"
                      onChange={ChangeHandler}
                      value={form.name}
                      
                    />
                    <p className="text-danger">{formError.name}</p>               
                  </div>
                  </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">Product Image</label>
                  <div className="col-8">
                  <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    let files = e.target.files;
                    setForm({ ...form, images: files });
                  }}
                />
                    <p className="text-danger">{formError.images}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">Description</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Description"
                      onChange={ChangeHandler}
                      value={form.description}
                      
                    />
                    <p className="text-danger">{formError.description}</p>               
                  </div>
                  </div>
                  <div className="form-group row">
                  <label className="col-4 col-form-label">Price</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="Enter Price"
                      onChange={ChangeHandler}
                      value={form.price}
                      
                    />
                    <p className="text-danger">{formError.price}</p>               
                  </div>
                  </div>
                  <div className="form-group row">
                  <label className="col-4 col-form-label">Quantity</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="qty"
                      placeholder="Enter Quantity"
                      onChange={ChangeHandler}
                      value={form.qty}
                      
                    />
                    <p className="text-danger">{formError.qty}</p>               
                  </div>
                  </div>
              </div>
              <div className="card-footer text-multed">
                <button className="btn btn-info" onClick={OnProductSubmit}>
                  {productId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" row container border m-2 p-2">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderProducts()}</tbody>
        </table>
      </div>
    </>
  )
}

export default Product