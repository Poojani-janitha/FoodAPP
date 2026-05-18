import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, [token, navigate]);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          url + "/api/order/userorders",
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [url, token]);

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="empty-state">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet. Start shopping now!</p>
          <button onClick={() => navigate("/")} className="back-btn">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <span className="label">Order ID:</span>
                <span className="value">{order._id.slice(-8)}</span>
              </div>
              <div className="order-date">
                <span className="label">Date:</span>
                <span className="value">{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="order-status">
                <span className="label">Status:</span>
                <span className={`status-badge ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="order-items">
              <h3>Items</h3>
              <div className="items-list">
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x{item.quantity}</span>
                    <span className="item-price">Rs{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-footer">
              <div className="order-amount">
                <span className="label">Total Amount:</span>
                <span className="value">Rs{order.amount.toFixed(2)}</span>
              </div>
              <div className="order-address">
                <span className="label">Delivery Address:</span>
                <p className="address-text">
                  {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}
                </p>
              </div>
              {order.address.phone && (
                <div className="order-phone">
                  <span className="label">Phone:</span>
                  <span className="value">{order.address.phone}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
