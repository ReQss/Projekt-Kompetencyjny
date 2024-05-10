package com.example.RentalApp.service;

import com.example.RentalApp.model.RentPurpose;
import com.example.RentalApp.repository.RentPurposeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentPurposeService {
    @Autowired
    private RentPurposeRepository repository;

    public List<RentPurpose> findAll() {
        return repository.findAll();
    }

    public Optional<RentPurpose> findById(Integer id) {
        return repository.findById(id);
    }




}
