import React from 'react';
import { PageView } from '../types';
import { ArrowLeft, Map, Building, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

interface SetcDashboardProps {
  onNavigate: (page: PageView) => void;
}

export const SetcDashboard: React.FC<SetcDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onNavigate('home')}
          className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-600"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
          <img src="/setc-logo.png" alt="SETC Logo" className="w-full h-full object-contain rounded-xl" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">SETC Dashboard</h1>
          <p className="text-slate-500 font-medium">State Express Transport Corporation GIS Modules</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-slate-600">
        SETC operates long-distance express services connecting major cities within Tamil Nadu and to neighboring states like Kerala, Karnataka, Andhra Pradesh, and Puducherry.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Routes */}
        <div 
          onClick={() => onNavigate('setc-routes')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-tnstc-blue transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-tnstc-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Map className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-tnstc-blue flex items-center space-x-2">
            <span>SETC Routes GIS</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            View the extensive interstate and intercity route network operated by SETC.
          </p>
        </div>

        {/* Reservation Centres */}
        <div 
          onClick={() => onNavigate('setc-reservation-centres')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 flex items-center space-x-2">
            <span>Reservation Centres</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Map of physical ticket booking counters and regional reservation offices.
          </p>
        </div>

        {/* Depots */}
        <div 
          onClick={() => onNavigate('setc-depots')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 flex items-center space-x-2">
            <span>Depots & Outstations</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Locations of SETC bus depots, workshops, and outstation operating points.
          </p>
        </div>

        {/* Special Services */}
        <div 
          onClick={() => onNavigate('setc-special-services')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 flex items-center space-x-2">
            <span>Special Services</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Seasonal festival services like Velankanni, Thiruvannamalai, and Sabarimala.
          </p>
        </div>

        {/* History */}
        <div 
          onClick={() => onNavigate('setc-history')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-rose-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 flex items-center space-x-2">
            <span>History & Awards</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Timeline of SETC's evolution, fleet growth, and national awards received.
          </p>
        </div>
      </div>
    </div>
  );
};
