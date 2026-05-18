import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from "../../../../assets/frontend_assets/assets.js"
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext.jsx';

const LoginPopup = ({setShowLogin}) => {
  const {url,token,setToken} = useContext(StoreContext);
    const[currentState,setCurrState] = useState("Login")
    const[data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    //on change handler to take data form the input fields and set it to the data state
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({
            ...data,
            [name]:value
        }))
    };

    const onLogin = async (e) =>{
      e.preventDefault();
      try{
        let newUrl = url;
        if(currentState === "Login"){
          newUrl += "/api/users/login";
        } else {
          newUrl += "/api/users/register";
        }
        const response = await axios.post(newUrl, data);
        if(response?.data?.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token); //store token in local storage
            setShowLogin(false); //close the login popup
        } else {
           alert(response?.data?.message || "Authentication failed");
        }
      } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || err.message || "Network or server error");
      }
    }
  return (
    <div className = 'login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState === "Login"?<></>: <input name="name" onChange={handleChange} value={data.name} type="text" placeholder='Your name' required />}
            <input name="email" onChange={handleChange} value={data.email} type="email" placeholder='Your email' required />
            <input name="password" onChange={handleChange} value={data.password}  type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up"?"Create account":"Login"}</button>
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
