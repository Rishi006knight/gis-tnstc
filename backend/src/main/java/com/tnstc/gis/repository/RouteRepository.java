package com.tnstc.gis.repository;

import com.tnstc.gis.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    @Query("SELECT r FROM Route r WHERE " +
           "(LOWER(r.originCity) = LOWER(:origin) AND LOWER(r.destinationCity) = LOWER(:destination)) OR " +
           "(LOWER(r.originCity) = LOWER(:destination) AND LOWER(r.destinationCity) = LOWER(:origin))")
    Optional<Route> findRouteBetweenCities(@Param("origin") String origin, @Param("destination") String destination);

    @Query("SELECT DISTINCT r.originCity FROM Route r UNION SELECT DISTINCT r.destinationCity FROM Route r")
    List<String> findAllServedCities();
}
