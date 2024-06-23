package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentPurpose;
import com.example.RentalApp.service.RentPurposeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Kontroler REST do zarządzania celami wypożyczenia (RentPurpose).
 */
@RestController
@RequestMapping("/api/rentPurposes")
public class RentPurposeController {

    @Autowired
    private RentPurposeService service;

    /**
     * Pobiera wszystkie cele wypożyczenia.
     * @return Lista wszystkich celów wypożyczenia.
     */
    @GetMapping
    public List<RentPurpose> getAllRentPurposes() {
        return service.findAll();
    }

    /**
     * Pobiera cel wypożyczenia o podanym ID.
     * @param id ID celu wypożyczenia.
     * @return ResponseEntity z obiektem celu wypożyczenia lub kodem odpowiedzi NOT_FOUND.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RentPurpose> getRentPurposeById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
