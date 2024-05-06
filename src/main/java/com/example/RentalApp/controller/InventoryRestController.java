package com.example.RentalApp.controller;

import com.example.RentalApp.model.Inventory;
import com.example.RentalApp.repository.InventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/inventoryByOwnerId")
    public List<Inventory> getInventoryByOwnerId(@RequestParam Long ownerId) {
        return inventoryRepository.findByOwnerId(ownerId);
    }
    @GetMapping("/inventoryById/{id}")
    public Inventory getInventory(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElse(null);
    }
    @PostMapping("/addInventory")
    public ResponseEntity<Inventory> addInventory(@RequestBody Inventory newInventory) {
        try {
            Inventory savedInventory = inventoryRepository.save(newInventory);
            return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/updateInventory/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable Long id, @RequestBody Inventory updatedInventory) {
        Inventory existingInventory = inventoryRepository.findById(id).orElse(null);
        if (existingInventory != null) {

            existingInventory.setDescription(updatedInventory.getDescription());
            existingInventory.setItemName(updatedInventory.getItemName());
            existingInventory.setOwnerId(updatedInventory.getOwnerId());
            existingInventory.setRentStatus(updatedInventory.getRentStatus());
            existingInventory.setRoom(updatedInventory.getRoom());
            existingInventory.setBuilding(updatedInventory.getBuilding());
            existingInventory.setInventoryDate(updatedInventory.getInventoryDate());
            existingInventory.setValue(updatedInventory.getValue());
            existingInventory.setInventoryNumber(updatedInventory.getInventoryNumber());
            existingInventory.setInvoiceNumber(updatedInventory.getInvoiceNumber());
            existingInventory.setFundingSource(updatedInventory.getFundingSource());
            existingInventory.setSupplierDocument(updatedInventory.getSupplierDocument());
            existingInventory.setInvoicePosition(updatedInventory.getInvoicePosition());
            existingInventory.setSerialNumber(updatedInventory.getSerialNumber());
            existingInventory.setCategory(updatedInventory.getCategory());



            Inventory updated = inventoryRepository.save(existingInventory);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteInventory/{id}")
    public ResponseEntity<HttpStatus> deleteInventory(@PathVariable Long id) {
        try {
            inventoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
