package com.example.RentalApp.controller;

import com.example.RentalApp.model.Role;
import com.example.RentalApp.model.User;
import com.example.RentalApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;
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
        return userService.addUser(user);

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedUser = userService.login(user.getLogin(), user.getPassword());
        if (loggedUser == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid login credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
        String token = "token -" + user.getLogin();
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", loggedUser);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/getUsersByRoles")
    public ResponseEntity<List<User>> getUsersByRoles() {
        List<Role> roles = Arrays.asList(Role.ADMIN, Role.USER);
        List<User> users = userService.getUsersByRoles(roles);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

}
