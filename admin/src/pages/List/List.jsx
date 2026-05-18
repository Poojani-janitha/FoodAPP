import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets as foodAssets } from '../../../../assets/frontend_assets/assets.js'

const List = ({url}) => {
 
  const [list, setList] = useState([])

  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) {
      return image;
    } else if (image.includes('/') || image.includes('\\')) {
      return `${url}/images/${image.split('\\').pop().split('/').pop()}`;
    } else if (image.match(/^\d+[a-zA-Z]/)) {
      return `${url}/images/${image}`;
    } else {
      // Asset image reference
      const foodImage = foodAssets[image];
      return foodImage || image;
    }
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data)
      } else {
        toast.error('Failed to fetch list')
      }
    } catch (error) {
      toast.error('Error fetching data')
    }
  }


  useEffect(() => {
    fetchList()
  }, [])

  const deleteItem = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
      await fetchList();
      if(response.data.success){
        toast.success('Item deleted successfully')
      } else {
        toast.error('Failed to delete item')
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete item')
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => (
          <div className="list-table-format" key={index}>
            <img src={getImageUrl(item.image)} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Rs{item.price}</p>
            <p onClick={() => deleteItem(item._id)} className='cursor'>x</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
