package com.tnstc.gis.repository;

import com.tnstc.gis.model.SetcAward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SetcAwardRepository extends JpaRepository<SetcAward, Long> {
}
