package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "rent_purposes")
//@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")

public class RentPurpose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purpose_id", nullable = false)
    private Integer id;

    @Column(name = "purpose", nullable = false)
    private String purpose;

    @OneToMany(mappedBy = "rentPurpose")
    @JsonIgnore
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public Set<RentHistory> getRentHistories() {
        return rentHistories;
    }

    public void setRentHistories(Set<RentHistory> rentHistories) {
        this.rentHistories = rentHistories;
    }

}