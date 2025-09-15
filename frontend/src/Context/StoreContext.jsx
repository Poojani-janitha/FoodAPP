import { createContext ,useState, useEffect} from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider =(props) =>{
//this is like a centeral storage for app's data
    const [cartItems,setCartItems] = useState({});
    const addToCart = (itemId) =>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
              setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    const contextValue ={
            food_list,//share data about food list
            cartItems, //share cart data
            setCartItems,
            addToCart,  //function to update data
            removeFromCart  //function to update data

    }

    useEffect(()=>{
        console.log(cartItems);
},[cartItems])
    return(
        <StoreContext.Provider  value={contextValue}>
            {props.children}
        </StoreContext.Provider>
)
}

export default StoreContextProvider;