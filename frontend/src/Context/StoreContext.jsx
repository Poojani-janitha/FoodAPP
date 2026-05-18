import { createContext, useState, useEffect } from "react";
import { food_list } from "../../../assets/frontend_assets/assets.js";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    //this is like a centeral storage for app's data
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);
    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    } 

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }

        }
        return totalAmount;
    }

    const fetchFoodList = async() =>{
        try {
            const response = await fetch(url + `/api/food/list`);
            const data = await response.json();
            if(data.success) {
                setFoodList(data.data);
            }
        } catch(error) {
            console.error("Error fetching food list:", error);
        }
    }
    useEffect(() => {
        
        async function loadData(){
                await fetchFoodList();
                if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }
        }
        loadData();
    }, [])

    const contextValue = {
        foodList,//share data about food list
        cartItems, //share cart data
        setCartItems,
        addToCart,  //function to update data
        removeFromCart, //function to update data
        getTotalCartAmount,
        url,
        token,
        setToken


    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;