import { useState } from "react";
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  MapPin, 
  HardDrive,
  Calendar,
  AlertCircle,
  CheckCircle,
  Map
} from "lucide-react";

export function OfflineMaps({ onBack }) {
  const [downloading, setDownloading] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const availableMaps = [
    {
      id: 1,
      name: "Downtown Emergency Zone",
      size: "45 MB",
      coverage: "5 mile radius",
      lastUpdated: "2024-01-15",
      downloaded: true,
      priority: "high"
    },
    {
      id: 2,
      name: "Hospital District",
      size: "28 MB",
      coverage: "3 mile radius",
      lastUpdated: "2024-01-14",
      downloaded: true,
      priority: "high"
    },
    {
      id: 3,
      name: "Residential Area North",
      size: "62 MB",
      coverage: "8 mile radius",
      lastUpdated: "2024-01-13",
      downloaded: true,
      priority: "medium"
    },
    {
      id: 4,
      name: "Highway Corridor",
      size: "78 MB",
      coverage: "12 mile stretch",
      lastUpdated: "2024-01-12",
      downloaded: false,
      priority: "medium"
    },
    {
      id: 5,
      name: "Industrial District",
      size: "35 MB",
      coverage: "4 mile radius",
      lastUpdated: "2024-01-11",
      downloaded: false,
      priority: "low"
    }
  ];

  const downloadMap = async (mapId) => {
    setDownloading(mapId);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(null);
          setDownloadProgress(0);
          alert("Map downloaded successfully! Available for offline use.");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const deleteMap = (mapId, mapName) => {
    if (window.confirm(`Delete offline map "${mapName}"? You'll need internet to download it again.`)) {
      alert(`Map "${mapName}" deleted successfully.`);
    }
  };

  const totalStorage = availableMaps
    .filter(map => map.downloaded)
    .reduce((total, map) => total + parseInt(map.size), 0);

  return (
    <>
    <style>
    {`
    .offline-maps {
  min-height: 100vh;
  background-color: #ffffff;
  padding: 1rem;
}

.maps-container {
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.maps-header {
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

/* Storage Card */
.storage-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.storage-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.storage-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.storage-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.storage-badge {
  background-color: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.storage-text {
  font-size: 0.875rem;
  color: #717182;
}

/* Current Location Card */
.current-location-card {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
  padding: 1rem;
}

.location-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
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
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.location-subtitle {
  font-size: 0.875rem;
  color: #2563eb;
  margin: 0;
}

.download-current-button {
  width: 100%;
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

.download-current-button:hover {
  background-color: #2563eb;
}

/* Maps Section */
.maps-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.maps-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.maps-section-header h3 {
  font-size: 1.125rem;
  font-weight: 500;
  color: #374151;
}

.downloaded-badge {
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.map-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.map-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.map-icon {
  padding: 0.5rem;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-details {
  flex: 1;
}

.map-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.map-main-info {
  flex: 1;
}

.map-name {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.map-coverage {
  font-size: 0.875rem;
  color: #717182;
  margin: 0;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

.priority-high {
  background-color: #fef2f2;
  color: #b91c1c;
}

.priority-medium {
  background-color: #fffbeb;
  color: #d97706;
}

.priority-low {
  background-color: #f9fafb;
  color: #374151;
}

.map-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #717182;
  margin-bottom: 0.75rem;
}

.check-icon {
  width: 0.75rem;
  height: 0.75rem;
  color: #16a34a;
}

.downloaded-text {
  color: #16a34a;
}

.download-progress {
  margin-bottom: 0.75rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.map-actions {
  display: flex;
  gap: 0.5rem;
}

.view-map-button {
  flex: 1;
  background-color: transparent;
  color: #374151;
  border: 1px solid #d1d5db;
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

.view-map-button:hover {
  background-color: #f9fafb;
}

.delete-button {
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 0.375rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #b91c1c;
}

.download-button {
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

.download-button:hover {
  background-color: #2563eb;
}

.download-button.disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.download-button.disabled:hover {
  background-color: #9ca3af;
}

/* Offline Info Card */
.offline-info-card {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 0.5rem;
  padding: 1rem;
}

.offline-info-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.info-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #d97706;
  margin-top: 0.125rem;
}

.info-text {
  flex: 1;
}

.info-title {
  color: #d97706;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.info-list {
  color: #d97706;
  font-size: 0.875rem;
  margin: 0;
  padding-left: 0;
  list-style: none;
}

.info-list li {
  margin-bottom: 0.25rem;
}

/* Responsive Design */
@media (max-width: 640px) {
  .offline-maps {
    padding: 0.75rem;
  }
  
  .maps-container {
    gap: 1rem;
  }
  
  .map-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .map-actions {
    flex-direction: column;
  }
  
  .offline-info-content {
    gap: 0.5rem;
  }
}
    `}
    </style>
    <div className="offline-maps">
      <div className="maps-container">
        {/* Header */}
        <div className="maps-header">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
          <div className="header-info">
            <h1>Offline Maps</h1>
            <p className="header-subtitle">Download maps for offline navigation</p>
          </div>
        </div>

        {/* Storage Info */}
        <div className="storage-card">
          <div className="storage-header">
            <div className="storage-info">
              <HardDrive className="storage-icon" />
              <span>Storage Usage</span>
            </div>
            <div className="storage-badge">{totalStorage} MB used</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${Math.min((totalStorage / 500) * 100, 100)}%`}}
            ></div>
          </div>
          <div className="storage-text">
            {totalStorage} MB of 500 MB available for offline maps
          </div>
        </div>

        {/* Current Location Map */}
        <div className="current-location-card">
          <div className="location-header">
            <MapPin className="location-icon" />
            <div className="location-info">
              <h4 className="location-title">Current Area Map</h4>
              <p className="location-subtitle">Based on your current location</p>
            </div>
          </div>
          <button 
            className="download-current-button"
            onClick={() => downloadMap(999)}
          >
            <Download size={16} />
            Download Current Area (38 MB)
          </button>
        </div>

        {/* Available Maps */}
        <div className="maps-section">
          <div className="maps-section-header">
            <h3>Emergency Zone Maps</h3>
            <div className="downloaded-badge">
              {availableMaps.filter(m => m.downloaded).length} Downloaded
            </div>
          </div>
          
          {availableMaps.map((map) => (
            <div key={map.id} className="map-card">
              <div className="map-content">
                <div className="map-icon">
                  <Map size={20} />
                </div>
                <div className="map-details">
                  <div className="map-header">
                    <div className="map-main-info">
                      <h4 className="map-name">{map.name}</h4>
                      <p className="map-coverage">
                        {map.coverage} • {map.size}
                      </p>
                    </div>
                    <div className={`priority-badge priority-${map.priority}`}>
                      {map.priority}
                    </div>
                  </div>
                  
                  <div className="map-meta">
                    <Calendar size={12} />
                    <span>Updated {map.lastUpdated}</span>
                    {map.downloaded && (
                      <>
                        <CheckCircle className="check-icon" />
                        <span className="downloaded-text">Downloaded</span>
                      </>
                    )}
                  </div>

                  {downloading === map.id && (
                    <div className="download-progress">
                      <div className="progress-header">
                        <span>Downloading...</span>
                        <span>{downloadProgress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${downloadProgress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="map-actions">
                    {map.downloaded ? (
                      <>
                        <button className="view-map-button">
                          <Map size={16} />
                          View Map
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => deleteMap(map.id, map.name)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <button 
                        className={`download-button ${downloading !== null ? 'disabled' : ''}`}
                        onClick={() => downloadMap(map.id)}
                        disabled={downloading !== null}
                      >
                        <Download size={16} />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Offline Mode Info */}
        <div className="offline-info-card">
          <div className="offline-info-content">
            <AlertCircle className="info-icon" />
            <div className="info-text">
              <h4 className="info-title">Offline Mode Tips</h4>
              <ul className="info-list">
                <li>• Download high-priority areas first</li>
                <li>• Maps work without internet connection</li>
                <li>• GPS still works offline for location</li>
                <li>• Update maps regularly for accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}