package com.tnstc.gis.service;

import com.tnstc.gis.dto.FareCalculateRequest;
import com.tnstc.gis.dto.FareCalculateResponse;
import com.tnstc.gis.model.FareRate;
import com.tnstc.gis.model.Route;
import com.tnstc.gis.repository.FareRateRepository;
import com.tnstc.gis.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FareService {

    private final FareRateRepository fareRateRepository;
    private final RouteRepository routeRepository;

    public List<FareRate> getAllFareRates() {
        return fareRateRepository.findAll();
    }

    public List<String> getServedCities() {
        return routeRepository.findAllServedCities();
    }

    public FareCalculateResponse calculateFare(FareCalculateRequest request) {
        String serviceCode = request.getServiceCode();
        FareRate rate = fareRateRepository.findByServiceCodeIgnoreCase(serviceCode)
                .orElseThrow(() -> new IllegalArgumentException("Invalid service code: " + serviceCode));

        BigDecimal distanceKm;
        BigDecimal estimatedHours;
        boolean isGhatRoute = Boolean.TRUE.equals(request.getIsGhatRoad());

        if (request.getCustomDistanceKm() != null && request.getCustomDistanceKm() > 0) {
            distanceKm = BigDecimal.valueOf(request.getCustomDistanceKm());
            estimatedHours = distanceKm.divide(BigDecimal.valueOf(50), 1, RoundingMode.HALF_UP);
        } else {
            Optional<Route> routeOpt = routeRepository.findRouteBetweenCities(
                    request.getOriginCity().trim(),
                    request.getDestinationCity().trim()
            );

            if (routeOpt.isPresent()) {
                Route route = routeOpt.get();
                distanceKm = route.getDistanceKm();
                estimatedHours = route.getEstimatedHours();
                if (Boolean.TRUE.equals(route.getIsGhatRoute())) {
                    isGhatRoute = true;
                }
            } else {
                // Fallback estimated distance if route not in pre-defined table
                distanceKm = BigDecimal.valueOf(250.0);
                estimatedHours = BigDecimal.valueOf(4.5);
            }
        }

        // Calculation:
        // Plains Fare = Max(Base Fare, distance * rate_per_km)
        BigDecimal kmCharge = distanceKm.multiply(rate.getRatePerKm());
        BigDecimal plainsFare = kmCharge.max(rate.getBaseFare()).setScale(2, RoundingMode.HALF_UP);

        // Ghat Surcharge: if applicable, add +20% on top
        BigDecimal ghatSurcharge = BigDecimal.ZERO;
        if (isGhatRoute) {
            ghatSurcharge = plainsFare.multiply(rate.getGhatRateMultiplier().subtract(BigDecimal.ONE))
                    .setScale(2, RoundingMode.HALF_UP);
        }

        // Flexi Peak/Lean Multiplier:
        LocalDate travelDate = request.getTravelDate() != null ? request.getTravelDate() : LocalDate.now();
        DayOfWeek day = travelDate.getDayOfWeek();
        boolean isPeak = (day == DayOfWeek.FRIDAY || day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY);

        BigDecimal flexiSurge = BigDecimal.ZERO;
        if (isPeak && rate.getPeakDayMultiplier().compareTo(BigDecimal.ONE) > 0) {
            BigDecimal multiplierDiff = rate.getPeakDayMultiplier().subtract(BigDecimal.ONE);
            flexiSurge = plainsFare.multiply(multiplierDiff).setScale(2, RoundingMode.HALF_UP);
        }

        // Total Fare rounded up to nearest whole rupee as per TNSTC ticketing norm
        BigDecimal subTotal = plainsFare.add(ghatSurcharge).add(flexiSurge);
        BigDecimal totalFare = subTotal.setScale(0, RoundingMode.CEILING);

        String note = isGhatRoute ? "Route contains hill/ghat sections: +20% surcharge applied." : "Standard highway corridor fare.";
        if (isPeak) {
            note += " Peak-day flexi surcharge applicable (" + day.name() + ").";
        }

        return FareCalculateResponse.builder()
                .originCity(request.getOriginCity())
                .destinationCity(request.getDestinationCity())
                .serviceCode(rate.getServiceCode())
                .serviceName(rate.getServiceName())
                .distanceKm(distanceKm)
                .estimatedHours(estimatedHours)
                .baseFare(rate.getBaseFare())
                .ratePerKm(rate.getRatePerKm())
                .plainsFare(plainsFare)
                .ghatSurcharge(ghatSurcharge)
                .flexiSurgeAmount(flexiSurge)
                .totalFare(totalFare)
                .isGhatApplied(isGhatRoute)
                .isPeakDayApplied(isPeak)
                .dayOfWeek(day.name())
                .note(note)
                .build();
    }
}
