import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TrainingInstitute } from '../types';
import { apiService } from '../services/api';
import { INITIAL_INSTITUTES } from '../data/mockData';
import {
  Search,
  Filter,
  GraduationCap,
  MapPin,
  Award,
  BookOpen,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Home,
  X,
  RotateCcw,
  Navigation,
  Map,
  Layers
} from 'lucide-react';

export const TrainingInstituteMapPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [institutes, setInstitutes] = useState<TrainingInstitute[]>(INITIAL_INSTITUTES);
  const [selectedInstitute, setSelectedInstitute] = useState<TrainingInstitute | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [districts, setDistricts] = useState<string[]>([]);

  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const streetLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // 1. Load data
  useEffect(() => {
    const load = async () => {
      const data = await apiService.getTrainingInstitutes();
      setInstitutes(data);
      const uniqueDistricts = Array.from(new Set(data.map(i => i.district))).sort();
      setDistricts(uniqueDistricts);
    };
    load();
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [11.0, 78.5],
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

  // 3. Filter Institutes
  const filteredInstitutes = institutes.filter(inst => {
    const matchesDistrict = selectedDistrict === 'All' || inst.district.toLowerCase() === selectedDistrict.toLowerCase();
    const matchesCourse = selectedCourse === 'All' || inst.coursesOffered.some(c => c.toLowerCase().includes(selectedCourse.toLowerCase()));
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      inst.name.toLowerCase().includes(q) ||
      inst.district.toLowerCase().includes(q) ||
      inst.locationName.toLowerCase().includes(q);
    return matchesDistrict && matchesCourse && matchesQuery;
  });

  // 4. Draw Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    const bounds: L.LatLngExpression[] = [];

    filteredInstitutes.forEach(inst => {
      const isSelected = selectedInstitute?.id === inst.id;

      // Orange marker for IRT institutes
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="custom-marker-pin pin-orange ${isSelected ? 'pin-selected' : ''}" style="width: 34px; height: 34px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([inst.latitude, inst.longitude], { icon: customIcon });

      marker.on('click', () => {
        setSelectedInstitute(inst);
        map.setView([inst.latitude, inst.longitude], 11, { animate: true });
      });

      marker.bindTooltip(
        `<div class="font-sans"><strong>${inst.name}</strong><br/><span class="text-xs text-slate-500">${inst.district} • IRT Centre</span></div>`,
        { direction: 'top', offset: [0, -10] }
      );

      marker.addTo(layer);
      bounds.push([inst.latitude, inst.longitude]);
    });

    if (bounds.length > 0 && !selectedInstitute) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  }, [filteredInstitutes, selectedInstitute]);

  const handleResetView = () => {
    setSelectedInstitute(null);
    if (mapInstanceRef.current && filteredInstitutes.length > 0) {
      const bounds = filteredInstitutes.map(i => [i.latitude, i.longitude] as [number, number]);
      mapInstanceRef.current.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[620px] max-h-[850px] w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
      {/* Top Filter and Search Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 z-20 shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[300px]">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Institute, District or City..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 bg-slate-50 transition"
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
          <div className="flex items-center space-x-1.5">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="text-sm font-medium py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-slate-700"
            >
              <option value="All">All Districts</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
              className="text-sm font-medium py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-slate-700"
            >
              <option value="All">All Courses</option>
              <option value="Heavy">Heavy Transport Vehicle</option>
              <option value="Refresher">Driver Refresher Course</option>
              <option value="PSV">PSV Badge Certification</option>
              <option value="Hazardous">Hazardous Goods</option>
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

          <div className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
            <span className="font-bold">{filteredInstitutes.length}</span> / {institutes.length} IRT Centres
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

      {/* Map + Detail Panel */}
      <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full" />

        {selectedInstitute && (
          <aside className="absolute top-2 right-2 bottom-2 left-2 sm:left-auto sm:top-3 sm:right-3 sm:bottom-3 w-auto sm:w-[380px] max-h-[calc(100%-1rem)] sm:max-h-[calc(100%-1.5rem)] z-30 bg-white rounded-2xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom sm:slide-in-from-right">
            {/* Header */}
            <div className="shrink-0 bg-white/95 backdrop-blur-md px-5 py-3.5 border-b border-slate-100 flex items-start justify-between z-10">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  IRT Govt Centre • Estd {selectedInstitute.establishedYear}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
                  {selectedInstitute.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{selectedInstitute.locationName}, {selectedInstitute.district}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedInstitute(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body with independent scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-slate-600 overscroll-contain">
              {/* Infrastructure Indicators */}
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="p-1">
                  <span className="block text-[10px] text-slate-400">Track</span>
                  <span className={`text-xs font-bold ${selectedInstitute.hasDrivingTrack ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {selectedInstitute.hasDrivingTrack ? '✓ Dedicated' : 'External'}
                  </span>
                </div>
                <div className="p-1 border-x border-slate-200">
                  <span className="block text-[10px] text-slate-400">PSV Badge</span>
                  <span className={`text-xs font-bold ${selectedInstitute.providesPsvBadge ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {selectedInstitute.providesPsvBadge ? '✓ Authorized' : 'No'}
                  </span>
                </div>
                <div className="p-1">
                  <span className="block text-[10px] text-slate-400">Hostel</span>
                  <span className={`text-xs font-bold ${selectedInstitute.hasHostelFacility ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {selectedInstitute.hasHostelFacility ? '✓ Available' : 'No'}
                  </span>
                </div>
              </div>

              {/* Courses Offered */}
              <div>
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-2">
                  Training & Driver Certification Courses
                </span>
                <div className="space-y-1.5">
                  {selectedInstitute.coursesOffered.map(course => (
                    <div
                      key={course}
                      className="p-2 rounded-lg bg-amber-50/60 border border-amber-100 text-amber-950 font-medium flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility Criteria */}
              {selectedInstitute.eligibilityCriteria && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-semibold text-slate-800 text-[11px] block mb-1">
                    Admission & Eligibility Requirements
                  </span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {selectedInstitute.eligibilityCriteria}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1.5 text-slate-700">
                <span className="font-semibold text-blue-900 text-[11px] block">
                  Institute Contact Desk
                </span>
                {selectedInstitute.contactPerson && (
                  <p className="text-[11px] font-medium">{selectedInstitute.contactPerson}</p>
                )}
                <div className="flex flex-col space-y-1 text-[11px]">
                  {selectedInstitute.contactPhone && (
                    <a
                      href={`tel:${selectedInstitute.contactPhone}`}
                      className="text-tnstc-blue hover:underline flex items-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-tnstc-blue shrink-0" />
                      <span>{selectedInstitute.contactPhone}</span>
                    </a>
                  )}
                  {selectedInstitute.email && (
                    <a
                      href={`mailto:${selectedInstitute.email}`}
                      className="text-tnstc-blue hover:underline flex items-center space-x-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-tnstc-blue shrink-0" />
                      <span>{selectedInstitute.email}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                  Postal Address
                </span>
                <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-600 leading-relaxed">
                  {selectedInstitute.address}
                </p>
              </div>
            </div>

            {/* Pinned Action Footer */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0 flex items-center space-x-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedInstitute.latitude},${selectedInstitute.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-center flex items-center justify-center space-x-1.5 shadow-md shadow-amber-600/20 transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate</span>
              </a>

              {selectedInstitute.websiteUrl && (
                <a
                  href={selectedInstitute.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
                  title="Open IRT Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Clean Bottom Status Bar */}
      <div className="bg-white border-t border-slate-200 px-4 py-2.5 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 shrink-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="font-medium text-slate-700">Official IRT Driver Training Institutes GIS</span>
          <span className="hidden md:inline text-slate-400">• Click any centre on map to view courses, eligibility & contact</span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          17 Government Centres • PostGIS Enabled
        </div>
      </div>
    </div>
  );
};
