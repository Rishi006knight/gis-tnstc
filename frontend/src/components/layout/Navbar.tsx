import React from 'react';
import { PageView } from '../../types';
import { Bus, MapPin, GraduationCap, Calculator, Home, ChevronRight, Compass } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const getBreadcrumbs = () => {
    switch (currentPage) {
      case 'home':
        return [{ label: 'Home', page: 'home' as PageView }];
      case 'general-info':
        return [
          { label: 'Home', page: 'home' as PageView },
          { label: 'General Information', page: 'general-info' as PageView }
        ];
      case 'motels':
        return [
          { label: 'Home', page: 'home' as PageView },
          { label: 'General Information', page: 'general-info' as PageView },
          { label: 'Motels GIS Map', page: 'motels' as PageView }
        ];
      case 'training-institutes':
        return [
          { label: 'Home', page: 'home' as PageView },
          { label: 'General Information', page: 'general-info' as PageView },
          { label: 'Training Institutes GIS Map', page: 'training-institutes' as PageView }
        ];
      case 'fare-calculator':
        return [
          { label: 'Home', page: 'home' as PageView },
          { label: 'General Information', page: 'general-info' as PageView },
          { label: 'Travel Fare Calculator', page: 'fare-calculator' as PageView }
        ];
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Government Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-tnstc-navy to-tnstc-blue text-white px-4 sm:px-8 py-1.5 text-xs flex justify-between items-center font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Government of Tamil Nadu • Transport Department</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-slate-200">
          <span className="hover:text-white transition">SETC</span>
          <span>•</span>
          <span className="hover:text-white transition">TNSTC</span>
          <span>•</span>
          <span className="hover:text-white transition">MTC</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Portal Title */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 shadow-md border border-slate-200/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img src="/tnstc-logo.png" alt="TNSTC Official Emblem" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-tnstc-amber bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  GIS Portal
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug group-hover:text-tnstc-blue transition-colors">
                Tamil Nadu Transport Information Portal
              </h1>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-tnstc-blue font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => onNavigate('general-info')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
                currentPage === 'general-info'
                  ? 'bg-blue-50 text-tnstc-blue font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>General Info</span>
            </button>

            <button
              onClick={() => onNavigate('motels')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
                currentPage === 'motels'
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Motels GIS</span>
            </button>

            <button
              onClick={() => onNavigate('training-institutes')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
                currentPage === 'training-institutes'
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span>IRT Institutes</span>
            </button>

            <button
              onClick={() => onNavigate('fare-calculator')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-1.5 ${
                currentPage === 'fare-calculator'
                  ? 'bg-blue-50 text-tnstc-blue font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-tnstc-blue" />
              <span>Fare Calculator</span>
            </button>
          </nav>

          {/* Quick Mobile Action */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => onNavigate(currentPage === 'home' ? 'general-info' : 'home')}
              className="p-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-sm font-medium flex items-center space-x-1"
            >
              {currentPage === 'home' ? (
                <>
                  <span>Browse Info</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Responsive Breadcrumbs Bar */}
        <div className="py-2 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
              <button
                onClick={() => onNavigate(crumb.page)}
                className={`hover:text-tnstc-blue transition font-medium ${
                  idx === breadcrumbs.length - 1 ? 'text-tnstc-blue font-semibold' : ''
                }`}
              >
                {crumb.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
    </header>
  );
};
