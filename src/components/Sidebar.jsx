import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ className }) {
  const navigate = useNavigate();

  const menuItems = [
    { text: "See Orders", route: "/orders" },
    { text: "Add Category", route: "/add-category" },
    { text: "Add SubCategory", route: "/add-subcategory" },
    { text: "Add Product", route: "/add-product" },
    { text: "Remove Product", route: "/remove-product" },
    { text: "Manage Users", route: "/users" },
    { text: "Reports", route: "/reports" },
  ];

  return (
    <aside className={className}>
    <ul className="sidebar-menu">
      {menuItems.map((item, idx) => (
        <li key={idx} onClick={() => navigate(item.route)} className="sidebar-item">
          {item.text}
        </li>
      ))}
    </ul>
  </aside>
  );
}
