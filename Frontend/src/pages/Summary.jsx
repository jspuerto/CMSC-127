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
  ResponsiveContainer,
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
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <div className="app">
      <Navbar /> 
      <div className="summary-container">
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
            <LineChart width={500} height={260} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Budget"
                stroke="#8884d8"
                animationDuration={1500} // Animation duration in milliseconds
              />
              <Line
                type="monotone"
                dataKey="Expenses"
                stroke="#82ca9d"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="Savings"
                stroke="#ff6384"
                animationDuration={1500}
              />
            </LineChart>
          </div>

          <div className="chart-box">
            <h2>Spending Breakdown</h2>
            <div className="piechart-container">
              <ResponsiveContainer width={300} height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    onMouseEnter={(data, index) => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={hoveredIndex === null || hoveredIndex === index ? COLORS[index % COLORS.length] : "#ccc"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const { name, value } = payload[0].payload;
                        const total = pieData.reduce((sum, item) => sum + item.value, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return (
                          <div className="custom-tooltip" style={{ background: "white", padding: "10px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "12px",
                                  height: "12px",
                                  backgroundColor: COLORS[hoveredIndex % COLORS.length],
                                  borderRadius: "50%",
                                  marginRight: "5px",
                                }}
                              ></span>
                              <span>{name}</span>
                            </div>
                            <div>${value.toLocaleString()}</div>
                            <div style={{ color: "#888" }}>{percentage}%</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="piechart-legend">
                {pieData.map((entry, i) => (
                  <div key={i} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    ></span>
                    {entry.name} ${entry.value.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
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
    </div>
  );
}

export default App;
