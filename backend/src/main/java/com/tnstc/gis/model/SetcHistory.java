package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;

@Entity
@Table(name = "setc_history")
@Data
public class SetcHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "year_range")
    private String yearRange;

    @Column(name = "fleet_count")
    private Integer fleetCount;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
