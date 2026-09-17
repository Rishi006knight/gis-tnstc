package com.tnstc.gis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GisTnstcApplication {
    public static void main(String[] args) {
        SpringApplication.run(GisTnstcApplication.class, args);
    }
}
