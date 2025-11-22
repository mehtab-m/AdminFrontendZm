import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ZM.svg";
import "../styles/Dashboard.css"; 

export default function Dashboard() {
  const navigate = useNavigate();
  // const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  const buttons = [
    { text: "See Orders", route: "/orders" },
    { text: "Add Category", route: "/add-category" },
    { text: "Add SubCategory", route: "/add-subcategory" },
    { text: "Add Product", route: "/add-product" },
    { text: "Remove Product", route: "/remove-product" },
    { text: "Manage Users", route: "/users" },
    { text: "Reports", route: "/reports" },
  ];

  return (
    <div className="page">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          
            <img src={logo} alt="logo" height="100px" />
        
        </div>
      </nav>

      <div className="buttonsWrapper">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            className="dashboardBtn"
            onClick={() => navigate(btn.route)}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
}
