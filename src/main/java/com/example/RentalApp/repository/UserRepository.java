package com.example.RentalApp.repository;

import com.example.RentalApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami User.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByLogin(String login);
    User findById(int id);
    List<User> findAllBy();
}
