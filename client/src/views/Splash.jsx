import React from "react";
import "../styles/hideNavbar.css";

const Splash = () => {
  return (
    <div className="splash-page">
      {/* <h1>Welcome to TamaMOODchi !</h1> */}
      <p>Never feel alone with TamaMOODchi</p>
      {/* <img className="splash-img" src="/images/emotions/09.png" /> */}
      {/* <img className="splash-img" src="/images/pet/egg_evolution.png" /> */}
      <button className="btn-splash">Register</button>
      <button className="btn-splash">Login</button>
    </div>
  );
};

export default Splash;
