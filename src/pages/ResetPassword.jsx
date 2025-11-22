import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add reset password logic here
    console.log("Reset link sent to:", email);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Reset Password</h2>
        <p style={styles.subheading}>
          Enter your email to receive a password reset link.
        </p>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div>
            <label style={styles.label} htmlFor="email">
              Email
            </label>
            <input
              style={styles.input}
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.resetBtn}>
            Send Reset Link
          </button>
          <Link to="/" style={styles.loginBtn}>Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  },
  subheading: {
    textAlign: "center",
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "30px",
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
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.2s",
    boxSizing: "border-box",
  },
  resetBtn: {
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
  },
};
