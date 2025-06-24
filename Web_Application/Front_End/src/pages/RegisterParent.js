import React, { useState } from "react";
import axios from "axios";

const RegisterParent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/RegisterParent", { name, email, password });
      alert("Parent registered successfully");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Registration failed. Possibly duplicate email.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register Parent</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterParent;
