import React, { useRef } from 'react';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
let nameref =  useRef()
let emailref =  useRef()
let passwordref =  useRef()
let navigate  = useNavigate();

const handlesubmit =async (e)=>{
    e.preventDefault()
   try {
    let obj = {
      name : nameref.current.value,
      email :emailref.current.value,
     password : passwordref.current.value,
 }
 // console.log(obj)
 let res = await axios.post("https://tasks-7nbg.onrender.com/user/create",obj)
 console.log(res.data)
 if (res.data.success) {
  toast.success("User signup successful");
  navigate("/login");
} else {

  toast.error(res.data.message,{position:'top-center',theme:"dark"})
}

    
   } catch (error) {
    toast.error(error.message)

    
   }
   
}


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="fixed z-50 w-full">
     <Navbar />
     </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-4 my-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
              ref={nameref}
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
              ref={emailref}
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
              ref={passwordref}
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
            onClick={handlesubmit}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
