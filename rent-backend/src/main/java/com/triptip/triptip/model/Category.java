package com.triptip.triptip.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Category")
public class Category {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    public Category(){

    }

    public Category(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {

        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
