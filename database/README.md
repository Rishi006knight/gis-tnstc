# Neon PostgreSQL + PostGIS Setup Guide

Follow these simple steps to initialize your PostGIS database on Neon:

### 1. Create a Neon Project
1. Log in to your [Neon Console](https://console.neon.tech).
2. Create a new project (e.g. `tnstc-gis`).
3. Under the **SQL Editor** tab in the Neon dashboard, connect to your default database.

### 2. Run the Schema and Seed Scripts
1. Open [`schema.sql`](file:///d:/projects/gis-tnstc/database/schema.sql) and execute its contents.
   - This enables the `postgis` spatial extension.
   - Creates the `motels`, `training_institutes`, `fare_rates`, and `routes` tables.
   - Creates spatial `GIST` indexes on `location` columns.
2. Open [`seed_data.sql`](file:///d:/projects/gis-tnstc/database/seed_data.sql) and execute its contents.
   - Populates official Arasu highway motels along NH-45, NH-44, NH-544.
   - Populates IRT driver training institutes across Tamil Nadu.
   - Configures official fare slabs and city-to-city distances.

### 3. Spatial Verification Queries
Test spatial queries in Neon SQL Editor:

```sql
-- Find all motels within 100km of Villupuram (79.4938, 11.9398)
SELECT name, highway_number, district,
       ROUND((ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(79.4938, 11.9398), 4326)::geography) / 1000)::numeric, 1) as distance_km
FROM motels
WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(79.4938, 11.9398), 4326)::geography, 100000)
ORDER BY distance_km;

-- Convert institutes directly to GeoJSON
SELECT json_build_object(
    'type', 'FeatureCollection',
    'features', json_agg(ST_AsGeoJSON(t.*)::json)
)
FROM (
    SELECT id, name, district, ST_AsGeoJSON(location)::json AS geometry
    FROM training_institutes
) AS t;
```
