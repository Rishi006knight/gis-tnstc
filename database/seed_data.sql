-- ==============================================================================
-- Tamil Nadu Transport GIS Portal - Seed Data
-- ==============================================================================

-- 1. Insert Motels (Arasu Highway Stops with real coordinates across Tamil Nadu)
INSERT INTO motels (
    name, highway_number, district, location_name, address, contact_number,
    latitude, longitude, location, operating_hours,
    has_restroom, has_restaurant, has_ev_charging, has_parking, has_first_aid,
    cleanliness_rating, notes
) VALUES
(
    'Arasu Motel Vikravandi (Hotel Highway Star)', 'NH-45', 'Villupuram', 'Vikravandi',
    'NH-45 GST Road, Near Toll Plaza, Vikravandi, Tamil Nadu 605652', '+91 94432 11001',
    12.0238, 79.5489, ST_SetSRID(ST_MakePoint(79.5489, 12.0238), 4326),
    '24 Hours', true, true, true, true, true, 4.4,
    'Primary refreshment point for south-bound SETC/TNSTC super-express buses from Chennai CMBT/Kilambakkam.'
),
(
    'Arasu Motel Ulundurpet (Hotel Vasantha Bhavan)', 'NH-45', 'Kallakurichi', 'Ulundurpet',
    'NH-45 Trichy Main Road, Ulundurpet Bypass, Tamil Nadu 606107', '+91 94432 11002',
    11.6912, 79.2894, ST_SetSRID(ST_MakePoint(79.2894, 11.6912), 4326),
    '24 Hours', true, true, false, true, true, 4.2,
    'Key junction stop for Trichy, Madurai, Salem, and Thanjavur bound government buses.'
),
(
    'Arasu Highway Motel Samayapuram (Hotel Sri Balaji)', 'NH-45', 'Tiruchirappalli', 'Samayapuram',
    'Trichy-Chennai National Highway, Samayapuram Tollgate, Tamil Nadu 621112', '+91 94432 11003',
    10.9234, 78.7412, ST_SetSRID(ST_MakePoint(78.7412, 10.9234), 4326),
    '24 Hours', true, true, true, true, true, 4.3,
    'Designated stop before entering Tiruchirappalli city limits; spacious bus bays and clean toilet complexes.'
),
(
    'Arasu Motel Melur (Hotel Temple City)', 'NH-38', 'Madurai', 'Melur',
    'NH-38 Madurai-Trichy Highway, Melur Bypass, Tamil Nadu 625106', '+91 94432 11004',
    10.0381, 78.3371, ST_SetSRID(ST_MakePoint(78.3371, 10.0381), 4326),
    '24 Hours', true, true, false, true, true, 4.5,
    'Popular meal point for buses plying between Madurai, Sivagangai, and northern districts.'
),
(
    'Arasu Motel Krishnagiri (Hotel Anandha)', 'NH-44', 'Krishnagiri', 'Krishnagiri Toll',
    'Bangalore-Salem NH-44 Highway, Near Krishnagiri Toll, Tamil Nadu 635001', '+91 94432 11005',
    12.5186, 78.2137, ST_SetSRID(ST_MakePoint(78.2137, 12.5186), 4326),
    '24 Hours', true, true, true, true, true, 4.1,
    'Interstate link point for Bengaluru, Hosur, Dharmapuri, and Salem services.'
),
(
    'Arasu Motel Thoppur (Hotel Saravana Grand)', 'NH-44', 'Dharmapuri', 'Thoppur Ghat',
    'NH-44 Salem-Bangalore Highway, Foot of Thoppur Ghat, Tamil Nadu 636352', '+91 94432 11006',
    11.9567, 78.0645, ST_SetSRID(ST_MakePoint(78.0645, 11.9567), 4326),
    '24 Hours', true, true, false, true, true, 4.0,
    'Equipped with heavy vehicle brake inspection checkpoint and driver relaxation lounge.'
),
(
    'Arasu Motel Perundurai (Hotel Highway Hub)', 'NH-544', 'Erode', 'Perundurai',
    'Salem-Kochi NH-544 Highway, Perundurai Bypass, Erode, Tamil Nadu 638052', '+91 94432 11007',
    11.2783, 77.5833, ST_SetSRID(ST_MakePoint(77.5833, 11.2783), 4326),
    '24 Hours', true, true, true, true, true, 4.3,
    'Coimbatore, Tiruppur, and Palakkad corridor halt; fast-food counters and RO water kiosks.'
),
(
    'Arasu Motel Virudhunagar (Hotel Kaveri)', 'NH-44', 'Virudhunagar', 'Virudhunagar Bypass',
    'Madurai-Tirunelveli 4-lane Highway, Virudhunagar, Tamil Nadu 626001', '+91 94432 11008',
    9.5872, 77.9578, ST_SetSRID(ST_MakePoint(77.9578, 9.5872), 4326),
    '24 Hours', true, true, false, true, true, 4.1,
    'Servicing southern trunk routes to Tirunelveli, Nagercoil, and Kanyakumari.'
);

