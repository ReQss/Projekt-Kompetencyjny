package com.example.RentalApp.repository;

import com.example.RentalApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami User.
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Znajduje użytkownika na podstawie jego loginu.
     * @param login login użytkownika.
     * @return obiekt użytkownika pasujący do podanego loginu.
     */
    User findByLogin(String login);

    /**
     * Znajduje użytkownika na podstawie jego identyfikatora.
     * @param id identyfikator użytkownika.
     * @return obiekt użytkownika pasujący do podanego identyfikatora.
     */
    User findById(int id);

    /**
     * Znajduje wszystkich użytkowników.
     * @return lista wszystkich użytkowników.
     */
    List<User> findAllBy();
}
