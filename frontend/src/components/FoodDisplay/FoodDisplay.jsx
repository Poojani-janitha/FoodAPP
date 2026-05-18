import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

 const FoodDisplay = ({category}) => {

    const {foodList} = useContext(StoreContext);
  return (
    <div className='food-display' id ='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {foodList && foodList.length > 0 ? (
                foodList.map((item,index)=>{
                  if(category==="All" || category === item.category){
                     return <FoodItem key ={index} id= {item._id} name={item.name} description={item.description} price ={item.price} image = {item.image}></FoodItem>
                  }
                })
            ) : (
                <p>Loading food items...</p>
            )}
        </div>
    </div>
  )
}

export default FoodDisplay;
