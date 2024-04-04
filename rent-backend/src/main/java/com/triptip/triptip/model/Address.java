package com.triptip.triptip.model;

import jakarta.persistence.*;

@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue
    @Column(name = "address_id")
    private Integer addressId;
    private int houseNr;
    private String street;
    private String country;
    private String city;
    private int postalCode;
    public Address(){

    }

    public Address(int addressId, int houseNr, String street, String country, String city, int postalCode) {
        this.addressId = addressId;
        this.houseNr = houseNr;
        this.street = street;
        this.country = country;
        this.city = city;
        this.postalCode = postalCode;
    }

    public int getAddressId() {
        return addressId != null ? addressId : 0;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public int getHouseNr() {
        return houseNr;
    }

    public void setHouseNr(int houseNr) {
        this.houseNr = houseNr;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressId=" + addressId +
                ", houseNr=" + houseNr +
                ", street='" + street + '\'' +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", postalCode=" + postalCode +
                '}';
    }
}
