import React from 'react';
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <>
    <div className="navbar-container" >
        <nav className="navbar">
            <span><i className="fa-solid fa-house-user "></i></span>
            <span><i 
            className={`fa-solid fa-circle-plus ${location.pathname === "/createorder" ?"selector" :""}`}
            onClick={()=>{
                navigate("/createorder");
            }}
            ></i></span>
            <span><i 
            className={`fa-solid fa-list ${location.pathname === "/order" ?"selector" :""}`}
            onClick={()=>{
                navigate("/order");
            }}
            ></i></span>
        </nav>
    </div>
    </>
  )
}

export default SideBar