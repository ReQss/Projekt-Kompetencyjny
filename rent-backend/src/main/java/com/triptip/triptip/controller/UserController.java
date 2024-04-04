package com.triptip.triptip.controller;

import com.triptip.triptip.model.User;
import com.triptip.triptip.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin ("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/addUsesr")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
 /*   @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedUser = userService.login(user.getLogin(), user.getPassword());
        return loggedUser == null ? ResponseEntity.badRequest().body("Invalid login credentials") : ResponseEntity.ok(loggedUser);
    }*/
   /*  @PostMapping("/login")
 public ResponseEntity<?> login(@RequestBody User user) {
     User loggedUser = userService.login(user.getLogin(), user.getPassword());
     if (loggedUser == null) {
         return ResponseEntity.badRequest().body("Invalid login credentials");
     } else {
         return ResponseEntity.ok(loggedUser.getToken());
     }
 }*/
}
