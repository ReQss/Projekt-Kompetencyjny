package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Klasa modelu reprezentująca cel wypożyczenia w systemie wypożyczalni.
 * Mapowana na tabelę "rent_purposes" w bazie danych przy użyciu JPA.
 */
@Entity
@Table(name = "rent_purposes")
public class RentPurpose {

    /**
     * Unikalny identyfikator celu wypożyczenia.
     * Generowany automatycznie przy użyciu strategii IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purpose_id", nullable = false)
    private Integer id;

    /**
     * Opis celu wypożyczenia.
     * Kolumna nie może być pusta.
     */
    @Column(name = "purpose", nullable = false)
    private String purpose;

    /**
     * Historia wypożyczeń związanych z danym celem wypożyczenia.
     * Ignorowane podczas serializacji JSON, aby zapobiec rekursywnym zależnościom.
     */
    @OneToMany(mappedBy = "rentPurpose")
    @JsonIgnore
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    // Gettery i settery

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
