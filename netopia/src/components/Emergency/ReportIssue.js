import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

export function ReportIssue({ onBack }) {
  const [type, setType] = useState("other");
  const [name, setName] = useState( (JSON.parse(localStorage.getItem('user'))||{}).name || "" );
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [latlng, setLatlng] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [saving, setSaving] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => setLatlng([pos.coords.latitude, pos.coords.longitude]),
      () => alert("Could not get location")
    );
  };

  const onChoosePhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(f);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSaving(true);

    const reports = JSON.parse(localStorage.getItem("emergencyReports") || "[]");
    const newReport = {
      id: Date.now(),
      type,
      name,
      contact,
      description,
      latlng,
      photo,
      createdAt: new Date().toISOString()
    };

    reports.push(newReport);
    localStorage.setItem("emergencyReports", JSON.stringify(reports));

    setTimeout(() => {
      setSaving(false);
      alert("Report submitted successfully");
      if (onBack) onBack();
    }, 400);
  };

  return (
    <div className="report-issue-page full-width-page">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="back-btn" onClick={onBack} style={{ border: "none", background: "none", cursor: "pointer" }}>
          <ArrowLeft />
        </button>
        <h2>Report an Issue</h2>
      </div>

      <form onSubmit={handleSubmit} className="police-emergency-container" style={{ marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Emergency Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: 8, marginTop:6 }}>
            <option value="medical">Medical Emergency</option>
            <option value="fire">Fire</option>
            <option value="police">Police</option>
            <option value="accident">Car Accident</option>
            <option value="power">Power Outage</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label>Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8, marginTop:6 }} />
          </div>
          <div>
            <label>Contact (optional)</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} style={{ width: "100%", padding: 8, marginTop:6 }} />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} style={{ width: "100%", padding: 8, marginTop:6 }} />
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
          <div>
            <label>Attach Photo (optional)</label>
            <input type="file" accept="image/*" onChange={onChoosePhoto} style={{ display: "block", marginTop: 6 }} />
          </div>

          <div>
            <label>Location</label>
            <div style={{ marginTop: 6 }}>
              {latlng ? (
                <div style={{ color: "#333" }}>Lat: {latlng[0].toFixed(5)}, Lng: {latlng[1].toFixed(5)}</div>
              ) : (
                <div style={{ color: "#777" }}>No location</div>
              )}
            </div>
            <button type="button" onClick={getLocation} style={{ marginTop: 6, padding: "8px 10px", borderRadius:6 }}>Get Current Location</button>
          </div>
        </div>

        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <button type="button" onClick={onBack} style={{ padding: "10px 14px", borderRadius: 8 }}>Cancel</button>
          <button type="submit" disabled={saving} style={{ padding: "10px 14px", borderRadius: 8, background: "#007bff", color: "#fff", border: "none" }}>{saving ? "Saving..." : "Submit Report"}</button>
        </div>
      </form>
    </div>
  );
}

export default ReportIssue;
