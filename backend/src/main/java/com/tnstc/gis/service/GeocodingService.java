package com.tnstc.gis.service;

import com.tnstc.gis.model.Depot;
import com.tnstc.gis.model.GeocodingFailure;
import com.tnstc.gis.model.ReservationCentre;
import com.tnstc.gis.repository.DepotRepository;
import com.tnstc.gis.repository.GeocodingFailureRepository;
import com.tnstc.gis.repository.ReservationCentreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeocodingService {

    private final ReservationCentreRepository reservationCentreRepository;
    private final DepotRepository depotRepository;
    private final GeocodingFailureRepository geocodingFailureRepository;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    @Async
    @Transactional
    public void geocodeMissingLocations() {
        log.info("Starting background geocoding job");

        List<ReservationCentre> missingRcs = reservationCentreRepository.findByLocationIsNull();
        for (ReservationCentre rc : missingRcs) {
            String query = rc.getName() + ", " + (rc.getDistrict() != null ? rc.getDistrict() + ", " : "") + "Tamil Nadu, India";
            Point point = geocode(query);
            if (point != null) {
                rc.setLocation(point);
                reservationCentreRepository.save(rc);
            } else {
                logFailure("reservation_centres", rc.getId(), rc.getName(), query, "Geocoding returned no results or failed");
            }
            sleep();
        }

        List<Depot> missingDepots = depotRepository.findByLocationIsNull();
        for (Depot depot : missingDepots) {
            String state = depot.getState() != null ? depot.getState() : "Tamil Nadu";
            String query = depot.getName() + " SETC Depot, " + state + ", India";
            Point point = geocode(query);
            if (point != null) {
                depot.setLocation(point);
                depotRepository.save(depot);
            } else {
                logFailure("depots", depot.getId(), depot.getName(), query, "Geocoding returned no results or failed");
            }
            sleep();
        }

        log.info("Finished background geocoding job");
    }

    private Point geocode(String query) {
        try {
            String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                    .queryParam("q", query)
                    .queryParam("format", "json")
                    .queryParam("limit", 1)
                    .toUriString();

            HttpHeaders headers = new HttpHeaders();
            headers.set("User-Agent", "TNSTC-GIS-Portal/1.0 (contact@tnstc.in)");
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}
            );

            List<Map<String, Object>> results = response.getBody();
            if (results != null && !results.isEmpty()) {
                Map<String, Object> first = results.get(0);
                double lat = Double.parseDouble(first.get("lat").toString());
                double lon = Double.parseDouble(first.get("lon").toString());
                return geometryFactory.createPoint(new Coordinate(lon, lat));
            }
        } catch (Exception e) {
            log.error("Error geocoding query: {}", query, e);
        }
        return null;
    }

    private void logFailure(String tableName, Long recordId, String name, String query, String error) {
        GeocodingFailure failure = new GeocodingFailure();
        failure.setTableName(tableName);
        failure.setRecordId(recordId);
        failure.setName(name);
        failure.setQueryUsed(query);
        failure.setErrorMessage(error);
        geocodingFailureRepository.save(failure);
    }

    private void sleep() {
        try {
            // Nominatim limit is 1 request per second
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
