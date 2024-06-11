package com.example.RentalApp.controller;

import com.example.RentalApp.model.Category;
import com.example.RentalApp.repository.CategoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Kontroler REST do zarządzania kategoriami.
 */
@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Pobierz wszystkie kategorie.
     * @return Lista wszystkich kategorii.
     */
    @GetMapping("/category")
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }
}
