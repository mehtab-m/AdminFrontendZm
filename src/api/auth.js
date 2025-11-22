import axios from "axios";

export async function loginAdmin(form) {
  const response = await axios.post("http://localhost:5000/api/admin/login", form);
  return response.data; 
}
