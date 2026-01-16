import React from "react";
import {useState} from "react";
import {motion} from "framer-motion";
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
import "./EmergencyDashboard.css";


export function EmergencyDashboard({ onNavigate }) {
  
  const emergencyTypes = [
    {id:"all", label:"All Emergencies", icon:Phone, color:"emergency-all"},
    { id: "medical", label: "Medical Emergency", icon: Heart, color: "emergency-medical" },
    { id: "fire", label: "Fire Emergency", icon: AlertTriangle, color: "emergency-fire" },
    { id: "police", label: "Police Emergency", icon: Phone, color: "emergency-police" },
    { id: "accident", label: "Car Accident", icon: Car, color: "emergency-accident" },
    { id: "power", label: "Power Outage", icon: Zap, color: "emergency-power" }
  ];

   const Nearby_resources = [
      { id: "r1", name: "Restaurant", distance: 0.9, angle: 135, color: '#EF4444', icon: "🍽️", type: "food" },
      { id: "r2", name: "Park", distance: 0.7, angle: 180, color: '#22C55E', icon: "🌳", type: "park" },
      { id: "r3", name: "Restaurant", distance: 0.6, angle: 225, color: '#F97316', icon: "🍽️", type: "food" },
      { id: "r4", name: "Service", distance: 0.5, angle: 45, color: '#6366F1', icon: "🛠️", type: "service" },
      { id: "r5", name: "Service", distance: 0.3, angle: 270, color: '#3B82F6', icon: "🛠️", type: "service" },
      { id: "r6", name: "Park", distance: 0.5, angle: 0, color: '#22C55E', icon: "🌳", type: "park" },
      { id: "r7", name: "Hospital", distance: 1.0, angle: 90, color: '#A78BFA', icon: "🏥", type: "hospital" },
      { id: "r8", name: "Police Station", distance: 0.4, angle: 315, color: '#6B7280', icon: "👮‍♂️", type: "police" },
    ];
 const [hoverId, setHoveredId] = useState(null);
 const getPosition = (distance, angle, centerX, centerY, scale) => {
  const radians = (angle * Math.PI) / 180;
  const x = centerX + distance * scale * Math.cos(radians);
  const y = centerY + distance * scale * Math.sin(radians);
  return { x, y };
 };
 const mapWidth = 520;
 const mapHeight = 380;
 const centerX = mapWidth / 2;
 const centerY = mapHeight / 2;
 const scale = 80;

  return (
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
        {/*Location & Nearby Resources*/}
  <div className="map-wrapper">
    {/*Header*/}
    <div className="map-header">
      <h1>Location & Nearby Resources</h1>
      <button className="settings-btn">
        <Settings size={20} />
      </button>
    </div>
    {/*Map container*/}
    <div className="map-card">
      {/*Top control*/}
      <div className="map-topbar">
        <div className="coords">
          <span>37.7749,-122.4194</span>
        </div>
        <div className="gps-status">
          <span className="gps-dot"></span> GPS Active
        </div>
      </div>
      {/*Map SVG*/}
      <div className="map-area">
        <motion.div 
          className="radar"
          animate={{rotate:360}}
          transition={{repeat: Infinity, duration: 12, ease:"linear"}}/>
          <svg width={mapWidth} height={mapHeight} className="map-svg">
          {/*Map Grids*/}
          <line x1={centerX} y1="0" x2={centerX} y2={mapHeight} stroke="#E0E7FF" strokeWidth="1" strokeDasharray="5,5"/>
          <line x1="0" y1={centerY} x2={mapWidth} y2={centerY} stroke="#E0E7FF" strokeWidth="1" strokeDasharray="5,5"/>
          
          {/*Distance Circles*/}
          {[0.5,1].map((r)=>(
            <circle
             key={r}
             cx={centerX}
             cy={centerY}
             r={scale*r}
             fill="none"
             stroke="#E0E7FF"
             strokeWidth="1"
             strokeDasharray="3,3"/>
          ))}
          {/*Markers*/}
          {Nearby_resources.map((res)=>{
            const pos= getPosition(res.distance,res.angle, centerX,centerY,scale);
            const isHovered= hoverId===res.id;
            return(
              <g key={res.id}>
                <line x1={centerX} y1={centerY} x2={pos.x} y2={pos.y} stroke="#E0E7FF" strokeWidth="1" opacity="0.5"/>
                <motion.circle
                 cx={pos.x}
                 cy={pos.y}
                 r={isHovered ? 26 : 22}
                 fill={res.color}
                 opacity={isHovered ? 1 : 0.9}
                 className="marker"
                 onMouseEnter={() => setHoveredId(res.id)}
                 onMouseLeave={() => setHoveredId(null)}
                 whileHover={{ scale: 1.1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 10 }} />
                 <text x={pos.x} y={pos.y - 32} textAnchor="middle" className="marker-text">
                  {res.distance} km
                 </text>
              </g>
            )
          })}
          {/*Center Marker*/}
        <circle cx={centerX} cy={centerY} r="20" fill="#3B82F6" opacity="0.2"/>
        <circle cx={centerX} cy={centerY} r="14" fill="#3B82F6" />
        <text x={centerX} y={centerY+ 5} textAnchor="middle" className="center-pin">
          </text>      
          </svg>         
          </div>
      {/*Scale*/}
      <div className="map-scale">
        <div className="scale-box">
          <div className="scale-line"></div>500m
        </div>
      </div>
      {/*Legend*/}
      <div className="legend">
        <div className="legend-card">
          <h3>Resources Types</h3>
          <div className="legend-items">
            <LegendItem color="#EF4444" label="Food & Dining" />
            <LegendItem color="#22C55E" label="Parks & Recreation" />
            <LegendItem color="#3B82F6" label="Services & Utilities" />

            </div>
        </div>
        <div className="legend-card">
          <h3>Current Location</h3>
          <p><strong>Latitude:</strong>37.7749</p>
          <p><strong>Longitude:</strong>-122.4194</p>
          <p><strong>Status:</strong> <span className="status-active">Active</span></p>
        </div>
      </div>
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
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <div className="legend-dot" style={{ backgroundColor: color }}></div>
      <span>{label}</span>
    </div>
  );
}