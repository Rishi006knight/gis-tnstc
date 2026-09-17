package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Entity
@Table(name = "reservation_centres")
@Data
public class ReservationCentre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "counter_address", nullable = false)
    private String counterAddress;

    private String district;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    @Column(name = "source_url")
    private String sourceUrl;

    @Column(name = "last_verified")
    private LocalDate lastVerified;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
