import React from 'react'
import './Header.css'
import { assets } from '../../../../assets/frontend_assets/assets.js'

const Header = () => {
  return (
    <div className='header' style={{backgroundImage: `url(${assets.header_img})`}}>
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafred with the satisfy your craving and elevate your dining expereance, one delicious meal at a time.</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header
