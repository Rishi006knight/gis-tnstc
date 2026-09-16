package com.tnstc.gis.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareCalculateResponse {
    private String originCity;
    private String destinationCity;
    private String serviceCode;
    private String serviceName;
    private BigDecimal distanceKm;
    private BigDecimal estimatedHours;
    private BigDecimal baseFare;
    private BigDecimal ratePerKm;
    private BigDecimal plainsFare;
    private BigDecimal ghatSurcharge;
    private BigDecimal flexiSurgeAmount;
    private BigDecimal totalFare;
    private Boolean isGhatApplied;
    private Boolean isPeakDayApplied;
    private String dayOfWeek;
    private String note;
}
