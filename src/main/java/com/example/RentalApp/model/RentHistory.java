package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import java.time.Instant;

/**
 * Klasa modelu reprezentująca historię wypożyczeń w systemie wypożyczalni.
 * Mapowana na tabelę "rent_history" w bazie danych przy użyciu JPA.
 */
@Entity
@Table(name = "rent_history")
public class RentHistory {

    /**
     * Unikalny identyfikator historii wypożyczenia.
     * Generowany automatycznie przy użyciu strategii IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id", nullable = false)
    private Integer id;

    /**
     * Użytkownik wypożyczający element.
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Status wypożyczenia.
     */
    @Enumerated(EnumType.STRING)
    private RentStatus rentStatus;

    /**
     * Data wypożyczenia.
     */
    @Column(name = "rental_date")
    private Instant rentalDate;

    /**
     * Data zwrotu.
     */
    @Column(name = "return_date")
    private Instant returnDate;

    /**
     * Wypożyczany element inwentarza.
     */
    @ManyToOne
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    /**
     * Email użytkownika.
     */
    @Column(name = "email", nullable = false)
    private String email;

    /**
     * Cel wypożyczenia.
     */
    @ManyToOne
    @JoinColumn(name = "rent_purpose_id")
    private RentPurpose rentPurpose;

    /**
     * Imię użytkownika.
     */
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    /**
     * Nazwisko użytkownika.
     */
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    /**
     * Opis wypożyczenia.
     */
    @Column(name = "rent_description")
    private String rentDescription;

    // Gettery i settery

    public String getRentDescription() {
        return rentDescription;
    }

    public void setRentDescription(String rentDescription) {
        this.rentDescription = rentDescription;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public RentPurpose getRentPurpose() {
        return rentPurpose;
    }

    public void setRentPurpose(RentPurpose rentPurpose) {
        this.rentPurpose = rentPurpose;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public RentStatus getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(RentStatus rentStatus) {
        this.rentStatus = rentStatus;
    }

    public Instant getRentalDate() {
        return rentalDate;
    }

    public void setRentalDate(Instant rentalDate) {
        this.rentalDate = rentalDate;
    }

    public Instant getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Instant returnDate) {
        this.returnDate = returnDate;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
