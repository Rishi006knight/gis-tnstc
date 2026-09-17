package com.tnstc.gis.repository;

import com.tnstc.gis.model.SpecialService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialServiceRepository extends JpaRepository<SpecialService, Long> {
    SpecialService findByServiceName(String serviceName);
}
