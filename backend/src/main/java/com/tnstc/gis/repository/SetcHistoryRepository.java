package com.tnstc.gis.repository;

import com.tnstc.gis.model.SetcHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetcHistoryRepository extends JpaRepository<SetcHistory, Long> {
    List<SetcHistory> findAllByOrderByIdAsc();
}
