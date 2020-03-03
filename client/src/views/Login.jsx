import React from "react";
import Signin from "../components/form/Signin";
import "../styles/hideNavbar.css";

const Login = () => {
  return (
    <div className="form-page">
      <h1 className="title">Login</h1>
      <Signin />
    </div>
  );
};

export default Login;
