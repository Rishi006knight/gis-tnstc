package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.LineString;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "setc_routes")
@Data
public class SetcRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    @Column(name = "route_code")
    private String routeCode;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    private String stops;

    private BigDecimal distance;

    @Column(name = "travel_time")
    private String travelTime;

    @Column(name = "service_type")
    private String serviceType;

    private BigDecimal fare;

    @Column(columnDefinition = "geometry(LineString,4326)")
    private LineString geometry;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
