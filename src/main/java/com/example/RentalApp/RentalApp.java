package com.example.RentalApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RentalApp {

    public static void main(String[] args) {
        SpringApplication.run(RentalApp.class, args);
    }

}
