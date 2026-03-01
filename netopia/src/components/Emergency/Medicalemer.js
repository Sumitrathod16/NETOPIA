import React from "react";
import { ArrowLeft } from "lucide-react";
import MedicalEmergencyChatbot from "../Chatbot";
export const MedicalEmer = ({ onBack }) => {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        /* ===== FORCE FULL PAGE WIDTH (BREAKS OUT OF PARENT CONTAINERS) ===== */
        .full-width-page {
          width: 100vw;
          min-height: 100vh;
          margin-left: calc(-50vw + 50%);
          padding: 2rem 0;
        }

        /* ===== MAIN CONTENT CONTAINERS ===== */
        .medical-emergency-container,
        .triage-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* ===== EMERGENCY HEADER ===== */
        .emergency-medical {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .emergency-medical h2 {
          color: #721c24;
          margin-bottom: 1rem;
        }

        .emergency-medical p {
          color: #721c24;
          font-size: 1rem;
        }

        /* ===== MEDICAL INFO GRID ===== */
        .medical-sections-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .symptoms,
        .first-aid-tips,
        .nearby-hospitals,
        .important-numbers,
        .allergy-info {
          background: #ffffff;
          border-radius: 10px;
          padding: 1.5rem;
          border-left: 5px solid #721c24;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        }

        h3 {
          color: #721c24;
          margin-bottom: 0.75rem;
        }

        ul {
          padding-left: 1.5rem;
        }

        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        /* ===== TRIAGE GRID ===== */
        .triage-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .triage {
          background: #ffffff;
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid #ddd;
          box-shadow: 0 8px 22px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .triage:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .triage-list {
          padding-left: 1.5rem;
        }

        .triage-list li {
          margin-bottom: 0.6rem;
        }

        /* ===== TITLE COLORS ===== */
        .emergency-title { color: #d9534f; }
        .urgent-title { color: #f0ad4e; }
        .semi-urgent-title { color: #5bc0de; }
        .non-urgent-title { color: #5cb85c; }
        .red-flags { color: #e00d0d; }

        /* ===== RESPONSIVE BREAKPOINTS ===== */
        @media (min-width: 768px) {
          .medical-sections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .medical-sections-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .triage-container {
            grid-template-columns: repeat(3, 1fr);
          }

          .triage:last-child {
            grid-column: 1 / -1;
          }
        }

        body {
          overflow-x: hidden;
        }

        /* ===== HEADER WITH BACK BUTTON ===== */
        .medical-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .medical-back-button {
          background: transparent;
          border: none;
          padding: 0.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          transition: background-color 0.2s;
          flex-shrink: 0;
        }

        .medical-back-button:hover {
          background-color: #f3f4f6;
        }

        .medical-header-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .medical-header-info h1 {
          font-size: 1.15rem;
          font-weight: 500;
          color: #374151;
          margin: 0;
        }

        .medical-header-subtitle {
          color: #717182;
          font-size: 0.85rem;
          margin: 0.25rem 0 0 0;
        }
      `}</style>

    

      <div className="full-width-page">
        {/* ===== MEDICAL EMERGENCY SECTION ===== */}
        <div className="medical-emergency-container">
         <div className="emergency-medical">
              <button className="back-button" onClick={onBack} aria-label="Back to dashboard">
                <ArrowLeft size={16}/>
              </button>
            <h2>Medical Emergency Services</h2>
            <p>
              If you are experiencing a medical emergency, please call your local
              emergency number immediately.
            </p>
          </div>

          <div className="medical-sections-grid">
            <div className="symptoms">
              <h3>Symptoms of Medical Emergencies</h3>
              <ul>
                <li>Chest pain or pressure</li>
                <li>Difficulty breathing</li>
                <li>Sudden dizziness or fainting</li>
                <li>Severe bleeding or trauma</li>
                <li>Severe allergic reaction</li>
              </ul>
            </div>

            <div className="first-aid-tips">
              <h3>First Aid Tips</h3>
              <ul>
                <li>Call emergency services immediately</li>
                <li>Stay calm and give clear information</li>
                <li>Provide first aid if trained</li>
                <li>Do not move the person unnecessarily</li>
              </ul>
            </div>

            <div className="nearby-hospitals">
              <h3>Nearby Hospitals</h3>
              <ul>
                <li>City Hospital – (555) 123-4567</li>
                <li>General Medical Center – (555) 987-6543</li>
                <li>Downtown Clinic – (555) 555-1212</li>
              </ul>
            </div>

            <div className="important-numbers">
              <h3>Important Numbers</h3>
              <ul>
                <li>Emergency: 911</li>
                <li>Poison Control: 1-800-222-1222</li>
                <li>Local Hospital: (555) 123-4567</li>
              </ul>
            </div>

            <div className="allergy-info">
              <h3>Allergy Information</h3>
              <p>
                Always carry allergy identification and emergency medication if
                you have known allergies.
              </p>
            </div>
          </div>
        </div>

        {/* ===== TRIAGE SECTION ===== */}
        <div className="triage-container">
          <div className="triage">
            <h2 className="emergency-title">Emergency</h2>
            <ol className="triage-list">
              <li>Chest pain radiating to arm or jaw</li>
              <li>Severe breathing difficulty</li>
              <li>Loss of consciousness</li>
              <li>Uncontrolled bleeding</li>
              <li>Stroke symptoms</li>
              <li>Seizures</li>
              <li>Severe allergic reaction</li>
              <li>High fever (40°C / 104°F)</li>
            </ol>
            <h2 className="action">Action: Immediate emergency medical attention</h2>
          </div>

          <div className="triage">
            <h2 className="urgent-title">Urgent</h2>
            <ol className="triage-list">
              <li>Persistent high fever</li>
              <li>Severe abdominal pain</li>
              <li>Vomiting blood</li>
              <li>Moderate shortness of breath</li>
              <li>Dehydration</li>
              <li>Sudden vision changes</li>
            </ol>
            <h2 className="action">Action: Seek urgent medical attention</h2>
          </div>

          <div className="triage">
            <h2 className="semi-urgent-title">Semi-Urgent</h2>
            <ol className="triage-list">
              <li>Fever lasting more than 3 days</li>
              <li>Persistent cough</li>
              <li>Mild asthma flare</li>
              <li>Urinary symptoms</li>
              <li>Minor injuries</li>
            </ol>
          </div>

          <div className="triage">
            <h2 className="non-urgent-title">Non-Urgent</h2>
            <ol className="triage-list">
              <li>Common cold</li>
              <li>Mild headache</li>
              <li>Minor cuts</li>
              <li>Fatigue or stress</li>
            </ol>
          </div>

          <div className="triage">
            <h2 className="red-flags">Red Flags</h2>
            <ol className="triage-list">
              <li>Sudden worsening of symptoms</li>
              <li>New neurological signs</li>
              <li>Persistent pain</li>
              <li>High-risk patients</li>
            </ol>
            </div>
        </div>
       <div
  className="Medicalchatbot"
  style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1rem"
  }}
>
  <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
    Medical Emergency Chatbot
  </h2>

  <MedicalEmergencyChatbot />
</div>

      </div>
    </>
  );
};
