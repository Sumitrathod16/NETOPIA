import { useState } from "react";
import { EmergencyDashboard } from "./components/EmergencyDashboard";
import { CustomMessages } from "./components/CustomMessages";
import { Navigation } from "./components/Navigation";
import { OfflineMaps } from "./components/OfflineMaps";
import { Settings } from "./components/Settings";
import { MedicalEmer } from "./components/Emergency/Medicalemer";
import {FireEmer} from "./components/Emergency/FireEmer";
import {PoliceEmer} from "./components/Emergency/Policeemer";
import "./App.css";

export default function App() {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const navigate = (section) => {
    setCurrentSection(section);
  };

  const goBack = () => {
    setCurrentSection("dashboard");
  };

  const renderSection = () => {
    switch (currentSection) {
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
    </div>
  );
}