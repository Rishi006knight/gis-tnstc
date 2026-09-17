package com.tnstc.gis.repository;

import com.tnstc.gis.model.SetcRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetcRouteRepository extends JpaRepository<SetcRoute, Long> {
}
