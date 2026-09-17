package com.tnstc.gis.service;

import com.tnstc.gis.dto.RawDepotDto;
import com.tnstc.gis.dto.RawReservationCentreDto;
import com.tnstc.gis.dto.RawSpecialServiceDto;
import com.tnstc.gis.model.Depot;
import com.tnstc.gis.model.ReservationCentre;
import com.tnstc.gis.model.SpecialService;
import com.tnstc.gis.repository.DepotRepository;
import com.tnstc.gis.repository.ReservationCentreRepository;
import com.tnstc.gis.repository.SpecialServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SetcDataIngestionService {

    private final ReservationCentreRepository reservationCentreRepository;
    private final DepotRepository depotRepository;
    private final SpecialServiceRepository specialServiceRepository;

    @Transactional
    public void importReservationCentres(List<RawReservationCentreDto> rows) {
        log.info("Importing {} reservation centres", rows.size());
        for (RawReservationCentreDto row : rows) {
            ReservationCentre rc = reservationCentreRepository.findByName(row.getName());
            if (rc == null) {
                rc = new ReservationCentre();
                rc.setName(row.getName());
            }
            rc.setCounterAddress(row.getAddress());
            rc.setDistrict(row.getDistrict());
            rc.setLastVerified(LocalDate.now());
            
            reservationCentreRepository.save(rc);
        }
    }

    @Transactional
    public void importDepots(List<RawDepotDto> rows) {
        log.info("Importing {} depots", rows.size());
        for (RawDepotDto row : rows) {
            Depot depot = depotRepository.findByName(row.getName());
            if (depot == null) {
                depot = new Depot();
                depot.setName(row.getName());
            }
            depot.setState(row.getState() != null ? row.getState() : "Tamil Nadu");
            depot.setAddress(row.getAddress());
            depot.setType(row.getType() != null ? row.getType() : "depot");
            
            depotRepository.save(depot);
        }
    }

    @Transactional
    public void importSpecialServices(List<RawSpecialServiceDto> rows) {
        log.info("Importing {} special services", rows.size());
        for (RawSpecialServiceDto row : rows) {
            SpecialService ss = specialServiceRepository.findByServiceName(row.getServiceName());
            if (ss == null) {
                ss = new SpecialService();
                ss.setServiceName(row.getServiceName());
            }
            ss.setOrigin(row.getOrigin());
            ss.setDestination(row.getDestination());
            ss.setPeriodText(row.getPeriodText());
            ss.setDescription(row.getDescription());
            ss.setFare(row.getFare());
            ss.setDistanceKm(row.getDistanceKm());
            
            specialServiceRepository.save(ss);
        }
    }
}
