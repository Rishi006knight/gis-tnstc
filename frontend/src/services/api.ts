import { Motel, TrainingInstitute, FareRate, FareCalculateRequest, FareCalculateResponse } from '../types';
import { INITIAL_MOTELS, INITIAL_INSTITUTES, INITIAL_FARE_RATES, POPULAR_ROUTES } from '../data/mockData';

const API_BASE = '/api';

export const apiService = {
  async getMotels(district?: string, query?: string): Promise<Motel[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'All') params.append('district', district);
      if (query) params.append('query', query);

      const res = await fetch(`${API_BASE}/motels?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      // Fallback to local data
      let list = [...INITIAL_MOTELS];
      if (district && district !== 'All') {
        list = list.filter(m => m.district.toLowerCase() === district.toLowerCase());
      }
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(m =>
          m.name.toLowerCase().includes(q) ||
          m.locationName.toLowerCase().includes(q) ||
          m.highwayNumber.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q)
        );
      }
      return list;
    }
  },

  async getTrainingInstitutes(district?: string, course?: string, query?: string): Promise<TrainingInstitute[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'All') params.append('district', district);
      if (course && course !== 'All') params.append('course', course);
      if (query) params.append('query', query);

      const res = await fetch(`${API_BASE}/training-institutes?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      let list = [...INITIAL_INSTITUTES];
      if (district && district !== 'All') {
        list = list.filter(i => i.district.toLowerCase() === district.toLowerCase());
      }
      if (course && course !== 'All') {
        list = list.filter(i => i.coursesOffered.some(c => c.toLowerCase().includes(course.toLowerCase())));
      }
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(i =>
          i.name.toLowerCase().includes(q) ||
          i.district.toLowerCase().includes(q) ||
          i.locationName.toLowerCase().includes(q)
        );
      }
      return list;
    }
  },

  async getFareRates(): Promise<FareRate[]> {
    try {
      const res = await fetch(`${API_BASE}/fare/rates`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return INITIAL_FARE_RATES;
    }
  },

  async calculateFare(req: FareCalculateRequest): Promise<FareCalculateResponse> {
    try {
      const res = await fetch(`${API_BASE}/fare/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('API fare calc failed');
      return await res.json();
    } catch {
      // Local fallback calculation engine
      const rate = INITIAL_FARE_RATES.find(r => r.serviceCode === req.serviceCode) || INITIAL_FARE_RATES[0];
      
      let distanceKm = req.customDistanceKm || 0;
      let estimatedHours = 0;
      let isGhatApplied = !!req.isGhatRoad;

      if (!distanceKm) {
        const matched = POPULAR_ROUTES.find(
          r => (r.origin.toLowerCase() === req.originCity.toLowerCase() && r.destination.toLowerCase() === req.destinationCity.toLowerCase()) ||
               (r.origin.toLowerCase() === req.destinationCity.toLowerCase() && r.destination.toLowerCase() === req.originCity.toLowerCase())
        );
        if (matched) {
          distanceKm = matched.distanceKm;
          estimatedHours = matched.estimatedHours;
          if (matched.isGhatRoute) isGhatApplied = true;
        } else {
          distanceKm = 240;
          estimatedHours = 4.5;
        }
      } else {
        estimatedHours = +(distanceKm / 50).toFixed(1);
      }

      const rawFare = distanceKm * rate.ratePerKm;
      const plainsFare = Math.round(rawFare);
      const totalFare = isGhatApplied ? Math.round(rawFare * 1.20) : plainsFare;
      const ghatSurcharge = totalFare - plainsFare;
      const flexiSurge = 0;

      let note = isGhatApplied
        ? `Ghat road / hill route surcharge applied (+20%). Calculation: Math.round(${distanceKm} km × ₹${rate.ratePerKm} × 1.20) = ₹${totalFare}`
        : `Standard route fare. Calculation: Math.round(${distanceKm} km × ₹${rate.ratePerKm}) = ₹${totalFare}`;

      return {
        originCity: req.originCity,
        destinationCity: req.destinationCity,
        serviceCode: rate.serviceCode,
        serviceName: rate.serviceName,
        distanceKm,
        estimatedHours,
        baseFare: rate.baseFare,
        ratePerKm: rate.ratePerKm,
        plainsFare,
        ghatSurcharge,
        flexiSurgeAmount: flexiSurge,
        totalFare,
        isGhatApplied,
        isPeakDayApplied: isPeak,
        dayOfWeek: dayNames[dayNum],
        note
      };
    }
  }
};
