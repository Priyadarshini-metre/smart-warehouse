package com.smartwarehouse.controller;

import java.util.Collection;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.smartwarehouse.model.InventoryItem;
import com.smartwarehouse.model.Order;
import com.smartwarehouse.repository.InventoryRepository;
import com.smartwarehouse.service.OrderService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class OrderController {

    private final OrderService service;
    private final InventoryRepository repository;

    public OrderController(
            OrderService service,
            InventoryRepository repository) {

        this.service = service;
        this.repository = repository;
    }

    @GetMapping("/inventory")
    public Collection<InventoryItem> getInventory() {
        return repository.findAll();
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return service.getOrders();
    }

    @PostMapping("/orders")
    public Order createOrder(@RequestBody Order order) {
        return service.processOrder(order);
    }
}
