package com.tnstc.gis.service;

import com.tnstc.gis.dto.GeoJsonFeature;
import com.tnstc.gis.dto.GeoJsonFeatureCollection;
import com.tnstc.gis.model.TrainingInstitute;
import com.tnstc.gis.repository.TrainingInstituteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainingInstituteService {

    private final TrainingInstituteRepository repository;

    public List<TrainingInstitute> getAllInstitutes() {
        return repository.findAll();
    }

    public Optional<TrainingInstitute> getInstituteById(Long id) {
        return repository.findById(id);
    }

    public List<String> getAllDistricts() {
        return repository.findDistinctDistricts();
    }

    public GeoJsonFeatureCollection getInstitutesGeoJson(String district, String course, String query) {
        List<TrainingInstitute> list = repository.findAll();

        if (district != null && !district.isBlank() && !"All".equalsIgnoreCase(district)) {
            list = list.stream()
                    .filter(i -> i.getDistrict().equalsIgnoreCase(district.trim()))
                    .collect(Collectors.toList());
        }

        if (course != null && !course.isBlank() && !"All".equalsIgnoreCase(course)) {
            list = list.stream()
                    .filter(i -> i.getCoursesOffered() != null && i.getCoursesOffered().stream()
                            .anyMatch(c -> c.toLowerCase().contains(course.toLowerCase().trim())))
                    .collect(Collectors.toList());
        }

        if (query != null && !query.isBlank()) {
            String q = query.toLowerCase().trim();
            list = list.stream()
                    .filter(i -> i.getName().toLowerCase().contains(q) ||
                                 i.getDistrict().toLowerCase().contains(q) ||
                                 i.getLocationName().toLowerCase().contains(q))
                    .collect(Collectors.toList());
        }

        List<GeoJsonFeature> features = new ArrayList<>();
        for (TrainingInstitute ti : list) {
            Map<String, Object> props = new HashMap<>();
            props.put("id", ti.getId());
            props.put("name", ti.getName());
            props.put("district", ti.getDistrict());
            props.put("locationName", ti.getLocationName());
            props.put("address", ti.getAddress());
            props.put("contactPerson", ti.getContactPerson());
            props.put("contactPhone", ti.getContactPhone());
            props.put("email", ti.getEmail());
            props.put("establishedYear", ti.getEstablishedYear());
            props.put("coursesOffered", ti.getCoursesOffered());
            props.put("hasDrivingTrack", ti.getHasDrivingTrack());
            props.put("providesPsvBadge", ti.getProvidesPsvBadge());
            props.put("hasHostelFacility", ti.getHasHostelFacility());
            props.put("eligibilityCriteria", ti.getEligibilityCriteria());
            props.put("websiteUrl", ti.getWebsiteUrl());

            GeoJsonFeature.GeometryDto geom = GeoJsonFeature.GeometryDto.builder()
                    .type("Point")
                    .coordinates(new double[]{ti.getLongitude(), ti.getLatitude()})
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
