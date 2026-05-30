package com.smartwarehouse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartwarehouse.model.InventoryItem;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
}
