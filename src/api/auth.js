import axios from "axios";

export const loginAdmin = async (form) => {
  try {
    const res = await axios.post("http://localhost:5000/api/admin/login", form);
    return res.data;
  } catch (err) {
    
    throw err;
  }
};
