package com.triptip.triptip.model;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private int orderId;
    @ManyToOne
    @JoinColumn(name ="user_id")
    private User user;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;
    private double orderPrice;
    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;
    private int statusId;
    public Order(){

    }

    public Order(int orderId, User user, LocalDate orderDate, double orderPrice, Address address, int statusId) {
        this.orderId = orderId;
        this.user = user;
        this.orderDate = orderDate;
        this.orderPrice = orderPrice;
        this.address = address;
        this.statusId = statusId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public double getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(double orderPrice) {
        this.orderPrice = orderPrice;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", user=" + user +
                ", orderDate=" + orderDate +
                ", orderPrice=" + orderPrice +
                ", address=" + address +
                ", statusId=" + statusId +
                '}';
    }
}
