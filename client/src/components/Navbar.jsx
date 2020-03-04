import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

import "../styles/navbar.css";
import {useHistory} from "react-router-dom";
const Navbar = () => {
  let history = useHistory()
  return (
    <nav
      // id=""
      // onClick={}
      className="navbar"
    >
      <button className="navlinks" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <NavLink className="navlinks" to="/dashboard">
        <img className="img-logo" src="/images/emotions/05.png" alt="logo"/>
      </NavLink>
      <NavLink className="navlinks" to="/profile">
        <FontAwesomeIcon icon={faUserCircle} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
