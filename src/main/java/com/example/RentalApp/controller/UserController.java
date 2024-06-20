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
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
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
        user.setRole("USER");
        System.out.println(user);
        String encodedPassword = this.passwordEncoder.encode(user.getPassword());

        user.setPassword(encodedPassword);
        return userService.addUser(user);

    }
    @GetMapping("/getUsersByRoles")
    public ResponseEntity<List<User>> getUsersByRoles() {
        List<Role> roles = Arrays.asList(Role.ADMIN, Role.USER);
        List<User> users = userService.getUsersByRoles(roles);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedUser = userService.login(user.getLogin(), user.getPassword(), passwordEncoder);
        if (loggedUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid login credentials");
        }
        String token = "token-" + user.getLogin();  // Token generation logic to be updated as needed
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", loggedUser);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
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
}
