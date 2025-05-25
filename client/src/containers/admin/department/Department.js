import React, { useState, useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';


function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}



function Department() {

  const query=useQuery();
  const navigate=useNavigate();
  const [departmentId,setDepartmentId]=useState(null);
  const [departments,setDepartments]=useState(null);
  const[form,setForm]=useState({name:"",image:null,university:query.get("id")});
  const[formError,setFormError]=useState({name:"",image:""});


  const ChangeHandler=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  function GetDepartmentByUniversityId(){
    debugger
    try {
      axios.get("https://university-project-44ul.onrender.com/department?id="+query.get("id")).then((d)=>{
        setDepartments(d.data.depData);  
        // console.log(d.data);      
      });
    } catch (error) {
      alert("Unable to access API !!");
    }
  };

  useEffect(()=>{
    GetDepartmentByUniversityId();
  },[]);

  function SaveDepartment(){
    
    try{   
      const formData=new FormData();
      formData.append("name",form.name);
      formData.append("image",form.image);
      formData.append("universityId",query.get("id"));

      axios.post("https://university-project-44ul.onrender.com/department",formData,{
         'Content-Type': 'multipart/form-data'
      }).then((d)=>{
        alert(d.data.message);
        GetDepartmentByUniversityId();
        resetForm();
      })
    }catch(error){
      alert("unable to access API !!!");
    }
  };

    const resetForm=()=>{
      setForm({name:"",image:null,universityId:query.get("id")});
    };

    function UpdateDepartment(){
      try{
        const formData=new FormData();
        formData.append("name",form.name);
        formData.append("image",form.image,form.image.name);
        formData.append("universityId",query.get("id"));
        formData.append("_id",departmentId);
  
        axios.put("https://university-project-44ul.onrender.com/department",formData,{
           'Content-Type': 'multipart/form-data'
        }).then((d)=>{
          alert(d.data.message);
          GetDepartmentByUniversityId();
          resetForm();
        })
      }catch(error){
        alert("unable to access API !!!");
      }
    };

    function DeleteDepartment(id){
      try{      
  
        axios.delete("https://university-project-44ul.onrender.com/department",{data:{_id:id}}       
        ).then((d)=>{
          alert(d.data.message);
          GetDepartmentByUniversityId();
          resetForm();
        })
      }catch(error){
        alert("unable to access API !!!");
      }
    };

    function OnDepartmentSubmit(){
      
      let errors =false;
      let error={name:"",image:""};
      if (form.name.trim().length === 0) {
        errors = true;
        error.name = 'Department Name is required!';
      }
      if (form.image==null) {
        errors = true;
        error.image ={...error,image:"Please select an image!"};
      }
      if (errors) {
        setFormError(error);
      } else {
        departmentId ? UpdateDepartment() : SaveDepartment();
      }
    }

  function renderDepartments(){
    
    return departments?.map((item)=>{
      return(
        <tr>
          <td>
            <img src={'https://university-project-44ul.onrender.com/'+item.image} height="250px" width="400px"/>
          </td>
          <td>{item.name}</td>
          <td>
            <button className='btn btn-info' onClick={()=>{
              navigate(ROUTES.productAdmin.name+"?id="+item._id+"&name="+item.name);
            }}>Add Product</button>
          </td>
         <td> <button className='btn btn-primary' onClick={()=>{
            setDepartmentId(item._id)
            setForm({...form,name:item.name});
          }}>Edit</button></td>

          <td> <button className='btn btn-danger' onClick={()=>{
            DeleteDepartment(item._id);
          }}>Delete</button></td>
        </tr>
      )
    })
  };

  return (
    <>
    <NavBar/>

    <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header bg-info text-white">
                {departmentId ? 'Edit Department' : 'New Department'}
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-4 col-form-label">University Name</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"         
                      value={query.get("name")}
                      disabled
                    />
                   
                  </div>               
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">Department Name</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Department Name"
                      onChange={ChangeHandler}
                      value={form.name}
                      
                    />
                    <p className="text-danger">{formError.name}</p>               
                  </div>
                  </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">Department Image</label>
                  <div className="col-8">
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={(e) => {
                        let file = e.target.files[0];
                        setForm({ ...form, image: file });
                      }}
                    />
                    <p className="text-danger">{formError.image}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer text-muted">
                <button className="btn btn-info" onClick={OnDepartmentSubmit}>
                  {departmentId ? 'Update' : 'Save'}
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
              <th>Department Image</th>
              <th>Department Name</th>
              <th>Add Product</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderDepartments()}</tbody>
        </table>
      </div>
    </>
  )
}

export default Department