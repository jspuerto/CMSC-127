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
  const [newDate, setNewDate] = useState("");
  const [newType, setNewType] = useState("");
  const [newDescription, setNewDescription] = useState("");


  const handleAddCategory = () => setShowForm(true);

  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newCategory && newLimit && newDate && newType) {
      const newEntry = {
        title: newCategory,
        amount: Number(newLimit),
        date: newDate,
        type: newType,
        category: newCategory,
        description: newDescription,
      };

      setBudgetLimits([...budgetLimits, newEntry]);

      // Reset form fields
      setNewCategory("");
      setNewLimit("");
      setNewDate("");
      setNewType("");
      setNewDescription("");
      setShowForm(false);
    }
  };

  return (
    <div className="budget-tab">
      <Navbar />
      <div className="budget-container">
        <h2>Budget and Spending Tracker</h2>

        <div className="monthly-budget-box">
          <p>Monthly Budget Allowance</p>
          <h1>${monthlyBudget.toLocaleString()}</h1>
        </div>

        <div className="budget-header">
          <h3>Budget Limits</h3>
          <button className="add-entry-btn" onClick={handleAddCategory}>
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
            <div className="form-header">
              <h2>Add Category</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="form-body">
              <label>Category</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name"
                required
              />
              
              <label>Monthly Limit</label>
              <div className="input-group">
                <span className="currency-prefix">$</span>
                <input
                  type="number"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              <label>Category Image</label>
              <input
                type="file"
                accept="image/*"
                className="image-upload"
              />

              <div className="form-actions">
                <button type="submit" className="submit-btn">Submit</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetTab;
