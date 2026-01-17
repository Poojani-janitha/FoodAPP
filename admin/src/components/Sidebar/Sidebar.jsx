import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets.js'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <div className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Item</p>
        </div>

        <div className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List</p>
        </div>

        <div className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Orders</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
