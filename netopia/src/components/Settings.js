import { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Plus, 
  Edit, 
  Trash2,
  Bell,
  Shield,
  Download,
  MapPin
} from "lucide-react";


export function Settings({ onBack }) {
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: "John Doe", phone: "+1 (555) 123-4567", relationship: "Spouse" },
    { id: 2, name: "Jane Smith", phone: "+1 (555) 987-6543", relationship: "Parent" },
    { id: 3, name: "Emergency Group", phone: "Group of 3", relationship: "Family" }
  ]);

  const [settings, setSettings] = useState({
    locationSharing: true,
    pushNotifications: true,
    emergencyAlerts: true,
    autoDownloadMaps: false,
    offlineMode: false
  });

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });

  const [showAddContact, setShowAddContact] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        {
          id: Date.now(),
          ...newContact
        }
      ]);
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowAddContact(false);
    }
  };

  const deleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
    <style>
    {`
    .settings {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
}

.settings-container {
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.settings-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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
}

.back-button:hover {
  background-color: #f3f4f6;
}

.header-info h1 {
  font-size: 1.5rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.header-subtitle {
  color: #717182;
  font-size: 1rem;
  margin: 0;
}

/* Emergency Contacts Card */
.emergency-contacts-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.contacts-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.contacts-header h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.add-contact-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-contact-button:hover {
  background-color: #2563eb;
}

/* Add Contact Form */
.add-contact-form {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
  background-color: white;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.add-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #2563eb;
}

.cancel-button {
  background-color: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #f9fafb;
}

/* Contacts List */
.contacts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.contact-avatar {
  width: 2rem;
  height: 2rem;
  color: #9ca3af;
}

.contact-details {
  flex: 1;
}

.contact-name {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.125rem;
}

.contact-phone {
  font-size: 0.875rem;
  color: #717182;
  margin-bottom: 0.125rem;
}

.contact-relationship {
  font-size: 0.75rem;
  color: #717182;
}

.contact-actions {
  display: flex;
  gap: 0.25rem;
}

.edit-button,
.delete-button {
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: background-color 0.2s;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #f3f4f6;
}

/* Settings Cards */
.settings-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 1rem;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.setting-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.setting-details {
  flex: 1;
}

.setting-name {
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.125rem;
}

.setting-description {
  font-size: 0.875rem;
  color: #717182;
}

/* Toggle Switch */
.toggle-switch {
  width: 2.75rem;
  height: 1.5rem;
  background-color: #d1d5db;
  border-radius: 0.75rem;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-switch.active {
  background-color: #3b82f6;
}

.toggle-thumb {
  width: 1.25rem;
  height: 1.25rem;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.toggle-switch.active .toggle-thumb {
  transform: translateX(1.25rem);
}

.setting-separator {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.5rem 0;
}

/* Emergency Actions */
.emergency-actions-card {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
}

.emergency-actions-title {
  color: #b91c1c;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.emergency-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.emergency-test-button {
  width: 100%;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.emergency-test-button:hover {
  background-color: #b91c1c;
}

.test-location-button {
  width: 100%;
  background-color: transparent;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.test-location-button:hover {
  background-color: #fef2f2;
}

/* Responsive Design */
@media (max-width: 640px) {
  .settings {
    padding: 0.75rem;
  }
  
  .settings-container {
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .setting-item {
    align-items: flex-start;
  }
  
  .setting-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .toggle-switch {
    margin-top: 0.5rem;
  }
}
    `}
    </style>
    <div className="settings">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <div className="header-info">
            <h1>Settings</h1>
            <p className="header-subtitle">Manage your emergency preferences</p>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="emergency-contacts-card">
          <div className="contacts-header">
            <h3>Emergency Contacts</h3>
            <button 
              className="add-contact-button"
              onClick={() => setShowAddContact(true)}
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          {showAddContact && (
            <div className="add-contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-input"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  placeholder="Contact name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  className="form-input"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label htmlFor="relationship">Relationship</label>
                <input
                  id="relationship"
                  type="text"
                  className="form-input"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  placeholder="Spouse, Parent, Friend, etc."
                />
              </div>
              <div className="form-actions">
                <button className="add-button" onClick={addContact}>Add Contact</button>
                <button 
                  className="cancel-button"
                  onClick={() => setShowAddContact(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="contacts-list">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="contact-item">
                <User className="contact-avatar" />
                <div className="contact-details">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-phone">{contact.phone}</div>
                  <div className="contact-relationship">{contact.relationship}</div>
                </div>
                <div className="contact-actions">
                  <button className="edit-button">
                    <Edit size={16} />
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => deleteContact(contact.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="settings-card">
          <h3 className="card-title">Privacy & Security</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <MapPin className="setting-icon" />
                <div className="setting-details">
                  <div className="setting-name">Location Sharing</div>
                  <div className="setting-description">
                    Share location with emergency contacts
                  </div>
                </div>
              </div>
              <div 
                className={`toggle-switch ${settings.locationSharing ? 'active' : ''}`}
                onClick={() => updateSetting('locationSharing', !settings.locationSharing)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
            
            <div className="setting-separator"></div>
            
            <div className="setting-item">
              <div className="setting-info">
                <Shield className="setting-icon" />
                <div className="setting-details">
                  <div className="setting-name">Emergency Alerts</div>
                  <div className="setting-description">
                    Receive emergency notifications
                  </div>
                </div>
              </div>
              <div 
                className={`toggle-switch ${settings.emergencyAlerts ? 'active' : ''}`}
                onClick={() => updateSetting('emergencyAlerts', !settings.emergencyAlerts)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-card">
          <h3 className="card-title">Notifications</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <Bell className="setting-icon" />
                <div className="setting-details">
                  <div className="setting-name">Push Notifications</div>
                  <div className="setting-description">
                    Get notified about emergency updates
                  </div>
                </div>
              </div>
              <div 
                className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
                onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Offline & Maps */}
        <div className="settings-card">
          <h3 className="card-title">Offline & Maps</h3>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <Download className="setting-icon" />
                <div className="setting-details">
                  <div className="setting-name">Auto-Download Maps</div>
                  <div className="setting-description">
                    Automatically download area maps
                  </div>
                </div>
              </div>
              <div 
                className={`toggle-switch ${settings.autoDownloadMaps ? 'active' : ''}`}
                onClick={() => updateSetting('autoDownloadMaps', !settings.autoDownloadMaps)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
            
            <div className="setting-separator"></div>
            
            <div className="setting-item">
              <div className="setting-info">
                <MapPin className="setting-icon" />
                <div className="setting-details">
                  <div className="setting-name">Offline Mode</div>
                  <div className="setting-description">
                    Use app without internet connection
                  </div>
                </div>
              </div>
              <div 
                className={`toggle-switch ${settings.offlineMode ? 'active' : ''}`}
                onClick={() => updateSetting('offlineMode', !settings.offlineMode)}
              >
                <div className="toggle-thumb"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="emergency-actions-card">
          <h4 className="emergency-actions-title">Emergency Actions</h4>
          <div className="emergency-actions">
            <button className="emergency-test-button">
              <Phone size={16} />
              Test Emergency Call
            </button>
            <button className="test-location-button">
              <MapPin size={16} />
              Test Location Sharing
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}