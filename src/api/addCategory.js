import axios from "axios";
import { ENDPOINTS } from "./endpoints";
const token = localStorage.getItem("jwtToken");

export async function addCategory(name) {
 
    const res = await axios.post(
      ENDPOINTS.categories,
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
  return res.data;
}
