import { useState } from "react";
import { EmergencyDashboard } from "./components/EmergencyDashboard";
import Signin from "./components/Authentication/Signin";
import Login from "./components/Authentication/Login";
import Landing from "./components/Landing";
import { CustomMessages } from "./components/CustomMessages";
import { Navigation } from "./components/Navigation";
import { OfflineMaps } from "./components/OfflineMaps";
import { Settings } from "./components/Settings";
import { MedicalEmer } from "./components/Emergency/Medicalemer";
import {FireEmer} from "./components/Emergency/FireEmer";
import {PoliceEmer} from "./components/Emergency/Policeemer";
import "./App.css";
import CallButton from "./components/CallButton";

export default function App() {
  const [currentSection, setCurrentSection] = useState("landing");
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentSection("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCurrentSection("landing");
  };

  const navigate = (section) => {
    setCurrentSection(section);
  };

  const goBack = () => {
    setCurrentSection("dashboard");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "landing":
        return <Landing onNavigate={navigate} user={user} onLogout={handleLogout} />;
      case "signin":
        return <Signin onBack={goBack} onNavigate={navigate} onLogin={handleLogin} />;
      case "login":
        return <Login onBack={goBack} onNavigate={navigate} onLogin={handleLogin} />;
      case "messages":
        return <CustomMessages onBack={goBack} />;
      case "navigation":
        return <Navigation onBack={goBack} />;
      case "maps":
        return <OfflineMaps onBack={goBack} />;
      case "settings":
        return <Settings onBack={goBack} />;
      case "medical":
        return <MedicalEmer onBack={goBack} />;
      case "fire":
        return <FireEmer onBack={goBack}/>;
      case "police":
        return <PoliceEmer onBack={goBack}/>;
      default:
        return <EmergencyDashboard onNavigate={navigate} />;
    }
  };

  return (
    <div className="app-container">
      {renderSection()}
      <CallButton number="102" />
    </div>
  );
}