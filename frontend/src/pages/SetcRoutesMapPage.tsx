import React, { useState, useEffect } from 'react';
import { PageView, SetcRoute } from '../types';
import { ArrowLeft, Map, Layers, Search, IndianRupee, Clock, Route as RouteIcon, X, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { apiService } from '../services/api';

const routeStopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SetcRoutesMapPageProps {
  onNavigate: (page: PageView) => void;
}

export const SetcRoutesMapPage: React.FC<SetcRoutesMapPageProps> = ({ onNavigate }) => {
  const [routes, setRoutes] = useState<SetcRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [selectedRoute, setSelectedRoute] = useState<SetcRoute | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getSetcRoutes();
        setRoutes(data);
        if (data.length > 0) setSelectedRoute(data[0]);
      } catch (error) {
        console.error('Failed to fetch SETC routes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRoutes = routes.filter(r => {
    const q = searchQuery.toLowerCase();
    return r.origin.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      r.routeCode.toLowerCase().includes(q) ||
      r.stops.toLowerCase().includes(q);
  });

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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">SETC Express Routes</h1>
              <span className="bg-blue-100 text-tnstc-blue text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-300">
                Interstate & Intercity
              </span>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm">Long-Distance Express Corridors Across South India</p>
          </div>
        </div>

        {/* Search & Map Layer Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search route, city, or stop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 py-1.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-48 sm:w-60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

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

      {/* Main Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Map */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
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

            {filteredRoutes.map((route) => {
              if (!route.coords || route.coords.length === 0) return null;
              const polyPositions: [number, number][] = route.coords.map(pt => [pt[1], pt[0]]);
              const isSelected = selectedRoute?.id === route.id;

              return (
                <React.Fragment key={`route-${route.id}`}>
                  <Polyline
                    positions={polyPositions}
                    pathOptions={{
                      color: isSelected ? '#1d4ed8' : '#60a5fa',
                      weight: isSelected ? 6 : 3.5,
                      opacity: isSelected ? 1.0 : 0.6
                    }}
                    eventHandlers={{
                      click: () => setSelectedRoute(route)
                    }}
                  />
                  {polyPositions.map((pos, idx) => (
                    <Marker
                      key={`stop-${route.id}-${idx}`}
                      position={pos}
                      icon={routeStopIcon}
                      eventHandlers={{
                        click: () => setSelectedRoute(route)
                      }}
                    >
                      <Popup className="rounded-xl">
                        <div className="p-1">
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {route.routeCode}
                          </span>
                          <h4 className="font-bold text-slate-900 mt-1">{route.origin} ➔ {route.destination}</h4>
                          <p className="text-xs text-slate-500">Stops: {route.stops}</p>
                          <p className="text-xs font-semibold text-emerald-700 mt-1">₹{route.fare} • {route.distance} km • {route.travelTime}</p>
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
              <RouteIcon className="w-4 h-4 text-tnstc-blue" />
              <span>Route Schedules</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">{filteredRoutes.length} Corridors</span>
          </div>

          <div className="overflow-y-auto space-y-3 flex-1 pr-1 custom-scrollbar">
            {filteredRoutes.map((route) => {
              const isSelected = selectedRoute?.id === route.id;
              return (
                <div
                  key={`card-route-${route.id}`}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-sm ring-2 ring-blue-400/30'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      {route.routeCode}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center">
                      <IndianRupee className="w-3 h-3" />
                      <span>{route.fare}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {route.origin} <span className="text-tnstc-blue">➔</span> {route.destination}
                  </h4>

                  <div className="flex items-center space-x-3 text-xs text-slate-600 mb-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{route.travelTime}</span>
                    </span>
                    <span>•</span>
                    <span>{route.distance} km</span>
                  </div>

                  <div className="text-xs text-slate-500 bg-white p-2 rounded-lg border border-slate-200/60 mb-2">
                    <span className="font-semibold text-slate-700">Via: </span>
                    <span>{route.stops}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-[11px] text-blue-700 font-medium">
                    <Bus className="w-3.5 h-3.5 text-blue-500" />
                    <span>{route.serviceType}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
