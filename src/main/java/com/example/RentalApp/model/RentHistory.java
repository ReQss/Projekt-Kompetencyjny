package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "rent_history")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")

public class RentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rent_id", nullable = false)
    private Integer id;

    @ManyToOne()

    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "rent_status", nullable = false, length = 50)
    private String rentStatus;

    @Column(name = "rental_date")
    private Instant rentalDate;

    @Column(name = "return_date")
    private Instant returnDate;

    @ManyToOne()

    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;

    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne()

    @JoinColumn(name = "rent_purpose_id")
    private RentPurpose rentPurpose;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "rent_description")
    private String rentDescription;

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

    // Getters and setters
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

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
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
