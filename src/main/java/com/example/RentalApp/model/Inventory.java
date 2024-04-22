package com.example.RentalApp.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "inventory")
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id", nullable = false)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "owner_id")
    private Long ownerId;

    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "rent_status")
    private String rentStatus;

    @Column(name = "room", length = 50)
    private String room;

    @Column(name = "building", length = 50)
    private String building;

    @ColumnDefault("current_timestamp()")
    @Column(name = "inventory_date", nullable = false)
    private LocalDate inventoryDate;

    @Column(name = "value", precision = 20, scale = 2)
    private BigDecimal value;

    @Column(name = "inventory_number", length = 50)
    private String inventoryNumber;

    @Column(name = "invoice_number", length = 50)
    private String invoiceNumber;

    @Column(name = "funding_source", length = 50)
    private String fundingSource;

    @Column(name = "supplier_document", length = 50)
    private String supplierDocument;

    @Column(name = "invoice_position", length = 50)
    private String invoicePosition;

    @Column(name = "serial_number", length = 50)
    private String serialNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "inventory")
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo.getBytes();
    }

    public String getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(String rentStatus) {
        this.rentStatus = rentStatus;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public LocalDate getInventoryDate() {
        return inventoryDate;
    }

    public void setInventoryDate(LocalDate inventoryDate) {
        this.inventoryDate = inventoryDate;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public String getInventoryNumber() {
        return inventoryNumber;
    }

    public void setInventoryNumber(String inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getFundingSource() {
        return fundingSource;
    }

    public void setFundingSource(String fundingSource) {
        this.fundingSource = fundingSource;
    }

    public String getSupplierDocument() {
        return supplierDocument;
    }

    public void setSupplierDocument(String supplierDocument) {
        this.supplierDocument = supplierDocument;
    }

    public String getInvoicePosition() {
        return invoicePosition;
    }

    public void setInvoicePosition(String invoicePosition) {
        this.invoicePosition = invoicePosition;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<RentHistory> getRentHistories() {
        return rentHistories;
    }

    public void setRentHistories(Set<RentHistory> rentHistories) {
        this.rentHistories = rentHistories;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", itemName='" + itemName + '\'' +
                ", ownerId=" + ownerId +
                ", photo=" + Arrays.toString(photo) +
                ", rentStatus='" + rentStatus + '\'' +
                ", room='" + room + '\'' +
                ", building='" + building + '\'' +
                ", inventoryDate=" + inventoryDate +
                ", value=" + value +
                ", inventoryNumber='" + inventoryNumber + '\'' +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", fundingSource='" + fundingSource + '\'' +
                ", supplierDocument='" + supplierDocument + '\'' +
                ", invoicePosition='" + invoicePosition + '\'' +
                ", serialNumber='" + serialNumber + '\'' +
                ", category=" + category +
                ", rentHistories=" + rentHistories +
                '}';
    }

}

