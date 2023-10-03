import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const SideNavbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);
   
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

export default SideNavbar;

