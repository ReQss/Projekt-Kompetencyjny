package com.example.RentalApp.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity // Ta adnotacja mówi, że klasa jest encją JPA
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    private String description;

    private BigDecimal sale;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "rent_status")
    private String rentStatus;

    @Column(name = "Photo")
    private byte[] photo;

    @Column(name = "Sala", length = 50)
    private String sala;

    @OneToMany(mappedBy = "item")
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    public Set<RentHistory> getRentHistories() {
        return rentHistories;
    }

    public void setRentHistories(Set<RentHistory> rentHistories) {
        this.rentHistories = rentHistories;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    // Konstruktor, gettery i settery

    public Inventory() {
    }

    // Gettery i settery
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getSale() {
        return sale;
    }

    public void setSale(BigDecimal sale) {
        this.sale = sale;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Inventory(Long id, String itemName, String description, BigDecimal sale, Long ownerId, String rentStatus, byte[] photo, String sala, Set<RentHistory> rentHistories) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.sale = sale;
        this.ownerId = ownerId;
        this.rentStatus = rentStatus;
        this.photo = photo;
        this.sala = sala;
        this.rentHistories = rentHistories;
    }

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
        this.rentStatus = rentStatus;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", description='" + description + '\'' +
                ", sale=" + sale +
                ", ownerId=" + ownerId +
                ", rentStatus='" + rentStatus + '\'' +
                ", photo=" + Arrays.toString(photo) +
                ", sala='" + sala + '\'' +
                ", rentHistories=" + rentHistories +
                '}';
    }
}
