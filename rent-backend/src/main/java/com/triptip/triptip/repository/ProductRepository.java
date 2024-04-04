package com.triptip.triptip.repository;

import com.triptip.triptip.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List <Product> findByproductName(String productName);
}
