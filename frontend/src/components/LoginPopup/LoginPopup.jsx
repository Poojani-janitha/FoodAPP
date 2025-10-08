import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
    const[currentState,setCurrState] = useState("Sign Up")
  return (
    <div classname = 'login-popup'>
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            <input type="text" placeholder='Your name' required />
            <input type="text" placeholder='Your email' required />
            <input type="text" placeholder='Password' required />
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
