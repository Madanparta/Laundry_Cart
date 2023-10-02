import React, { useState } from 'react';
import "../OrderHeader/oheader.css";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import load from "../../../assets/load.gif";

const OHeader = () => {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);

  const handleRoute = ()=>{
    setLoading(true);
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('address')
    navigate('/')
    setLoading(false)
    
  }
  return (
    <>
      <nav className="head-nav-bar">
        {loading ? <img className="loading" src={load} alt="loading" /> : ""}
        <h3 className="app-name">LAUNDRY</h3>
        <div className='navbar'>
          <button className="btn-price">Pricing</button>
          <button className="btn-career">Career</button>
          <div className="dropdown">
            <button className="dropbtn">
              <FaUserCircle size="1.5em" />
              <div>{localStorage.getItem("email")}</div>
            </button>
            <div className="dropdown-content">
              <button className="log-out" onClick={handleRoute}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default OHeader