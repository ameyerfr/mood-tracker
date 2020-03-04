import React from "react";
import { Link } from "react-router-dom";
import "../styles/splash.css";
import "../styles/css library/wickedcss.min.css"

const Splash = () => {
  return (
    <div className="splash-page">
      <img className="splash-img floater" src="/images/logo.png" alt="logo"/>
      {/* <img className="splash-img" src="/images/emotions/09.png" alt="mood"/> */}
      {/* <img className="splash-img" src="/images/pet/egg_evolution.png" alt="egg"/> */}
      <Link to="/register"><button className="btn-splash btn-reg">Register</button></Link>
      <Link to="/login"><button className="btn-splash btn-login">Login</button></Link>
      <div>
        <p>Track your mood and start feeling better !</p>
        <h2>Features:</h2>


      </div>
    </div>
  );
};

export default Splash;
