import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({ itemId: "", quantity: "", customerType: "REGULAR" });
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadInventory(); loadOrders(); }, []);

  const loadInventory = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/inventory");
      setInventory(res.data);
    } catch (e) { console.error(e); }
  };

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders");
      setOrders(res.data);
    } catch (e) { console.error(e); }
  };

  const showNotification = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/orders", {
        ...order,
        itemId: parseInt(order.itemId),
        quantity: parseInt(order.quantity),
      });
      setOrders([...orders, res.data]);
      loadInventory();
      setOrder({ itemId: "", quantity: "", customerType: "REGULAR" });
      showNotification(
        res.data.status === "PROCESSED" ? "✅ Order Processed Successfully!" : "⚠️ Order Backordered!",
        res.data.status === "PROCESSED" ? "success" : "warning"
      );
    } catch (e) {
      showNotification("❌ Failed to place order. Check Item ID.", "error");
    }
    setLoading(false);
  };

  const totalStock = inventory.reduce((sum, i) => sum + i.stockQuantity, 0);
  const processedOrders = orders.filter(o => o.status === "PROCESSED").length;
  const backorderedOrders = orders.filter(o => o.status === "BACKORDERED").length;

  return (
    <div className="app">

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.msg}
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">📦</span>
          <span className="logo-text">SmartWarehouse</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#inventory" className="nav-item active">🗂️ Inventory</a>
          <a href="#orders" className="nav-item">🛒 Orders</a>
          <a href="#recent" className="nav-item">📋 Recent Orders</a>
        </nav>
        <div className="sidebar-footer">v1.0.0</div>
      </div>

      {/* Main Content */}
      <div className="main">

        {/* Top Bar */}
        <div className="topbar">
          <div>
            <h2 className="page-title">Dashboard</h2>
            <p className="page-sub">Welcome back! Here's what's happening.</p>
          </div>
          <div className="topbar-right">
            <span className="live-badge">🟢 Live</span>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">📦</div>
            <div>
              <div className="stat-value">{inventory.length}</div>
              <div className="stat-label">Total Items</div>
            </div>
          </div>
          <div className="stat-card purple">
            <div className="stat-icon">🔢</div>
            <div>
              <div className="stat-value">{totalStock}</div>
              <div className="stat-label">Total Stock</div>
            </div>
          </div>
          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div>
              <div className="stat-value">{processedOrders}</div>
              <div className="stat-label">Processed Orders</div>
            </div>
          </div>
          <div className="stat-card red">
            <div className="stat-icon">⚠️</div>
            <div>
              <div className="stat-value">{backorderedOrders}</div>
              <div className="stat-label">Backordered</div>
            </div>
          </div>
        </div>

        <div className="content-grid">

          {/* Inventory Table */}
          <div className="card" id="inventory">
            <div className="card-header">
              <h3>🗂️ Inventory</h3>
              <button className="refresh-btn" onClick={loadInventory}>🔄 Refresh</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td><span className="id-badge">#{item.id}</span></td>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.stockQuantity}</td>
                    <td>
                      <span className={`badge ${item.stockQuantity > item.restockThreshold ? "success" : "danger"}`}>
                        {item.stockQuantity > item.restockThreshold ? "In Stock" : "Low Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Form */}
          <div className="card" id="orders">
            <div className="card-header">
              <h3>🛒 Create Order</h3>
            </div>
            <form onSubmit={submitOrder} className="order-form">
              <div className="form-group">
                <label>Item ID</label>
                <select value={order.itemId} onChange={e => setOrder({ ...order, itemId: e.target.value })} required>
                  <option value="">-- Select Item --</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>{item.id} - {item.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input type="number" placeholder="Enter quantity" min="1"
                  value={order.quantity} onChange={e => setOrder({ ...order, quantity: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Customer Type</label>
                <select value={order.customerType} onChange={e => setOrder({ ...order, customerType: e.target.value })}>
                  <option value="REGULAR">🧑 REGULAR</option>
                  <option value="PREMIUM">⭐ PREMIUM</option>
                </select>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Processing..." : "🚀 Submit Order"}
              </button>
            </form>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="card" id="recent">
          <div className="card-header">
            <h3>📋 Recent Orders</h3>
            <span className="order-count">{orders.length} orders</span>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state">No orders yet. Place your first order! 🎉</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item ID</th>
                  <th>Quantity</th>
                  <th>Customer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td><span className="id-badge">#{o.id}</span></td>
                    <td>{o.itemId}</td>
                    <td>{o.quantity}</td>
                    <td><span className={`customer-badge ${o.customerType === "PREMIUM" ? "premium" : "regular"}`}>{o.customerType}</span></td>
                    <td><span className={`badge ${o.status === "BACKORDERED" ? "danger" : "success"}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
