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
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  padding: 1rem 0.5rem;
  width: 100%;
}

.navigation-container {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.75rem;
}

/* Header */
.navigation-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.back-button {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  border-radius: 0.625rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.back-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  color: #374151;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.header-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-info h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.header-subtitle {
  color: #6b7280;
  font-size: 0.9375rem;
  margin: 0;
  font-weight: 500;
}

/* Search */
.search-container {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  width: 1rem;
  height: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  color: #1f2937;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-weight: 500;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), 0 4px 12px rgba(59, 130, 246, 0.15);
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Current Location */
.location-card {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid #93c5fd;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.location-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.location-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #2563eb;
  flex-shrink: 0;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.location-info {
  flex: 1;
  min-width: 150px;
}

.location-title {
  color: #1e40af;
  font-weight: 700;
  font-size: 0.95rem;
}

.location-coords {
  font-size: 0.85rm;
  color: #2563eb;
  margin: 0.25rem 0 0;
  font-weight: 500;
}

.active-badge {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #166534;
  padding: 0.375rem 1rem;
  border-radius: 2rem;
  border: 1px solid #86efac;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Services Section */
.services-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.services-section h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.service-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

.service-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.service-icon-container {
  padding: 0.75rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon-container {
  transform: scale(1.15);
}

.service-icon-container.red {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

.service-icon-container.blue {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}

.service-icon-container.orange {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  color: #ea580c;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.15);
}

.service-icon-container.green {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: #16a34a;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.15);
}

.service-icon-container.purple {
  background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
  color: #9333ea;
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.15);
}

.service-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.service-details {
  flex: 1;
  min-width: 0;
}

.service-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.service-main-info {
  flex: 1;
  min-width: 150px;
}

.service-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.375rem;
  margin: 0;
}

.service-address {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
  font-weight: 500;
}

.service-rating {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: #1f2937;
  white-space: nowrap;
  background-color: #fffbeb;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #fde68a;
  font-weight: 600;
}

.star-icon {
  width: 0.85rem;
  height: 0.85rem;
  color: #eab308;
  fill: currentColor;
}

.service-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.875rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
}

.service-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.navigate-button {
  flex: 1;
  min-width: 110px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.625rem;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.navigate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(37, 99, 235, 0.3);
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
}

.navigate-button:active {
  transform: translateY(0);
}

.call-button {
  background-color: white;
  color: #374151;
  border: 2px solid #e5e7eb;
  border-radius: 0.625rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.call-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

/* Emergency Actions */
.emergency-actions-card {
  background: linear-gradient(135deg, #fef2f2 0%, #fde2e4 100%);
  border: 2px solid #fca5a5;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);
}

.emergency-actions-title {
  color: #b91c1c;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 1rem;
  margin: 0;
}

.emergency-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.emergency-button {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #bb1f1f 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  padding: 1rem;
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 16px rgba(220, 38, 38, 0.3);
}

.emergency-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #bb1f1f 0%, #991b1b 100%);
}

.emergency-button:active {
  transform: translateY(0);
}

.share-location-button {
  width: 100%;
  background-color: white;
  color: #b91c1c;
  border: 2px solid #fca5a5;
  border-radius: 0.75rem;
  padding: 1rem;
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.share-location-button:hover {
  background-color: #fef2f2;
  border-color: #fb7185;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
  transform: translateY(-1px);
}

/* Mobile: < 640px */
@media (max-width: 639px) {
  .navigation {
    padding: 1rem 0.5rem;
  }
  
  .navigation-container {
    max-width: 100%;
    gap: 1rem;
    padding: 0.5rem;
  }

  .header-info h1 {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .header-subtitle {
    font-size: 0.875rem;
  }

  .search-input {
    font-size: 1rem;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
  }

  .service-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .service-meta {
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .service-actions {
    gap: 0.75rem;
  }

  .navigate-button {
    font-size: 0.95rem;
    padding: 0.75rem;
  }

  .emergency-button,
  .share-location-button {
    font-size: 1rem;
    padding: 0.875rem;
  }
}

/* Tablet: 640px - 1024px */
@media (min-width: 640px) and (max-width: 1024px) {
  .navigation {
    padding: 1.25rem;
  }

  .navigation-container {
    max-width: 95%;
    gap: 1.25rem;
    padding: 0.75rem;
  }

  .header-info h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .service-name {
    font-size: 1.05rem;
    font-weight: 700;
  }

  .service-address {
    font-size: 0.875rem;
  }

  .navigate-button {
    min-width: 130px;
    font-size: 1rem;
    padding: 0.875rem;
  }

  .emergency-button,
  .share-location-button {
    font-size: 1.05rem;
    padding: 1rem;
  }
}

/* Desktop: > 1024px */
@media (min-width: 1025px) {
  .navigation {
    padding: 2rem;
  }

  .navigation-container {
    max-width: 1100px;
    gap: 1.75rem;
    padding: 1.5rem;
  }

  .header-info h1 {
    font-size: 1.875rem;
    font-weight: 700;
  }

  .header-subtitle {
    font-size: 1.0625rem;
  }

  .search-input {
    font-size: 1.05rem;
    padding: 1rem 1.25rem 1rem 3rem;
  }

  .services-section h3 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .service-name {
    font-size: 1.125rem;
    font-weight: 700;
  }

  .service-address {
    font-size: 0.95rem;
  }

  .service-icon-container {
    width: 3.5rem;
    height: 3.5rem;
  }

  .service-icon {
    width: 1.75rem;
    height: 1.75rem;
  }

  .navigate-button {
    min-width: 150px;
    font-size: 1.05rem;
    padding: 0.875rem 1.5rem;
  }

  .emergency-actions-card {
    padding: 1.75rem;
  }

  .emergency-button,
  .share-location-button {
    font-size: 1.125rem;
    padding: 1.25rem;
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