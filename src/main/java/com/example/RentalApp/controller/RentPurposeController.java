package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentPurpose;
import com.example.RentalApp.service.RentPurposeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Kontroler REST do zarządzania celami wynajmu (RentPurpose).
 */
@RestController
@RequestMapping("/api/rentPurposes")
public class RentPurposeController {

    @Autowired
    private RentPurposeService service;

    /**
     * Pobiera wszystkie cele wynajmu.
     * @return Lista wszystkich celów wynajmu.
     */
    @GetMapping
    public List<RentPurpose> getAllRentPurposes() {
        return service.findAll();
    }

    /**
     * Pobiera cel wynajmu o podanym ID.
     * @param id ID celu wynajmu.
     * @return ResponseEntity z obiektem celu wynajmu lub kodem odpowiedzi NOT_FOUND.
     */
    @GetMapping("/{id}")
    public ResponseEntity<RentPurpose> getRentPurposeById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
