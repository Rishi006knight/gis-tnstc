import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Motel } from '../types';
import { apiService } from '../services/api';
import { INITIAL_MOTELS } from '../data/mockData';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Phone,
  Clock,
  BatteryCharging,
  Utensils,
  Car,
  HeartPulse,
  Info,
  X,
  Navigation,
  Compass,
  RotateCcw,
  Map,
  Layers
} from 'lucide-react';

export const MotelMapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [motels, setMotels] = useState<Motel[]>(INITIAL_MOTELS);
  const [selectedMotel, setSelectedMotel] = useState<Motel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [districts, setDistricts] = useState<string[]>([]);

  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // 1. Load data
  useEffect(() => {
    const load = async () => {
      const data = await apiService.getMotels();
      setMotels(data);
      const uniqueDistricts = Array.from(new Set(data.map(m => m.district))).sort();
      setDistricts(uniqueDistricts);
    };
    load();
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Centered on Tamil Nadu
    const map = L.map(mapContainerRef.current, {
      center: [11.1271, 78.6569],
      zoom: 7,
      zoomControl: true,
    });

    // Street Layer (OpenStreetMap)
    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Satellite Imagery (Esri World Imagery + Reference Labels)
    const satTile = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    });
    const satLabels = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
    });
    const satelliteGroup = L.layerGroup([satTile, satLabels]);

    streetLayer.addTo(map);
    streetLayerRef.current = streetLayer;
    satelliteLayerGroupRef.current = satelliteGroup;

    const markersLayer = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;
    markersLayerRef.current = markersLayer;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch between Street and Satellite layers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const street = streetLayerRef.current;
    const sat = satelliteLayerGroupRef.current;
    if (!map || !street || !sat) return;

    if (mapType === 'satellite') {
      if (map.hasLayer(street)) map.removeLayer(street);
      if (!map.hasLayer(sat)) sat.addTo(map);
    } else {
      if (map.hasLayer(sat)) map.removeLayer(sat);
      if (!map.hasLayer(street)) street.addTo(map);
    }
  }, [mapType]);

  // 3. Filter Motels
  const filteredMotels = motels.filter(m => {
    const matchesDistrict = selectedDistrict === 'All' || m.district.toLowerCase() === selectedDistrict.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      m.name.toLowerCase().includes(q) ||
      m.locationName.toLowerCase().includes(q) ||
      m.highwayNumber.toLowerCase().includes(q) ||
      m.district.toLowerCase().includes(q);
    return matchesDistrict && matchesQuery;
  });

  // 4. Update Markers on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();

    const bounds: L.LatLngExpression[] = [];

    filteredMotels.forEach(motel => {
      const isSelected = selectedMotel?.id === motel.id;

      // Custom green marker icon
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="custom-marker-pin pin-green ${isSelected ? 'pin-selected' : ''}" style="width: 32px; height: 32px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([motel.latitude, motel.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedMotel(motel);
        map.setView([motel.latitude, motel.longitude], 11, { animate: true });
      });

      marker.bindTooltip(
        `<div class="font-sans"><strong>${motel.name}</strong><br/><span class="text-xs text-slate-500">${motel.highwayNumber} • ${motel.locationName}</span></div>`,
        { direction: 'top', offset: [0, -10] }
      );

      marker.addTo(layer);
      bounds.push([motel.latitude, motel.longitude]);
    });

    if (bounds.length > 0 && !selectedMotel) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  }, [filteredMotels, selectedMotel]);

  const handleResetView = () => {
    setSelectedMotel(null);
    if (mapInstanceRef.current && filteredMotels.length > 0) {
      const bounds = filteredMotels.map(m => [m.latitude, m.longitude] as [number, number]);
      mapInstanceRef.current.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[620px] max-h-[850px] w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      {/* Top Filter and Search Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 z-20 shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Motel, Highway (NH-45), or Town..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 bg-slate-50 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* District Dropdown */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="text-sm font-medium py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 text-slate-700"
            >
              <option value="All">All Districts</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter & Actions */}
        <div className="flex items-center space-x-2.5">
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
              <span className="hidden sm:inline">Street</span>
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

          <div className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="font-bold">{filteredMotels.length}</span> / {motels.length} Motels
          </div>

          <button
            onClick={handleResetView}
            title="Reset Map View"
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition flex items-center space-x-1 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Map + Detail Panel Container */}
      <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
        {/* Leaflet Map DOM container */}
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Desktop Side Panel / Mobile Bottom Sheet */}
        {selectedMotel && (
          <aside className="absolute top-2 right-2 bottom-2 left-2 sm:left-auto sm:top-3 sm:right-3 sm:bottom-3 w-auto sm:w-[380px] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] z-30 bg-white rounded-2xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom sm:slide-in-from-right">
            {/* Header */}
            <div className="shrink-0 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-start justify-between z-10">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {selectedMotel.highwayNumber}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {selectedMotel.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{selectedMotel.locationName}, {selectedMotel.district}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedMotel(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body with independent scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-slate-600 overscroll-contain">
              {/* Cleanliness & Hours */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{selectedMotel.cleanlinessRating || 4.2}</span>
                    <span className="text-[10px] text-slate-400"> / 5.0 Rating</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-tnstc-blue shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 text-xs">24 Hours</span>
                    <span className="text-[10px] text-slate-400 block">Service</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                  Full Location Address
                </span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed text-slate-600">
                  {selectedMotel.address}
                </p>
              </div>

              {/* Facilities Chips */}
              <div>
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                  Authorized Facilities & Amenities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMotel.hasRestroom && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Clean Restrooms</span>
                    </span>
                  )}
                  {selectedMotel.hasRestaurant && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                      <Utensils className="w-3 h-3 text-blue-600" />
                      <span>Meal Canteen</span>
                    </span>
                  )}
                  {selectedMotel.hasEvCharging && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                      <BatteryCharging className="w-3 h-3 text-purple-600" />
                      <span>EV Charging Fast Kiosk</span>
                    </span>
                  )}
                  {selectedMotel.hasParking && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                      <Car className="w-3 h-3 text-amber-600" />
                      <span>Bus Bays & Parking</span>
                    </span>
                  )}
                  {selectedMotel.hasFirstAid && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                      <HeartPulse className="w-3 h-3 text-rose-600" />
                      <span>First Aid Post</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Operational Notes */}
              {selectedMotel.notes && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-900 block mb-0.5">Passenger Advisory</span>
                      <p className="text-amber-800 leading-relaxed text-[11px]">
                        {selectedMotel.notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Coordinates & Contact */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">
                  {selectedMotel.latitude.toFixed(4)}° N, {selectedMotel.longitude.toFixed(4)}° E
                </span>
                {selectedMotel.contactNumber && (
                  <a
                    href={`tel:${selectedMotel.contactNumber}`}
                    className="text-tnstc-blue hover:underline flex items-center space-x-1 font-medium"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{selectedMotel.contactNumber}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Pinned Action Footer */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMotel.latitude},${selectedMotel.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Highway Directions</span>
              </a>
            </div>
          </aside>
        )}
      </div>

      {/* Clean Bottom Status Bar */}
      <div className="bg-white border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-medium text-slate-700">Official Arasu Highway Motels GIS</span>
          <span className="hidden md:inline text-slate-400">• Click any marker on map to view facilities, ratings & route directions</span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          57 Authorized Rest Stops • PostGIS Enabled
        </div>
      </div>
    </div>
  );
};
