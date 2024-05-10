package com.example.RentalApp.service;

import com.example.RentalApp.model.User;
import com.example.RentalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public User getUser(String name){
        return userRepository.findByLogin(name);
    }
    public User addUser(User user){
        User exist = userRepository.findByLogin(user.getLogin());
        return exist == null ?  userRepository.save(user) : null;
    }
    public User login(String login, String password){
        User user = userRepository.findByLogin(login);
        if(user.getPassword().equals(password))return user;
        return null;
    }

    public User getUserById(int id){return userRepository.findById(id);}

}
