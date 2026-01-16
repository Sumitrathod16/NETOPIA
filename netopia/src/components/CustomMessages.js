import { useState } from "react";
import { 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  MapPin, 
  Clock,
  Phone,
  Heart,
  AlertTriangle
} from "lucide-react";


export function CustomMessages({ onBack }) {
  const [customMessage, setCustomMessage] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);

  const preWrittenMessages = [
    {
      id: 1,
      type: "medical",
      icon: Heart,
      title: "Medical Emergency",
      message: "I'm having a medical emergency. Please send help immediately to my current location.",
      color: "medical"
    },
    {
      id: 2,
      type: "accident",
      icon: AlertTriangle,
      title: "Car Accident",
      message: "I've been in a car accident. I need emergency assistance at my current location.",
      color: "accident"
    },
    {
      id: 3,
      type: "stranded",
      icon: MapPin,
      title: "Stranded/Lost",
      message: "I'm stranded and need help. Sharing my location - please send assistance.",
      color: "stranded"
    },
    {
      id: 4,
      type: "safe",
      icon: MessageSquare,
      title: "I'm Safe",
      message: "This is an update to let you know I'm safe and secure at my current location.",
      color: "safe"
    }
  ];

  const emergencyContacts = [
    { id: 1, name: "Emergency Contact 1", phone: "+1 (555) 123-4567" },
    { id: 2, name: "Emergency Contact 2", phone: "+1 (555) 987-6543" },
    { id: 3, name: "Family Group", phone: "3 contacts" }
  ];

  const toggleContact = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const sendMessage = (message) => {
    if (selectedContacts.length === 0) {
      alert("Please select at least one contact to send the message to.");
      return;
    }
    
    alert(`Message sent to ${selectedContacts.length} contact(s):\n\n"${message}"\n\nLocation: Current GPS coordinates included`);
  };

  return (
    <>
    <style>
        {`
        .custom-messages {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 0.5rem;
  width: 100%;
}

.messages-container {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 0.25rem;
}

/* Header */
.messages-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.back-button {
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

.back-button:hover {
  background-color: #f3f4f6;
}

.header-info h1 {
  font-size: 1.15rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
  margin: 0;
}

.header-subtitle {
  color: #717182;
  font-size: 0.85rem;
  margin: 0;
}

/* Contacts Card */
.contacts-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.contacts-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #374151;
  margin: 0;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.contact-item:hover {
  background-color: #f9fafb;
}

.contact-item.selected {
  background-color: #eff6ff;
  border-color: #bfdbfe;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 150px;
}

.contact-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.contact-name {
  font-weight: 500;
  color: #374151;
  font-size: 0.95rem;
  margin: 0;
}

.contact-phone {
  font-size: 0.8rem;
  color: #717182;
  margin: 0;
}

.selected-badge {
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

/* Quick Messages */
.quick-messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-messages h3 {
  font-size: 1.05rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.message-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.message-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.message-icon {
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
}

.message-icon.medical {
  background-color: #fef2f2;
  color: #dc2626;
}

.message-icon.accident {
  background-color: #fff7ed;
  color: #ea580c;
}

.message-icon.stranded {
  background-color: #eff6ff;
  color: #2563eb;
}

.message-icon.safe {
  background-color: #f0fdf4;
  color: #16a34a;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
  margin: 0;
}

.message-text {
  font-size: 0.8rem;
  color: #717182;
  margin: 0;
  line-height: 1.4;
}

.send-button {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #2563eb;
}

.send-button.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.send-button.disabled:hover {
  background-color: #9ca3af;
}

/* Custom Message Card */
.custom-message-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.custom-title {
  font-size: 1.05rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;
  margin: 0;
}

.custom-textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #374151;
  background-color: white;
  resize: vertical;
  margin-bottom: 0.75rem;
  min-height: 5.5rem;
  font-family: inherit;
}

.custom-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.custom-textarea::placeholder {
  color: #9ca3af;
}

.message-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #717182;
}

/* Mobile: < 640px */
@media (max-width: 639px) {
  .custom-messages {
    padding: 0.5rem;
  }
  
  .messages-container {
    max-width: 100%;
    gap: 0.75rem;
    padding: 0;
  }
  
  .message-header {
    gap: 0.5rem;
  }
  
  .message-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .custom-textarea {
    min-height: 5rem;
    font-size: 0.9rem;
  }
}

/* Tablet: 640px - 1024px */
@media (min-width: 640px) and (max-width: 1024px) {
  .custom-messages {
    padding: 1rem;
  }

  .messages-container {
    max-width: 90%;
    gap: 1rem;
    padding: 0;
  }

  .header-info h1 {
    font-size: 1.35rem;
  }

  .header-subtitle {
    font-size: 0.95rem;
  }

  .message-title {
    font-size: 1rem;
  }

  .message-text {
    font-size: 0.85rem;
  }

  .custom-textarea {
    min-height: 6rem;
    font-size: 1rem;
  }

  .send-button {
    font-size: 0.95rem;
  }
}

/* Desktop: > 1024px */
@media (min-width: 1025px) {
  .custom-messages {
    padding: 1.5rem;
  }

  .messages-container {
    max-width: 1000px;
    gap: 1.5rem;
    padding: 0;
  }

  .header-info h1 {
    font-size: 1.5rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .quick-messages h3 {
    font-size: 1.25rem;
  }

  .message-icon {
    width: 2.75rem;
    height: 2.75rem;
  }

  .message-title {
    font-size: 1.05rem;
  }

  .message-text {
    font-size: 0.9rem;
  }

  .custom-textarea {
    min-height: 7rem;
    font-size: 1rem;
  }

  .send-button {
    font-size: 1rem;
  }
}
        `}
    </style>
    <div className="custom-messages">
      <div className="messages-container">
        {/* Header */}
        <div className="messages-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <div className="header-info">
            <h1>Emergency Messages</h1>
            <p className="header-subtitle">Send quick emergency updates</p>
          </div>
        </div>

        {/* Emergency Contacts Selection */}
        <div className="contacts-card">
          <h3 className="contacts-title">Send to:</h3>
          <div className="contacts-list">
            {emergencyContacts.map((contact) => (
              <div 
                key={contact.id}
                className={`contact-item ${selectedContacts.includes(contact.id) ? 'selected' : ''}`}
                onClick={() => toggleContact(contact.id)}
              >
                <div className="contact-info">
                  <Phone className="contact-icon" />
                  <div className="contact-details">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-phone">{contact.phone}</div>
                  </div>
                </div>
                {selectedContacts.includes(contact.id) && (
                  <div className="selected-badge">Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pre-written Messages */}
        <div className="quick-messages">
          <h3>Quick Messages</h3>
          {preWrittenMessages.map((msg) => {
            const Icon = msg.icon;
            return (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <div className={`message-icon ${msg.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="message-content">
                    <h4 className="message-title">{msg.title}</h4>
                    <p className="message-text">{msg.message}</p>
                  </div>
                </div>
                <button 
                  className="send-button"
                  onClick={() => sendMessage(msg.message)}
                >
                  <Send size={16} />
                  Send Message
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Message */}
        <div className="custom-message-card">
          <h3 className="custom-title">Custom Message</h3>
          <textarea
            className="custom-textarea"
            placeholder="Type your custom emergency message here..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={4}
          />
          <div className="message-meta">
            <div className="meta-item">
              <MapPin size={16} />
              <span>Location will be included</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>Now</span>
            </div>
          </div>
          <button 
            className={`send-button ${!customMessage.trim() ? 'disabled' : ''}`}
            onClick={() => sendMessage(customMessage)}
            disabled={!customMessage.trim()}
          >
            <Send size={16} />
            Send Custom Message
          </button>
        </div>
      </div>
    </div>
    </>
  );
}