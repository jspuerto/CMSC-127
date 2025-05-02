import React, { useState } from "react";
import Navbar from "../components/navbar";
import "./Budget.css";

const initialLimits = [
  { category: "Dining Out", limit: 300 },
  { category: "Entertainment", limit: 100 },
  { category: "Groceries", limit: 675 },
  { category: "Gym", limit: 150 },
  { category: "Insurance", limit: 100 },
  { category: "Loan Payments", limit: 200 },
  { category: "Miscellaneous", limit: 25 },
  { category: "Rent", limit: 1000 },
  { category: "Shopping", limit: 100 },
  { category: "Transportation", limit: 100 },
];

function BudgetTab() {
  const [budgetLimits, setBudgetLimits] = useState(initialLimits);
  const [monthlyBudget] = useState(2750);

  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newImage, setNewImage] = useState(null);


  const handleAddCategory = () => setShowForm(true);

  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newCategory && newLimit && newImage) {
      const newEntry = {
        category: newCategory,
        limit: Number(newLimit),
        image: URL.createObjectURL(newImage), // for local preview/display only
      };

      setBudgetLimits([...budgetLimits, newEntry]);

      // Reset form fields
      setNewCategory("");
      setNewLimit("");
      setNewImage(null);
      setShowForm(false);
    }
  };

  return (
    <div className="budget-tab">
      <Navbar />
        <h2>Budget and Spending Tracker</h2>

        <div className="monthly-budget-box">
          <p>Monthly Budget Allowance</p>
          <h1>${monthlyBudget.toLocaleString()}</h1>
        </div>

        <div className="budget-header">
          <h3>Budget Limits</h3>
          <button className="add-category-btn" onClick={handleAddCategory}>
            + Add Category
          </button>
        </div>

        <table className="budget-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Monthly Limit</th>
            </tr>
          </thead>
          <tbody>
            {budgetLimits.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.category}</td>
                <td>${item.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <div className="side-panel">
            <button className="close-btn" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <h2>Add Category</h2>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Monthly Limit"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImage(e.target.files[0])}
                required
              />
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}
    </div>
  );
}

export default BudgetTab;
