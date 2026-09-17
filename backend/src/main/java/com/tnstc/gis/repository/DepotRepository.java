package com.tnstc.gis.repository;

import com.tnstc.gis.model.Depot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepotRepository extends JpaRepository<Depot, Long> {
    List<Depot> findByType(String type);
    
    // For upsert checking
    Depot findByName(String name);
    
    // For geocoding
    List<Depot> findByLocationIsNull();
}
