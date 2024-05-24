package com.example.RentalApp.controller;

import com.example.RentalApp.model.User;
import com.example.RentalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    private PasswordEncoder passwordEncoder;
    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        return userService.addUser(user);

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String token = "token -" + user.getLogin();
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());
        User loggedUser = userService.login(user.getLogin(), encodedPassword);
        if (loggedUser == null) return  ResponseEntity.badRequest().body("Invalid login credentials");
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", loggedUser); // Use loggedUser instead of user
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
