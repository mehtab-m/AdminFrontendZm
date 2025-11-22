import axios from "axios";
import { ENDPOINTS } from "./endpoints";

export async function addCategory(name) {
    console.log("➡️ Request URL:", ENDPOINTS.categories);
    console.log("➡️ Payload:", { name });
  const res = await axios.post(ENDPOINTS.add-categories, { name });
  return res.data;
}
