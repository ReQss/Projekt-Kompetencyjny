package com.triptip.triptip.repository;

import com.triptip.triptip.model.Order;
import com.triptip.triptip.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    OrderItem findOrderItemByOrderId(int id);
    List<OrderItem> findAll();
}
