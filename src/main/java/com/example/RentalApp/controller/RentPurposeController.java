package com.example.RentalApp.controller;

import com.example.RentalApp.model.RentPurpose;
import com.example.RentalApp.service.RentPurposeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentPurposes")
public class RentPurposeController {
    @Autowired
    private RentPurposeService service;

    @GetMapping
    public List<RentPurpose> getAllRentPurposes() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentPurpose> getRentPurposeById(@PathVariable Integer id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }






}
