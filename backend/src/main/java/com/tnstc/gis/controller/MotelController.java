package com.tnstc.gis.controller;

import com.tnstc.gis.dto.GeoJsonFeatureCollection;
import com.tnstc.gis.model.Motel;
import com.tnstc.gis.service.MotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motels")
@RequiredArgsConstructor
public class MotelController {

    private final MotelService motelService;

    @GetMapping
    public ResponseEntity<List<Motel>> getAllMotels(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String query
    ) {
        if (district != null && !district.isBlank()) {
            return ResponseEntity.ok(motelService.getMotelsByDistrict(district));
        }
        if (query != null && !query.isBlank()) {
            return ResponseEntity.ok(motelService.searchMotels(query));
        }
        return ResponseEntity.ok(motelService.getAllMotels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motel> getMotelById(@PathVariable Long id) {
        return motelService.getMotelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/geojson")
    public ResponseEntity<GeoJsonFeatureCollection> getMotelsGeoJson(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String query
    ) {
        return ResponseEntity.ok(motelService.getMotelsGeoJson(district, query));
    }

    @GetMapping("/districts")
    public ResponseEntity<List<String>> getDistricts() {
        return ResponseEntity.ok(motelService.getAllDistricts());
    }
}
