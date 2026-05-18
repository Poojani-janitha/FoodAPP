import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [category,setCategory] =useState("All");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}></FoodDisplay>
        <AppDownload/>
    </div>
  )
}

export default Home
