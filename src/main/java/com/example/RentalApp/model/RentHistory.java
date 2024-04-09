package com.example.RentalApp.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Entity
@Table(name = "rent_history")
public class RentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Rent_ID", nullable = false)
    private Integer id;

    @Column(name = "Rental_Date", nullable = false)
    private Instant rentalDate;

    @Column(name = "Return_Date", nullable = false)
    private Instant returnDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Item_ID", nullable = false)
    private Inventory item;

    @Column(name = "Numer_indeksu", nullable = false)
    private Integer numerIndeksu;

    @Column(name = "Name_Of_The_Borrower", nullable = false)
    private String nameOfTheBorrower;

    @ColumnDefault("niezwrócony")
    @Column(name = "Rent_Status", nullable = false, length = 50)
    private String rentStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Inventory getItem() {
        return item;
    }

    public void setItem(Inventory item) {
        this.item = item;
    }

    public Integer getNumerIndeksu() {
        return numerIndeksu;
    }

    public void setNumerIndeksu(Integer numerIndeksu) {
        this.numerIndeksu = numerIndeksu;
    }

    public String getNameOfTheBorrower() {
        return nameOfTheBorrower;
    }

    public void setNameOfTheBorrower(String nameOfTheBorrower) {
        this.nameOfTheBorrower = nameOfTheBorrower;
    }

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
        this.rentStatus = rentStatus;
    }

}