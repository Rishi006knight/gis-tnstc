package com.tnstc.gis.controller;

import com.tnstc.gis.dto.GeoJsonFeatureCollection;
import com.tnstc.gis.model.TrainingInstitute;
import com.tnstc.gis.service.TrainingInstituteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-institutes")
@RequiredArgsConstructor
public class TrainingInstituteController {

    private final TrainingInstituteService service;

    @GetMapping
    public ResponseEntity<List<TrainingInstitute>> getAllInstitutes() {
        return ResponseEntity.ok(service.getAllInstitutes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainingInstitute> getInstituteById(@PathVariable Long id) {
        return service.getInstituteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/geojson")
    public ResponseEntity<GeoJsonFeatureCollection> getInstitutesGeoJson(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String course,
            @RequestParam(required = false) String query
    ) {
        return ResponseEntity.ok(service.getInstitutesGeoJson(district, course, query));
    }

    @GetMapping("/districts")
    public ResponseEntity<List<String>> getDistricts() {
        return ResponseEntity.ok(service.getAllDistricts());
    }
}
