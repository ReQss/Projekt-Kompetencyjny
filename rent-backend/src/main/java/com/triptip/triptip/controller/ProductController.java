package com.triptip.triptip.controller;


import com.triptip.triptip.model.Product;
import com.triptip.triptip.model.User;
import com.triptip.triptip.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/product/listAll")
    public List<Product>listAll(){
        return productService.getAllProducts();
    }
}
