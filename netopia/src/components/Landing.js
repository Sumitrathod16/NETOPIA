import React from "react";
import { Phone, Heart, AlertTriangle, Car, Zap, MoreHorizontal } from "lucide-react";
import "./Landing.css";

const ICON_MAP = {
  medical: Heart,
  police: Phone,
  fire: AlertTriangle,
  accident: Car,
  power: Zap,
  other: MoreHorizontal
};

export default function Landing({ onNavigate }) {
  const quick = [
    { id: "medical", label: "Medical", desc: "Chest pain, breathing issues" },
    { id: "police", label: "Police", desc: "Crime, theft, assault" },
    { id: "fire", label: "Fire", desc: "Fire or smoke" },
    { id: "accident", label: "Accident", desc: "Road or vehicle accident" },
    { id: "power", label: "Power Out", desc: "Power outage / hazards" },
    { id: "other", label: "Other", desc: "Flood, earthquake, etc." }
  ];

  return (
    <div className="landing-page">
      <header className="landing-header container">
        <div className="brand">
          <div className="logo">N</div>
          <h1>Netopia</h1>
        </div>

        <nav className="nav-actions">
          <button className="link-btn" onClick={() => onNavigate("login")}>Sign in</button>
          <button className="primary-ghost" onClick={() => onNavigate("signin")}>Create account</button>
        </nav>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-left">
            <h2>Get help quickly — Emergency assistance in one tap</h2>
            <p>Use quick actions, SOS tracking, and one-touch calling when seconds matter.</p>

            <div className="hero-ctas">
              <button className="primary-btn" onClick={() => onNavigate("medical")}>Report Emergency</button>
              <button className="secondary-btn" onClick={() => onNavigate("maps")}>View Maps</button>
            </div>
          </div>

          <div className="hero-cards">
            {quick.map(item => {
              const Icon = ICON_MAP[item.id];
              return (
                <button key={item.id} className="hero-card" onClick={() => onNavigate(item.id)}>
                  <div className="icon-wrap"><Icon size={20} /></div>
                  <div className="card-body">
                    <div className="card-title">{item.label}</div>
                    <div className="card-desc">{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="features">
          <h3>Why Netopia</h3>
          <div className="feature-grid">
            <div className="feature">Fast emergency dialing and SOS</div>
            <div className="feature">Live location sharing</div>
            <div className="feature">Offline route download</div>
            <div className="feature">Helpful guidance and triage</div>
          </div>
        </section>
      </main>

      <footer className="landing-footer container">
        <small>If you are in immediate danger call emergency services or use the call button.</small>
      </footer>
    </div>
  );
}
