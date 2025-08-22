import React from "react";
import { 
  Phone, 
  MessageSquare, 
  Map, 
  Download, 
  Settings, 
  AlertTriangle,
  Heart,
  Car,
  Zap
} from "lucide-react";


export function EmergencyDashboard({ onNavigate }) {
  const emergencyTypes = [
    { id: "medical", label: "Medical Emergency", icon: Heart, color: "emergency-medical" },
    { id: "fire", label: "Fire Emergency", icon: AlertTriangle, color: "emergency-fire" },
    { id: "police", label: "Police Emergency", icon: Phone, color: "emergency-police" },
    { id: "accident", label: "Car Accident", icon: Car, color: "emergency-accident" },
    { id: "power", label: "Power Outage", icon: Zap, color: "emergency-power" }
  ];

  return (
    <>
    <style>
        {`
        .emergency-dashboard {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
}

.dashboard-container {
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-info {
  flex: 1;
}

.header-title {
  color: #dc2626;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.header-subtitle {
  color: #717182;
  font-size: 1rem;
}

.status-badge {
  background-color: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #bbf7d0;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Emergency Call Button */
.emergency-call-card {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.emergency-call-button {
  width: 100%;
  height: 4rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.emergency-call-button:hover {
  background-color: #b91c1c;
}

.button-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Emergency Types Grid */
.emergency-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.emergency-type-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.emergency-type-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.emergency-type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.emergency-icon {
  padding: 0.75rem;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emergency-medical {
  background-color: #ef4444;
}

.emergency-fire {
  background-color: #f97316;
}

.emergency-police {
  background-color: #3b82f6;
}

.emergency-accident {
  background-color: #eab308;
}

.emergency-power {
  background-color: #a855f7;
}

.emergency-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* Main Services */
.main-services {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.service-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.service-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.service-icon {
  width: 2rem;
  height: 2rem;
}

.service-icon.blue {
  color: #2563eb;
}

.service-icon.green {
  color: #16a34a;
}

.service-icon.purple {
  color: #9333ea;
}

.service-info {
  flex: 1;
}

.service-info h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #374151;
}

.service-description {
  color: #717182;
  font-size: 1rem;
  margin: 0;
}

.download-badge {
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Settings */
.settings-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.settings-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.settings-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.settings-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
}

/* Responsive Design */
@media (max-width: 640px) {
  .emergency-dashboard {
    padding: 0.75rem;
  }
  
  .dashboard-container {
    gap: 1rem;
  }
  
  .emergency-types-grid {
    gap: 0.5rem;
  }
  
  .emergency-type-card {
    padding: 0.75rem;
  }
}
        `}
    </style>
    <div className="emergency-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-info">
            <h1 className="header-title">Emergency Services</h1>
            <p className="header-subtitle">Quick access to emergency help</p>
          </div>
          <div className="status-badge">
            Online
          </div>
        </div>

        {/* Emergency Call Button */}
        <div className="emergency-call-card">
          <button className="emergency-call-button">
            <Phone className="button-icon" />
            Call 911 Emergency
          </button>
        </div>

        {/* Quick Emergency Types */}
        <div className="emergency-types-grid">
          {emergencyTypes.map((emergency) => {
            const Icon = emergency.icon;
            return (
            
              <div 
                key={emergency.id}
                className="emergency-type-card"
                onClick={() => onNavigate('messages')}
              >
                <div className="emergency-type-content">
                  <div className={`emergency-icon ${emergency.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="emergency-label">{emergency.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Services */}
        <div className="main-services">
          <div 
            className="service-card"
            onClick={() => onNavigate('messages')}
          >
            <div className="service-content">
              <MessageSquare className="service-icon blue" />
              <div className="service-info">
                <h3>Custom Messages</h3>
                <p className="service-description">Send pre-written emergency messages</p>
              </div>
            </div>
          </div>

          <div 
            className="service-card"
            onClick={() => onNavigate('navigation')}
          >
            <div className="service-content">
              <Map className="service-icon green" />
              <div className="service-info">
                <h3>Navigation</h3>
                <p className="service-description">GPS navigation to hospitals & services</p>
              </div>
            </div>
          </div>

          <div 
            className="service-card"
            onClick={() => onNavigate('maps')}
          >
            <div className="service-content">
              <Download className="service-icon purple" />
              <div className="service-info">
                <h3>Offline Maps</h3>
                <p className="service-description">Download maps for offline use</p>
              </div>
              <div className="download-badge">3 Downloaded</div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div 
          className="settings-card"
          onClick={() => onNavigate('settings')}
        >
          <div className="settings-content">
            <Settings className="settings-icon" />
            <span>Settings & Emergency Contacts</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}