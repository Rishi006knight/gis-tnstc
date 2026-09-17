-- ==============================================================================
-- Tamil Nadu Transport GIS Portal - Database Schema
-- Database: Neon PostgreSQL with PostGIS extension
-- ==============================================================================

-- 1. Enable PostGIS Extension
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Clean up existing tables if any
DROP TABLE IF EXISTS fare_rates CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS training_institutes CASCADE;
DROP TABLE IF EXISTS motels CASCADE;

-- 3. Highway Motels Table (Arasu Bus Authorized Stops)
CREATE TABLE motels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    highway_number VARCHAR(50) NOT NULL,            -- e.g. NH-45, NH-7, NH-44
    district VARCHAR(100) NOT NULL,                 -- e.g. Villupuram, Trichy
    location_name VARCHAR(150) NOT NULL,            -- e.g. Vikravandi, Melur
    address TEXT NOT NULL,
    contact_number VARCHAR(50),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326),                 -- WGS84 spatial point
    operating_hours VARCHAR(100) DEFAULT '24 Hours',
    has_restroom BOOLEAN DEFAULT TRUE,
    has_restaurant BOOLEAN DEFAULT TRUE,
    has_ev_charging BOOLEAN DEFAULT FALSE,
    has_parking BOOLEAN DEFAULT TRUE,
    has_first_aid BOOLEAN DEFAULT TRUE,
    cleanliness_rating NUMERIC(2, 1) DEFAULT 4.0,   -- 1.0 to 5.0
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial index for fast proximity queries
CREATE INDEX idx_motels_location ON motels USING GIST (location);
CREATE INDEX idx_motels_district ON motels (district);
CREATE INDEX idx_motels_highway ON motels (highway_number);

-- 4. Training Institutes Table (Institute of Road Transport - IRT)
CREATE TABLE training_institutes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    location_name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    contact_person VARCHAR(150),
    contact_phone VARCHAR(50),
    email VARCHAR(100),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location GEOMETRY(Point, 4326),
    established_year INT,
    courses_offered TEXT[] NOT NULL,               -- e.g. ARRAY['Heavy Vehicle Driving', 'Refresher Course', 'Driver Trainer Course']
    has_driving_track BOOLEAN DEFAULT TRUE,
    provides_psv_badge BOOLEAN DEFAULT TRUE,       -- Public Service Vehicle endorsement
    has_hostel_facility BOOLEAN DEFAULT TRUE,
    eligibility_criteria TEXT,
    website_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_training_institutes_location ON training_institutes USING GIST (location);
CREATE INDEX idx_training_institutes_district ON training_institutes (district);

-- 5. Fare Rates Table by Service Category
CREATE TABLE fare_rates (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(50) UNIQUE NOT NULL,       -- e.g. ORDINARY, EXPRESS, DELUXE, ULTRA_DELUXE, AC_SLEEPER
    service_name VARCHAR(100) NOT NULL,
    base_fare NUMERIC(6, 2) NOT NULL,               -- Minimum charge
    minimum_distance_km NUMERIC(5, 2) NOT NULL,     -- Distance covered under base fare
    rate_per_km NUMERIC(5, 2) NOT NULL,             -- Normal plains rate per km (in INR)
    ghat_rate_multiplier NUMERIC(3, 2) DEFAULT 1.20,-- +20% for hilly/ghat roads
    lean_day_multiplier NUMERIC(3, 2) DEFAULT 1.00, -- Mon-Thu
    peak_day_multiplier NUMERIC(3, 2) DEFAULT 1.10, -- Fri-Sun flexi surge where applicable
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Sample Intercity City Distance Lookup (for Calculator lookup)
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    origin_city VARCHAR(100) NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    distance_km NUMERIC(6, 2) NOT NULL,
    estimated_hours NUMERIC(4, 2) NOT NULL,
    is_ghat_route BOOLEAN DEFAULT FALSE,
    ghat_distance_km NUMERIC(6, 2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_route_pair ON routes (origin_city, destination_city);

-- ==============================================================================
-- Phase 2: SETC Tables
-- ==============================================================================

-- 7. SETC Routes
CREATE TABLE setc_routes (
    route_id SERIAL PRIMARY KEY,
    route_code VARCHAR(50),
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    stops TEXT,
    distance NUMERIC(6, 2),
    travel_time VARCHAR(50),
    service_type VARCHAR(100),
    fare NUMERIC(6, 2),
    geometry GEOMETRY(LineString, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_setc_routes_geometry ON setc_routes USING GIST (geometry);

-- 8. SETC Reservation Centres
CREATE TABLE reservation_centres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    counter_address TEXT NOT NULL,
    district VARCHAR(100),
    location GEOMETRY(Point, 4326),
    source_url VARCHAR(255),
    last_verified DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_reservation_centres_location ON reservation_centres USING GIST (location);
CREATE INDEX idx_reservation_centres_district ON reservation_centres (district);

-- 9. SETC Depots & Outstations
CREATE TABLE depots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(100) DEFAULT 'Tamil Nadu',
    address TEXT,
    location GEOMETRY(Point, 4326),
    type VARCHAR(50) CHECK (type IN ('depot', 'bus_body_unit', 'workshop', 'training_centre', 'fc_unit', 'driving_school', 'outstation')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_depots_location ON depots USING GIST (location);
CREATE INDEX idx_depots_type ON depots (type);

-- 10. SETC Special Services
CREATE TABLE special_services (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    period_text VARCHAR(100),
    description TEXT,
    fare NUMERIC(6, 2),
    distance_km NUMERIC(6, 2),
    geometry GEOMETRY(LineString, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_special_services_geometry ON special_services USING GIST (geometry);

-- 11. SETC History & Awards
CREATE TABLE setc_history (
    id SERIAL PRIMARY KEY,
    year_range VARCHAR(50),
    fleet_count INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE setc_awards (
    id SERIAL PRIMARY KEY,
    award_name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    awarding_body VARCHAR(255),
    years TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Geocoding Failures
CREATE TABLE geocoding_failures (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    name VARCHAR(255),
    query_used TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
