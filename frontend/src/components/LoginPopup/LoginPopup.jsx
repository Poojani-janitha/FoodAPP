import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from "../../../../assets/frontend_assets/assets.js"

const LoginPopup = ({setShowLogin}) => {
    const[currentState,setCurrState] = useState("Sign Up")
  return (
    <div className = 'login-popup'>
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState === "Login"?<></>: <input type="text" placeholder='Your name' required />}
            <input type="text" placeholder='Your email' required />
            <input type="text" placeholder='Password' required />
        </div>
        <button>{currentState === "Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
         <p>Already have an account?<span onClick={()=>setCurrState("Login")}>Logon here</span></p>}
        
       
      </form>
    </div>
  )
}

export default LoginPopup
