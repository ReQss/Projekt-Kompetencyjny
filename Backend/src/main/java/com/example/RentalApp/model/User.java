package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Klasa modelu reprezentująca użytkownika.
 * Mapowana na tabelę "users" w bazie danych przy użyciu JPA.
 */
@Entity
@Table(name = "users")
public class User {

    /**
     * Unikalny identyfikator użytkownika.
     * Generowany automatycznie przy użyciu strategii IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    /**
     * Adres email użytkownika.
     */
    @Column(name = "email")
    private String email;

    /**
     * Imię użytkownika.
     */
    @Column(name = "first_name")
    private String firstName;

    /**
     * Nazwisko użytkownika.
     */
    @Column(name = "last_name")
    private String lastName;

    /**
     * Login użytkownika.
     * Kolumna nie może być pusta.
     */
    @Column(name = "login", nullable = false)
    private String login;

    /**
     * Hasło użytkownika.
     * Kolumna nie może być pusta.
     */
    @Column(name = "password", nullable = false)
    private String password;

    /**
     * Rola użytkownika w systemie.
     */
    @Enumerated(EnumType.STRING)
    private Role role;

    /**
     * Historia wypożyczeń związanych z użytkownikiem.
     * Ignorowane podczas serializacji JSON, aby zapobiec rekursywnym zależnościom.
     */
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    /**
     * Status usunięcia użytkownika.
     * Domyślnie ustawiony na false, co oznacza, że użytkownik nie jest usunięty (przydatne w poźniejszym celu archiwizowania użytkowników).
     */
    @ColumnDefault("0")
    @Column(name = "deleted", nullable = false)
    private Boolean deleted = false;

    /**
     * Konstruktor domyślny.
     */
    public User() {
    }

    /**
     * Konstruktor tworzący nowego użytkownika z podstawowymi danymi.
     *
     * @param email     adres email użytkownika
     * @param firstName imię użytkownika
     * @param lastName  nazwisko użytkownika
     * @param login     login użytkownika
     * @param password  hasło użytkownika
     */
    public User(String email, String firstName, String lastName, String login, String password) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.password = password;
        this.role = Role.USER;
    }

    /**
     * Zwraca status usunięcia użytkownika.
     *
     * @return true jeśli użytkownik jest oznaczony jako usunięty, false w przeciwnym razie.
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * Ustawia status usunięcia użytkownika.
     *
     * @param deleted true jeśli użytkownik ma być oznaczony jako usunięty, false w przeciwnym razie.
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    // Gettery i settery

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = Role.valueOf(role);
    }

    public Set<RentHistory> getRentHistories() {
        return rentHistories;
    }

    public void setRentHistories(Set<RentHistory> rentHistories) {
        this.rentHistories = rentHistories;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", login='" + login + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", rentHistories=" + rentHistories +
                '}';
    }
}
