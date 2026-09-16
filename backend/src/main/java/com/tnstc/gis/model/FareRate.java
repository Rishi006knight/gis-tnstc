package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "fare_rates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_code", nullable = false, unique = true)
    private String serviceCode;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(name = "base_fare", nullable = false)
    private BigDecimal baseFare;

    @Column(name = "minimum_distance_km", nullable = false)
    private BigDecimal minimumDistanceKm;

    @Column(name = "rate_per_km", nullable = false)
    private BigDecimal ratePerKm;

    @Column(name = "ghat_rate_multiplier", nullable = false)
    private BigDecimal ghatRateMultiplier;

    @Column(name = "lean_day_multiplier", nullable = false)
    private BigDecimal leanDayMultiplier;

    @Column(name = "peak_day_multiplier", nullable = false)
    private BigDecimal peakDayMultiplier;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
