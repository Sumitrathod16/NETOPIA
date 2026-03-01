import React from "react";
import { ArrowLeft } from "lucide-react";
import { emergencyData } from "./EmergencyData";

export const EmergencyPage = ({ slug, onBack }) => {
  const data = emergencyData[slug];

  if (!data) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Emergency Not Found</h2>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1>{data.title}</h1>
      <p><strong>Category:</strong> {data.tier}</p>

      <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
        {data.description}
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#fef3c7",
          borderRadius: "8px",
        }}
      >
        <strong>Emergency Helpline</strong>
        <p>{data.helpline}</p>
      </div>
    </div>
  );
};
