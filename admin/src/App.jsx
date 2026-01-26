import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/add.jsx'
import List from './pages/List/List.jsx'
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';//to show toast notifications
import 'react-toastify/dist/ReactToastify.css';//import toastify css




const App = ({url}) => {
   const url = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer/>
        <Navbar />
        <hr />
        <div className="app-content">
            <Sidebar />
            <Routes>
                <Route path='/add' element={<Add url={url} />} />
                {/* use props to pass url to child component  */}
                <Route path='/list' element={<List url={url} />} />
                <Route path='/orders' element={<Orders url={url} />} />
            </Routes>
        </div>
      
    </div>
  )
}

export default App
