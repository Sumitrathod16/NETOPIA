import React, { useState } from "react";

const MedicalEmergencyChatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 I am your Medical Emergency Assistant.\nPlease describe your symptoms.",
      sender: "bot",
      severity: "normal",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [severityLevel, setSeverityLevel] = useState("normal");

  /* ---------------- Symptom Intelligence ---------------- */

  const analyzeSymptoms = (text) => {
    const lower = text.toLowerCase();

    let score = 0;

    // Critical symptoms
    if (
      lower.includes("chest pain") ||
      lower.includes("unconscious") ||
      lower.includes("stroke") ||
      lower.includes("seizure") ||
      lower.includes("not breathing")
    ) {
      score += 5;
    }

    // Urgent symptoms
    if (
      lower.includes("high fever") ||
      lower.includes("vomiting blood") ||
      lower.includes("severe pain") ||
      lower.includes("breathing difficulty")
    ) {
      score += 3;
    }

    // Mild symptoms
    if (
      lower.includes("cold") ||
      lower.includes("headache") ||
      lower.includes("cough") ||
      lower.includes("mild fever")
    ) {
      score += 1;
    }

    if (score >= 5) {
      return {
        text:
          "🚨 CRITICAL CONDITION DETECTED.\nCall emergency services immediately.\nDo not delay.",
        severity: "critical",
      };
    }

    if (score >= 3) {
      return {
        text:
          "⚠️ This appears URGENT.\nPlease visit the nearest hospital as soon as possible.",
        severity: "urgent",
      };
    }

    if (score >= 1) {
      return {
        text:
          "✅ Symptoms seem mild.\nRest well, stay hydrated, and monitor your condition.",
        severity: "mild",
      };
    }

    return {
      text:
        "I recommend monitoring your symptoms. If they worsen, seek medical help.",
      severity: "normal",
    };
  };

  /* ---------------- Send Message ---------------- */

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const result = analyzeSymptoms(input);

      setSeverityLevel(result.severity);

      const botMessage = {
        text: result.text,
        sender: "bot",
        severity: result.severity,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  /* ---------------- Emergency Actions ---------------- */

  const callEmergency = () => {
    window.location.href = "tel:108"; // India emergency number
  };

  const shareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;

      navigator.clipboard.writeText(url);
      alert("Live location copied to clipboard.");
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.severity === "critical"
                  ? "#d32f2f"
                  : msg.severity === "urgent"
                  ? "#f57c00"
                  : msg.severity === "mild"
                  ? "#388e3c"
                  : msg.sender === "user"
                  ? "#1976d2"
                  : "#eeeeee",
              color:
                msg.sender === "user" ||
                msg.severity === "critical" ||
                msg.severity === "urgent" ||
                msg.severity === "mild"
                  ? "white"
                  : "black",
            }}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div style={styles.typing}>Medical Assistant is typing...</div>
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>

      {/* Emergency Buttons */}
      {severityLevel === "critical" && (
        <div style={styles.actionArea}>
          <button style={styles.callBtn} onClick={callEmergency}>
            Call 108 Now
          </button>
          <button style={styles.locationBtn} onClick={shareLocation}>
            Share My Location
          </button>
        </div>
      )}

      <div style={styles.disclaimer}>
        ⚠️ This chatbot provides basic triage guidance only.
      </div>
    </div>
  );
};

/* ---------------- Styles ---------------- */

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    height: "480px",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e5e7eb",
    borderRadius: "1rem",
    background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  chatBox: {
    flex: 1,
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    overflowY: "auto",
    backgroundColor: "white",
  },
  message: {
    padding: "0.875rem 1.125rem",
    borderRadius: "1.125rem",
    maxWidth: "85%",
    fontSize: "0.95rem",
    whiteSpace: "pre-line",
    fontWeight: "500",
    lineHeight: "1.5",
    wordWrap: "break-word",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
  },
  typing: {
    fontSize: "0.85rem",
    color: "#6b7280",
    fontStyle: "italic",
    padding: "0.5rem",
    fontWeight: "500",
  },
  inputArea: {
    display: "flex",
    padding: "1rem",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    gap: "0.75rem",
  },
  input: {
    flex: 1,
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    backgroundColor: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  sendBtn: {
    marginLeft: "0.5rem",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.25)",
    flex: "0 0 auto",
  },
  actionArea: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem",
    justifyContent: "center",
    backgroundColor: "#fef2f2",
    borderTop: "1px solid #fcb4b4",
    flexWrap: "wrap",
  },
  callBtn: {
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(185, 28, 28, 0.3)",
    minWidth: "120px",
  },
  locationBtn: {
    padding: "0.875rem 1.5rem",
    borderRadius: "0.75rem",
    border: "none",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    minWidth: "140px",
  },
  disclaimer: {
    fontSize: "0.8rem",
    textAlign: "center",
    padding: "0.75rem 1rem",
    background: "linear-gradient(135deg, #fffbeb 0%, #fef08a 100%)",
    borderTop: "1px solid #fde68a",
    color: "#78350f",
    fontWeight: "500",
  },
};

export default MedicalEmergencyChatbot;
