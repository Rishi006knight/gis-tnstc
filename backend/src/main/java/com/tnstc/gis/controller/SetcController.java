package com.tnstc.gis.controller;

import com.tnstc.gis.dto.RawDepotDto;
import com.tnstc.gis.dto.RawReservationCentreDto;
import com.tnstc.gis.dto.RawSpecialServiceDto;
import com.tnstc.gis.model.*;
import com.tnstc.gis.repository.*;
import com.tnstc.gis.service.GeocodingService;
import com.tnstc.gis.service.SetcDataIngestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class SetcController {

    private final ReservationCentreRepository reservationCentreRepository;
    private final DepotRepository depotRepository;
    private final SpecialServiceRepository specialServiceRepository;
    private final SetcHistoryRepository historyRepository;
    private final SetcAwardRepository awardRepository;
    private final SetcRouteRepository setcRouteRepository;
    
    private final SetcDataIngestionService ingestionService;
    private final GeocodingService geocodingService;

    // --- Admin Ingestion Endpoints ---

    @PostMapping("/admin/setc/import/reservation-centres")
    public ResponseEntity<String> importReservationCentres(@RequestBody List<RawReservationCentreDto> rows) {
        ingestionService.importReservationCentres(rows);
        return ResponseEntity.ok("Imported " + rows.size() + " reservation centres.");
    }

    @PostMapping("/admin/setc/import/depots")
    public ResponseEntity<String> importDepots(@RequestBody List<RawDepotDto> rows) {
        ingestionService.importDepots(rows);
        return ResponseEntity.ok("Imported " + rows.size() + " depots.");
    }

    @PostMapping("/admin/setc/import/special-services")
    public ResponseEntity<String> importSpecialServices(@RequestBody List<RawSpecialServiceDto> rows) {
        ingestionService.importSpecialServices(rows);
        return ResponseEntity.ok("Imported " + rows.size() + " special services.");
    }
    
    @PostMapping("/admin/setc/geocode")
    public ResponseEntity<String> triggerGeocoding() {
        geocodingService.geocodeMissingLocations();
        return ResponseEntity.ok("Geocoding job started in background.");
    }

    // --- Public API Endpoints ---

    @GetMapping("/setc/reservation-centres")
    public ResponseEntity<Map<String, Object>> getReservationCentres(@RequestParam(required = false) String district) {
        List<ReservationCentre> centres = district != null ? 
            reservationCentreRepository.findByDistrict(district) : 
            reservationCentreRepository.findAll();
            
        return ResponseEntity.ok(convertToGeoJson(centres, "reservation_centre"));
    }

    @GetMapping("/setc/depots")
    public ResponseEntity<Map<String, Object>> getDepots(@RequestParam(required = false) String type) {
        List<Depot> depots = type != null ? 
            depotRepository.findByType(type) : 
            depotRepository.findAll();
            
        return ResponseEntity.ok(convertToGeoJson(depots, "depot"));
    }
    
    @GetMapping("/setc/routes")
    public ResponseEntity<Map<String, Object>> getRoutes() {
        List<SetcRoute> routes = setcRouteRepository.findAll();
        
        Map<String, Object> featureCollection = new HashMap<>();
        featureCollection.put("type", "FeatureCollection");
        
        List<Map<String, Object>> features = routes.stream()
            .filter(r -> r.getGeometry() != null)
            .map(r -> {
                Map<String, Object> feature = new HashMap<>();
                feature.put("type", "Feature");
                
                Map<String, Object> geometry = new HashMap<>();
                geometry.put("type", "LineString");
                
                // Convert JTS LineString to coordinate array
                org.locationtech.jts.geom.Coordinate[] coords = r.getGeometry().getCoordinates();
                double[][] coordinates = new double[coords.length][2];
                for (int i = 0; i < coords.length; i++) {
                    coordinates[i][0] = coords[i].x;
                    coordinates[i][1] = coords[i].y;
                }
                geometry.put("coordinates", coordinates);
                feature.put("geometry", geometry);
                
                Map<String, Object> properties = new HashMap<>();
                properties.put("routeId", r.getRouteId());
                properties.put("routeCode", r.getRouteCode());
                properties.put("origin", r.getOrigin());
                properties.put("destination", r.getDestination());
                properties.put("distance", r.getDistance());
                properties.put("fare", r.getFare());
                properties.put("serviceType", r.getServiceType());
                feature.put("properties", properties);
                
                return feature;
            }).collect(Collectors.toList());
            
        featureCollection.put("features", features);
        return ResponseEntity.ok(featureCollection);
    }

    @GetMapping("/setc/special-services")
    public ResponseEntity<List<SpecialService>> getSpecialServices() {
        return ResponseEntity.ok(specialServiceRepository.findAll());
    }

    @GetMapping("/setc/history")
    public ResponseEntity<List<SetcHistory>> getHistory() {
        return ResponseEntity.ok(historyRepository.findAllByOrderByIdAsc());
    }

    @GetMapping("/setc/awards")
    public ResponseEntity<List<SetcAward>> getAwards() {
        return ResponseEntity.ok(awardRepository.findAll());
    }
    
    // Utility for point features
    private Map<String, Object> convertToGeoJson(List<?> entities, String entityType) {
        Map<String, Object> featureCollection = new HashMap<>();
        featureCollection.put("type", "FeatureCollection");
        
        List<Map<String, Object>> features = entities.stream()
            .map(entity -> {
                Map<String, Object> feature = new HashMap<>();
                feature.put("type", "Feature");
                
                Map<String, Object> properties = new HashMap<>();
                Map<String, Object> geometry = new HashMap<>();
                geometry.put("type", "Point");
                
                if (entity instanceof ReservationCentre) {
                    ReservationCentre rc = (ReservationCentre) entity;
                    properties.put("id", rc.getId());
                    properties.put("name", rc.getName());
                    properties.put("counterAddress", rc.getCounterAddress());
                    properties.put("district", rc.getDistrict());
                    
                    if (rc.getLocation() != null) {
                        geometry.put("coordinates", new double[]{rc.getLocation().getX(), rc.getLocation().getY()});
                        feature.put("geometry", geometry);
                    } else {
                        feature.put("geometry", null);
                    }
                } else if (entity instanceof Depot) {
                    Depot d = (Depot) entity;
                    properties.put("id", d.getId());
                    properties.put("name", d.getName());
                    properties.put("state", d.getState());
                    properties.put("address", d.getAddress());
                    properties.put("type", d.getType());
                    
                    if (d.getLocation() != null) {
                        geometry.put("coordinates", new double[]{d.getLocation().getX(), d.getLocation().getY()});
                        feature.put("geometry", geometry);
                    } else {
                        feature.put("geometry", null);
                    }
                }
                
                feature.put("properties", properties);
                return feature;
            }).collect(Collectors.toList());
            
        featureCollection.put("features", features);
        return featureCollection;
    }
}
