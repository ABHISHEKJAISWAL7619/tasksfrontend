import React, { useEffect } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateuser } from './store/Userslice'
// import { updateuser } from './store/UserSlice'
// import { store } from './store/store'

const App = () => {
  let dispatch = useDispatch();

  const userstore= useSelector((state)=>state.user)
  // console.log(userstore)
  // console.log(userstore.user)
  const user  = userstore.user;
  // console.log(user)




  const getUserdetails  = async()=>{
    let res = await axios.get("https://tasks-7nbg.onrender.com/getuserdetails",{
      headers: {
        Authorization: `Bearer ${userstore.token}`
      }
    })
    let data = res.data;
    // console.log(data)
    dispatch(updateuser(data))
  }


  useEffect(()=>{
   if(userstore.token){
    getUserdetails()
   }
  },[userstore.token])




  return (
    <div>
    
      <BrowserRouter>
      
      <Routes>
        <Route  path="/" element={<Dashboard />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/signup" element={<Signup />} />
      </Routes>
      </BrowserRouter>

     
      <ToastContainer position="bottom-right" autoClose={3000}  theme="dark" />


      
    </div>
  )
}

export default App
