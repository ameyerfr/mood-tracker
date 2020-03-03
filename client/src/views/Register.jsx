import React from "react";
import Signup from "../components/form/Signup";
import "../styles/hideNavbar.css";

const Register = () => {
  return (
    <div className="form-page">
      <h1 className="title">Register</h1>
      <Signup />
    </div>
  );
};

export default Register;
