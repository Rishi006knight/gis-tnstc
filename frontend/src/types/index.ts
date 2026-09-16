export interface Motel {
  id: number;
  name: string;
  highwayNumber: string;
  district: string;
  locationName: string;
  address: string;
  contactNumber?: string;
  latitude: number;
  longitude: number;
  operatingHours?: string;
  hasRestroom?: boolean;
  hasRestaurant?: boolean;
  hasEvCharging?: boolean;
  hasParking?: boolean;
  hasFirstAid?: boolean;
  cleanlinessRating?: number;
  notes?: string;
}

export interface TrainingInstitute {
  id: number;
  name: string;
  district: string;
  locationName: string;
  address: string;
  contactPerson?: string;
  contactPhone?: string;
  email?: string;
  latitude: number;
  longitude: number;
  establishedYear?: number;
  coursesOffered: string[];
  hasDrivingTrack?: boolean;
  providesPsvBadge?: boolean;
  hasHostelFacility?: boolean;
  eligibilityCriteria?: string;
  websiteUrl?: string;
}

export interface FareRate {
  id: number;
  serviceCode: string;
  serviceName: string;
  baseFare: number;
  minimumDistanceKm: number;
  ratePerKm: number;
  ghatRateMultiplier: number;
  leanDayMultiplier: number;
  peakDayMultiplier: number;
  description: string;
}

export interface FareCalculateRequest {
  originCity: string;
  destinationCity: string;
  serviceCode: string;
  travelDate?: string;
  isGhatRoad?: boolean;
  customDistanceKm?: number;
}

export interface FareCalculateResponse {
  originCity: string;
  destinationCity: string;
  serviceCode: string;
  serviceName: string;
  distanceKm: number;
  estimatedHours: number;
  baseFare: number;
  ratePerKm: number;
  plainsFare: number;
  ghatSurcharge: number;
  flexiSurgeAmount: number;
  totalFare: number;
  isGhatApplied: boolean;
  isPeakDayApplied: boolean;
  dayOfWeek: string;
  note: string;
}

export type PageView = 'home' | 'general-info' | 'motels' | 'training-institutes' | 'fare-calculator';
