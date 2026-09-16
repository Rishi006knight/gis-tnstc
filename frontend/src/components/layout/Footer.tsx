import React from 'react';
import { Bus, ShieldCheck, ExternalLink, MapPin, Phone, Mail } from 'lucide-react';
import { PageView } from '../../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Portal Overview */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-3 text-white font-bold text-base">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-sm flex items-center justify-center shrink-0">
                <img src="/tnstc-logo.png" alt="TNSTC" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="block leading-tight">TNSTC GIS Portal</span>
                <span className="text-[10px] text-slate-400 font-normal">தமிழ்நாடு அரசு போக்குவரத்து கழகம்</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spatial Information System for Tamil Nadu State Transport Undertakings (SETC, TNSTC, MTC). Providing live highway stop, training institute, and route fare data.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Transport Data</span>
            </div>
          </div>

          {/* Col 2: Phase 1 Modules */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Phase 1 Active Modules
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('motels')}
                  className="hover:text-emerald-400 transition flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Arasu Highway Motels GIS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('training-institutes')}
                  className="hover:text-amber-400 transition flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>IRT Driver Training Institutes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fare-calculator')}
                  className="hover:text-blue-400 transition flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Travel Fare & Ghat Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('general-info')}
                  className="hover:text-white transition flex items-center space-x-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  <span>General Information Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Undertakings (Phase 2) */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Transport Divisions
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>State Express Transport Corp (SETC)</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Phase 2</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Tamil Nadu State Transport Corp (TNSTC)</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Phase 2</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Metropolitan Transport Corp (MTC Chennai)</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Phase 2</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Institute of Road Transport (IRT)</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">Active</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Official Links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Support & Administration
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Transport House, Pallavan Salai, Chennai 600002, Tamil Nadu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Helpline: 044-2345 5801</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>contact.transport@tn.gov.in</span>
              </div>
              <a
                href="https://www.tnstc.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-tnstc-lightBlue hover:underline pt-1 text-xs"
              >
                <span>Official TNSTC Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Government of Tamil Nadu. Built with Leaflet, React, and PostGIS.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Use</span>
            <span>•</span>
            <span>Open Data License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
