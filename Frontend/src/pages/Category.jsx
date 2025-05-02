import React from "react";
import { useNavigate } from "react-router-dom";
import "./Category.css";
import Navbar from "../components/navbar";
import rentImage from "../assets/rent.jpg";

const categories = [
  { title: "Rent", amount: 1000, image: rentImage },
  { title: "Groceries", amount: 440, image: rentImage },
  { title: "Dining Out", amount: 5, image: rentImage },
  { title: "Transportation", amount: 80, image: rentImage },
  { title: "Entertainment", amount: 120, image: rentImage },
  { title: "Shopping", amount: 150, image: rentImage },
  { title: "Gym", amount: 75, image: rentImage },
  { title: "Insurance", amount: 200, image: rentImage },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/category/${category.title}`, { state: category });
  };

  return (
    <div className="categories-page">
      <header className="categories-header">
        <Navbar />
      </header>

      <div className="categories-month">
        November 2022
        <div>
          <button>📆 Select Month</button>
        </div>
      </div>

      <div className="categories-container">
        <h2 className="categories-title">Expenses for the Month</h2>

        <div className="categories-search">
          <input type="text" placeholder="🔍 Search" />
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div
              className="category-card"
              key={index}
              onClick={() => handleClick(cat)}
            >
              <img src={cat.image} alt={cat.title} />
              <div className="info">
                <h3>{cat.title}</h3>
                <p>${cat.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
