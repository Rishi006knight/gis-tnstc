package com.tnstc.gis.repository;

import com.tnstc.gis.model.GeocodingFailure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeocodingFailureRepository extends JpaRepository<GeocodingFailure, Long> {
}
