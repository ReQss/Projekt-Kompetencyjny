package com.example.RentalApp.controller;

import com.example.RentalApp.model.Role;
import com.example.RentalApp.model.User;
import com.example.RentalApp.repository.UserRepository;
import com.example.RentalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Kontroler REST do zarządzania użytkownikami (User).
 */
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Pobiera użytkownika o podanym ID.
     *
     * @param id ID użytkownika.
     * @return ResponseEntity z obiektem użytkownika lub kodem odpowiedzi NOT_FOUND.
     */
    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Dodaje nowego użytkownika.
     *
     * @param user Nowy użytkownik.
     * @return Dodany użytkownik.
     */
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        user.setRole("USER");
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userService.addUser(user);
    }

    /**
     * Pobiera użytkowników według ich ról.
     *
     * @return ResponseEntity z listą użytkowników lub kodem odpowiedzi NOT_FOUND.
     */
    @GetMapping("/getUsersByRoles")
    public ResponseEntity<List<User>> getUsersByRoles() {
        List<Role> roles = Arrays.asList(Role.ADMIN, Role.USER);
        List<User> users = userService.getUsersByRoles(roles);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Pobiera wszystkich użytkowników.
     *
     * @return Lista wszystkich użytkowników.
     */
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }

    /**
     * Loguje użytkownika.
     *
     * @param user Użytkownik do zalogowania.
     * @return ResponseEntity z tokenem dostępu i danymi użytkownika lub kodem odpowiedzi BAD_REQUEST.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedUser = userService.login(user.getLogin(), user.getPassword(), passwordEncoder);
        if (loggedUser.getDeleted()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login credentials");
        }
        if (loggedUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login credentials");
        }
        String token = "token-" + user.getLogin();
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", loggedUser);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    /**
     * Usuwa użytkownika (ustawia flagę deleted na true).
     *
     * @param id ID użytkownika do usunięcia.
     * @return ResponseEntity z odpowiednią wartością statusu HTTP.
     */
    @PutMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        User user = userRepository.findById(id);
        if (user != null) {
            user.setDeleted(true);
            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Aktualizuje istniejącego użytkownika.
     *
     * @param id          ID użytkownika.
     * @param updatedUser Zaktualizowany użytkownik.
     * @return ResponseEntity z zaktualizowanym użytkownikiem lub kodem odpowiedzi NOT_FOUND.
     */
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable int id, @RequestBody User updatedUser) {
        User user = userRepository.findById(id);
        if (user != null) {
            user.setEmail(updatedUser.getEmail());
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setLogin(updatedUser.getLogin());
            if (!updatedUser.getPassword().equals("")) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            user.setRole(updatedUser.getRole().toString());
            user.setDeleted(updatedUser.getDeleted());
            user.setRentHistories(updatedUser.getRentHistories());

            User savedUser = userRepository.save(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}