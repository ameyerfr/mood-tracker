import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="splash-page">
      {/* <h1>Welcome to TamaMOODchi !</h1> */}
      <p>Never feel alone with TamaMOODchi</p>
      {/* <img className="splash-img" src="/images/emotions/09.png" /> */}
      {/* <img className="splash-img" src="/images/pet/egg_evolution.png" /> */}
      <Link to="/register"><button className="btn-splash">Register</button></Link>
      <Link to="/login"><button className="btn-splash">Login</button></Link>
    </div>
  );
};

export default Splash;