-- 2. Insert Training Institutes (Institute of Road Transport - IRT)
INSERT INTO training_institutes (
    name, district, location_name, address, contact_person, contact_phone, email,
    latitude, longitude, location, established_year, courses_offered,
    has_driving_track, provides_psv_badge, has_hostel_facility,
    eligibility_criteria, website_url
) VALUES
(
    'IRT Central Training Institute - Chromepet', 'Chengalpattu', 'Chromepet, Chennai',
    'Institute of Road Transport Campus, GST Road, Chromepet, Chennai 600044',
    'Principal Director', '+91 44 2223 1551', 'dir.irt@tn.gov.in',
    12.9516, 80.1462, ST_SetSRID(ST_MakePoint(80.1462, 12.9516), 4326),
    1976,
    ARRAY['Heavy Transport Vehicle (HTV) Driving', 'Refresher Training for Bus Drivers', 'Automobile Diagnostic Systems', 'Defensive Driving & Accident Prevention'],
    true, true, true,
    'Min 20 years old, 8th standard pass, holding valid Light Motor Vehicle (LMV) license for at least 1 year.',
    'https://irt.tn.gov.in'
),
(
    'IRT Heavy Vehicle Driver Training School - Karur', 'Karur', 'Thalapatti',
    'IRT Campus, Karur-Trichy Main Road, Thalapatti, Karur District 639003',
    'Joint Director (Training)', '+91 4324 255220', 'irtkarur@tn.gov.in',
    10.9601, 78.0766, ST_SetSRID(ST_MakePoint(78.0766, 10.9601), 4326),
    1988,
    ARRAY['Heavy Vehicle Driving Training', 'PSV Badge Certification', 'Hazardous Goods Transport Driving', 'Fuel Conservation Techniques'],
    true, true, true,
    'Age 20+, 8th Pass, valid LMV license, medical fitness certificate as per Form 1A.',
    'https://irt.tn.gov.in/karur'
),
(
    'IRT Regional Driver Training Centre - Tiruchirappalli', 'Tiruchirappalli', 'Pillaiyar Koil Street',
    'TNSTC (Kumbakonam) Division Depot Campus, Periyar Nagar, Trichy 620021',
    'Senior Training Officer', '+91 431 2410332', 'irttrichy@tn.gov.in',
    10.7905, 78.7047, ST_SetSRID(ST_MakePoint(78.7047, 10.7905), 4326),
    1995,
    ARRAY['Refresher Training Course', 'Heavy Commercial Vehicle Upgradation', 'Eco-Driving & Passenger Safety'],
    true, true, false,
    'Valid HTV license holders nominated by STUs or private fleet operators.',
    'https://irt.tn.gov.in/trichy'
),
(
    'IRT Driver Training Wing - Madurai', 'Madurai', 'Bypass Road',
    'TNSTC Madurai Regional Workshop Complex, Ellis Nagar, Madurai 625016',
    'Divisional Training Superintendent', '+91 452 2380120', 'irtmadurai@tn.gov.in',
    9.9195, 78.1198, ST_SetSRID(ST_MakePoint(78.1198, 9.9195), 4326),
    1992,
    ARRAY['Heavy Passenger Vehicle Driving', 'Hill Route / Ghat Driving Specialization', 'First-Aid & Emergency Response'],
    true, true, true,
    'Minimum 1 year LMV driving experience, physical fitness test clearance.',
    'https://irt.tn.gov.in/madurai'
),
(
    'IRT Regional Training Centre - Tirunelveli', 'Tirunelveli', 'Vannarpettai',
    'TNSTC Campus, Trivandrum High Road, Vannarpettai, Tirunelveli 627003',
    'Training Officer', '+91 462 2501041', 'irttirunelveli@tn.gov.in',
    8.7289, 77.7281, ST_SetSRID(ST_MakePoint(77.7281, 8.7289), 4326),
    2001,
    ARRAY['Heavy Vehicle Initial Training', 'PSV Endorsement', 'Defensive Driving in Night Highway Conditions'],
    true, true, true,
    '8th Standard pass, age 20-35 years, height min 160 cm, normal eyesight.',
    'https://irt.tn.gov.in/tirunelveli'
);

