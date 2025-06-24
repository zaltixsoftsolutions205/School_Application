import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // ← Create this file next
import loginImage from "../assets/login-image.png"; // Add your image in this folder

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/Dashboard");
    } catch (err) {
      alert("Login failed. Check credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
      <div className="login-right">
        <h2>Login Here</h2>
        <hr />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon">📧</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter the Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forget Password</a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
