package com.example.RentalApp.service;

import com.example.RentalApp.model.Role;
import com.example.RentalApp.model.User;
import com.example.RentalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);


    public User getUser(String name){
        return userRepository.findByLogin(name);
    }
    public User addUser(User user){
        User exist = userRepository.findByLogin(user.getLogin());
        return exist == null ?  userRepository.save(user) : null;
    }
    public User login(String login, String rawPassword, PasswordEncoder passwordEncoder) {
        User user = userRepository.findByLogin(login);
        logger.info("Raw password: {}", rawPassword);
        logger.info("Password hash: {}", passwordEncoder.encode(rawPassword));
        logger.info("Password in database: {}", user.getPassword());

        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }

        return null;
    }

    public User getUserById(int id){return userRepository.findById(id);}

    public List<User> getUsersByRoles(List<Role> roles) {
        return userRepository.findAllBy().stream()
                .filter(user -> roles.contains(user.getRole()))
                .toList();
    }
}
