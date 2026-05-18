import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../../../assets/frontend_assets/assets.js'

const Cart = () => {
  const{cartItems,foodList,removeFromCart, getTotalCartAmount}=useContext(StoreContext)

  const navigate = useNavigate();
  
  // Function to get proper image URL
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) {
      return image;
    } else if (image.includes('/') || image.includes('\\')) {
      return `http://localhost:4000/images/${image.split('\\').pop().split('/').pop()}`;
    } else if (image.match(/^\d+[a-zA-Z]/)) {
      return `http://localhost:4000/images/${image}`;
    } else {
      // Asset image reference
      const foodImage = assets[image];
      return foodImage || image;
    }
  };
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item,index)=>{
          if(cartItems[item._id]>0){
            return(
             <div key={item._id}>
                <div className='cart-items-item'>
                <img src={getImageUrl(item.image)} alt={item.name} />
                <p>{item.name}</p>
                <p>Rs{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs{item.price*cartItems[item._id]}</p>
                <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
                </div>  
                <hr />
              </div>
              
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs{getTotalCartAmount()}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>Rs{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />

              <div className="cart-total-details">
                  <p>Total</p>
                  <p>Rs{getTotalCartAmount()===0?0:getTotalCartAmount()+2 }</p>
              </div>

            </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If yoy have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' name="" id="" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
