import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { EmergencyPage } from "./EmergencyPage";
import "./OtherEmer.css";

export const OtherEmer = ({ onBack }) => {
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  // 👉 If something is selected, show its page
  if (selectedEmergency) {
    return (
      <EmergencyPage
        slug={selectedEmergency}
        onBack={() => setSelectedEmergency(null)}
      />
    );
  }

  return (
    <div className="other-emergency-wrapper">
<div className="page-title">
      <h2>
        <button className="back-button" onClick={onBack} aria-label="Back to dashboard">
          <ArrowLeft size={16} />
        </button>
      Other Emergencies</h2>
</div>
      <div className="tiers">
        <section className="tier">
          <h3>Tier 1</h3>
          <ul>
            <li>
              <button onClick={() => setSelectedEmergency("flood-emergency")}>
                Flood Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("earthquake-emergency")}>
                Earthquake Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("women-safety")}>
                Women Safety Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("mental-health")}>
                Mental Health Emergency
              </button>
            </li>
          </ul>
        </section>

        <section className="tier">
          <h3>Tier 2</h3>
          <ul>
            <li>
              <button onClick={() => setSelectedEmergency("gas-leak")}>
                Gas Leak Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("water-related")}>
                Water Related Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("animal-emergency")}>
                Animal Emergency
              </button>
            </li>
          </ul>
        </section>

        <section className="tier">
          <h3>Tier 3</h3>
          <ul>
            <li>
              <button onClick={() => setSelectedEmergency("online-fraud")}>
                Online Fraud
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("identity-theft")}>
                Identity Theft
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("hacking-incidents")}>
                Hacking Incidents
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("public-health")}>
                Public Health Emergency
              </button>
            </li>
          </ul>
        </section>

        <section className="tier">
          <h3>Tier 4</h3>
          <ul>
            <li>
              <button onClick={() => setSelectedEmergency("water-supply")}>
                Water Supply Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("telecom-emergency")}>
                Telecommunication Emergency
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedEmergency("transport-emergency")}>
                Transport Emergency
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};