-- 3. Insert Official Fare Rates (TN Government Transport Department Structure)
INSERT INTO fare_rates (
    service_code, service_name, base_fare, minimum_distance_km, rate_per_km,
    ghat_rate_multiplier, lean_day_multiplier, peak_day_multiplier, description
) VALUES
('ORDINARY', 'City / Mofussil Ordinary', 6.00, 5.0, 0.58, 1.20, 1.00, 1.00, 'Standard stopping service serving rural and suburban routes across Tamil Nadu.'),
('EXPRESS', 'Semi-Deluxe / Express', 12.00, 10.0, 0.75, 1.20, 1.00, 1.00, 'Limited-stop intercity services connecting district headquarters.'),
('DELUXE', 'Super Deluxe (2x2 Non-AC)', 20.00, 15.0, 0.85, 1.20, 1.00, 1.05, 'Reclining push-back seats with high-speed highway travel.'),
('ULTRA_DELUXE', 'Ultra Deluxe / Classic', 30.00, 20.0, 1.00, 1.20, 1.00, 1.10, 'Long-distance intercity service with air-suspension and onboard charging.'),
('AC_SEATER', 'Air-Conditioned Seater', 50.00, 20.0, 1.30, 1.20, 1.00, 1.15, 'Climate controlled luxury push-back coach.'),
('AC_SLEEPER', 'AC Sleeper / Multi-Axle', 100.00, 30.0, 1.80, 1.20, 1.00, 1.20, 'Premium overnight sleeper berth coaches operated by SETC.');

-- 4. Insert Popular Intercity Routes
INSERT INTO routes (origin_city, destination_city, distance_km, estimated_hours, is_ghat_route, ghat_distance_km) VALUES
('Chennai (Kilambakkam)', 'Tiruchirappalli', 315.0, 5.5, false, 0.0),
('Chennai (Kilambakkam)', 'Madurai', 445.0, 7.5, false, 0.0),
('Chennai (Kilambakkam)', 'Salem', 330.0, 6.0, false, 0.0),
('Chennai (Kilambakkam)', 'Coimbatore', 495.0, 8.5, false, 0.0),
('Chennai (Kilambakkam)', 'Tirunelveli', 605.0, 10.0, false, 0.0),
('Chennai (Kilambakkam)', 'Kanyakumari', 690.0, 11.5, false, 0.0),
('Chennai (Kilambakkam)', 'Ooty (Udhagamandalam)', 535.0, 11.0, true, 48.0),
('Chennai (Kilambakkam)', 'Kodaikanal', 510.0, 10.5, true, 52.0),
('Madurai', 'Ooty (Udhagamandalam)', 270.0, 7.0, true, 48.0),
('Coimbatore', 'Ooty (Udhagamandalam)', 86.0, 3.2, true, 48.0),
('Tiruchirappalli', 'Madurai', 135.0, 2.5, false, 0.0),
('Salem', 'Coimbatore', 165.0, 3.0, false, 0.0);
