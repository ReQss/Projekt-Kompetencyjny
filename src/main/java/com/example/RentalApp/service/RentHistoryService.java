package com.example.RentalApp.service;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.repository.RentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentHistoryService {

    @Autowired
    private RentHistoryRepository rentHistoryRepository;

    public RentHistory addRentHistory(RentHistory rentHistory) {
        return rentHistoryRepository.save(rentHistory);
    }

    public List<RentHistory> findRentHistoriesByUserId(Integer userId) {
        return rentHistoryRepository.findByUserId(userId);
    }
    public List<RentHistory> findRentHistoriesByInventoryId(Integer InventoryId) {
        return rentHistoryRepository.findByInventoryId(InventoryId);
    }
}



