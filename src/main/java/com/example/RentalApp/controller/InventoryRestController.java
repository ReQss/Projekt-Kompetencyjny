package com.example.RentalApp.controller;

import com.example.RentalApp.model.Inventory;
import com.example.RentalApp.repository.InventoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class InventoryRestController {

    private final InventoryRepository inventoryRepository;

    public InventoryRestController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
}

