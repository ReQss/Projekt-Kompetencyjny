package com.example.RentalApp.repository;

import com.example.RentalApp.model.RentPurpose;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interfejs repozytorium do zarządzania encjami RentPurpose.
 */
public interface RentPurposeRepository extends JpaRepository<RentPurpose, Integer> {
}
