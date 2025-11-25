import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import "../styles/AddCategory.css";

export default function AddSubCategory() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
        
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get("http://localhost:5000/api/get_categories", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data); 
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !subCategoryName) {
      toast.error("Please select a category and enter a subcategory name");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const res = await axios.post(
        `http://localhost:5000/api/categories/${selectedCategory}/subcategories`,
        { name: subCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(
        `Subcategory "${res.data.name}" added to ${res.data.parentCategory.name}`
      );
      setSubCategoryName("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding subcategory");
    }
  };

  return (
    <div className="addCategoryPage">
      <div className="addCategoryCard">
        <h2>Add SubCategory</h2>
        <form onSubmit={handleSubmit} className="addCategoryForm">
        <select
  className="categoryDropdown"
  value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)}
  required
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id} className="categoryOption">
      {cat.name}
    </option>
  ))}
</select>


          <input
            type="text"
            placeholder="Enter subcategory name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
          />

          <CustomButton type="submit">Add SubCategory</CustomButton>
        </form>
        <BackButton />
      </div>
    </div>
  );
}
