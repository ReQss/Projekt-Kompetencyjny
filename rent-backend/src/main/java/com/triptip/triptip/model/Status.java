package com.triptip.triptip.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name ="order_status")
public class Status {
    @Id
    @GeneratedValue
    private int statusId;
    private String orderStatus;

    public Status(int statusId, String orderStatus) {
        this.statusId = statusId;
        this.orderStatus = orderStatus;
    }

    public Status() {

    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    @Override
    public String toString() {
        return "Status{" +
                "statusId=" + statusId +
                ", orderStatus='" + orderStatus + '\'' +
                '}';
    }
}
