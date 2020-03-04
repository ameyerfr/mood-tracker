import React from "react";
import { Link } from "react-router-dom";
import "../styles/splash.css";
import "../styles/css library/wickedcss.min.css"

const Splash = () => {
  return (
    <div className="splash-page">
      <div className="title-wrapper flex-center-column">
        <img className="splash-img floater" src="/images/logo.png" alt="logo"/>
        <img className="splash-detail" src="/images/++.png" alt="logo"/>
      </div>
      
      {/* <img className="splash-img" src="/images/emotions/09.png" alt="mood"/> */}
      {/* <img className="splash-img" src="/images/pet/egg_evolution.png" alt="egg"/> */}
      <div className="btn-wrapper flex-center-column">
        <Link to="/register"><button className="btn-splash btn-reg">Register</button></Link>
        <Link to="/login"><button className="btn-splash btn-login">Login</button></Link>
      </div>
      {/* <div>
        <h3>A mood-tracking application that is also a tamagotchi</h3>
        <h2>Features:</h2>
        <ul>
          <li>Track your mood daily and enter keywords that affected your mood</li>
          <li>Understand your mood triggers with colorful charts</li>
          <li>Add friends who can be notified when you have been feeling down.</li>
          <li>A pet that evolves over time and has </li>
        </ul>
      </div> */}
      {/* <img className="splash-features" src="/images/features.png" alt="features"/> */}
    </div>
  );
};

export default Splash;
