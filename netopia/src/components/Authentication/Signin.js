import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Authentication.css";

export default function Signin({ onBack, onNavigate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    const newUser = { name, phone, email, avatar: null };
    try { localStorage.setItem("user", JSON.stringify(newUser)); } catch (e) {}
    alert("Account created (demo). You are now signed in.");
    onNavigate && onNavigate("dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="small-back">
          <button className="back-button" onClick={onBack} aria-label="Back to dashboard">
            <ArrowLeft size={16} />
          </button>
        </div>

        <div className="auth-header">
          <div>
            <div className="auth-title">Create Account</div>
            <div className="auth-sub">Sign up to access Netopia features</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input type="tel" placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          <input type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />

          <button className="primary-btn" type="submit">Create account</button>

          <div className="auth-footer">
            Already have an account?{' '}
            <button type="button" className="link-btn" onClick={() => onNavigate && onNavigate('login')}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
