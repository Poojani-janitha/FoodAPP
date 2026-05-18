import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={assets.logo} alt="" className="logo" />
        <div className="navbar-right">
          <p className="admin-text">Admin Panel</p>
          <img src={assets.profile_image} alt="" className="profile" />
        </div>
      
    </div>
  )
}

export default Navbar
