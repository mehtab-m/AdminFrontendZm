import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
import Sidebar from "../components/SideBar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="dashboard-layout">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-body">
      <Sidebar className={`sidebar ${sidebarOpen ? "open" : ""}`} />
        <MainContent />
      </div>
    </div>
  );
}
