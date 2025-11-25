import axios from "axios";
import { ENDPOINTS } from "./endpoints";
const token = localStorage.getItem("jwtToken");

export async function addSubCategory(selectedCategory,subCategoryName) {
    const res = await axios.post(
        `http://localhost:5000/api/add_subcategories/${selectedCategory}/subcategories`,
        { name: subCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
}


 