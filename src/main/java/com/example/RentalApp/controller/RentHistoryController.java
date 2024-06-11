package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.service.RentHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

/**
 * Kontroler REST do zarządzania historią wynajmu (RentHistory).
 */
@RestController
@RequestMapping("/api/rentHistory")
public class RentHistoryController {

    @Autowired
    private RentHistoryService rentHistoryService;

    /**
     * Dodaje nowy wpis do historii wynajmu.
     * @param rentHistory Nowy wpis do historii wynajmu.
     * @return ResponseEntity z dodanym wpisem historii wynajmu.
     */
    @PostMapping
    public ResponseEntity<RentHistory> addRentHistory(@RequestBody RentHistory rentHistory) {
        rentHistory.setRentalDate(Instant.now());
        RentHistory newRentHistory = rentHistoryService.addRentHistory(rentHistory);
        return ResponseEntity.ok(newRentHistory);
    }

    /**
     * Pobiera historię wynajmu dla danego użytkownika.
     * @param userId ID użytkownika.
     * @return ResponseEntity z listą wpisów historii wynajmu dla danego użytkownika.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RentHistory>> getRentHistoryByUserId(@PathVariable Integer userId) {
        List<RentHistory> rentHistories = rentHistoryService.findRentHistoriesByUserId(userId);
        if (rentHistories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistories);
    }

    /**
     * Pobiera historię wynajmu dla danego zasobu.
     * @param inventoryId ID zasobu.
     * @return ResponseEntity z listą wpisów historii wynajmu dla danego zasobu.
     */
    @GetMapping("/inventory/{inventoryId}")
    public ResponseEntity<List<RentHistory>> getRentHistoryByInventoryId(@PathVariable Integer inventoryId) {
        List<RentHistory> rentHistories = rentHistoryService.findRentHistoriesByInventoryId(inventoryId);
        if (rentHistories.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(rentHistories);
    }

    /**
     * Oznacza wypożyczony przedmiot jako zwrócony.
     * @param inventoryId ID zasobu.
     * @return ResponseEntity z zaktualizowanym wpisem historii wynajmu.
     */
    @PostMapping("/return/{inventoryId}")
    public ResponseEntity<RentHistory> returnRentedItem(@PathVariable Integer inventoryId) {
        RentHistory updatedRentHistory = rentHistoryService.returnRentedItem(inventoryId);
        if (updatedRentHistory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedRentHistory);
    }
}
