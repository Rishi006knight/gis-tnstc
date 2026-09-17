import React from 'react';
import { PageView } from '../types';
import { MapPin, GraduationCap, Calculator, ArrowRight, Clock, Sparkles, Building2, Layers } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-tnstc-navy to-tnstc-blue text-white shadow-xl px-6 py-12 sm:px-12 sm:py-16">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>தமிழ்நாடு அரசு போக்குவரத்து கழகம் • TNSTC GIS Portal</span>
            </div>

            <div className="flex items-center space-x-4 lg:hidden mb-2">
              <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg ring-2 ring-amber-400/40 shrink-0">
                <img src="/tnstc-logo.png" alt="TNSTC Emblem" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="text-xs font-semibold text-amber-200">
                Official Transport GIS & Information Portal
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Tamil Nadu Transport <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-amber-200 to-white">
                Information Portal
              </span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              Centralized spatial information system for passengers, fleet operators, and transport authorities. Explore authorized highway motels, IRT driver institutes, and travel fare estimation across Tamil Nadu.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('general-info')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-sm shadow-lg shadow-amber-500/30 transition flex items-center space-x-2 group"
              >
                <span>Explore General Information</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('motels')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-sm transition backdrop-blur-sm flex items-center space-x-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>View Motels GIS</span>
              </button>
            </div>
          </div>

          {/* Forefront Official Emblem Display */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl text-center max-w-[260px]">
            <div className="w-36 h-36 rounded-full bg-white p-2 shadow-2xl flex items-center justify-center ring-4 ring-amber-400/60 transform hover:scale-105 transition-transform duration-300">
              <img src="/tnstc-logo.png" alt="Tamil Nadu State Transport Corporation" className="w-full h-full object-contain rounded-full drop-shadow-md" />
            </div>
            <h4 className="mt-4 font-bold text-sm text-white tracking-wide">
              தமிழ்நாடு அரசு
            </h4>
            <p className="text-xs font-semibold text-amber-300 mt-0.5">
              போக்குவரத்து கழகம்
            </p>
            <span className="text-[11px] text-slate-300 mt-1 block">
              TNSTC • SETC • MTC
            </span>
          </div>
        </div>
      </section>

      {/* 4 Large Division Portal Cards (2x2 Grid) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Transport Divisions & Information Portals
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Select a division or access general operational data. Phase 1 provides active access to General Information GIS modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: SETC (Under Research) */}
          <div 
            onClick={() => onNavigate('setc')}
            className="relative group bg-gradient-to-br from-white via-green-50/40 to-green-100/50 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/15 hover:border-emerald-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-emerald-200 group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
                <img src="/setc-logo.png" alt="SETC" className="w-full h-full object-contain rounded-xl" />
              </div>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Module</span>
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center space-x-2">
                <span>SETC Dashboard</span>
                <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1.5 transition-transform" />
              </h3>
              <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                State Express Transport Corporation
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                Interstate and long-distance intercity express services connecting major pilgrimage and metropolitan centers across South India.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Depots, Route Network & Schedules</span>
              <span className="text-emerald-600 font-bold">Phase 2 Active</span>
            </div>
          </div>

          {/* Card 2: TNSTC (Under Research) */}
          <div className="relative group bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-200 opacity-80 hover:opacity-90">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-800 border border-amber-300/60">
                <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Under Research
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
                TNSTC
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tamil Nadu State Transport Corporation
              </p>
              <p className="text-sm text-slate-500 leading-relaxed pt-1">
                Regional transport divisions covering Villupuram, Salem, Coimbatore, Kumbakonam, Madurai, and Tirunelveli rural & mofussil transit.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Regional Zones & Fleet Statistics</span>
              <span className="italic">Available in Phase 2</span>
            </div>
          </div>

          {/* Card 3: MTC (Under Research) */}
          <div className="relative group bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-200 opacity-80 hover:opacity-90">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                <Layers className="w-6 h-6" />
              </div>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100/80 text-amber-800 border border-amber-300/60">
                <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Under Research
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
                MTC
              </h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Metropolitan Transport Corporation (Chennai)
              </p>
              <p className="text-sm text-slate-500 leading-relaxed pt-1">
                Chennai metropolitan urban bus transport network servicing the Greater Chennai Area, suburban corridors, and IT expressways.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>City Routes & Terminus Maps</span>
              <span className="italic">Available in Phase 2</span>
            </div>
          </div>

          {/* Card 4: General Information (ACTIVE & INVITING) */}
          <div
            onClick={() => onNavigate('general-info')}
            className="relative group bg-gradient-to-br from-white via-blue-50/40 to-blue-100/50 border-2 border-tnstc-blue/40 rounded-2xl p-6 sm:p-8 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/15 hover:border-tnstc-blue transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-slate-200 group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
                <img src="/tnstc-logo.png" alt="TNSTC" className="w-full h-full object-contain rounded-full" />
              </div>
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Module</span>
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-tnstc-blue transition-colors flex items-center space-x-2">
                <span>General Information</span>
                <ArrowRight className="w-5 h-5 text-tnstc-blue group-hover:translate-x-1.5 transition-transform" />
              </h3>
              <p className="text-xs font-semibold text-tnstc-blue uppercase tracking-wider">
                GIS Maps & Travel Utilities
              </p>
              <p className="text-sm text-slate-600 leading-relaxed pt-1">
                Access official Arasu highway motels, Institute of Road Transport (IRT) driving centers, and calculate distance-based fares with flexi & ghat surcharges.
              </p>
            </div>

            {/* Sub-features pills */}
            <div className="mt-6 pt-4 border-t border-blue-200/60 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Motels GIS</span>
              </span>
              <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                <span>IRT Institutes</span>
              </span>
              <span className="inline-flex items-center space-x-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium">
                <Calculator className="w-3.5 h-3.5 text-tnstc-blue" />
                <span>Fare Estimator</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary Feature Highlights */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            onClick={() => onNavigate('motels')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 hover:border-emerald-200 transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 text-sm">
              Arasu Highway Motels
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Authorized meal halts along NH-45, NH-44, and NH-544 with clean restrooms and EV charging.
            </p>
          </div>

          <div
            onClick={() => onNavigate('training-institutes')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-100 hover:border-amber-200 transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 group-hover:text-amber-900 text-sm">
              IRT Driver Training
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Heavy vehicle license programs, PSV badge certification, and defensive driving centers.
            </p>
          </div>

          <div
            onClick={() => onNavigate('fare-calculator')}
            className="p-4 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-tnstc-blue flex items-center justify-center mb-3">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 group-hover:text-tnstc-blue text-sm">
              Travel Fare Calculator
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Kilometer-based stage fare calculation with +20% ghat surcharge and weekend flexi rules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
