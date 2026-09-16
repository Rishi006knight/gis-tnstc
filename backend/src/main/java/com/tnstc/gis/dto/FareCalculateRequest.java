package com.tnstc.gis.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareCalculateRequest {

    @NotBlank(message = "Origin city is required")
    private String originCity;

    @NotBlank(message = "Destination city is required")
    private String destinationCity;

    @NotBlank(message = "Service code is required")
    private String serviceCode;

    private LocalDate travelDate;

    private Boolean isGhatRoad;

    private Double customDistanceKm;
}
