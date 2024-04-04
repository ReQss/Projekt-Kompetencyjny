package com.triptip.triptip.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    @Id
    private int orderId;
 //   @Column(name = "item_id")
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Product product;
    private int quantity;

    public OrderItem(){

    }

    public OrderItem(int orderId, Product product, int quantity) {
        this.orderId = orderId;
        this.product = product;
        this.quantity = quantity;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "orderId=" + orderId +
                ", product=" + product +
                ", quantity=" + quantity +
                '}';
    }
}
