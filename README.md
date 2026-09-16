# Tamil Nadu State Transport GIS Portal (Phase 1)
### TNSTC • SETC • MTC • IRT

A modern, spatial transport information web application and REST API built for Tamil Nadu transport undertakings:

* **Frontend:** React 18, TypeScript, Tailwind CSS, Leaflet, Lucide Icons
* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate Spatial, JTS
* **Database:** Neon PostgreSQL + PostGIS extension
* **GIS Layer:** OpenStreetMap base tiles + GeoJSON spatial layers

---

## Project Structure

```text
gis-tnstc/
├── frontend/                     # React + TypeScript + Tailwind + Leaflet app
│   ├── src/
│   │   ├── components/layout/    # Navbar (with breadcrumbs) & Footer
│   │   ├── data/                 # Highway motel & IRT institute datasets
│   │   ├── pages/
│   │   │   ├── HomePage.tsx               # 4-card division hub (SETC, TNSTC, MTC, General Info)
│   │   │   ├── GeneralInfoPage.tsx        # Sub-portal for Motels, IRT, Fare Calculator
│   │   │   ├── MotelMapPage.tsx           # Leaflet GIS map with green markers & facilities
│   │   │   ├── TrainingInstituteMapPage.tsx# IRT driver institute GIS map with orange markers
│   │   │   └── FareCalculatorPage.tsx     # Stage fare calculation (+20% ghat surcharge & flexi)
│   │   ├── services/             # REST API connector with seamless local fallback
│   │   ├── types/                # TypeScript data interfaces
│   │   ├── App.tsx               # Main application routing
│   │   ├── index.css             # Tailwind styling & Leaflet marker pulses
│   │   └── main.tsx              # React DOM mounting
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/                      # Java Spring Boot 3 + PostGIS REST API
│   ├── src/main/java/com/tnstc/gis/
│   │   ├── config/               # CORS configuration
│   │   ├── controller/           # MotelController, TrainingInstituteController, FareController
│   │   ├── dto/                  # GeoJSON feature collection DTOs, Fare DTOs
│   │   ├── model/                # Spatial JPA entities (Point geometry, Hibernate spatial)
│   │   ├── repository/           # Spring Data spatial queries
│   │   ├── service/              # GIS formatting & Fare business logic
│   │   └── GisTnstcApplication.java
│   ├── src/main/resources/
│   │   └── application.yml       # Neon PostgreSQL connection & dialect settings
│   └── pom.xml                   # Maven dependencies
│
└── database/                     # Neon PostgreSQL + PostGIS scripts
    ├── schema.sql                # PostGIS tables, spatial GIST indexes, geometry definitions
    ├── seed_data.sql             # Real coordinates for NH-45/44/544 Motels & IRT Centres
    └── README.md                 # Neon execution guide
```

---

## Quick Start: Running the Application

### 1. Frontend (React + TypeScript + Tailwind)
The frontend contains built-in datasets and full fallback logic, allowing you to launch and test immediately:

```bash
cd frontend
npm install
npm run dev
```

Open your browser at: `http://localhost:5173`

### 2. Database (Neon PostgreSQL + PostGIS)
1. In your [Neon Console](https://console.neon.tech), execute [`database/schema.sql`](file:///d:/projects/gis-tnstc/database/schema.sql) in the SQL Editor.
2. Next, execute [`database/seed_data.sql`](file:///d:/projects/gis-tnstc/database/seed_data.sql) to populate Arasu Motels, IRT institutes, fare rates, and routes.

### 3. Backend (Java Spring Boot 3)
1. Configure your Neon JDBC connection string in `backend/src/main/resources/application.yml` or export `SPRING_DATASOURCE_URL`.
2. Build and run via Maven:

```bash
cd backend
mvn clean spring-boot:run
```

The REST API will start on `http://localhost:8080`:
- `GET /api/motels`
- `GET /api/motels/geojson`
- `GET /api/training-institutes`
- `GET /api/training-institutes/geojson`
- `POST /api/fare/calculate`
