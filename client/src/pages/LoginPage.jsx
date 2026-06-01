import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "1234") {
      navigate("/home");
    } else {
      alert("❌ Invalid Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="left-section">
          <div className="overlay">
            <h1>HP GAS AGENCY</h1>
            <p>
              Welcome to HP Gas Management Portal.
              Manage bookings, customers and deliveries securely.
            </p>
          </div>
        </div>

        <div className="right-section">
          <div className="logo">
            <img
              src="/logo.png"
              alt="HP Gas Logo"
            />
          </div>

          <h2>Agency Login</h2>

          <div className="input-group">
            <label>Enter Your Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin}>
            Login
          </button>

          <p className="footer-text">
            © 2026 HP Gas Agency Portal
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;