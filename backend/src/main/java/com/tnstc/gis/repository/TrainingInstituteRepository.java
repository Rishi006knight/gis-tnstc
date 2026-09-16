package com.tnstc.gis.repository;

import com.tnstc.gis.model.TrainingInstitute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingInstituteRepository extends JpaRepository<TrainingInstitute, Long> {

    List<TrainingInstitute> findByDistrictIgnoreCase(String district);

    @Query("SELECT t FROM TrainingInstitute t WHERE " +
           "LOWER(t.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(t.district) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(t.locationName) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<TrainingInstitute> searchInstitutes(@Param("query") String query);

    @Query(value = "SELECT DISTINCT district FROM training_institutes ORDER BY district ASC", nativeQuery = true)
    List<String> findDistinctDistricts();
}
