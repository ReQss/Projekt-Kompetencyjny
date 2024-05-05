package com.example.RentalApp.repository;

import com.example.RentalApp.model.Category;
import com.example.RentalApp.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
