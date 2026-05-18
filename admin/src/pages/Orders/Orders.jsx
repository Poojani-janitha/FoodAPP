import React, { useState, useEffect } from 'react'
import './Orders.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { assets } from '../../assets/assets.js'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    // Update UI immediately (optimistic update)
    setOrders(orders.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
    
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId: orderId,
        status: newStatus
      });
      if (response.data.success) {
        toast.success("Status Updated");
      } else {
        // Revert on error
        await fetchAllOrders();
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.log(error);
      // Revert on error
      await fetchAllOrders();
      toast.error("Error updating status");
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [url])

  return (
    <div className='orders'>
      <h1>Orders Management</h1>
      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet</p>
        </div>
      ) : (
        <div className='orders-list'>
          {orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div className='order-info'>
                <p className='order-id'>Order #{order._id.slice(-8)}</p>
                <p className='order-date'>{new Date(order.date).toLocaleDateString()}</p>
                <div className='order-items'>
                  {order.items.map((item, idx) => (
                    <p key={idx}>{item.name} x {item.quantity}</p>
                  ))}
                </div>
                <p className='order-address'>
                  {order.address.firstName} {order.address.lastName}, {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}
                </p>
                <p className='order-phone'>Phone: {order.address.phone}</p>
              </div>
              <p className='order-amount'>Rs{order.amount.toFixed(2)}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='order-status'>
                <option value="Food Being Prepared">Food Being Prepared</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
