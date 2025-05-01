import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "../components/navbar";
import "./Summary.css"; // Custom styles

const summaryData = [
  { label: "YTD Expenses", value: "$22,842" },
  { label: "YTD Savings", value: "$7,408" },
  { label: "Monthly Average", value: "$2,077" },
  { label: "Monthly Budget", value: "$2,750" },
];

const lineData = [
  { name: "Jan", Budget: 2000, Expenses: 1700, Savings: 300 },
  { name: "Feb", Budget: 2000, Expenses: 1687, Savings: 313 },
  { name: "Mar", Budget: 2200, Expenses: 2400, Savings: -200 },
  { name: "Apr", Budget: 2200, Expenses: 2046, Savings: 154 },
  { name: "May", Budget: 2200, Expenses: 1315, Savings: 885 },
  { name: "Jun", Budget: 2300, Expenses: 2123, Savings: 177 },
  { name: "Jul", Budget: 2300, Expenses: 2186, Savings: 114 },
  { name: "Aug", Budget: 2500, Expenses: 2500, Savings: 0 },
  { name: "Sep", Budget: 2500, Expenses: 2300, Savings: 200 },
  { name: "Oct", Budget: 2300, Expenses: 2100, Savings: 200 },
  { name: "Nov", Budget: 2750, Expenses: 2701, Savings: 49 },
];

const pieData = [
  { name: "Rent", value: 12000 },
  { name: "Groceries", value: 1299 },
  { name: "Dining Out", value: 1205 },
  { name: "Transportation", value: 600 },
  { name: "Entertainment", value: 700 },
  { name: "Shopping", value: 605 },
  { name: "Gym", value: 500 },
  { name: "Insurance", value: 1300 },
  { name: "Loan Payments", value: 2400 },
  { name: "Miscellaneous", value: 100 },
];

const tableData = [
  { month: "January", expenses: "$1,761", savings: "$353" },
  { month: "February", expenses: "$1,687", savings: "$313" },
  { month: "March", expenses: "$2,400", savings: "$-200" },
  { month: "April", expenses: "$2,046", savings: "$154" },
  { month: "May", expenses: "$1,315", savings: "$885" },
  { month: "June", expenses: "$2,123", savings: "$177" },
  { month: "July", expenses: "$2,186", savings: "$114" },
  { month: "August", expenses: "$2,500", savings: "$0" },
  { month: "September", expenses: "$2,300", savings: "$200" },
  { month: "October", expenses: "$2,100", savings: "$200" },
  { month: "November", expenses: "$2,701", savings: "$49" },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AB47BC",
  "#26A69A",
  "#FFA726",
  "#EF5350",
  "#78909C",
  "#8D6E63",
];

function App() {
  const [month, setMonth] = useState("2022-11");

  return (
    <div className="app">
      <Navbar /> 
      <h1>Summary of Expenses</h1>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="month-picker"
      />
      <div className="summary-cards">
        {summaryData.map((item, i) => (
          <div key={i} className="card">
            <div className="label">{item.label}</div>
            <div className="value">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="charts">
        <div className="chart-box">
          <h2>YTD Savings Summary</h2>
          <LineChart width={400} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Budget" stroke="#8884d8" />
            <Line type="monotone" dataKey="Expenses" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Savings" stroke="#ff6384" />
          </LineChart>
        </div>

        <div className="chart-box">
          <h2>Spending Breakdown</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {pieData.map((entry, i) => (
                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div className="table-section">
        <h2>Costs this Year</h2>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Expenses</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <td>{row.month}</td>
                <td>{row.expenses}</td>
                <td>{row.savings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
