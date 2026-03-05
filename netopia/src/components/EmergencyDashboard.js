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
import L from "leaflet"; // for creating custom div icons

import "leaflet/dist/leaflet.css";
import "./EmergencyDashboard.css";

import { MedicalEmer } from "./Emergency/Medicalemer";
import { PoliceEmer } from "./Emergency/Policeemer";
import { FireEmer } from "./Emergency/FireEmer";
import { CarAccident } from "./Emergency/CarAccident";
import { PowerOut } from "./Emergency/Powerout";
import { OtherEmer } from "./Emergency/OtherEmer";
import { ReportIssue } from "./Emergency/ReportIssue";

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
  const [user, setUser] = useState({ name: "John Doe", avatar: null });

  /* ---------------- Emergency Types With Colors ---------------- */
  const emergencyTypes = [
    { id: "medical", label: "Medical Emergency", icon: Heart, color: "emergency-medical" },
    { id: "fire", label: "Fire Emergency", icon: AlertTriangle, color: "emergency-fire" },
    { id: "police", label: "Police Emergency", icon: Phone, color: "emergency-police" },
    { id: "accident", label: "Car Accident", icon: Car, color: "emergency-accident" },
    { id: "power", label: "Power Outage", icon: Zap, color: "emergency-power" },
    { id: "other", label: "Other Emergencies", icon: MoreVertical, color: "emergency-all" }
  ];

  /* ---------------- Location + SOS ----------------  */
  const fallbackLocation = [19.0760, 72.8777];
  const [userLocation, setUserLocation] = useState(fallbackLocation);
  const [accuracy, setAccuracy] = useState(null);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [routePath, setRoutePath] = useState([]);

  // request current position once on mount so resources reflect live location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation([lat, lng]);
        setAccuracy(position.coords.accuracy);
      },
      (err) => {
        console.warn("Geolocation getCurrentPosition failed", err);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  // resources to show on map (e.g. hospitals, police stations, fire stations)
  const [resources, setResources] = useState([]);

  // full list (would normally come from backend once)
  const allResources = React.useMemo(() => [
    // avoid exact overlap with fallback/user location
    { id: "h1", type: "hospital", name: "City Hospital", coords: [19.0755, 72.8772], phone: "+91-22-1234-5678" },
    { id: "p1", type: "police",  name: "Central Police Station", coords: [19.0780, 72.8780], phone: "+91-22-8765-4321" },
    { id: "f1", type: "fire",    name: "Downtown Fire Station", coords: [19.0740, 72.8760], phone: "+91-22-5555-0000" },
    { id: "h2", type: "hospital", name: "Northside Clinic", coords: [19.0800, 72.8800], phone: "+91-22-9999-1111" }
  ], []);

  // helper – great circle distance in km
  const distanceKm = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371; // earth radius km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // update nearby resources whenever userLocation changes — query Overpass OSM for live nearby POIs
  useEffect(() => {
    if (!userLocation) return;
    const [lat, lng] = userLocation;
    

    const controller = new AbortController();

    // Overpass QL: search for hospitals/clinics, police, and fire stations within 5km
    const radius = 5000;
    const overpassQuery = `
      [out:json][timeout:15];
      (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        node["amenity"="clinic"](around:${radius},${lat},${lng});
        node["amenity"="police"](around:${radius},${lat},${lng});
        node["emergency"="fire_station"](around:${radius},${lat},${lng});
        node["amenity"="fire_station"](around:${radius},${lat},${lng});
      );
      out center;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
      signal: controller.signal,
      headers: { "Content-Type": "text/plain" }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.elements) throw new Error("No data from Overpass");

        const mapped = data.elements.map((el) => {
          const tags = el.tags || {};
          let type = "hospital";
          if (tags.amenity === "police") type = "police";
          if (tags.emergency === "fire_station" || tags.amenity === "fire_station") type = "fire";
          if (tags.amenity === "clinic") type = "hospital";

          const latPt = el.lat || (el.center && el.center.lat);
          const lonPt = el.lon || (el.center && el.center.lon);

          const phone = tags.phone || tags["contact:phone"] || tags.telephone || null;

          return {
            id: `osm-${el.type}-${el.id}`,
            type,
            name: tags.name || tags.official_name || `${type} (unknown)`,
            phone,
            coords: [latPt, lonPt]
          };
        }).filter(r => r.coords[0] && r.coords[1]);

        // if nothing found, fall back to static list filtered by distance
        if (mapped.length === 0) {
          const nearby = allResources.filter(r => {
            const d = distanceKm(lat, lng, r.coords[0], r.coords[1]);
            return d <= 5;
          });
          setResources(nearby);
        } else {
          setResources(mapped);
        }
      })
      .catch((err) => {
        console.warn("Overpass fetch failed, falling back to static resources", err);
        const [lat2, lng2] = userLocation;
        const nearby = allResources.filter(r => {
          const d = distanceKm(lat2, lng2, r.coords[0], r.coords[1]);
          return d <= 5;
        });
        setResources(nearby);
      })
      .finally(() => {});

    return () => controller.abort();
  }, [userLocation, allResources]);

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

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored && stored.name) setUser(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    // clear user session (demo)
    localStorage.removeItem("user");
    if (onNavigate) onNavigate("landing");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).slice(0,2).join("").toUpperCase();
  };

  const toggleSOS = () => {
    setIsSOSActive((prev) => !prev);
  };

  const emergencyNumber = "102";

  const makeCall = (number) => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${number}`;
    } else {
      try {
        navigator.clipboard && navigator.clipboard.writeText(number);
      } catch (e) {}
      alert(`Emergency number ${number} copied to clipboard`);
    }
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
  if (selectedEmergency === "report")
    return <ReportIssue onBack={() => setSelectedEmergency(null)} />;

  /* ---------------- UI ---------------- */

  return (
    <div className="emergency-dashboard">

      <div className="dashboard-header user-header">
        <div className="header-left">
          <h1>Emergency Services</h1>
          <div className="status-badge">Online</div>
        </div>

        <div className="user-info">
          {user && user.avatar ? (
            <img src={user.avatar} alt="profile" className="profile-pic" />
          ) : (
            <div className="profile-placeholder">{getInitials(user && user.name)}</div>
          )}

          <div className="user-meta">
            <div className="username">{user && user.name}</div>
            <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </div>
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

          {/* resource markers */}
          {resources.map((res) => {
            // debugging
            console.log("rendering resource", res);
            const cls = `resource-marker resource-${res.type}`;
            return (
              <Marker
                key={res.id}
                position={res.coords}
                icon={L.divIcon({
                  className: cls,
                  html: `<div>${res.name.charAt(0)}</div>`,
                  iconSize: [38, 38],
                  iconAnchor: [19, 19]
                })}
              >
                <Popup>
                  <div style={{ minWidth: 160 }}>
                    <strong>{res.name}</strong>
                    <br />
                    {res.type.charAt(0).toUpperCase() + res.type.slice(1)}
                    {res.phone && (
                      <div style={{ marginTop: 6 }}>
                        <button
                          onClick={() => makeCall(res.phone)}
                          style={{ padding: '6px 8px', borderRadius: 6, cursor: 'pointer' }}
                        >
                          Call {res.phone}
                        </button>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* resource list (for debugging/visibility) */}
      {resources.length > 0 && (
        <div className="resources-list">
          <h3>Nearby Resources</h3>
          <ul>
            {resources.map((r) => (
              <li key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: 12, color: '#666' }}>{r.type}</div>
                  {r.phone && <div style={{ fontSize: 13, marginTop: 4 }}>{r.phone}</div>}
                </div>

                {r.phone ? (
                  <button onClick={() => makeCall(r.phone)} className="resource-call-button">
                    Call
                  </button>
                ) : (
                  <button onClick={() => shareLocationLink()} className="resource-call-button">
                    Share Location
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

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

        <button
          className="direct-call-button"
          onClick={() => makeCall(emergencyNumber)}
          aria-label={`Call ${emergencyNumber}`}
        >
          <Phone />
          Call {emergencyNumber}
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
<div className="report-issue-section">
        <h3>Report an Issue</h3>
        <p>Report any issues or problems you encounter in the emergency dashboard.</p>
        <button className="report-issue-button" onClick={() => setSelectedEmergency("report")}>Report Issue</button>
        </div>

        <style jsx>{`
            .full-width-page { max-width:1000px; margin:0 auto; padding:2rem 1rem; }
            .police-emergency-container { background:#fff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.1); padding:2rem; }
            .emergency-police, .emr-types, .immediate-actions, .emr-call, .emr-tools{ margin-bottom:2rem; }
            .emergency-police h2 { font-size:1.5rem; margin-bottom:0.75rem; }
            .emergency-police p { font-size:1rem; color:#555; line-height:1.6; }  
            .emr-types h3, .immediate-actions h3, .emr-call h3, .emr-tools h3 { font-size:1.25rem; margin-bottom:0.75rem; }
            .report-issue-section { margin-top:2rem; padding:1rem; background:#f9f9f9; border-radius:8px; }
            .report-issue-section h3 { margin-bottom:0.5rem; }
            .report-issue-section p { margin-bottom:1rem; color:#555; }
            .report-issue-button { background-color:#dc3545; color:#fff; border:none; padding:0.75rem 1.25rem; border-radius:6px; cursor:pointer; }
            .report-issue-button:hover { background-color:#a71d2a; }
`}</style>
</div>
  );
}
