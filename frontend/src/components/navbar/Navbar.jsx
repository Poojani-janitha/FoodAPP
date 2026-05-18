import React, { useState, useContext, Profiler } from 'react'
import './Navbar.css'
import { assets } from "../../../../assets/frontend_assets/assets.js"
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext.jsx'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {

    //crate state variable and initialize with home
    const [menu, setMenu] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);

    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setShowDropdown(false);
        navigate("/");
    }

    const goToOrders = () => {
        navigate("/orders");
        setShowDropdown(false);
    }

    return (

        <div className='navbar'>
            <Link to="/"> <img src={assets.logo} alt="" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
                        : <div className="navbar-profile">
                            <img src={assets.parcel_icon} alt="" onClick={() => setShowDropdown(!showDropdown)} />
                            {showDropdown && <ul className="nav-profile-dropdown">
                                <li onClick={goToOrders}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout </p></li>
                            </ul>}

                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar
  