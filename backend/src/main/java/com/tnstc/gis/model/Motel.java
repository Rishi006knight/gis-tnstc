package com.tnstc.gis.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Entity
@Table(name = "motels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Motel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "highway_number", nullable = false)
    private String highwayNumber;

    @Column(nullable = false)
    private String district;

    @Column(name = "location_name", nullable = false)
    private String locationName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    @Column(name = "operating_hours")
    private String operatingHours;

    @Column(name = "has_restroom")
    private Boolean hasRestroom;

    @Column(name = "has_restaurant")
    private Boolean hasRestaurant;

    @Column(name = "has_ev_charging")
    private Boolean hasEvCharging;

    @Column(name = "has_parking")
    private Boolean hasParking;

    @Column(name = "has_first_aid")
    private Boolean hasFirstAid;

    @Column(name = "cleanliness_rating")
    private BigDecimal cleanlinessRating;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
