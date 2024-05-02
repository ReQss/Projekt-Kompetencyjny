package com.example.RentalApp.repository;

import com.example.RentalApp.model.RentHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {
    List<RentHistory> findByUserId(Integer userId);
}
