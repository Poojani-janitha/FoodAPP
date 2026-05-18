import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from "../../../../assets/frontend_assets/assets.js"
import { useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {

  //use functions and data of store context
  const{cartItems, addToCart,removeFromCart} = useContext(StoreContext);
  
  // Construct image URL
  let imageUrl = image;
  
  if (image) {
    if (image.startsWith('http')) {
      // Already a full URL
      imageUrl = image;
    } else if (image.includes('/') || image.includes('\\')) {
      // Uploaded image path - use backend URL
      imageUrl = `http://localhost:4000/images/${image.split('\\').pop().split('/').pop()}`;
    } else if (image.match(/^\d+[a-zA-Z]/)) {
      // Uploaded image filename starting with timestamp
      imageUrl = `http://localhost:4000/images/${image}`;
    } else {
      // Asset image reference - get from assets object
      const foodImage = assets[image];
      imageUrl = foodImage || image;
    }
  }
  
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={imageUrl} alt={name} onError={(e) => {
              // Fallback if image fails to load
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="240"%3E%3Crect fill="%23f0f0f0" width="240" height="240"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy="0.3em" fill="%23999" font-size="16"%3EImage not found%3C/text%3E%3C/svg%3E';
            }} />
            {!cartItems[id]
              ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''  />
              : <div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p >{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt="" />
              </div>
            } 
        </div>

        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-desc'>{description}</p>
            <p className="food-item-price">Rs {price}</p>
        </div>

    </div>
  )
}

export default FoodItem
