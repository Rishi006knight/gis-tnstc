package com.tnstc.gis.repository;

import com.tnstc.gis.model.ReservationCentre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationCentreRepository extends JpaRepository<ReservationCentre, Long> {
    List<ReservationCentre> findByDistrict(String district);
    
    // For upsert checking
    ReservationCentre findByName(String name);
    
    // For geocoding
    List<ReservationCentre> findByLocationIsNull();
}
