package com.example.RentalApp.repository;

import com.example.RentalApp.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami Inventory.
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAll();
    List<Inventory> findAllByItemName(String name);
    List<Inventory> findByOwnerId(Long id);
    List<Inventory> findByDeletedFalse();
    List<Inventory> findByOwnerIdAndDeletedFalse(Long ownerId);
}
