package com.tnstc.gis.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "training_institutes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingInstitute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String district;

    @Column(name = "location_name", nullable = false)
    private String locationName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "contact_phone")
    private String contactPhone;

    private String email;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @JsonIgnore
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    @Column(name = "established_year")
    private Integer establishedYear;

    @ElementCollection
    @CollectionTable(name = "institute_courses", joinColumns = @JoinColumn(name = "institute_id"))
    @Column(name = "course_name")
    private List<String> coursesOffered;

    @Column(name = "has_driving_track")
    private Boolean hasDrivingTrack;

    @Column(name = "provides_psv_badge")
    private Boolean providesPsvBadge;

    @Column(name = "has_hostel_facility")
    private Boolean hasHostelFacility;

    @Column(name = "eligibility_criteria", columnDefinition = "TEXT")
    private String eligibilityCriteria;

    @Column(name = "website_url")
    private String websiteUrl;

    @Column(name = "created_at", insertable = false, updatable = false)
    private ZonedDateTime createdAt;
}
