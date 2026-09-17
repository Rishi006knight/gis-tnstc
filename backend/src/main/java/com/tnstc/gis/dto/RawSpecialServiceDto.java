package com.tnstc.gis.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class RawSpecialServiceDto {
    private String serviceName;
    private String origin;
    private String destination;
    private String periodText;
    private String description;
    private BigDecimal fare;
    private BigDecimal distanceKm;
}
