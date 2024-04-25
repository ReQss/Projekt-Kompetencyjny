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


        rentHistory.setRentalDate(Instant.now());
        RentHistory newRentHistory = rentHistoryService.addRentHistory(rentHistory);
        return ResponseEntity.ok(newRentHistory);
    }

}
