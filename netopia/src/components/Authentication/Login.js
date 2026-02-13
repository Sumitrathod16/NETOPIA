import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Authentication.css";

export default function Login({ onBack, onNavigate }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: perform authentication
    const storedUser = { name: identifier, avatar: null };
    try { localStorage.setItem("user", JSON.stringify(storedUser)); } catch (e) {}
    alert("Logged in (demo). Redirecting to dashboard...");
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
            <div className="auth-title">Welcome Back</div>
            <div className="auth-sub">Log in to continue to Netopia</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" type="submit">Sign in</button>

          <div className="auth-footer">
            Don't have an account?{' '}
            <button type="button" className="link-btn" onClick={() => onNavigate && onNavigate('signin')}>Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
