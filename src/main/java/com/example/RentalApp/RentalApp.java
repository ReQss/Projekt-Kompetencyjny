package com.example.RentalApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * Główna klasa aplikacji RentalApp.
 * Uruchamia aplikację Spring Boot.
 */
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RentalApp {
    /**
     * Metoda główna aplikacji.
     * @param args Argumenty wiersza poleceń.
     */
    public static void main(String[] args) {
        SpringApplication.run(RentalApp.class, args);
    }
}
