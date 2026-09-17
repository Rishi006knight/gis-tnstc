import { 
  Motel, 
  TrainingInstitute, 
  FareRate, 
  FareCalculateRequest, 
  FareCalculateResponse,
  SetcReservationCentre,
  SetcDepot,
  SetcHistory,
  SetcAward,
  SetcSpecialService,
  SetcRoute
} from '../types';
import { INITIAL_MOTELS, INITIAL_INSTITUTES, INITIAL_FARE_RATES, getRoadDistanceAndGhat } from '../data/mockData';
import {
  SETC_RESERVATION_CENTRES,
  SETC_DEPOTS,
  SETC_HISTORY_DATA,
  SETC_AWARDS_DATA,
  SETC_SPECIAL_SERVICES,
  SETC_ROUTES_DATA
} from '../data/setcData';

export const API_BASE_URL = '/api';

export const apiService = {
  async getMotels(district?: string, query?: string): Promise<Motel[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'All') params.append('district', district);
      if (query) params.append('query', query);

      const res = await fetch(`${API_BASE_URL}/motels?${params.toString()}`);
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

      const res = await fetch(`${API_BASE_URL}/training-institutes?${params.toString()}`);
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
      const res = await fetch(`${API_BASE_URL}/fare-rates`);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return (Array.isArray(data) && data.length > 0) ? data : INITIAL_FARE_RATES;
    } catch {
      return INITIAL_FARE_RATES;
    }
  },

  async calculateFare(req: FareCalculateRequest): Promise<FareCalculateResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/fare-calculator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error('API fare calc failed');
      return await res.json();
    } catch {
      const rate = INITIAL_FARE_RATES.find(r => r.serviceCode === req.serviceCode) || INITIAL_FARE_RATES[0];
      
      let distanceKm = req.customDistanceKm || 0;
      let estimatedHours = 0;
      let isGhatApplied = !!req.isGhatRoad;

      if (!distanceKm) {
        const resolved = getRoadDistanceAndGhat(req.originCity, req.destinationCity);
        distanceKm = resolved.distanceKm;
        if (resolved.isGhat) isGhatApplied = true;
        estimatedHours = +(distanceKm / 55).toFixed(1);
      } else {
        estimatedHours = +(distanceKm / 55).toFixed(1);
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
        isPeakDayApplied: false,
        dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
        note
      };
    }
  },

  // --------------------------------------------------------------------------
  // SETC Modules API
  // --------------------------------------------------------------------------

  async getReservationCentres(district?: string, query?: string): Promise<SetcReservationCentre[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'All') params.append('district', district);
      const res = await fetch(`${API_BASE_URL}/setc/reservation-centres?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      const geojson = await res.json();
      if (geojson && geojson.features) {
        return geojson.features.map((f: any) => ({
          id: f.properties.id,
          name: f.properties.name,
          counterAddress: f.properties.counterAddress,
          district: f.properties.district,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1]
        }));
      }
      throw new Error('Invalid GeoJSON');
    } catch {
      let list = SETC_RESERVATION_CENTRES.map(rc => ({
        id: rc.id,
        name: rc.name,
        counterAddress: rc.counterAddress,
        district: rc.district,
        latitude: rc.lat,
        longitude: rc.lon
      }));
      if (district && district !== 'All') {
        list = list.filter(r => r.district.toLowerCase() === district.toLowerCase());
      }
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(r => r.name.toLowerCase().includes(q) || r.counterAddress.toLowerCase().includes(q) || r.district.toLowerCase().includes(q));
      }
      return list;
    }
  },

  async getSetcDepots(type?: string, query?: string): Promise<SetcDepot[]> {
    try {
      const params = new URLSearchParams();
      if (type && type !== 'All') params.append('type', type);
      const res = await fetch(`${API_BASE_URL}/setc/depots?${params.toString()}`);
      if (!res.ok) throw new Error('API fetch failed');
      const geojson = await res.json();
      if (geojson && geojson.features) {
        return geojson.features.map((f: any) => ({
          id: f.properties.id,
          name: f.properties.name,
          state: f.properties.state,
          address: f.properties.address,
          phone: f.properties.phone,
          type: f.properties.type,
          longitude: f.geometry.coordinates[0],
          latitude: f.geometry.coordinates[1]
        }));
      }
      throw new Error('Invalid GeoJSON');
    } catch {
      let list = SETC_DEPOTS.map(d => ({
        id: d.id,
        name: d.name,
        state: d.state,
        address: d.address,
        phone: d.phone,
        type: d.type,
        latitude: d.lat,
        longitude: d.lon
      }));
      if (type && type !== 'All') {
        list = list.filter(d => d.type.toLowerCase() === type.toLowerCase());
      }
      if (query) {
        const q = query.toLowerCase();
        list = list.filter(d => d.name.toLowerCase().includes(q) || d.address.toLowerCase().includes(q) || d.state.toLowerCase().includes(q));
      }
      return list;
    }
  },

  async getSetcHistory(): Promise<SetcHistory[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/setc/history`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return SETC_HISTORY_DATA;
    }
  },

  async getSetcAwards(): Promise<SetcAward[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/setc/awards`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return SETC_AWARDS_DATA;
    }
  },

  async getSetcSpecialServices(): Promise<SetcSpecialService[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/setc/special-services`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return SETC_SPECIAL_SERVICES.map(s => ({
        id: s.id,
        serviceName: s.serviceName,
        origin: s.origin,
        destination: s.destination,
        periodText: s.periodText,
        description: s.description,
        fare: s.fare,
        distanceKm: s.distanceKm,
        coords: s.coords
      }));
    }
  },

  async getSetcRoutes(): Promise<SetcRoute[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/setc/routes`);
      if (!res.ok) throw new Error('API fetch failed');
      return await res.json();
    } catch {
      return SETC_ROUTES_DATA;
    }
  }
};

