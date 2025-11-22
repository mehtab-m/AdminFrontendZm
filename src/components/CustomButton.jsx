import React from "react";
import "../styles/CustomBtn.css"; 
export default function CustomButton({ children, onClick , type="button"}) {
  return (
    <button className="dashboardBtn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
