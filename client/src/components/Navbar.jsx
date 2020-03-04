import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";

const Navbar = () => {
  let history = useHistory();
  return (
    <nav className="navbar">
      <button className="navlinks btn-back" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <NavLink className="navlinks" to="/dashboard">
        <img className="img-logo" src="/images/emotions/05.png" alt="logo" />
      </NavLink>
      <NavLink className="navlinks" to="/profile">
        <FontAwesomeIcon icon={faUserCircle} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
