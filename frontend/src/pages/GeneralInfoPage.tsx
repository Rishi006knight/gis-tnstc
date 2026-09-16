import React from 'react';
import { PageView } from '../types';
import { UtensilsCrossed, GraduationCap, Calculator, ArrowRight, MapPin, Sparkles, Shield, Compass, ChevronRight } from 'lucide-react';

interface GeneralInfoPageProps {
  onNavigate: (page: PageView) => void;
}

export const GeneralInfoPage: React.FC<GeneralInfoPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-tnstc-blue border border-blue-200 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>General Information Sub-Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              State Transport Utilities & GIS Services
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Explore spatial datasets for passenger rest stops, driver certification centers, and route fare computations authorized under the Tamil Nadu Motor Vehicles Rules.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs bg-slate-50 border border-slate-200 p-3 rounded-xl shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              GIS
            </div>
            <div>
              <p className="font-semibold text-slate-800">PostGIS Enabled</p>
              <p className="text-slate-500">Live Spatial Coordinates</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Motels GIS */}
        <div
          onClick={() => onNavigate('motels')}
          className="group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <UtensilsCrossed className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                GIS Map
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                Arasu Motels
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Official authorized highway refreshment stops for SETC and TNSTC buses with facility ratings, restrooms, and locations.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>NH-45, NH-44, NH-544 Corridors</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Cleanliness ratings & EV charging status</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
            <span>Launch Motel Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Card 2: Training Institutes GIS */}
        <div
          onClick={() => onNavigate('training-institutes')}
          className="group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                GIS Map
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors mt-0.5">
                Training Institutes
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Institute of Road Transport (IRT) authorized driver training colleges, PSV badge endorsements, and testing tracks.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Chromepet, Karur, Trichy, Madurai</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Course details, eligibility & hostel flags</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-amber-700 group-hover:text-amber-800">
            <span>Launch IRT Map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Card 3: Travel Fare Calculator */}
        <div
          onClick={() => onNavigate('fare-calculator')}
          className="group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-tnstc-blue flex items-center justify-center group-hover:scale-110 group-hover:bg-tnstc-blue group-hover:text-white transition-all duration-300 shadow-sm">
              <Calculator className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-semibold text-tnstc-blue uppercase tracking-wider">
                Rate Calculator
              </span>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-tnstc-blue transition-colors mt-0.5">
                Travel Fare Calculator
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Distance and service-class based passenger fare calculator applying official rate per km, ghat +20% rules, and flexi multipliers.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Ordinary, Express, Deluxe & AC Sleeper</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Lean / Peak weekend rate adjustment</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-tnstc-blue group-hover:text-blue-800">
            <span>Open Fare Calculator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
