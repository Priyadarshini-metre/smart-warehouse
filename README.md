# 📦 Smart Warehouse Management System

A full-stack Warehouse Management System developed using **Java, Spring Boot, React.js, and MySQL** to manage inventory, process orders, and monitor warehouse operations efficiently.

---

## 🚀 Features

### Inventory Management
- Add new inventory items
- Update stock quantities
- View inventory details
- Track stock availability

### Order Management
- Create customer orders
- Process and manage orders
- Automatic stock validation
- Track order status

### Customer Types
- Regular Customers
- Premium Customers

### Dashboard
- Real-time inventory monitoring
- Order tracking
- Warehouse overview

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Axios

### Database
- MySQL

### Tools
- Git
- GitHub
- VS Code
- IntelliJ IDEA

---

## 📂 Project Structure

smart-warehouse/
│
├── frontend/ # React Frontend
│
├── warehouse/ # Spring Boot Backend
│
└── README.md

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Priyadarshini-metre/smart-warehouse.git
cd smart-warehouse
```

### Backend Setup

```bash
cd warehouse
mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## 🔗 API Endpoints

### Inventory APIs

| Method | Endpoint | Description |
|----------|------------|------------|
| GET | /inventory | Get all inventory items |
| POST | /inventory | Add inventory item |
| PUT | /inventory/{id} | Update inventory item |
| DELETE | /inventory/{id} | Delete inventory item |

### Order APIs

| Method | Endpoint | Description |
|----------|------------|------------|
| GET | /orders | Get all orders |
| POST | /orders | Create order |
| PUT | /orders/{id} | Update order |
| DELETE | /orders/{id} | Delete order |

---

## 📸 Screenshots

Add project screenshots here.

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Inventory Management
![Inventory](screenshots/inventory.png)

### Order Management
![Orders](screenshots/orders.png)

---

## 🎯 Learning Outcomes

- Full Stack Development
- Spring Boot REST API Development
- React Frontend Development
- MySQL Database Integration
- API Integration using Axios
- Git & GitHub Version Control
- Enterprise Application Design

---

## 🔮 Future Enhancements

- User Authentication & Authorization
- Role-Based Access Control
- Advanced Analytics Dashboard
- Email Notifications
- Barcode/QR Code Integration
- Cloud Deployment

---

## 👩‍💻 Author

**Priyadarshini Nagashetty Metre**

GitHub: https://github.com/Priyadarshini-metre

LinkedIn: 

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub.
