package com.tnstc.gis.repository;

import com.tnstc.gis.model.Motel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MotelRepository extends JpaRepository<Motel, Long> {

    List<Motel> findByDistrictIgnoreCase(String district);

    List<Motel> findByHighwayNumberIgnoreCase(String highwayNumber);

    @Query("SELECT m FROM Motel m WHERE " +
           "LOWER(m.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.district) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.locationName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(m.highwayNumber) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Motel> searchMotels(@Param("query") String query);

    @Query(value = "SELECT DISTINCT district FROM motels ORDER BY district ASC", nativeQuery = true)
    List<String> findDistinctDistricts();
}
