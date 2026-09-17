import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { ArrowLeft, Navigation, MapPin, Map, Layers } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { API_BASE_URL } from '../services/api';

// Create a custom icon for the markers
const rcIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SetcReservationCentresMapPageProps {
  onNavigate: (page: PageView) => void;
}

export const SetcReservationCentresMapPage: React.FC<SetcReservationCentresMapPageProps> = ({ onNavigate }) => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/setc/reservation-centres${selectedDistrict !== 'All' ? `?district=${selectedDistrict}` : ''}`);
        if (res.ok) {
          setGeoJsonData(await res.json());
        }
      } catch (error) {
        console.error('Failed to fetch reservation centres', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDistrict]);

  const uniqueDistricts = geoJsonData?.features
    ? Array.from(new Set(geoJsonData.features.map((f: any) => f.properties.district))).filter(Boolean).sort()
    : [];

  // Default center to Tamil Nadu
  const defaultCenter: [number, number] = [11.1271, 78.6569];
  const defaultZoom = 7;

  return (
    <div className="space-y-6 animate-fade-in pb-12 flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('setc')}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
            <img src="/setc-logo.png" alt="SETC Logo" className="w-full h-full object-contain rounded-lg" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Reservation Centres</h1>
            <p className="text-slate-500 font-medium text-xs sm:text-sm">SETC Ticket Booking Counters & Offices</p>
          </div>
        </div>

        {/* Controls: District Filter & Map Layer Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Base Map Toggle (Street vs Satellite) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setMapType('streets')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                mapType === 'streets'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Standard Street Map (OpenStreetMap)"
            >
              <Map className="w-3.5 h-3.5 text-blue-600" />
              <span>Street</span>
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                mapType === 'satellite'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="High Resolution Satellite Imagery (Esri World Imagery)"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Satellite</span>
            </button>
          </div>

          {/* District Dropdown */}
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <MapPin className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Districts</option>
              {uniqueDistricts.map((d: any) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[500px]">
        {loading && (
          <div className="absolute inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tnstc-blue"></div>
          </div>
        )}

        <MapContainer 
          center={defaultCenter} 
          zoom={defaultZoom} 
          className="h-full w-full z-0"
        >
          {mapType === 'streets' ? (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          ) : (
            <>
              <TileLayer
                attribution='&copy; Esri, Maxar, Earthstar Geographics'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
              <TileLayer
                url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </>
          )}

          {geoJsonData && geoJsonData.features && geoJsonData.features.map((feature: any, idx: number) => {
            if (!feature.geometry) return null;
            
            const [lon, lat] = feature.geometry.coordinates;
            const props = feature.properties;

            return (
              <Marker key={`rc-${props.id}-${idx}`} position={[lat, lon]} icon={rcIcon}>
                <Popup className="rounded-xl">
                  <div className="p-1 min-w-[200px]">
                    <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">
                      {props.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-600">{props.counterAddress}</span>
                      </div>
                      {props.district && (
                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-slate-100 text-xs font-medium text-slate-600">
                          District: {props.district}
                        </div>
                      )}
                      
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full flex items-center justify-center space-x-2 bg-tnstc-blue text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};
