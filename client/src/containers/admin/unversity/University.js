import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../../components/NavBar';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../../navigations/Routes';

function University() {
  const [universityId, setUniversityId] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [form, setForm] = useState({ name: '', image: null });
  const [formError, setFormError] = useState({ name: '', image: '' });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getUniversities = () => {
    axios
      .get('https://university-project-44ul.onrender.com/university')
      .then((d) => {
        setUniversities(d.data.univData);
      })
      .catch(() => {
        alert('Unable to fetch data from API!');
      });
  };

  useEffect(() => {
    getUniversities();
  }, []);

  const saveUniversity = () => {
    try {
      let formData = new FormData();
      formData.append('name', form.name);
      formData.append('image', form.image);
      axios
        .post('https://university-project-44ul.onrender.com/university', formData, {
          'Content-Type': 'multipart/form-data',
        })
        .then((d) => {
          alert(d.data.message);
          getUniversities();
          resetForm();
        });
    } catch {
      alert('Something went wrong while using the API!');
    }
  };

  const resetForm = () => {
    setForm({ name: '', image: null });
  };

  const updateUniversity = () => {
    try {
      let formData = new FormData();
      formData.append('name', form.name);
      formData.append('image', form.image, form.image.name);
      formData.append('_id', universityId);
      axios
        .put('https://university-project-44ul.onrender.com/university', formData, {
          'Content-Type': 'multipart/form-data',
        })
        .then((d) => {
          alert(d.data.message);
          getUniversities();
          resetForm();
        });
    } catch {
      alert('Something went wrong while using the API!');
    }
  };

  const deleteUniversity = (id) => {
    try {
      axios
        .delete('https://university-project-44ul.onrender.com/university', { data: { _id: id } })
        .then((d) => {
          alert(d.data.message);
          getUniversities();
          resetForm();
        });
    } catch {
      alert('Something went wrong while using the API!');
    }
  };

  const onUniversitySubmit = () => {
    let errors = false;
    let error = { name: '', image: '' };
    if (form.name.trim().length === 0) {
      errors = true;
      error.name = 'Name is required!';
    }
    if (!form.image) {
      errors = true;
      error.image = 'Please select an image!';
    }
    if (errors) {
      setFormError(error);
    } else {
      universityId ? updateUniversity() : saveUniversity();
    }
  };

  function renderUniversities() {
    return universities?.map((item) => (
      <tr>
        <td>
          <img src={"https://university-project-44ul.onrender.com/"+item.image}  />
         
        </td>
        <td>{item.name}</td>
        <td>
          <button
            className="btn btn-info"
            onClick={() => {
              navigate(ROUTES.departmentAdmin.name + "?id="+ item._id+"&name="+item.name);
            }}
          >
            Add Department
          </button>
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => {
              setUniversityId(item._id);
              setForm({ ...form, name: item.name });
            }}
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteUniversity(item._id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-header bg-info text-white">
                {universityId ? 'Edit University' : 'New University'}
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-4 col-form-label">University Name</label>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="University Name"
                      onChange={changeHandler}
                      value={form.name}
                    />
                    <p className="text-danger">{formError.name}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">University Image</label>
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
                <button className="btn btn-info" onClick={onUniversitySubmit}>
                  {universityId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container border m-2 p-2">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>University Image</th>
              <th>University Name</th>
              <th>Add Department</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderUniversities()}</tbody>
        </table>
      </div>
    </>
  );
}

export default University;
