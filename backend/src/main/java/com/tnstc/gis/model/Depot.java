package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;

import java.time.ZonedDateTime;

@Entity
@Table(name = "depots")
@Data
public class Depot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String state;

    private String address;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    private String type; // depot, bus_body_unit, workshop, training_centre, fc_unit, driving_school, outstation

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
