package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.LineString;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "special_services")
@Data
public class SpecialService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @Column(name = "period_text")
    private String periodText;

    private String description;

    private BigDecimal fare;

    @Column(name = "distance_km")
    private BigDecimal distanceKm;

    @Column(columnDefinition = "geometry(LineString,4326)")
    private LineString geometry;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
