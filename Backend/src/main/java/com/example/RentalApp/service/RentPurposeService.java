package com.example.RentalApp.service;

import com.example.RentalApp.model.RentPurpose;
import com.example.RentalApp.repository.RentPurposeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Klasa serwisowa do zarządzania encjami RentPurpose.
 */
@Service
public class RentPurposeService {
    @Autowired
    private RentPurposeRepository repository;

    /**
     * Pobierz wszystkie cele wypożyczeń.
     *
     * @return Lista wszystkich celów wypożyczeń.
     */
    public List<RentPurpose> findAll() {
        return repository.findAll();
    }

    /**
     * Pobierz cel wypożyczenia według jego ID.
     *
     * @param id ID celu wypożyczenia.
     * @return Optional zawierający cel wypożyczenia, jeśli znaleziono, w przeciwnym razie puste.
     */
    public Optional<RentPurpose> findById(Integer id) {
        return repository.findById(id);
    }
}
