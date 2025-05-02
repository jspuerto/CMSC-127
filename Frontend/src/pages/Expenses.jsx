import React, { useState } from "react";
import Navbar from "../components/navbar";
import "./Expenses.css";

function App() {
  const [expenses, setExpenses] = useState([
    {
      category: "Rent",
      description: "Apartment Rent",
      amount: 1000,
      date: "2022-01-08",
    },
    {
      category: "Groceries",
      description: "Wal-Mart",
      amount: 69,
      date: "2022-01-11",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
  });

  const handleAddExpense = () => setShowForm(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setExpenses([
      ...expenses,
      { ...newExpense, amount: Number(newExpense.amount) },
    ]);
    setNewExpense({ category: "", description: "", amount: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="header">
        <h1>Expenses</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          // You can add search logic later
        />
        <select className="sort-select">
          <option value="">Filter</option>
          <option value="amount">Year</option>
          <option value="date">Month</option>
          <option value="category">Category</option>
        </select>
        <button onClick={handleAddExpense}>+ Add Expense</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Expense</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i}>
              <td>{e.category}</td>
              <td>{e.description}</td>
              <td>${e.amount.toFixed(2)}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="side-panel">
          <button onClick={() => setShowForm(false)}>&times;</button>
          <form onSubmit={handleFormSubmit}>
            <input
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              required
            />
            <input
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              required
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
