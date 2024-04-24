package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.service.RentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/rentHistory")
public class RentHistoryController {

    @Autowired
    private RentHistoryService rentHistoryService;

    @PostMapping
    public ResponseEntity<RentHistory> addRentHistory(@RequestBody RentHistory rentHistory) {
        // Set the rental date to the current time
        rentHistory.setRentalDate(Instant.now());

        // Save the rent history using the service
        RentHistory newRentHistory = rentHistoryService.addRentHistory(rentHistory);

        // Return the newly created rent history
        return ResponseEntity.ok(newRentHistory);
    }
}
