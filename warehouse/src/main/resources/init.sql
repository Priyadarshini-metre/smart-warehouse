CREATE DATABASE IF NOT EXISTS warehousedb;
USE warehousedb;
show tables;

CREATE TABLE IF NOT EXISTS inventory_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock_quantity INT NOT NULL,
    restock_threshold INT NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    item_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    customer_type VARCHAR(50),
    status VARCHAR(50)
);

INSERT INTO inventory_item (name, stock_quantity, restock_threshold) VALUES ('Laptop', 50, 10);
INSERT INTO inventory_item (name, stock_quantity, restock_threshold) VALUES ('Mobile', 30, 5);
INSERT INTO inventory_item (name, stock_quantity, restock_threshold) VALUES ('Headphone', 20, 5);
select * from orders;
select * from inventory_item;
