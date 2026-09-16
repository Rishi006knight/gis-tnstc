package com.tnstc.gis.dto;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeoJsonFeature {
    @Builder.Default
    private String type = "Feature";
    private GeometryDto geometry;
    private Map<String, Object> properties;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class GeometryDto {
        @Builder.Default
        private String type = "Point";
        private double[] coordinates; // [longitude, latitude]
    }
}
