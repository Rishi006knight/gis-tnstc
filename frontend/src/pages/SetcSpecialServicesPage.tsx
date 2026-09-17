import React, { useState, useEffect } from 'react';
import { PageView, SetcSpecialService } from '../types';
import { ArrowLeft, Map, Layers, Calendar, Sparkles, MapPin, IndianRupee } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { apiService } from '../services/api';

const specialIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SetcSpecialServicesPageProps {
  onNavigate: (page: PageView) => void;
}

export const SetcSpecialServicesPage: React.FC<SetcSpecialServicesPageProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<SetcSpecialService[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [selectedService, setSelectedService] = useState<SetcSpecialService | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getSetcSpecialServices();
        setServices(data);
        if (data.length > 0) setSelectedService(data[0]);
      } catch (error) {
        console.error('Failed to fetch special services', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const defaultCenter: [number, number] = [10.8505, 78.7047];
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
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Special & Festival Services</h1>
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-300">
                Seasonal Fleet
              </span>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm">Pilgrimage & Festival Express Corridors</p>
          </div>
        </div>

        {/* Map Layer Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setMapType('streets')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                mapType === 'streets'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
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
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Satellite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Map & Service Cards */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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

            {services.map((srv) => {
              if (!srv.coords || srv.coords.length === 0) return null;
              const polyPositions: [number, number][] = srv.coords.map(pt => [pt[1], pt[0]]);
              const isSelected = selectedService?.id === srv.id;

              return (
                <React.Fragment key={`srv-${srv.id}`}>
                  <Polyline
                    positions={polyPositions}
                    pathOptions={{
                      color: isSelected ? '#7c3aed' : '#a78bfa',
                      weight: isSelected ? 5 : 3,
                      dashArray: isSelected ? undefined : '6, 6',
                      opacity: isSelected ? 0.95 : 0.7
                    }}
                    eventHandlers={{
                      click: () => setSelectedService(srv)
                    }}
                  />
                  {polyPositions.map((pos, idx) => (
                    <Marker
                      key={`pt-${srv.id}-${idx}`}
                      position={pos}
                      icon={specialIcon}
                      eventHandlers={{
                        click: () => setSelectedService(srv)
                      }}
                    >
                      <Popup className="rounded-xl">
                        <div className="p-1">
                          <h4 className="font-bold text-slate-900">{srv.serviceName}</h4>
                          <p className="text-xs text-purple-700 font-medium mt-1">{srv.origin} ➔ {srv.destination}</p>
                          <p className="text-xs text-slate-500 mt-1">{srv.periodText}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </React.Fragment>
              );
            })}
          </MapContainer>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Festival Services</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">{services.length} Routes</span>
          </div>

          <div className="overflow-y-auto space-y-3 flex-1 pr-1 custom-scrollbar">
            {services.map((srv) => {
              const isSelected = selectedService?.id === srv.id;
              return (
                <div
                  key={`card-${srv.id}`}
                  onClick={() => setSelectedService(srv)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-50/80 border-purple-400 shadow-sm ring-2 ring-purple-400/30'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <h4 className="font-bold text-slate-900 text-sm">{srv.serviceName}</h4>
                    {srv.fare && (
                      <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded flex items-center">
                        <IndianRupee className="w-3 h-3" />
                        <span>{srv.fare}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{srv.origin} ➔ {srv.destination}</span>
                    {srv.distanceKm && <span className="text-slate-400 font-normal">({srv.distanceKm} km)</span>}
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/60 mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{srv.periodText}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
