package com.tnstc.gis.repository;

import com.tnstc.gis.model.FareRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FareRateRepository extends JpaRepository<FareRate, Long> {
    Optional<FareRate> findByServiceCodeIgnoreCase(String serviceCode);
}
