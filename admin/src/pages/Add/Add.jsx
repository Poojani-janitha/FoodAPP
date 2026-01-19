import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios';
import { toast } from 'react-toastify';


const Add = () => {
  const url ="http://localhost:4000"
  const [image, setImage] = useState(false);//to store the uploaded image
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  });//to store the product details

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }//to handle input changes

 
  //to log data changes for debugging
  //  useEffect(()=>{
  //   console.log(data);
  //  },[data]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();//prevent page reload on form submit
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', Number(data.price));//prepare form data for submission

    try {
      //to call the api use axios 
      const response = await axios.post(`${url}/api/food/add`, formData);
      if(response.data.success){
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: ""
        });
        setImage(false);
        toast.success(response.data.message);
       
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding food item");
    }
  }

  return (



    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" >
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" /> 
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder='Write content here' rows="6"></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$20' />
          </div>
        </div>

        <button type="submit" className="add-btn">ADD</button>

      </form>
    </div>
  )
}

export default Add
