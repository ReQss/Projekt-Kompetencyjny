package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.repository.RentHistoryRepository;
import com.example.RentalApp.service.RentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/rentHistory")
public class RentHistoryController {

    @Autowired
    private RentHistoryService rentHistoryService;
    @Autowired
    private RentHistoryRepository rentHistoryRepository;

    @PostMapping
    public ResponseEntity<RentHistory> addRentHistory(@RequestBody RentHistory rentHistory) {
        rentHistory.setRentalDate(Instant.now());
        RentHistory newRentHistory = rentHistoryService.addRentHistory(rentHistory);
        return ResponseEntity.ok(newRentHistory);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RentHistory>> getRentHistoryByUserId(@PathVariable Integer userId) {
        List<RentHistory> rentHistories = rentHistoryService.findRentHistoriesByUserId(userId);
        if (rentHistories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistories);
    }

    @GetMapping("/inventory/{inventoryId}")
    public ResponseEntity<List<RentHistory>> getRentHistoryByInventoryId(@PathVariable Integer inventoryId) {
        List<RentHistory> rentHistories = rentHistoryService.findRentHistoriesByInventoryId(inventoryId);
        if (rentHistories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistories);
    }

    @PostMapping("/return/{inventoryId}")
    public ResponseEntity<RentHistory> returnRentedItem(@PathVariable Integer inventoryId) {
        RentHistory updatedRentHistory = rentHistoryService.returnRentedItem(inventoryId);
        if (updatedRentHistory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRentHistory);
    }

//    @GetMapping("/currentRenting/{inventoryId}")
//    public ResponseEntity<RentHistory> getCurrentRentingByInventoryId(@PathVariable Integer inventoryId) {
//
//    }

    @GetMapping("/currentRentingByInventoryId/{inventoryId}")
    public ResponseEntity<RentHistory> getCurrentRentingByInventoryId(@PathVariable Integer inventoryId) {
        RentHistory rentHistory = rentHistoryService.getCurrentRenting(inventoryId);
        if (rentHistory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistory);
    }

    @PutMapping("/modifyDescription/{inventoryId}")
    public ResponseEntity<String> modifyRentedItem(@PathVariable Integer inventoryId, @RequestBody String description) {
        RentHistory rentHistory = rentHistoryService.getCurrentRenting(inventoryId);
        if (rentHistory == null) {
            return ResponseEntity.notFound().build();
        }

        rentHistory.setRentDescription(description);
        rentHistoryRepository.save(rentHistory);
        return ResponseEntity.ok("Rented Item: " + rentHistory.getRentDescription());
    }
}

