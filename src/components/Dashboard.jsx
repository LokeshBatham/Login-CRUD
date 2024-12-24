import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import CrudForm from "./CrudForm";
let token;

const Dashboard = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    token = sessionStorage.getItem("accessToken");
    fatchUser();
  }, []);
  useEffect(() => {}, [loginUser]);
  const fatchUser = () => {
    axios
      .get("http://13.50.27.128/v1/user", {
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      })
      .then((response) => {
        if (response.data.status == true) {
          setLoginUser(response.data.data);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="dashboard">
        <h1 className="">Dashboard</h1>
        <UserCard userData={loginUser} />
        <CrudForm />
      </div>
    </>
  );
};

export default Dashboard;
