// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import {
  FaTachometerAlt,
  FaChartPie,
  FaShoppingCart,
  FaThLarge,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavClick = (icon) => {
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
      <div className="navbar-title">Budget and Spending Tracker</div>
      <div className="navbar-links">
        <div
          className="nav-item active"
          onClick={() => handleNavClick("review")}
        >
          <FaTachometerAlt />
          <span>Year in Review</span>
        </div>

        <div className="nav-item" onClick={() => handleNavClick("budget")}>
          <FaChartPie />
          <span>Budget</span>
        </div>

        <div className="nav-item" onClick={() => handleNavClick("expenses")}>
          <FaShoppingCart />
          <span>Expenses</span>
        </div>

        <div className="nav-item" onClick={() => handleNavClick("categories")}>
          <FaThLarge />
          <span>Categories</span>
        </div>
      </div>
      <div className="navbar-profile">L</div>
    </div>
  );
};

export default Navbar;
