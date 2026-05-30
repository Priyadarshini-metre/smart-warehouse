package com.smartwarehouse.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.smartwarehouse.model.InventoryItem;
import com.smartwarehouse.model.Order;
import com.smartwarehouse.model.OrderStatus;
import com.smartwarehouse.repository.InventoryRepository;
import com.smartwarehouse.repository.OrderRepository;

@Service
public class OrderService {

    private final InventoryRepository inventoryRepository;
    private final OrderRepository orderRepository;

    public OrderService(
            InventoryRepository inventoryRepository,
            OrderRepository orderRepository) {

        this.inventoryRepository = inventoryRepository;
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public synchronized Order processOrder(Order order) {

        InventoryItem item = inventoryRepository.findById(order.getItemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Item not found: " + order.getItemId()));

        if (item.getStockQuantity() >= order.getQuantity()) {
            item.setStockQuantity(item.getStockQuantity() - order.getQuantity());
            order.setStatus(OrderStatus.PROCESSED);
        } else {
            order.setStatus(OrderStatus.BACKORDERED);
        }

        if (item.getStockQuantity() < item.getRestockThreshold()) {
            System.out.println("Warning Item " + item.getName() + " below threshold");
        }

        inventoryRepository.save(item);
        return orderRepository.save(order);
    }
}
