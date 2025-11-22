import React, { useState } from "react";
import axios from "axios";
import "../styles/AddCategory.css"; 
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { addCategory } from "../api/addCategory";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await addCategory(category);
      setMessage(`Category "${res.data.name}" added successfully!`);
      setCategory("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding category");
    }
  };

  return (
    <div className="addCategoryPage">
      <div className="addCategoryCard">
        <h2>Add Main Category</h2>
        <form onSubmit={handleSubmit} className="addCategoryForm">
          <input
            type="text"
            placeholder="Enter category name (e.g. Bedsheet)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <CustomButton type="submit">Add Category</CustomButton>
          {/* back button */}
        </form>
        <BackButton></BackButton>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
