package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Klasa modelu reprezentująca kategorie.
 * Mapowana na tabelę "categories" w bazie danych przy użyciu JPA.
 */
@Entity
@Table(name = "categories")
public class Category {

    /**
     * Unikalny identyfikator kategorii.
     * Generowany automatycznie przy użyciu strategii IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    /**
     * Nazwa kategorii.
     * Kolumna nie może być pusta.
     */
    @Column(name = "name", nullable = false)
    private String name;

    /**
     * Zbiór inwentarzy przypisanych do kategorii.
     * Ignorowane podczas serializacji JSON, aby zapobiec rekursywnym zależnościom.
     */
    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private Set<Inventory> inventories = new LinkedHashSet<>();

    /**
     * Zwraca unikalny identyfikator kategorii.
     * @return id kategorii
     */
    public Integer getId() {
        return id;
    }

    /**
     * Ustawia unikalny identyfikator kategorii.
     * @param id nowy identyfikator kategorii
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Zwraca nazwę kategorii.
     * @return nazwa kategorii
     */
    public String getName() {
        return name;
    }

    /**
     * Ustawia nazwę kategorii.
     * @param name nowa nazwa kategorii
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Zwraca zbiór inwentarzy przypisanych do kategorii.
     * @return zbiór inwentarzy
     */
    public Set<Inventory> getInventories() {
        return inventories;
    }

    /**
     * Ustawia zbiór inwentarzy przypisanych do kategorii.
     * @param inventories nowy zbiór inwentarzy
     */
    public void setInventories(Set<Inventory> inventories) {
        this.inventories = inventories;
    }

}
