package com.tnstc.gis.controller;

import com.tnstc.gis.dto.FareCalculateRequest;
import com.tnstc.gis.dto.FareCalculateResponse;
import com.tnstc.gis.model.FareRate;
import com.tnstc.gis.service.FareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fare")
@RequiredArgsConstructor
public class FareController {

    private final FareService fareService;

    @GetMapping("/rates")
    public ResponseEntity<List<FareRate>> getRates() {
        return ResponseEntity.ok(fareService.getAllFareRates());
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getServedCities() {
        return ResponseEntity.ok(fareService.getServedCities());
    }

    @PostMapping("/calculate")
    public ResponseEntity<FareCalculateResponse> calculateFare(@Valid @RequestBody FareCalculateRequest request) {
        return ResponseEntity.ok(fareService.calculateFare(request));
    }
}
