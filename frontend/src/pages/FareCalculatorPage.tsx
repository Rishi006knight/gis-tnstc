import React, { useState, useEffect } from 'react';
import { FareCalculateResponse, FareRate } from '../types';
import { apiService } from '../services/api';
import { TN_CITIES, POPULAR_ROUTES, INITIAL_FARE_RATES } from '../data/mockData';
import {
  Calculator,
  ArrowRightLeft,
  Calendar,
  Mountain,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Receipt,
  Bus,
  ChevronDown,
  Info
} from 'lucide-react';

export const FareCalculatorPage: React.FC = () => {
  const [originCity, setOriginCity] = useState('Chennai (Kilambakkam)');
  const [destinationCity, setDestinationCity] = useState('Madurai');
  const [serviceCode, setServiceCode] = useState('ULTRA_DELUXE');
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isGhatRoad, setIsGhatRoad] = useState(false);
  const [customDistance, setCustomDistance] = useState<string>('');
  const [rates, setRates] = useState<FareRate[]>(INITIAL_FARE_RATES);
  const [result, setResult] = useState<FareCalculateResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto detect ghat route when cities change
  useEffect(() => {
    const isGhat = POPULAR_ROUTES.some(
      r =>
        ((r.origin.toLowerCase() === originCity.toLowerCase() && r.destination.toLowerCase() === destinationCity.toLowerCase()) ||
         (r.origin.toLowerCase() === destinationCity.toLowerCase() && r.destination.toLowerCase() === originCity.toLowerCase())) &&
        r.isGhatRoute
    );
    setIsGhatRoad(isGhat);
  }, [originCity, destinationCity]);

  // Load fare rates
  useEffect(() => {
    const load = async () => {
      const r = await apiService.getFareRates();
      setRates(r);
    };
    load();
  }, []);

  // Initial calculation on mount
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleSwapCities = () => {
    const temp = originCity;
    setOriginCity(destinationCity);
    setDestinationCity(temp);
  };

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    const parsedDist = customDistance ? parseFloat(customDistance) : undefined;

    const res = await apiService.calculateFare({
      originCity,
      destinationCity,
      serviceCode,
      travelDate,
      isGhatRoad,
      customDistanceKm: parsedDist,
    });

    setResult(res);
    setLoading(false);
  };

  // Day of week check
  const selectedDateObj = new Date(travelDate);
  const dayNum = selectedDateObj.getDay();
  const isWeekendPeak = dayNum === 0 || dayNum === 5 || dayNum === 6;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-tnstc-blue border border-blue-200 text-xs font-semibold">
          <Calculator className="w-3.5 h-3.5" />
          <span>Stage & Distance Based Fare Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Travel Fare Calculator
        </h2>
        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Estimate intercity bus fares across Tamil Nadu with government-notified kilometer rates, +20% ghat road surcharge, and flexi peak-day adjustments.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Origin & Destination Inputs with Swap */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
            {/* Origin City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                From Location (Origin)
              </label>
              <div className="relative">
                <select
                  value={originCity}
                  onChange={e => setOriginCity(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 focus:border-tnstc-blue text-sm font-semibold text-slate-800 transition"
                >
                  {TN_CITIES.map(c => (
                    <option key={`from-${c}`} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center md:pt-6">
              <button
                type="button"
                onClick={handleSwapCities}
                className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 flex items-center justify-center transition shadow-sm"
                title="Swap Locations"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                To Location (Destination)
              </label>
              <div className="relative">
                <select
                  value={destinationCity}
                  onChange={e => setDestinationCity(e.target.value)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 focus:border-tnstc-blue text-sm font-semibold text-slate-800 transition"
                >
                  {TN_CITIES.map(c => (
                    <option key={`to-${c}`} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Service Class & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service Class Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Bus Service Class
              </label>
              <select
                value={serviceCode}
                onChange={e => setServiceCode(e.target.value)}
                className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 focus:border-tnstc-blue text-sm font-semibold text-slate-800 transition"
              >
                {rates.map(rate => (
                  <option key={rate.serviceCode} value={rate.serviceCode}>
                    {rate.serviceName} (₹{rate.ratePerKm.toFixed(2)} / km)
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Date of Journey
                </label>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isWeekendPeak ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isWeekendPeak ? '⚡ Weekend Flexi Peak' : '✓ Normal Lean Fare'}
                </span>
              </div>
              <input
                type="date"
                value={travelDate}
                onChange={e => setTravelDate(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 focus:border-tnstc-blue text-sm font-medium text-slate-800 transition"
              />
            </div>
          </div>

          {/* Optional Ghat & Custom Distance Options */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            {/* Ghat Road Checkbox */}
            <label className="flex items-center space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isGhatRoad}
                onChange={e => setIsGhatRoad(e.target.checked)}
                className="w-4 h-4 rounded text-tnstc-blue focus:ring-tnstc-blue/40 border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5">
                <Mountain className="w-4 h-4 text-emerald-600" />
                <span>Apply Ghat Section Rule (+20% on hill corridor)</span>
              </span>
            </label>

            {/* Custom Distance Override (Optional) */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500 font-medium">Custom KM:</span>
              <input
                type="number"
                placeholder="Auto"
                value={customDistance}
                onChange={e => setCustomDistance(e.target.value)}
                className="w-20 px-2 py-1 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Calculate CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-tnstc-blue via-blue-700 to-tnstc-navy hover:from-blue-700 hover:to-blue-900 text-white font-bold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>{loading ? 'Calculating Fare...' : 'Calculate Journey Fare'}</span>
          </button>
        </form>
      </div>

      {/* Results Breakdown Card */}
      {result && (
        <div className="bg-white border-2 border-tnstc-blue/30 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-tnstc-blue border border-blue-200">
                Official Fare Estimation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {result.originCity} → {result.destinationCity}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-2">
                <span>{result.serviceName}</span>
                <span>•</span>
                <span>Travel Day: {result.dayOfWeek}</span>
              </p>
            </div>

            {/* Big Total Fare Block */}
            <div className="text-left sm:text-right bg-blue-50/70 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-blue-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Estimated Payable Fare
              </span>
              <div className="text-3xl sm:text-4xl font-black text-tnstc-blue">
                ₹{result.totalFare}
              </div>
              <span className="text-[10px] text-slate-500">Per Adult Passenger</span>
            </div>
          </div>

          {/* 4 Stat Blocks Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Route Distance
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                {result.distanceKm} <span className="text-xs font-normal text-slate-500">KM</span>
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Estimated Duration
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ~{result.estimatedHours} <span className="text-xs font-normal text-slate-500">Hrs</span>
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Rate Per KM
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{result.ratePerKm.toFixed(2)}
              </span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Base Minimum
              </span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                ₹{result.baseFare.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Itemized Calculation Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-600">
              <span>Standard Plains Travel ({result.distanceKm} km × ₹{result.ratePerKm}/km)</span>
              <span className="font-semibold text-slate-800">₹{result.plainsFare.toFixed(2)}</span>
            </div>

            {result.isGhatApplied && (
              <div className="flex items-center justify-between text-emerald-800 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-200">
                <span className="flex items-center space-x-1">
                  <Mountain className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ghat Road Surcharge (+20% for hill terrain)</span>
                </span>
                <span className="font-bold">+ ₹{result.ghatSurcharge.toFixed(2)}</span>
              </div>
            )}

            {result.isPeakDayApplied && result.flexiSurgeAmount > 0 && (
              <div className="flex items-center justify-between text-amber-800 bg-amber-50/80 px-2 py-1 rounded-lg border border-amber-200">
                <span>Weekend Peak Flexi Surge (Friday–Sunday)</span>
                <span className="font-bold">+ ₹{result.flexiSurgeAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>Net Rounded Fare</span>
              <span className="text-tnstc-blue font-black text-base">₹{result.totalFare}</span>
            </div>
          </div>

          {/* Advisory Notice */}
          <div className="mt-4 flex items-start space-x-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {result.note} Official rates notified under TNSTC / SETC fare table. Toll fees (if applicable at NHAI plazas) and reservation charges may be added upon counter/online booking.
            </p>
          </div>
        </div>
      )}

      {/* Official Fare Reference Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-tnstc-blue" />
          <span>Notified Tamil Nadu Government Fare Slab Reference</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="py-2.5 px-3 font-semibold">Service Type</th>
                <th className="py-2.5 px-3 font-semibold">Base Min Fare</th>
                <th className="py-2.5 px-3 font-semibold">Rate / KM</th>
                <th className="py-2.5 px-3 font-semibold">Ghat Surcharge</th>
                <th className="py-2.5 px-3 font-semibold">Weekend Flexi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {rates.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{r.serviceName}</td>
                  <td className="py-2.5 px-3 font-mono">₹{r.baseFare.toFixed(2)}</td>
                  <td className="py-2.5 px-3 font-mono">₹{r.ratePerKm.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-medium">+20%</td>
                  <td className="py-2.5 px-3 text-amber-700 font-medium">{r.peakDayMultiplier > 1 ? `+${Math.round((r.peakDayMultiplier - 1) * 100)}%` : 'No Surge'}</td>
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
