import React, { useState } from 'react';
import "../../headers/header.css";
import "./navbar.css";
import load from "../../../Images/load.gif";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const OrderNavBar = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const handleRoute = () => {
        setLoading(true)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('address')
        navigate('/')
        setLoading(false)
    }
    return (
        <>
            <nav className='head-nav-bar'>
                {loading ? (<img className="loading" src={load} alt="loading" />) : ''}
                <h3 className='app-name'>LAUNDRY</h3>
                <button className='btn-price'>PRICING</button>
                <button className='btn-career'>CAREER</button>
                <div className="dropdown">
                    <button className="dropbtn"><FaUserCircle size="1.5em" /><div>{localStorage.getItem('username')}</div></button>
                    <div className="dropdown-content">
                        <button className='log-out' onClick={handleRoute}>LOGOUT</button>
                    </div>
                </div>

            </nav>
        </>
    )
}
export default OrderNavBar;