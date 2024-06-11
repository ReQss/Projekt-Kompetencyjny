package com.example.RentalApp.service;

import com.example.RentalApp.model.Role;
import com.example.RentalApp.model.User;
import com.example.RentalApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Klasa serwisowa do zarządzania encjami User.
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    /**
     * Pobierz użytkownika według nazwy logowania.
     * @param name Nazwa logowania użytkownika.
     * @return Obiekt użytkownika, jeśli znaleziono, w przeciwnym razie null.
     */
    public User getUser(String name){
        return userRepository.findByLogin(name);
    }

    /**
     * Dodaj nowego użytkownika do systemu.
     * @param user Obiekt użytkownika do dodania.
     * @return Dodany obiekt użytkownika, jeśli operacja powiodła się, w przeciwnym razie null.
     */
    public User addUser(User user){
        User exist = userRepository.findByLogin(user.getLogin());
        return exist == null?  userRepository.save(user) : null;
    }

    /**
     * Autentykuj użytkownika na podstawie nazwy logowania i hasła.
     * @param login Nazwa logowania użytkownika.
     * @param rawPassword Podane przez użytkownika hasło.
     * @param passwordEncoder Kodowanie do porównania haseł.
     * @return Autentykowany obiekt użytkownika, jeśli operacja powiodła się, w przeciwnym razie null.
     */
    public User login(String login, String rawPassword, PasswordEncoder passwordEncoder) {
        User user = userRepository.findByLogin(login);
        if (user!= null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null;
    }

    /**
     * Pobierz użytkownika według ID.
     * @param id ID użytkownika.
     * @return Obiekt użytkownika, jeśli znaleziono, w przeciwnym razie null.
     */
    public User getUserById(int id){return userRepository.findById(id);}

    /**
     * Pobierz użytkowników według ich ról.
     * @param roles Lista ról do filtrowania użytkowników.
     * @return Lista użytkowników z określonymi rolami.
     */
    public List<User> getUsersByRoles(List<Role> roles) {
        return userRepository.findAllBy().stream()
                .filter(user -> roles.contains(user.getRole()))
                .toList();
    }
}
