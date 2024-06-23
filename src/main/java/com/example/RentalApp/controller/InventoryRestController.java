package com.example.RentalApp.controller;

import com.example.RentalApp.model.Inventory;
import com.example.RentalApp.model.ItemStatus;
import com.example.RentalApp.model.RentStatus;
import com.example.RentalApp.repository.InventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * Kontroler REST do zarządzania przedmiotami inwentarza (Inventory).
 */
@RestController
@RequestMapping("/api")
public class InventoryRestController {

    private final InventoryRepository inventoryRepository;

    /**
     * Konstruktor kontrolera przedmiotów inwentarza.
     * @param inventoryRepository Repozytorium przedmiotów inwentarza.
     */
    public InventoryRestController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    /**
     * Pobiera wszystkie przedmioty inwentarza.
     * @return Lista wszystkich przedmiotów inwentarza.
     */
    @GetMapping("/inventory")
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findByDeletedFalse();
    }

    /**
     * Pobiera przedmioty inwentarza według identyfikatora właściciela.
     * @param ownerId ID właściciela.
     * @return Lista przedmiotów inwentarza danego właściciela.
     */
    @GetMapping("/inventoryByOwnerId")
    public List<Inventory> getInventoryByOwnerId(@RequestParam Long ownerId) {
        return inventoryRepository.findByOwnerIdAndDeletedFalse(ownerId);
    }

    /**
     * Pobiera przedmioty inwentarza według identyfikatora właściciela, które nie są wypożyczone.
     * @param ownerId ID właściciela.
     * @return Lista przedmiotów inwentarza danego właściciela, które nie są wypożyczone.
     */
    @GetMapping("/inventoryByOwnerIdWithoutRented")
    public List<Inventory> getInventoryByOwnerIdWithoutRented(@RequestParam Long ownerId) {
        return inventoryRepository.findByOwnerIdAndDeletedFalseAndRentStatusNot(ownerId, ItemStatus.unavailable);
    }

    /**
     * Pobiera przedmiot inwentarza według identyfikatora przedmiotu.
     * @param id ID przedmiotu inwentarza.
     * @return Przedmiot inwentarza o podanym identyfikatorze.
     */
    @GetMapping("/inventoryById/{id}")
    public Inventory getInventory(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }

    /**
     * Dodaje nowy przedmiot inwentarza.
     * @param newInventory Nowy przedmiot inwentarza.
     * @param file Plik zdjęcia (opcjonalny).
     * @return ResponseEntity z dodanym przedmiotem inwentarza.
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
     * Aktualizuje istniejący przedmiot inwentarza.
     * @param id ID przedmiotu inwentarza.
     * @param updatedInventory Zaktualizowany przedmiot inwentarza.
     * @return ResponseEntity z zaktualizowanym przedmiotem inwentarza.
     */
    @PutMapping("/updateInventory/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {
            // Aktualizuje pola przedmiotu inwentarza
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
     * Aktualizuje opis istniejącego przedmiotu inwentarza.
     * @param id ID przedmiotu inwentarza.
     * @param inventoryDescription Nowy opis przedmiotu inwentarza.
     * @return ResponseEntity z zaktualizowanym przedmiotem inwentarza.
     */
    @PutMapping("/updateInventoryDescription/{id}")
    public ResponseEntity<Inventory> updateInventoryDescription(@PathVariable Long id, @RequestBody String inventoryDescription) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {
            existingInventory.setDescription(inventoryDescription);
            Inventory updated = inventoryRepository.save(existingInventory);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Usuwa przedmiot inwentarza.
     * @param id ID przedmiotu inwentarza do usunięcia.
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
