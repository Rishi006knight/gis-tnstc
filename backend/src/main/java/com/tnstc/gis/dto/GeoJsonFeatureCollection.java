package com.tnstc.gis.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GeoJsonFeatureCollection {
    @Builder.Default
    private String type = "FeatureCollection";
    @Builder.Default
    private List<GeoJsonFeature> features = new ArrayList<>();
}
