import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import "../styles/AddProduct.css"

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [images, setImages] = useState({ header: null, img2: null, img3: null, img4: null });
  const [costPrice, setCostPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [brandName, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [showOnHome, setShowOnHome] = useState(false);

  const [customFields, setCustomFields] = useState([{ key: "", value: "" }]);

  const token = localStorage.getItem("jwtToken");

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/get_categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [token]);

  // When category selected, populate subcategories
  useEffect(() => {
    if (selectedCategory) {
      const cat = categories.find((c) => c._id === selectedCategory);
      setSubCategories(cat?.subcategories || []);
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory, categories]);

  // Handle image selection
  const handleImageChange = (e, field) => {
    setImages({ ...images, [field]: e.target.files[0] });
  };

  // Add new custom field
  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  // Update custom field
  const updateCustomField = (index, field, value) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  // Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("subCategory", selectedSubCategory);
      formData.append("costPrice", costPrice);
      formData.append("originalPrice", originalPrice);
      formData.append("discountPrice", discountPrice);
      formData.append("brandName", brandName);
      formData.append("description", description);
      formData.append("showOnHome", showOnHome);

      // Images
      if (images.header) formData.append("headerImage", images.header);
      if (images.img2) formData.append("image2", images.img2);
      if (images.img3) formData.append("image3", images.img3);
      if (images.img4) formData.append("image4", images.img4);

      // Custom fields
      formData.append("customFields", JSON.stringify(customFields));

      const res = await axios.post("http://localhost:5000/api/add_product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="addProductPage">
      <div className="addProductCard">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="addProductForm">
          {/* Category Dropdown */}
          <select
            className="categoryDropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* SubCategory Dropdown */}
          <select
            className="subCategoryDropdown"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            required
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>

          {/* Images */}
          <label>Header Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "header")} required />

          <label>2nd Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "img2")} />

          <label>3rd Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "img3")} />

          <label>4th Image:</label>
          <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "img4")} />

          {/* Prices */}
          <input type="number" placeholder="Cost Price" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} required />
          <input type="number" placeholder="Original Price" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} required />
          <input type="number" placeholder="Price After Discount" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />

          {/* Brand */}
          <input type="text" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} required />

          {/* Description */}
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

          {/* Show on Home */}
          <label>
            Show on Home Page:
            <input type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />
          </label>

          {/* Custom Fields */}
          <h4>Custom Fields</h4>
          {customFields.map((field, idx) => (
            <div key={idx} className="customFieldRow">
              <input
                type="text"
                placeholder="Key"
                value={field.key}
                onChange={(e) => updateCustomField(idx, "key", e.target.value)}
              />
              <input
                type="text"
                placeholder="Value"
                value={field.value}
                onChange={(e) => updateCustomField(idx, "value", e.target.value)}
              />
            </div>
          ))}
          <CustomButton type="button" onClick={addCustomField}>+</CustomButton>

          <CustomButton type="submit">Add Product</CustomButton>
        </form>
        <BackButton />
      </div>
    </div>
  );
}
