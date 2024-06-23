package com.example.RentalApp.repository;

import com.example.RentalApp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Interfejs repozytorium do zarządzania encjami Category.
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
