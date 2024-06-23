package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.repository.RentHistoryRepository;
import com.example.RentalApp.service.RentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/getAll")
    public ResponseEntity<List<List<RentHistory>>> getAllRentHistory() {
        List<Integer> inventoryIds = rentHistoryService.getAllInventoryIds();
        List<List<RentHistory>> rentHistoryLists = new ArrayList<>();

        for (Integer inventoryId : inventoryIds) {
            List<RentHistory> rentHistories = rentHistoryService.findRentHistoriesByInventoryId(inventoryId);
            if (!rentHistories.isEmpty()) {
                rentHistoryLists.add(rentHistories);
            }
        }

        if (rentHistoryLists.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistoryLists);
    }
}

