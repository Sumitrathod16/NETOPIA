import { useState } from "react";
import { 
  ArrowLeft, 
  Navigation as NavigationIcon, 
  MapPin, 
  Search,
  Heart,
  Shield,
  Flame,
  Phone,
  Clock,
  Star
} from "lucide-react";

export function Navigation({ onBack }) {
  const [searchQuery, setSearchQuery] = useState("");

  const nearbyServices = [
    {
      id: 1,
      name: "General Hospital Emergency",
      type: "hospital",
      icon: Heart,
      distance: "0.8 miles",
      eta: "3 min",
      address: "123 Medical Center Dr",
      rating: 4.5,
      color: "red"
    },
    {
      id: 2,
      name: "Police Station District 5",
      type: "police",
      icon: Shield,
      distance: "1.2 miles",
      eta: "4 min",
      address: "456 Safety Blvd",
      rating: 4.2,
      color: "blue"
    },
    {
      id: 3,
      name: "Fire Department Station 12",
      type: "fire",
      icon: Flame,
      distance: "0.5 miles",
      eta: "2 min",
      address: "789 Rescue Ave",
      rating: 4.8,
      color: "orange"
    },
    {
      id: 4,
      name: "Urgent Care Center",
      type: "urgent",
      icon: Heart,
      distance: "1.5 miles",
      eta: "5 min",
      address: "321 Quick Care St",
      rating: 4.3,
      color: "green"
    },
    {
      id: 5,
      name: "Emergency Vet Clinic",
      type: "vet",
      icon: Heart,
      distance: "2.1 miles",
      eta: "7 min",
      address: "654 Pet Care Rd",
      rating: 4.6,
      color: "purple"
    }
  ];

  const startNavigation = (destination) => {
    alert(`Starting navigation to ${destination.name}\nETA: ${destination.eta}\nDistance: ${destination.distance}`);
  };

  const callService = (service) => {
    alert(`Calling ${service.name}...\nThis would dial their emergency number in a real app.`);
  };

  const filteredServices = nearbyServices.filter(service => 
    searchQuery === "" || 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <style>
    {`
    .navigation {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
}

.navigation-container {
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.navigation-header {
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

/* Search */
.search-container {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 1rem;
  height: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

/* Current Location */
.location-card {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
}

.location-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.location-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #2563eb;
}

.location-info {
  flex: 1;
}

.location-title {
  color: #1e40af;
  font-weight: 500;
}

.location-coords {
  font-size: 0.875rem;
  color: #2563eb;
}

.active-badge {
  background-color: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #bbf7d0;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Services Section */
.services-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.services-section h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.service-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.service-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.service-icon-container {
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon-container.red {
  background-color: #f3f4f6;
  color: #dc2626;
}

.service-icon-container.blue {
  background-color: #f3f4f6;
  color: #2563eb;
}

.service-icon-container.orange {
  background-color: #f3f4f6;
  color: #ea580c;
}

.service-icon-container.green {
  background-color: #f3f4f6;
  color: #16a34a;
}

.service-icon-container.purple {
  background-color: #f3f4f6;
  color: #9333ea;
}

.service-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.service-details {
  flex: 1;
}

.service-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.service-main-info {
  flex: 1;
}

.service-name {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.service-address {
  font-size: 0.875rem;
  color: #717182;
  margin: 0;
}

.service-rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #374151;
}

.star-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: #eab308;
  fill: currentColor;
}

.service-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #717182;
}

.service-actions {
  display: flex;
  gap: 0.5rem;
}

.navigate-button {
  flex: 1;
  background-color: #3b82f6;
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

.navigate-button:hover {
  background-color: #2563eb;
}

.call-button {
  background-color: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.call-button:hover {
  background-color: #f9fafb;
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

.emergency-button {
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

.emergency-button:hover {
  background-color: #b91c1c;
}

.share-location-button {
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

.share-location-button:hover {
  background-color: #fef2f2;
}

/* Responsive Design */
@media (max-width: 640px) {
  .navigation {
    padding: 0.75rem;
  }
  
  .navigation-container {
    gap: 1rem;
  }
  
  .service-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .service-meta {
    gap: 0.75rem;
  }
  
  .service-actions {
    flex-direction: column;
  }
}
    `}
    </style>
    <div className="navigation">
      <div className="navigation-container">
        {/* Header */}
        <div className="navigation-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <div className="header-info">
            <h1>Emergency Navigation</h1>
            <p className="header-subtitle">Find nearby emergency services</p>
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for emergency services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Current Location */}
        <div className="location-card">
          <div className="location-content">
            <MapPin className="location-icon" />
            <div className="location-info">
              <div className="location-title">Current Location</div>
              <div className="location-coords">GPS coordinates: 40.7128, -74.0060</div>
            </div>
            <div className="active-badge">Active</div>
          </div>
        </div>

        {/* Nearby Services */}
        <div className="services-section">
          <h3>Nearby Emergency Services</h3>
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="service-card">
                <div className="service-content">
                  <div className={`service-icon-container ${service.color}`}>
                    <Icon className="service-icon" />
                  </div>
                  <div className="service-details">
                    <div className="service-header">
                      <div className="service-main-info">
                        <h4 className="service-name">{service.name}</h4>
                        <p className="service-address">{service.address}</p>
                      </div>
                      <div className="service-rating">
                        <Star className="star-icon" />
                        <span>{service.rating}</span>
                      </div>
                    </div>
                    
                    <div className="service-meta">
                      <div className="meta-item">
                        <MapPin size={12} />
                        <span>{service.distance}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={12} />
                        <span>{service.eta}</span>
                      </div>
                    </div>

                    <div className="service-actions">
                      <button 
                        className="navigate-button"
                        onClick={() => startNavigation(service)}
                      >
                        <NavigationIcon size={16} />
                        Navigate
                      </button>
                      <button 
                        className="call-button"
                        onClick={() => callService(service)}
                      >
                        <Phone size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Actions */}
        <div className="emergency-actions-card">
          <h4 className="emergency-actions-title">Emergency Actions</h4>
          <div className="emergency-actions">
            <button 
              className="emergency-button"
              onClick={() => alert("Calling 911...")}
            >
              <Phone size={16} />
              Call 911 Emergency
            </button>
            <button 
              className="share-location-button"
              onClick={() => alert("Sharing location with emergency contacts...")}
            >
              <MapPin size={16} />
              Share Location with Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}