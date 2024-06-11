package com.example.RentalApp.controller;

import com.example.RentalApp.model.Inventory;
import com.example.RentalApp.repository.InventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Kontroler REST do zarządzania zasobami (Inventory).
 */
@RestController
@RequestMapping("/api")
public class InventoryRestController {

    private final InventoryRepository inventoryRepository;

    public InventoryRestController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    /**
     * Pobiera wszystkie elementy zasobów.
     * @return Lista wszystkich elementów zasobów.
     */
    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findByDeletedFalse();
    }

    /**
     * Dodaje nowy element zasobu.
     * @param newInventory Nowy element zasobu.
     * @param file Plik zdjęcia (opcjonalny).
     * @return ResponseEntity z dodanym elementem zasobu.
     */
    @PostMapping("/addInventory")
    public ResponseEntity<Inventory> addInventory(
            @RequestPart("inventory") Inventory newInventory,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            // Obsługuje przesyłanie pliku
            if (file != null && !file.isEmpty()) {
                newInventory.setPhoto(file.getBytes());
            }

            Inventory savedInventory = inventoryRepository.save(newInventory);
            return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Aktualizuje istniejący element zasobu.
     * @param id ID elementu zasobu.
     * @param updatedInventory Zaktualizowany element zasobu.
     * @return ResponseEntity z zaktualizowanym elementem zasobu.
     */
    @PutMapping("/updateInventory/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {
            // Aktualizuje pola elementu zasobu
            existingInventory.setDescription(updatedInventory.getDescription());
            existingInventory.setItemName(updatedInventory.getItemName());
            // Pozostałe pola...

            Inventory updated = inventoryRepository.save(existingInventory);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Usuwa element zasobu.
     * @param id ID elementu zasobu do usunięcia.
     * @return ResponseEntity z odpowiednią wartością statusu HTTP.
     */
    @DeleteMapping("/deleteInventory/{id}")
    public ResponseEntity<HttpStatus> deleteInventory(@PathVariable Long id) {
        try {
            Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
            if (existingInventory != null) {
                existingInventory.setDeleted(true);
                inventoryRepository.save(existingInventory);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
