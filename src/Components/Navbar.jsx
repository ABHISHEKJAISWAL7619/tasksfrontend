import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/Userslice";
// import { logout } from "../store/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userstore  = useSelector((state)=>state.user)
  // console.log(userstore)
  const  login =userstore.login;
  // console.log(login)
  
  return (
    <div>
      <nav  className="flex justify-between items-center  pr-4 border border-gray-100 bg-white " >
        <img className="h-16 w-44 "
          src="https://images-platform.99static.com/8mc2pZDV0s_nXHMZOF--H-QhZzY=/500x500/top/smart/99designs-contests-attachments/20/20319/attachment_20319607"
          alt=""
        />
        <ul className="flex gap-10 font-bold" >
        {login === false ? (
    <>
        <Link to="/login">
            <li>Login</li>
        </Link>
        <Link to="/signup">
            <li>SignUp</li>
        </Link>
    </>
) : (
    <Link onClick={() => dispatch(logout())}>
        <li>Logout</li>
    </Link>
)}

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
