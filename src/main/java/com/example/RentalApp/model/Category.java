package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id")

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;



    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Inventory> inventories = new LinkedHashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Inventory> getInventories() {
        return inventories;
    }

    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }

}