package com.tnstc.gis.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.ZonedDateTime;

@Entity
@Table(name = "geocoding_failures")
@Data
public class GeocodingFailure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "table_name", nullable = false)
    private String tableName;

    @Column(name = "record_id", nullable = false)
    private Long recordId;

    private String name;

    @Column(name = "query_used")
    private String queryUsed;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
