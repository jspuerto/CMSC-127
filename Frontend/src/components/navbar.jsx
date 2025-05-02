// src/components/Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import brand from '../assets/thrifttrail.png';
import "./navbar.css";
import {
  FaTachometerAlt,
  FaChartPie,
  FaShoppingCart,
  FaThLarge,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("review");

  const handleNavClick = (icon) => {
    setActiveNav(icon); // Set the active button
    if (icon === "review") {
      navigate("/summary");
    } else if (icon === "budget") {
      navigate("/budget");
    } else if (icon === "expenses") {
      navigate("/expenses");
    } else if (icon === "categories") {
      navigate("/categories");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <img src={brand} alt="Brand" className="brand" />
        Thrift Trail
      </div>
      <div className="navbar-links">
        <div
          className={`nav-item ${activeNav === "review" ? "active" : ""}`}
          onClick={() => handleNavClick("review")}
        >
          <FaTachometerAlt />
          <span>Year in Review</span>
        </div>

        <div
          className={`nav-item ${activeNav === "budget" ? "active" : ""}`}
          onClick={() => handleNavClick("budget")}
        >
          <FaChartPie />
          <span>Budget</span>
        </div>

        <div
          className={`nav-item ${activeNav === "expenses" ? "active" : ""}`}
          onClick={() => handleNavClick("expenses")}
        >
          <FaShoppingCart />
          <span>Expenses</span>
        </div>

        <div
          className={`nav-item ${activeNav === "categories" ? "active" : ""}`}
          onClick={() => handleNavClick("categories")}
        >
          <FaThLarge />
          <span>Categories</span>
        </div>
      </div>
      <div className="navbar-profile">L</div>
    </div>
  );
};

export default Navbar;
