import React from "react";
import { motion } from "framer-motion";
import { Phone, Heart, AlertTriangle, Car, Zap, MoreHorizontal, LogOut } from "lucide-react";
import "./Landing.css";

const ICON_MAP = {
  medical: Heart,
  police: Phone,
  fire: AlertTriangle,
  accident: Car,
  power: Zap,
  other: MoreHorizontal
};

export default function Landing({ onNavigate, user, onLogout }) {
  const quick = [
    { id: "medical", label: "Medical", desc: "Chest pain, breathing issues", color: "#ef4444" },
    { id: "police", label: "Police", desc: "Crime, theft, assault", color: "#3b82f6" },
    { id: "fire", label: "Fire", desc: "Fire or smoke", color: "#f97316" },
    { id: "accident", label: "Accident", desc: "Road or vehicle accident", color: "#eab308" },
    { id: "power", label: "Power Out", desc: "Power outage / hazards", color: "#8b5cf6" },
    { id: "other", label: "Other", desc: "Flood, earthquake, etc.", color: "#64748b" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="landing-page">
      {/* Dynamic Background Elements */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>

      <header className="landing-header container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="brand"
        >
          <div className="logo">N</div>
          <h1>Netopia</h1>
        </motion.div>

        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nav-actions"
        >
          {user ? (
            <div className="user-profile-nav">
              <span className="welcome-text">Hi, {user.name.split(' ')[0]}</span>
              <button className="primary-ghost" onClick={() => onNavigate("dashboard")}>Dashboard</button>
              <button className="icon-btn" onClick={onLogout} title="Logout"><LogOut size={18} /></button>
            </div>
          ) : (
            <>
              <button className="link-btn" onClick={() => onNavigate("login")}>Sign in</button>
              <button className="primary-btn-small" onClick={() => onNavigate("signin")}>Create account</button>
            </>
          )}
        </motion.nav>
      </header>

      <main className="container">
        <section className="hero">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hero-left"
          >
            <div className="badge">🚨 24/7 Emergency Response</div>
            <h2 className="hero-title">
              Get help quickly — <br/>
              <span className="text-gradient">Emergency assistance</span> in one tap
            </h2>
            <p className="hero-subtitle">
              Use quick actions, SOS tracking, and one-touch calling when seconds matter. Real-time support, anywhere.
            </p>

            <div className="hero-ctas">
              <button className="primary-btn-lg" onClick={() => onNavigate("medical")}>
                Emergency SOS
              </button>
              <button className="secondary-btn-lg" onClick={() => onNavigate("maps")}>
                Offline Maps
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat"><strong>&lt; 3s</strong> Response Time</div>
              <div className="stat"><strong>100%</strong> Offline Ready</div>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="hero-cards"
          >
            {quick.map(item => {
              const Icon = ICON_MAP[item.id];
              return (
                <motion.button 
                  key={item.id} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="hero-card glass-card" 
                  onClick={() => onNavigate(item.id)}
                  style={{ '--card-color': item.color }}
                >
                  <div className="icon-wrap" style={{ color: item.color, background: `${item.color}15` }}>
                    <Icon size={22} />
                  </div>
                  <div className="card-body">
                    <div className="card-title">{item.label}</div>
                    <div className="card-desc">{item.desc}</div>
                  </div>
                  <div className="card-arrow">→</div>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="features mt-xl"
        >
          <div className="feature-grid">
            <div className="feature glass-card">
              <div className="feature-icon bg-red-100 text-red-600"><Heart size={24} /></div>
              <h4>Fast SOS</h4>
              <p>Instant dialing and alerts</p>
            </div>
            <div className="feature glass-card">
              <div className="feature-icon bg-blue-100 text-blue-600"><MoreHorizontal size={24} /></div>
              <h4>Live Sharing</h4>
              <p>Real-time location sharing</p>
            </div>
            <div className="feature glass-card">
              <div className="feature-icon bg-green-100 text-green-600"><Car size={24} /></div>
              <h4>Offline Focus</h4>
              <p>Maps without internet</p>
            </div>
            <div className="feature glass-card">
              <div className="feature-icon bg-purple-100 text-purple-600"><Phone size={24} /></div>
              <h4>Triage Help</h4>
              <p>Step-by-step guidance</p>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="landing-footer container">
        <p>If you are in immediate danger, call emergency services or use the call button immediately.</p>
        <div className="footer-links">
          <span>Privacy Policy</span> • <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
