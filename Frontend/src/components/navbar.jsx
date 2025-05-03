import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';
import "./navbar.css";
import {
  FaTachometerAlt,
  FaChartPie,
  FaShoppingCart,
  FaThLarge,
} from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/summary":
        setActiveNav("review");
        break;
      case "/budget":
        setActiveNav("budget");
        break;
      case "/expenses":
        setActiveNav("expenses");
        break;
      case "/categories":
        setActiveNav("categories");
        break;
      default:
        setActiveNav("");
    }
  }, [location.pathname]);

  const handleNavClick = (icon) => {
    if (activeNav !== icon) {
      navigate(getRoute(icon));
    }
  };

  const getRoute = (icon) => {
    switch (icon) {
      case "review":
        return "/summary";
      case "budget":
        return "/budget";
      case "expenses":
        return "/expenses";
      case "categories":
        return "/categories";
      default:
        return "/";
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <img src={logo} alt="Logo" className="logo" />
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
