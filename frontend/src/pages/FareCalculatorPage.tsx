import React, { useState, useEffect } from 'react';
import { FareRate } from '../types';
import { apiService } from '../services/api';
import { INITIAL_FARE_RATES, POPULAR_ROUTES } from '../data/mockData';
import {
  Calculator,
  Mountain,
  AlertCircle,
  Receipt,
  Bus,
  Sparkles,
  Info,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const FareCalculatorPage: React.FC = () => {
  // Direct distance input (as in tickettogetlost.com)
  const [distanceKm, setDistanceKm] = useState<string>('120');
  const [selectedServiceCode, setSelectedServiceCode] = useState<string>('ORDINARY');
  const [isGhatRoad, setIsGhatRoad] = useState<boolean>(false);
  const [rates, setRates] = useState<FareRate[]>(INITIAL_FARE_RATES);

  // Result state
  const [calculatedFare, setCalculatedFare] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Selected route preset
  const [selectedPresetRoute, setSelectedPresetRoute] = useState<string>('');

  // Load fare rates
  useEffect(() => {
    const load = async () => {
      const r = await apiService.getFareRates();
      setRates(r);
    };
    load();
  }, []);

  // Compute fare using tickettogetlost.com formula:
  // Math.round(distance * perKmRate * (isGhat ? 1.20 : 1.0))
  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const dist = parseFloat(distanceKm);
    if (!distanceKm || isNaN(dist) || dist <= 0) {
      setErrorMessage('Please enter a valid distance.');
      setCalculatedFare(null);
      return;
    }

    setErrorMessage('');
    const rate = rates.find(r => r.serviceCode === selectedServiceCode) || rates[0];
    const multiplier = isGhatRoad ? 1.20 : 1.00;
    const fare = Math.round(dist * rate.ratePerKm * multiplier);
    setCalculatedFare(fare);
  };

  // Run calculation on initial load
  useEffect(() => {
    handleCalculate();
  }, [rates]);

  // Handle Preset Route selection
  const handleSelectRoutePreset = (routeIdxStr: string) => {
    setSelectedPresetRoute(routeIdxStr);
    if (routeIdxStr === '') return;
    const idx = parseInt(routeIdxStr, 10);
    const r = POPULAR_ROUTES[idx];
    if (r) {
      setDistanceKm(r.distanceKm.toString());
      setIsGhatRoad(r.isGhatRoute);
      setErrorMessage('');
      const rate = rates.find(rateObj => rateObj.serviceCode === selectedServiceCode) || rates[0];
      const multiplier = r.isGhatRoute ? 1.20 : 1.00;
      setCalculatedFare(Math.round(r.distanceKm * rate.ratePerKm * multiplier));
    }
  };

  const currentRate = rates.find(r => r.serviceCode === selectedServiceCode) || rates[0];
  const parsedDist = parseFloat(distanceKm) || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-tnstc-blue border border-blue-200 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Official TNSTC & SETC Tariff</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          TNSTC / SETC Bus Fare Calculator
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Quickly calculate and estimate your Tamil Nadu government bus travel fare based on exact distance, bus service type, and hill station ghat road rules.
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-xl mx-auto">
        <form onSubmit={handleCalculate} className="space-y-5">
          {/* Optional: Popular Route Presets */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
              <span>Popular Corridor Preset (Optional)</span>
              <span className="text-[10px] font-normal text-slate-400">Autofills KM</span>
            </label>
            <select
              value={selectedPresetRoute}
              onChange={e => handleSelectRoutePreset(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 text-xs font-medium text-slate-700 transition"
            >
              <option value="">-- Choose a standard route or type custom KM below --</option>
              {POPULAR_ROUTES.map((r, idx) => (
                <option key={idx} value={idx}>
                  {r.origin} ➔ {r.destination} ({r.distanceKm} km {r.isGhatRoute ? '• Ghat Route' : ''})
                </option>
              ))}
            </select>
          </div>

          {/* 1. Distance Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#0d47a1]">
              Distance (Approximate KM)
            </label>
            <input
              type="number"
              placeholder="Eg: 120"
              value={distanceKm}
              onChange={e => {
                setDistanceKm(e.target.value);
                setSelectedPresetRoute('');
              }}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/30 focus:border-[#0d47a1] text-base font-semibold text-slate-800 transition"
              min="1"
              step="any"
            />
          </div>

          {/* 2. Bus Type Select */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#0d47a1]">
              Bus Type
            </label>
            <select
              value={selectedServiceCode}
              onChange={e => setSelectedServiceCode(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/30 focus:border-[#0d47a1] text-sm font-semibold text-slate-800 transition"
            >
              {rates.map(r => (
                <option key={r.serviceCode} value={r.serviceCode}>
                  {r.serviceName} (₹{r.ratePerKm.toFixed(2)} / km)
                </option>
              ))}
            </select>
          </div>

          {/* 3. Ghat Road Checkbox */}
          <div className="pt-1">
            <label className="flex items-center space-x-3 cursor-pointer select-none bg-emerald-50/70 border border-emerald-200/80 p-3 rounded-xl hover:bg-emerald-50 transition">
              <input
                type="checkbox"
                checked={isGhatRoad}
                onChange={e => setIsGhatRoad(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center space-x-1.5">
                <Mountain className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ghat Road / Hill Station Route (+20%)</span>
              </span>
            </label>
          </div>

          {/* Error Message if invalid */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 4. Calculate CTA Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0d47a1] hover:bg-[#09327a] text-white font-bold text-base shadow-md transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate Fare</span>
          </button>
        </form>

        {/* 5. Result Display */}
        {calculatedFare !== null && !errorMessage && (
          <div className="mt-6 pt-6 border-t border-slate-200 text-center animate-in fade-in duration-300">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 block mb-1">
              Estimated Ticket Amount
            </span>
            <div className="text-3xl sm:text-4xl font-black text-[#0d47a1]">
              Approx Bus Fare: ₹{calculatedFare}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Formula: {parsedDist} km × ₹{currentRate.ratePerKm.toFixed(2)}/km {isGhatRoad ? '× 1.20 (+20% Ghat Surcharge)' : ''} = ₹{calculatedFare}
            </p>
          </div>
        )}
      </div>

      {/* Full Comparison Table Across All 8 Bus Types for Current Distance */}
      {parsedDist > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Bus className="w-4 h-4 text-tnstc-blue" />
                <span>Compare All Service Fares for {parsedDist} KM</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Side-by-side fare comparison across Ordinary, Deluxe, AC, and Sleeper coaches {isGhatRoad ? '(including +20% Ghat surcharge)' : ''}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {rates.map(r => {
              const fareVal = Math.round(parsedDist * r.ratePerKm * (isGhatRoad ? 1.20 : 1.00));
              const isSelected = r.serviceCode === selectedServiceCode;
              return (
                <div
                  key={r.serviceCode}
                  onClick={() => {
                    setSelectedServiceCode(r.serviceCode);
                    const multiplier = isGhatRoad ? 1.20 : 1.00;
                    setCalculatedFare(Math.round(parsedDist * r.ratePerKm * multiplier));
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'border-[#0d47a1] bg-blue-50/60 ring-2 ring-[#0d47a1]/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 line-clamp-1">
                      {r.serviceName}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0d47a1] shrink-0" />
                    )}
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 mt-2">
                    ₹{fareVal}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    ₹{r.ratePerKm.toFixed(2)} / km
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official Government Slabs Reference */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-[#0d47a1]" />
          <span>Official Tamil Nadu Bus Tariff Slab Matrix</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Bus Category</th>
                <th className="py-2.5 px-3 font-semibold">Rate / KM</th>
                <th className="py-2.5 px-3 font-semibold">Standard (100 KM)</th>
                <th className="py-2.5 px-3 font-semibold">Ghat Route (+20%)</th>
                <th className="py-2.5 px-3 font-semibold">Service Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rates.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{r.serviceName}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#0d47a1]">₹{r.ratePerKm.toFixed(2)} / km</td>
                  <td className="py-2.5 px-3 font-mono">₹{Math.round(100 * r.ratePerKm)}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">₹{Math.round(100 * r.ratePerKm * 1.20)}</td>
                  <td className="py-2.5 px-3 text-slate-500">{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Government Concessions & Travel Schemes */}
      <div className="bg-gradient-to-br from-slate-900 to-tnstc-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Official Tamil Nadu Government Concession Schemes</span>
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight mb-4">
          Subsidized & Special Passenger Concessions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-bold text-amber-300 block text-sm mb-1">Women & Transgender</span>
            <p className="text-slate-300 leading-relaxed">
              <strong>100% Free Travel</strong> in all Government ordinary town bus services across Tamil Nadu.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-bold text-amber-300 block text-sm mb-1">Students</span>
            <p className="text-slate-300 leading-relaxed">
              <strong>100% Free Pass</strong> for School students (up to 12th) & <strong>50% Concession</strong> for College/Polytechnic students.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-bold text-amber-300 block text-sm mb-1">Group Booking</span>
            <p className="text-slate-300 leading-relaxed">
              <strong>10% Flat Discount</strong> on ticket fare for a group of 10 or more passengers booking SETC services.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
            <span className="font-bold text-amber-300 block text-sm mb-1">Regular Commuters</span>
            <p className="text-slate-300 leading-relaxed">
              <strong>33.33% Concession</strong> on Monthly Season Tickets (pay for 40 single trips, travel for full month).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
