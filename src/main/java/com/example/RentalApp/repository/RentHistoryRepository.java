package com.example.RentalApp.repository;

import com.example.RentalApp.model.RentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {
}
