package com.tnstc.gis.service;

import com.tnstc.gis.dto.GeoJsonFeature;
import com.tnstc.gis.dto.GeoJsonFeatureCollection;
import com.tnstc.gis.model.Motel;
import com.tnstc.gis.repository.MotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MotelService {

    private final MotelRepository motelRepository;

    public List<Motel> getAllMotels() {
        return motelRepository.findAll();
    }

    public Optional<Motel> getMotelById(Long id) {
        return motelRepository.findById(id);
    }

    public List<Motel> getMotelsByDistrict(String district) {
        return motelRepository.findByDistrictIgnoreCase(district);
    }

    public List<Motel> searchMotels(String query) {
        if (query == null || query.isBlank()) {
            return getAllMotels();
        }
        return motelRepository.searchMotels(query.trim());
    }

    public List<String> getAllDistricts() {
        return motelRepository.findDistinctDistricts();
    }

    public GeoJsonFeatureCollection getMotelsGeoJson(String district, String query) {
        List<Motel> list;
        if (district != null && !district.isBlank() && !"All".equalsIgnoreCase(district)) {
            list = motelRepository.findByDistrictIgnoreCase(district);
        } else if (query != null && !query.isBlank()) {
            list = motelRepository.searchMotels(query.trim());
        } else {
            list = motelRepository.findAll();
        }

        List<GeoJsonFeature> features = new ArrayList<>();
        for (Motel m : list) {
            Map<String, Object> props = new HashMap<>();
            props.put("id", m.getId());
            props.put("name", m.getName());
            props.put("highwayNumber", m.getHighwayNumber());
            props.put("district", m.getDistrict());
            props.put("locationName", m.getLocationName());
            props.put("address", m.getAddress());
            props.put("contactNumber", m.getContactNumber());
            props.put("operatingHours", m.getOperatingHours());
            props.put("hasRestroom", m.getHasRestroom());
            props.put("hasRestaurant", m.getHasRestaurant());
            props.put("hasEvCharging", m.getHasEvCharging());
            props.put("hasParking", m.getHasParking());
            props.put("hasFirstAid", m.getHasFirstAid());
            props.put("cleanlinessRating", m.getCleanlinessRating());
            props.put("notes", m.getNotes());

            GeoJsonFeature.GeometryDto geom = GeoJsonFeature.GeometryDto.builder()
                    .type("Point")
                    .coordinates(new double[]{m.getLongitude(), m.getLatitude()})
                    .build();

            features.add(GeoJsonFeature.builder()
                    .type("Feature")
                    .geometry(geom)
                    .properties(props)
                    .build());
        }

        return GeoJsonFeatureCollection.builder()
                .type("FeatureCollection")
                .features(features)
                .build();
    }
}
