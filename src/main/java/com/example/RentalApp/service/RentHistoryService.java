package com.example.RentalApp.service;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.model.RentStatus;
import com.example.RentalApp.repository.RentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Klasa serwisowa do zarządzania encjami RentHistory.
 */
@Service
public class RentHistoryService {

    @Autowired
    private RentHistoryRepository rentHistoryRepository;

    /**
     * Dodaj nową wpis historii wypożyczeń.
     * @param rentHistory Obiekt historii wypożyczeń do dodania.
     * @return Zapisany obiekt historii wypożyczeń.
     */
    public RentHistory addRentHistory(RentHistory rentHistory) {
        return rentHistoryRepository.save(rentHistory);
    }

    /**
     * Znajdź wszystkie historie wypożyczeń według ID użytkownika.
     * @param userId ID użytkownika.
     * @return Lista historii wypożyczeń związanych z użytkownikiem.
     */
    public List<RentHistory> findRentHistoriesByUserId(Integer userId) {
        return rentHistoryRepository.findByUserId(userId);
    }

    /**
     * Znajdź wszystkie historie wypożyczeń według ID przedmiotu.
     * @param inventoryId ID przedmiotu.
     * @return Lista historii wypożyczeń związanych z przedmiotem.
     */
    public List<RentHistory> findRentHistoriesByInventoryId(Integer inventoryId) {
        return rentHistoryRepository.findByInventoryId(inventoryId);
    }

    /**
     * Oznacz przedmiot jako zwrócony w historii wypożyczeń.
     * @param inventoryId ID przedmiotu.
     * @return Zaktualizowany obiekt historii wypożyczeń, jeśli znaleziono i zaktualizowano, w przeciwnym razie null.
     */
    public RentHistory returnRentedItem(Integer inventoryId) {
        RentHistory rentHistory = rentHistoryRepository.findFirstByInventoryIdAndRentStatusNot(inventoryId, RentStatus.returned);
        if (rentHistory!= null) {
            rentHistory.setRentStatus(RentStatus.returned);
            rentHistory.setReturnDate(Instant.now());
            return rentHistoryRepository.save(rentHistory);
        }
        return null;
    }

    public List<Integer> getAllInventoryIds() {
        return rentHistoryRepository.findAll()
                .stream()
                .map(RentHistory::getId)
                .distinct()
                .collect(Collectors.toList());
    }
}
