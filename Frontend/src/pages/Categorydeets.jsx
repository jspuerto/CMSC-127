import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "./Categorydeets.css";

const CategoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state;
  const [showDrawer, setShowDrawer] = useState(false);

  if (!category) return <p className="no-data">No data found.</p>;

  const handleAddClick = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div className="category-page">
      <Navbar />
      <div className="category-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span
            className="breadcrumb-link"
            onClick={() => navigate("/categories")}
          >
            Categories
          </span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{category.title}</span>
        </div>

        {/* Header */}
        <div className="category-header">
          <img
            src={category.image}
            alt={category.title}
            className="category-image"
          />
          <div className="category-info">
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">
              Your monthly limit for <span>{category.title}</span> is{" "}
              <span>${category.amount}</span>, and you have spent{" "}
              <span>${category.amount}</span>.
            </p>
            <div className="budget-section">
              <label>Budget Remaining</label>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <span className="budget-amount">$0</span>
            </div>
          </div>
        </div>

        <div className="expenses-section">
          <div className="expenses-header">
            <h3>Expenses</h3>
            <input type="text" placeholder="Search" className="search-input" />
            <button className="add-button" onClick={handleAddClick}>
              <span className="plus-icon">＋</span> Add
            </button>
          </div>

          <div className="expenses-table-wrapper">
            <table className="expenses-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Expense</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Apartment Rent</td>
                  <td>${category.amount.toFixed(2)}</td>
                  <td>11/21/2022</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`drawer ${showDrawer ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Add item</h2>
          <button onClick={handleCloseDrawer} className="drawer-close">
            ×
          </button>
        </div>
        <form className="drawer-form">
          <label>Category</label>
          <input
            type="text"
            placeholder="Category"
            disabled
            value={category.title}
          />
          <label>Description</label>
          <input type="text" placeholder="Description" />
          <label>Expense</label>
          <div className="input-group">
            <span className="currency-prefix">$</span>
            <input type="number" placeholder="0.00" />
          </div>
          <label>Date</label>
          <input type="date" />
          <div className="drawer-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCloseDrawer}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      {showDrawer && (
        <div className="drawer-backdrop" onClick={handleCloseDrawer}></div>
      )}
    </div>
  );
};

export default CategoryDetail;
