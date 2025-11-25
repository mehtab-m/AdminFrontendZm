import { useState, useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { loginAdmin } from "../api/auth.js";
import { isValidGmail } from "../../utils/validators.js"; 



export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [validations, setValidations] = useState({
    email: false,
    passwordLength: false,
    passwordSpecial: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    setValidations({
      email: isValidGmail(form.email), 
      passwordLength: form.password.length > 8,
      passwordSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
    });
  }, [form]);


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button clicked for login handleSubmit");
  if (!allValid) {
    setError("Please complete all validations first");
    return;
  }
    setLoading(true);
    setError("");


    
    try {
      const response = await loginAdmin(form);
      const token = response.token;
      localStorage.setItem("jwtToken", token); 
      navigate("/admin-dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }finally {
      setLoading(false);
    }
  };

  const allValid = Object.values(validations).every(Boolean);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <div>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="admin@gmail.com"
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              required 
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={styles.input}
            />
          </div>

          {/* Validation Checkboxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>
              <input type="checkbox" checked={validations.email} readOnly /> Valid Email Address
            </label>
            <label>
              <input type="checkbox" checked={validations.passwordLength} readOnly /> Password &gt; 8 chars
            </label>
            <label>
              <input type="checkbox" checked={validations.passwordSpecial} readOnly /> Password must contain special characters
            </label>
          </div>
          
        {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Login Button */}
          <button type="submit" style={styles.loginBtn} >
            Login
          </button>
        </form>
        <Link to="/resetPassword" style={styles.forgotBtn}>
          Forget Password?
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    color: "#374151",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.2s",
  },
  forgotBtn: {
    display: "inline-block",
    marginTop: "10px",
    color: "#2563eb",
    fontSize: "14px",
    textDecoration: "none",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    transition: "0.2s",
    opacity: 1,
  },
};
