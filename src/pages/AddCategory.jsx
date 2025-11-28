import React, { useState  ,useEffect} from "react";
import axios from "axios";
import "../styles/AddCategory.css"; 
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import { addCategory } from "../api/addCategory";
import { toast } from "react-toastify"
import { useNavigate} from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const res = await axios.get("http://localhost:5000/api/get_categories", {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        // Random style assign once only
        const styledCats = res.data.map(cat => ({
          ...cat,
          fontSize: Math.floor(Math.random() * 10 + 14),
          padding: Math.floor(Math.random() * 10 + 12)
        }));
  
        setCategories(styledCats);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await addCategory(category);
      // setMessage(`Category "${res.category.name}" added successfully!`);
      toast.success(`Category "${res.category.name}" added successfully!`);
      setCategory("");
      navigate("/admin-dashboard"); 
    } catch (err) {
      // setMessage(err.response?.category?.message || "Error adding category");
      toast.error(err.response?.data?.message || "Error adding category");

    }
  };

  return (
    <div className="addCategoryPage">
      {/* bubbles on top */}
      <div className="bubbleWrapper topBubbles">
        {categories.slice(0, Math.ceil(categories.length / 2)).map((cat) => (
          <div 
            key={cat._id} 
            className="categoryBubble"
            style={{ fontSize: `${cat.fontSize}px`, padding: `${cat.padding}px` }}
          >
            {cat.name}
          </div>
        ))}
      </div>
  
      {/* form */}
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
        </form>
        <BackButton />
      </div>
  
      {/* bubbles on bottom */}
      <div className="bubbleWrapper bottomBubbles">
        {categories.slice(Math.ceil(categories.length / 2)).map((cat) => (
          <div 
            key={cat._id} 
            className="categoryBubble"
            style={{ fontSize: `${cat.fontSize}px`, padding: `${cat.padding}px` }}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
  
}
