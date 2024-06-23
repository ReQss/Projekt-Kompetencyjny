package com.example.RentalApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Klasa modelu reprezentująca przedmiot inwentarza.
 * Mapowana na tabelę "inventory" w bazie danych przy użyciu JPA.
 */
@Entity
@Table(name = "inventory")
public class Inventory {

    /**
     * Unikalny identyfikator przedmiotu inwentarza.
     * Generowany automatycznie przy użyciu strategii IDENTITY.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id", nullable = false)
    private Long id;

    /**
     * Opis przedmiotu inwentarza.
     */
    @Column(name = "description")
    private String description;

    /**
     * Nazwa przedmiotu inwentarza.
     * Kolumna nie może być pusta.
     */
    @Column(name = "item_name", nullable = false)
    private String itemName;

    /**
     * Identyfikator właściciela przedmiotu inwentarza.
     */
    @Column(name = "owner_id")
    private Long ownerId;

    /**
     * Status wynajmu przedmiotu.
     * Kolumna typu Enum z wartościami dostępnymi w Enum ItemStatus.
     */
    @Enumerated(EnumType.STRING)
    private ItemStatus rentStatus = ItemStatus.available;

    /**
     * Pokój, w którym znajduje się przedmiot inwentarza.
     */
    @Column(name = "room", length = 50)
    private String room;

    /**
     * Budynek, w którym znajduje się przedmiot inwentarza.
     */
    @Column(name = "building", length = 50)
    private String building;

    /**
     * Data inwentaryzacji przedmiotu.
     */
    @Column(name = "inventory_date")
    private LocalDate inventoryDate;

    /**
     * Wartość przedmiotu inwentarza.
     */
    @Column(name = "value", precision = 20, scale = 2)
    private BigDecimal value;

    /**
     * Numer inwentarza.
     */
    @Column(name = "inventory_number", length = 50)
    private String inventoryNumber;

    /**
     * Numer faktury.
     */
    @Column(name = "invoice_number", length = 50)
    private String invoiceNumber;

    /**
     * Źródło finansowania.
     */
    @Column(name = "funding_source", length = 50)
    private String fundingSource;

    /**
     * Dokument dostawcy.
     */
    @Column(name = "supplier_document", length = 50)
    private String supplierDocument;

    /**
     * Pozycja na fakturze.
     */
    @Column(name = "invoice_position", length = 50)
    private String invoicePosition;

    /**
     * Numer seryjny przedmiotu.
     */
    @Column(name = "serial_number", length = 50)
    private String serialNumber;

    /**
     * Kategoria przedmiotu inwentarza.
     * Relacja wiele-do-jednego z encją Category.
     */
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    /**
     * Historia wynajmu przedmiotu.
     * Ignorowane podczas serializacji JSON.
     */
    @OneToMany(mappedBy = "inventory")
    @JsonIgnore
    private Set<RentHistory> rentHistories = new LinkedHashSet<>();

    /**
     * Zdjęcie przedmiotu w formie tablicy bajtów.
     */
    @Column(name = "photo")
    private byte[] photo;

    /**
     * Flaga oznaczająca, czy przedmiot został usunięty.
     * Domyślnie ustawiona na 0 (fałsz).
     */
    @ColumnDefault("0")
    @Column(name = "deleted", nullable = false)
    private Boolean deleted = false;

    // Gettery i Settery

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhotoBase64() {
        return this.photo != null ? Base64.getEncoder().encodeToString(this.photo) : null;
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

    public ItemStatus getRentStatus() {
        return rentStatus;
    }

    public void setRentStatus(ItemStatus rentStatus) {
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
                ", photo='" + photo + '\'' +
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
                ", rentHistories size=" + rentHistories.size() +
                '}';
    }
}
