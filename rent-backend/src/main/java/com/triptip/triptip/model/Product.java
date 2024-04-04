package com.triptip.triptip.model;

import jakarta.persistence.*;
import jakarta.persistence.criteria.JoinType;

@Entity
@Table(name = "items")
public class Product {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "productName")
    private String productName;
    @Column(name = "imageurl")
    private String imageSrc;
    private int stock;
    @Column(name = "price")
    private float price;
    @JoinColumn (name = "platformid")
    private int platformId;

//    @JoinColumn(name = "categoryId")
  //  @Column(name = "CategoryId")
   // private int categoryId;
    @OneToOne
    @JoinColumn(name ="categoryid")
    private Category category;

    public Product(){

    }

    public Product(int id, String productName, String imageSrc, int stock, float price, int platformId, Category category) {
        this.id = id;
        this.productName = productName;
        this.imageSrc = imageSrc;
        this.stock = stock;
        this.price = price;
        this.platformId = platformId;
        this.category = category;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImageSrc() {
        return imageSrc;
    }

    public void setImageSrc(String imageSrc) {
        this.imageSrc = imageSrc;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getPlatformId() {
        return platformId;
    }

    public void setPlatformId(int platformId) {
        this.platformId = platformId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", productName='" + productName + '\'' +
                ", imageSrc='" + imageSrc + '\'' +
                ", stock=" + stock +
                ", price=" + price +
                ", platformId=" + platformId +
                ", category=" + category +
                '}';
    }
}
