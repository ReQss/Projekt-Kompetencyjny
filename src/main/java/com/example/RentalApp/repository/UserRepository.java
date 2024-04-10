package com.example.RentalApp.repository;

import com.example.RentalApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByLogin(String login);
    List<User>findAllBy();

}
