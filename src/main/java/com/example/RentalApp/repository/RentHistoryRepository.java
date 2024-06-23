package com.example.RentalApp.repository;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.model.RentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami RentHistory.
 */
@Repository
public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {
    List<RentHistory> findByUserId(Integer userId);
    List<RentHistory> findByInventoryId(Integer inventoryId);
    RentHistory findFirstByInventoryIdAndRentStatusNot(Integer inventoryId, RentStatus rentStatus);
}
