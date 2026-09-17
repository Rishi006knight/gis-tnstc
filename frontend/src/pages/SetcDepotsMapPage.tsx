import React, { useState, useEffect } from 'react';
import { PageView, SetcDepot } from '../types';
import { ArrowLeft, Navigation, MapPin, Map, Layers, Search, Phone, Wrench, X, Filter, Building2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { apiService } from '../services/api';

const depotIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface SetcDepotsMapPageProps {
  onNavigate: (page: PageView) => void;
}

export const SetcDepotsMapPage: React.FC<SetcDepotsMapPageProps> = ({ onNavigate }) => {
  const [depots, setDepots] = useState<SetcDepot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [selectedDepot, setSelectedDepot] = useState<SetcDepot | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiService.getSetcDepots(undefined, searchQuery);
        let filtered = data;
        if (selectedState !== 'All') {
          filtered = filtered.filter(d => d.state.toLowerCase() === selectedState.toLowerCase());
        }
        setDepots(filtered);
      } catch (error) {
        console.error('Failed to fetch SETC depots', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedState, searchQuery]);

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
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">SETC Bus Depots</h1>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                22 Depots
              </span>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm">Operating Depots, Workshops & Outstations</p>
          </div>
        </div>

        {/* Controls: Search, State filter & Map Layer Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search depot or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 py-1.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 w-44 sm:w-56"
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

          {/* State Dropdown */}
          <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
            >
              <option value="All">All Regions</option>
              <option value="Tamil Nadu">Tamil Nadu (20)</option>
              <option value="Puducherry">Puducherry (1)</option>
              <option value="Kerala">Kerala / Trivandrum (1)</option>
            </select>
          </div>

          {/* Base Map Toggle (Street vs Satellite) */}
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

      {/* Main Map + Sidebar Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[500px]">
        {/* Map Container */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
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

            {depots.map((depot) => (
              <Marker 
                key={`depot-${depot.id}`} 
                position={[depot.latitude, depot.longitude]} 
                icon={depotIcon}
                eventHandlers={{
                  click: () => setSelectedDepot(depot)
                }}
              >
                <Popup className="rounded-xl">
                  <div className="p-1 min-w-[220px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <h3 className="font-bold text-slate-900 text-base">{depot.name}</h3>
                      <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {depot.type}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{depot.address}</span>
                      </div>

                      {depot.phone && (
                        <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-xs">
                          <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>BM Contact: {depot.phone}</span>
                        </div>
                      )}

                      <div className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-600 font-medium">
                        Region: {depot.state}
                      </div>

                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${depot.latitude},${depot.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 w-full flex items-center justify-center space-x-2 bg-emerald-700 text-white py-2 px-3 rounded-lg hover:bg-emerald-800 transition font-medium text-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Depots List Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="font-bold text-slate-900 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>Depot Directory</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500">{depots.length} Locations</span>
          </div>

          <div className="overflow-y-auto space-y-2.5 flex-1 pr-1 custom-scrollbar">
            {depots.map((depot) => (
              <div
                key={`side-depot-${depot.id}`}
                onClick={() => setSelectedDepot(depot)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedDepot?.id === depot.id
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-sm'
                    : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{depot.name}</h4>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                    {depot.state}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{depot.address}</p>
                {depot.phone && (
                  <div className="mt-2 flex items-center space-x-1.5 text-xs text-slate-700 font-medium">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{depot.phone}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Facility Highlights */}
          <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center space-x-1">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>Central Workshop: Trichy & Nagercoil</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
