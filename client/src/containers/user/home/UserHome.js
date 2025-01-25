import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigations/Routes";

function UserHome() {
  const [universities, setUniversities] = useState(null);
  const navigate = useNavigate();

  function getAllUniversities() {
    try {
      axios.get("http://127.0.0.1:8080/university").then((d) => {
        setUniversities(d.data.univData);
      });
    } catch (error) {
      alert("unable to access api !!");
    }
  }

  useEffect(() => {
    getAllUniversities();
  }, []);

  function renderUniversities() {
    return universities?.map((item) => {
      return (
        <div className="col-3" > {/* Ensure each item has a unique key */}
          <div className="card">
            <img
              className="card-img-top"
              src={"http://127.0.0.1:8080/" + item.image} height="150px" width="250px"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <a
                onClick={() => {
                  navigate(ROUTES.departmentUser.name + "?id=" + item._id);
                }}
                className="btn btn-primary"
              >
                Go Department
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
     
      {renderUniversities()}
    </div>
  </>
);

}

export default UserHome;
