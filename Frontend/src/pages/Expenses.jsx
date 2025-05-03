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
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
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
      { ...newExpense, amount: Number(newExpense.amount), date: newDate, description: newDescription },
    ]);
    setNewExpense({ category: "", description: "", amount: "", date: "" });
    setShowForm(false);
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Expenses by Category</h1>
      <div className="header">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          style={{ marginLeft: "0"}}
        />
        <select className="sort-select">
          <option value="">Filter</option>
          <option value="amount">Year</option>
          <option value="date">Month</option>
          <option value="category">Category</option>
        </select>
        <button onClick={handleAddExpense} className="add-expense-btn" >+ Add Entry</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, i) => (
            <tr key={i}>
              <td>{e.title || "N/A"}</td>
              <td>${e.amount.toFixed(2)}</td>
              <td>{e.date}</td>
              <td>{e.type || "N/A"}</td>
              <td>{e.category}</td>
              <td>{e.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="side-panel">
          <button className="close-btn" onClick={() => setShowForm(false)}>
            &times;
          </button>
          <h2>Add Entry</h2>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Title"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              required
            />
            <input
              type="date"
              onChange={(e) => setNewDate(e.target.value)}
              required
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <textarea
              placeholder="Description"
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
            ></textarea>
            <button type="submit" className="submit-btn">
              Add Entry
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
