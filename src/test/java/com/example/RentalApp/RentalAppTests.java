package com.example.RentalApp;

import com.example.RentalApp.model.User;
import com.example.RentalApp.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RentalAppTests {
    @Autowired
    private UserRepository userRepository;

    @Test
    void contextLoads() {
    }

    @Test
    void getAllUsers(){
        User user = new User("adam@o2.pl","adam","adamowski","adam","adam");

        System.out.println(user);
        userRepository.save(user);
    }
}
