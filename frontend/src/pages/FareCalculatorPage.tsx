import React, { useState, useEffect } from 'react';
import { FareRate } from '../types';
import { apiService } from '../services/api';
import {
  INITIAL_FARE_RATES,
  TN_CITIES,
  POPULAR_ROUTES,
  HILL_STATIONS,
  getRoadDistanceAndGhat
} from '../data/mockData';
import {
  Calculator,
  Mountain,
  AlertCircle,
  Receipt,
  Bus,
  Sparkles,
  ArrowRightLeft,
  MapPin,
  CheckCircle2,
  Navigation,
  Compass
} from 'lucide-react';

export const FareCalculatorPage: React.FC = () => {
  // Mode: 'city' (Choose Origin & Destination) vs 'direct' (Direct KM)
  const [calcMode, setCalcMode] = useState<'city' | 'direct'>('city');

  // City selection state (63 Tamil Nadu hubs)
  const [originCity, setOriginCity] = useState<string>('Chennai (Kilambakkam - KCBT)');
  const [destinationCity, setDestinationCity] = useState<string>('Madurai (Mattuthavani - MIBT)');

  // Direct distance input (as in tickettogetlost.com)
  const [distanceKm, setDistanceKm] = useState<string>('445');
  const [selectedServiceCode, setSelectedServiceCode] = useState<string>('ORDINARY');
  const [isGhatRoad, setIsGhatRoad] = useState<boolean>(false);
  const [rates, setRates] = useState<FareRate[]>(INITIAL_FARE_RATES);

  // Result state
  const [calculatedFare, setCalculatedFare] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load fare rates
  useEffect(() => {
    const load = async () => {
      const r = await apiService.getFareRates();
      setRates(r);
    };
    load();
  }, []);

  // Whenever origin or destination changes in city mode, recalculate road distance and ghat status
  useEffect(() => {
    if (calcMode === 'city') {
      if (originCity === destinationCity) {
        setErrorMessage('Origin and destination cannot be the same city.');
        setCalculatedFare(null);
        return;
      }
      setErrorMessage('');
      const { distanceKm: resolvedKm, isGhat } = getRoadDistanceAndGhat(originCity, destinationCity);
      setDistanceKm(resolvedKm.toString());
      setIsGhatRoad(isGhat);
    }
  }, [originCity, destinationCity, calcMode]);

  const activeRates = (rates && rates.length > 0) ? rates : INITIAL_FARE_RATES;

  // Compute fare using tickettogetlost.com formula:
  // Math.round(distance * perKmRate * (isGhat ? 1.20 : 1.0))
  useEffect(() => {
    const dist = parseFloat(distanceKm);
    if (!distanceKm || isNaN(dist) || dist <= 0) {
      setCalculatedFare(null);
      return;
    }
    setErrorMessage('');
    const rate = activeRates.find(r => r.serviceCode === selectedServiceCode) || activeRates[0];
    const multiplier = isGhatRoad ? 1.20 : 1.00;
    const ratePerKm = rate?.ratePerKm || 0.58;
    const fare = Math.round(dist * ratePerKm * multiplier);
    setCalculatedFare(fare);
  }, [distanceKm, selectedServiceCode, isGhatRoad, activeRates]);

  const handleSwapCities = () => {
    const temp = originCity;
    setOriginCity(destinationCity);
    setDestinationCity(temp);
  };

  const handleManualCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const dist = parseFloat(distanceKm);
    if (!distanceKm || isNaN(dist) || dist <= 0) {
      setErrorMessage('Please enter a valid distance in kilometers.');
      setCalculatedFare(null);
      return;
    }
    setErrorMessage('');
    const rate = activeRates.find(r => r.serviceCode === selectedServiceCode) || activeRates[0];
    const multiplier = isGhatRoad ? 1.20 : 1.00;
    const ratePerKm = rate?.ratePerKm || 0.58;
    setCalculatedFare(Math.round(dist * ratePerKm * multiplier));
  };

  const currentRate = activeRates.find(r => r.serviceCode === selectedServiceCode) || activeRates[0];
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
          Accurately calculate travel fares across 60+ Tamil Nadu cities & all 38 districts based on official per-KM rates and hill road (+20% Ghat) regulations.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl border border-slate-200 inline-flex space-x-1">
          <button
            type="button"
            onClick={() => setCalcMode('city')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-1.5 ${
              calcMode === 'city'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-tnstc-blue" />
            <span>Select Route by Cities (63 Hubs)</span>
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('direct')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-1.5 ${
              calcMode === 'direct'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Distance (KM) Mode</span>
          </button>
        </div>
      </div>

      {/* Main Calculator Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleManualCalculate} className="space-y-5">
          {/* City Selection Mode */}
          {calcMode === 'city' && (
            <div className="space-y-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80">
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
                {/* Origin */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    From City (Origin)
                  </label>
                  <select
                    value={originCity}
                    onChange={e => setOriginCity(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 text-xs sm:text-sm font-semibold text-slate-800 transition"
                  >
                    {TN_CITIES.map(c => (
                      <option key={`from-${c}`} value={c}>
                        {c} {HILL_STATIONS.has(c) ? '⛰️ (Hill)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center md:pt-4">
                  <button
                    type="button"
                    onClick={handleSwapCities}
                    className="w-9 h-9 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-slate-600 flex items-center justify-center transition shadow-sm"
                    title="Swap Cities"
                  >
                    <ArrowRightLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Destination */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    To City (Destination)
                  </label>
                  <select
                    value={destinationCity}
                    onChange={e => setDestinationCity(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-tnstc-blue/30 text-xs sm:text-sm font-semibold text-slate-800 transition"
                  >
                    {TN_CITIES.map(c => (
                      <option key={`to-${c}`} value={c}>
                        {c} {HILL_STATIONS.has(c) ? '⛰️ (Hill)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Highway route indicator badge */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200">
                <span className="flex items-center space-x-1">
                  <Compass className="w-3.5 h-3.5 text-tnstc-blue" />
                  <span>Calculated Highway Route: <strong>{parsedDist} KM</strong></span>
                </span>
                {isGhatRoad && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center space-x-1">
                    <Mountain className="w-3 h-3" />
                    <span>Ghat Section Active</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Distance Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-[#0d47a1]">
                Distance (Approximate KM)
              </label>
              {calcMode === 'city' && (
                <span className="text-[11px] text-slate-400 font-medium">
                  (Auto-filled from route, editable)
                </span>
              )}
            </div>
            <input
              type="number"
              placeholder="Eg: 120"
              value={distanceKm}
              onChange={e => setDistanceKm(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/30 focus:border-[#0d47a1] text-base font-semibold text-slate-800 transition"
              min="1"
              step="any"
            />
          </div>

          {/* Bus Type Selector (8 Official Classes) */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-[#0d47a1]">
              Bus Type
            </label>
            <select
              value={selectedServiceCode}
              onChange={e => setSelectedServiceCode(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0d47a1]/30 focus:border-[#0d47a1] text-sm font-semibold text-slate-800 transition"
            >
              {activeRates.map(r => (
                <option key={r.serviceCode} value={r.serviceCode}>
                  {r.serviceName} (₹{r.ratePerKm.toFixed(2)} / km)
                </option>
              ))}
            </select>
          </div>

          {/* Ghat Road Checkbox */}
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

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Calculate CTA Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0d47a1] hover:bg-[#09327a] text-white font-bold text-base shadow-md transition duration-200 flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calculate Fare</span>
          </button>
        </form>

        {/* Result Display */}
        {calculatedFare !== null && !errorMessage && (
          <div className="mt-6 pt-6 border-t border-slate-200 text-center animate-in fade-in duration-300">
            {calcMode === 'city' && (
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-2">
                {originCity} ➔ {destinationCity}
              </span>
            )}
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

      {/* Multi-Class Fare Comparison Grid for Current Distance */}
      {parsedDist > 0 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Bus className="w-4 h-4 text-tnstc-blue" />
                <span>Compare All Service Fares for {parsedDist} KM</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any service card to select it. Calculated {isGhatRoad ? 'with +20% Ghat surcharge' : 'for standard highway'}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeRates.map(r => {
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

      {/* Popular Corridors Quick Shortcuts */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-tnstc-blue" />
            <span>High-Demand Intercity & Interstate Corridors</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any high-traffic route to instantly load origin mofussil terminus, destination, and calibrated road distance:
          </p>
        </div>

        {/* Section 1: Bengaluru Interstate (Shantinagar BS) */}
        <div>
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1.5 flex items-center space-x-1">
            <span>⚡ Bengaluru Interstate (via Shantinagar BS)</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { o: 'Bengaluru (Shantinagar BS)', d: 'Chennai (Kilambakkam - KCBT)', km: 345, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Coimbatore (Gandhipuram SETC)', km: 360, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Salem (New Bus Stand)', km: 200, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Madurai (Mattuthavani - MIBT)', km: 435, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Tiruchirappalli (Central BS)', km: 340, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Tirunelveli (New Bus Stand)', km: 585, ghat: false },
              { o: 'Bengaluru (Shantinagar BS)', d: 'Ooty (Udhagamandalam)', km: 275, ghat: true }
            ].map((r, i) => (
              <button
                key={`b-${i}`}
                type="button"
                onClick={() => {
                  setCalcMode('city');
                  setOriginCity(r.o);
                  setDestinationCity(r.d);
                  setDistanceKm(r.km.toString());
                  setIsGhatRoad(r.ghat);
                }}
                className="px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 hover:border-amber-300 text-xs font-semibold text-amber-900 transition"
              >
                Bangalore (Shantinagar) ➔ {r.d.split(' ')[0]} ({r.km} km {r.ghat ? '⛰️' : ''})
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Kerala Interstate (Thiruvananthapuram & Palakkad) */}
        <div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1.5">
            🌴 Kerala Interstate (Thiruvananthapuram & Palakkad)
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { o: 'Thiruvananthapuram', d: 'Nagercoil (Vadasery BS)', km: 70, ghat: false },
              { o: 'Thiruvananthapuram', d: 'Tirunelveli (New Bus Stand)', km: 145, ghat: false },
              { o: 'Thiruvananthapuram', d: 'Madurai (Mattuthavani - MIBT)', km: 305, ghat: false },
              { o: 'Thiruvananthapuram', d: 'Chennai (Kilambakkam - KCBT)', km: 750, ghat: false },
              { o: 'Palakkad', d: 'Coimbatore (Ukkadam BS)', km: 50, ghat: false },
              { o: 'Palakkad', d: 'Pollachi', km: 45, ghat: false },
              { o: 'Kochi (Ernakulam)', d: 'Coimbatore (Gandhipuram SETC)', km: 190, ghat: false }
            ].map((r, i) => (
              <button
                key={`k-${i}`}
                type="button"
                onClick={() => {
                  setCalcMode('city');
                  setOriginCity(r.o);
                  setDestinationCity(r.d);
                  setDistanceKm(r.km.toString());
                  setIsGhatRoad(r.ghat);
                }}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 hover:border-emerald-300 text-xs font-semibold text-emerald-900 transition"
              >
                {r.o} ➔ {r.d.split(' ')[0]} ({r.km} km)
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Andhra Pradesh Interstate (Tirupati) */}
        <div>
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wider block mb-1.5">
            🛕 Andhra Pradesh (Tirupati Pilgrimage Corridor)
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { o: 'Tirupati', d: 'Chennai (Koyambedu - CMBT)', km: 135, ghat: false },
              { o: 'Tirupati', d: 'Vellore (New Bus Stand)', km: 105, ghat: false },
              { o: 'Tirupati', d: 'Tiruvannamalai', km: 195, ghat: false },
              { o: 'Tirupati', d: 'Salem (New Bus Stand)', km: 310, ghat: false },
              { o: 'Tirupati', d: 'Tiruchirappalli (Central BS)', km: 410, ghat: false }
            ].map((r, i) => (
              <button
                key={`t-${i}`}
                type="button"
                onClick={() => {
                  setCalcMode('city');
                  setOriginCity(r.o);
                  setDestinationCity(r.d);
                  setDistanceKm(r.km.toString());
                  setIsGhatRoad(r.ghat);
                }}
                className="px-3 py-1.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 hover:border-purple-300 text-xs font-semibold text-purple-900 transition"
              >
                Tirupati ➔ {r.d.split(' ')[0]} ({r.km} km)
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Key Tamil Nadu Intercity Corridors */}
        <div>
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-1.5">
            🚌 Tamil Nadu Intra-State Trunk Routes
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Madurai (Mattuthavani - MIBT)', km: 445, ghat: false },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Coimbatore (Gandhipuram SETC)', km: 495, ghat: false },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Tiruchirappalli (Central BS)', km: 315, ghat: false },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Salem (New Bus Stand)', km: 330, ghat: false },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Tirunelveli (New Bus Stand)', km: 605, ghat: false },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Ooty (Udhagamandalam)', km: 535, ghat: true },
              { o: 'Chennai (Kilambakkam - KCBT)', d: 'Kodaikanal', km: 510, ghat: true },
              { o: 'Madurai (Mattuthavani - MIBT)', d: 'Coimbatore (Singanallur BS)', km: 215, ghat: false },
              { o: 'Coimbatore (Ukkadam BS)', d: 'Valparai', km: 105, ghat: true }
            ].map((r, i) => (
              <button
                key={`tn-${i}`}
                type="button"
                onClick={() => {
                  setCalcMode('city');
                  setOriginCity(r.o);
                  setDestinationCity(r.d);
                  setDistanceKm(r.km.toString());
                  setIsGhatRoad(r.ghat);
                }}
                className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100 hover:border-blue-300 text-xs font-semibold text-blue-900 transition"
              >
                {r.o.split(' ')[0]} ➔ {r.d.split(' ')[0]} ({r.km} km {r.ghat ? '⛰️' : ''})
              </button>
            ))}
          </div>
        </div>
      </div>

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
              {activeRates.map(r => (
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
