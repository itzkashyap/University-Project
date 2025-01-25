import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function UserDepartment() {
  const query = useQuery();
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();

  function getDepartmentsByUniversityId() {
    try {
      console.log( query.get("id"))
      axios.get("http://127.0.0.1:8080/department?id="+ query.get("id")).then((d) => {
          setDepartments(d.data.depData);
        },
      );
    } catch (error) {
      alert("unable to access api !!");
    }
  }
  useEffect(() => {
    getDepartmentsByUniversityId();
  },[]);

  function renderDepartments() {
    return departments?.map((item) => {
      return (
        <div  className="col-3">
          <div className="card">
            <img
              className="card-img-top"
              src={"http://127.0.0.1:8080/" + item.image}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
             
              <a
                onClick={() => {
                  navigate(ROUTES.productUser.name + "?id=" + item._id);
                }}
                className="btn btn-primary"
              >
                View Product
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <NavBar />
      <div className="row p-2 m-2">
        {renderDepartments()}
        </div>
    </>
  );
}

export default UserDepartment;
