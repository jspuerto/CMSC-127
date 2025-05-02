import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Summary from "./pages/Summary";
import Budget from "./pages/Budget";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Category";
import Categorydeets from "./pages/Categorydeets";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<Categorydeets />} />
      </Routes>
    </Router>
  );
};

export default App;
