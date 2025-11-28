import React from "react";
import logo from "../assets/ZM.svg";

export default function Navbar({ toggleSidebar}) {
  return (


    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger button only visible on mobile */}
        <button className="sidebar-toggle" onClick={toggleSidebar} >
          ☰
        </button>
      </div>

      <div className="navbar-center">
        <img src={logo} alt="logo" className="navbar-logo" />
        
      </div>

      <div className="navbar-right">{/* profile/settings later */}</div>
    </nav>
  );
}
