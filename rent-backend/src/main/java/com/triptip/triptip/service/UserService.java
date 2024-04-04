package com.triptip.triptip.service;

import com.triptip.triptip.model.User;
import com.triptip.triptip.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserRepository userRepository;

 /*   @Value("${jwt.secret}")
    private String jwtSecret;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public User login(String login, String password) {
        User user = userRepository.findByLogin(login);
        if (user != null && user.getPassword().equals(password)) {
            String token = generateToken(user.getLogin());
            user.setToken(token); // Assuming User class has a token field
            return user;
        }
        return null;
    }*/
    public User getUser(String name){
        return userRepository.findByLogin(name);
    }
    public User addUser(User user){
        User exist = userRepository.findByLogin(user.getLogin());
        return exist == null ?  userRepository.save(user) : null;
    }

  /*  public User login(String login, String password){
        User user = userRepository.findByLogin(login);
        if(user.getPassword().equals(password))return user;
        return null;
    }*/
}
