import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = () => (
  <div className="NavBar">
    <Link to="/submit" className="NavBar__item">
      Submit ⭐️
    </Link>
    <Link to="/lookup" className="NavBar__item">
      Look Up ⭐️
    </Link>
  </div>
);

export default NavBar;
