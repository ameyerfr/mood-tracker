import React from "react";
import { Link } from "react-router-dom";
import "../styles/splash.css";
import "../styles/css library/wickedcss.min.css"

const Splash = () => {
  return (
    <div className="splash-page">
      <div className="title-wrapper flex-center-column">
        <img className="splash-logo floater" src="/images/logo.png" alt="logo"/>
        <img className="splash-detail" src="/images/++.png" alt="logo"/>
      </div>
      <div className="btn-wrapper flex-center-column">
        <Link to="/register"><button className="btn-splash btn-reg">Register</button></Link>
        <Link to="/login"><button className="btn-splash btn-login">Login</button></Link>
      </div>
      <div>
        {/* <h2>Features:</h2> */}
        <div className="flex-center-row features-box">
          <img className="splash-img" src="/images/emotions/01.png"/>
          <p className="splash-text">Track your mood daily and gain points for your pet</p>
        </div>
        <div className="flex-center-row features-box">
          <p className="splash-text">Understand your mood triggers with cute charts</p>
          <img className="splash-img" src="/images/emotions/08.png"/>
        </div>
        <div className="flex-center-row features-box">
          <img className="splash-img" src="/images/emotions/04.png"/>
          <p className="splash-text">Add friends who can be notified when you have been feeling down</p>
        </div>
        <div className="flex-center-row features-box">
          <p className="splash-text">Nourish your virtual pet and watch it evolve over time</p>
          <img className="splash-img" src="/images/emotions/10.png"/>
        </div>

      </div>
      {/* <img className="splash-features" src="/images/features.png" alt="features"/> */}
    </div>
  );
};

export default Splash;
