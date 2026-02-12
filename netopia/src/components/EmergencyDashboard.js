import React, { useState, useEffect } from "react";
import {
  Phone,
  AlertTriangle,
  Heart,
  Car,
  Zap,
  MoreVertical
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./EmergencyDashboard.css";

import { MedicalEmer } from "./Emergency/Medicalemer";
import { PoliceEmer } from "./Emergency/Policeemer";
import { FireEmer } from "./Emergency/FireEmer";
import { CarAccident } from "./Emergency/CarAccident";
import { PowerOut } from "./Emergency/Powerout";
import { OtherEmer } from "./Emergency/OtherEmer";

/* ---------------- Auto Follow Component ---------------- */
function LiveLocationUpdater({ position, isTracking }) {
  const map = useMap();

  useEffect(() => {
    if (isTracking) {
      map.flyTo(position, 16, {
        animate: true,
        duration: 1.5
      });
    }
  }, [position, isTracking, map]);

  return null;
}

export function EmergencyDashboard({ onNavigate }) {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  /* ---------------- Emergency Types With Colors ---------------- */
  const emergencyTypes = [
    { id: "medical", label: "Medical Emergency", icon: Heart, color: "emergency-medical" },
    { id: "fire", label: "Fire Emergency", icon: AlertTriangle, color: "emergency-fire" },
    { id: "police", label: "Police Emergency", icon: Phone, color: "emergency-police" },
    { id: "accident", label: "Car Accident", icon: Car, color: "emergency-accident" },
    { id: "power", label: "Power Outage", icon: Zap, color: "emergency-power" },
    { id: "other", label: "Other Emergencies", icon: MoreVertical, color: "emergency-all" }
  ];

  /* ---------------- Location + SOS ---------------- */

  const fallbackLocation = [19.0760, 72.8777];
  const [userLocation, setUserLocation] = useState(fallbackLocation);
  const [accuracy, setAccuracy] = useState(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [routePath, setRoutePath] = useState([]);

  useEffect(() => {
    if (!isSOSActive) return;

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString()
        };

        setUserLocation([newLocation.lat, newLocation.lng]);
        setAccuracy(position.coords.accuracy);

        setRoutePath((prev) => [...prev, [newLocation.lat, newLocation.lng]]);

        const existing =
          JSON.parse(localStorage.getItem("offlineLocations")) || [];
        existing.push(newLocation);
        localStorage.setItem("offlineLocations", JSON.stringify(existing));
      },
      () => alert("Permission Denied"),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isSOSActive]);

  const toggleSOS = () => {
    setIsSOSActive((prev) => !prev);
  };

  const shareLocationLink = () => {
    const [lat, lng] = userLocation;
    const url = `https://www.google.com/maps?q=${lat},${lng}`;

    if (navigator.share) {
      navigator.share({
        title: "Emergency! My Live Location",
        text: "Track my live location:",
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Location link copied!");
    }
  };

  const downloadOfflineRoute = () => {
    const data = localStorage.getItem("offlineLocations");
    if (!data) {
      alert("No offline route found");
      return;
    }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "my-offline-route.json";
    a.click();
  };

  /* ---------------- Navigation ---------------- */

  if (selectedEmergency === "medical")
    return <MedicalEmer onBack={() => setSelectedEmergency(null)} />;
  if (selectedEmergency === "police")
    return <PoliceEmer onBack={() => setSelectedEmergency(null)} />;
  if (selectedEmergency === "fire")
    return <FireEmer onBack={() => setSelectedEmergency(null)} />;
  if (selectedEmergency === "accident")
    return <CarAccident onBack={() => setSelectedEmergency(null)} />;
  if (selectedEmergency === "power")
    return <PowerOut onBack={() => setSelectedEmergency(null)} />;
  if (selectedEmergency === "other")
    return <OtherEmer onBack={() => setSelectedEmergency(null)} />;

  /* ---------------- UI ---------------- */

  return (
    <div className="emergency-dashboard">

      <div className="dashboard-header">
        <h1>Emergency Services</h1>
        <div className="status-badge">Online</div>
      </div>

      {/* MAP */}
      <div className="map-wrapper">
        <MapContainer
          center={userLocation}
          zoom={15}
          style={{ height: "380px", width: "100%", borderRadius: "16px" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LiveLocationUpdater
            position={userLocation}
            isTracking={isSOSActive}
          />

          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>

          {accuracy && (
            <Circle
              center={userLocation}
              radius={accuracy}
              pathOptions={{ color: "blue", fillOpacity: 0.1 }}
            />
          )}

          {routePath.length > 1 && (
            <Polyline positions={routePath} color="red" />
          )}
        </MapContainer>
      </div>

      {/* SOS */}
      <div className="emergency-call-card">
        <button
          className={`emergency-call-button ${
            isSOSActive ? "active-sos" : ""
          }`}
          onClick={toggleSOS}
        >
          <Phone />
          {isSOSActive ? "Stop SOS" : "Activate SOS"}
        </button>

        {isSOSActive && (
          <>
            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              }}
              onClick={shareLocationLink}
            >
              Share My Live Location
            </button>

            <button
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              }}
              onClick={downloadOfflineRoute}
            >
              Download My Route
            </button>
          </>
        )}
      </div>

      {/* Emergency Types with Colors */}
      <div className="emergency-types-grid">
        {emergencyTypes.map((emergency) => {
          const Icon = emergency.icon;
          return (
            <div
              key={emergency.id}
              className="emergency-type-card"
              onClick={() => setSelectedEmergency(emergency.id)}
            >
              <div className={`emergency-icon ${emergency.color}`}>
                <Icon size={22} />
              </div>
              <span className="emergency-label">
                {emergency.label}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
