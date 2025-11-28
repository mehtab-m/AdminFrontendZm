import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";   // if you want sidebar global
import { Outlet } from "react-router-dom";











// Layout.jsx
export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
    return (
      <div className="dashboard-layout">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="dashboard-body">
          <Sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`} />
          <Outlet /> {/* child page content */}
        </div>
      </div>
    );
  }
  