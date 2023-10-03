import React from 'react';
import {useNavigate} from 'react-router-dom'
import "./header.css";

const Header = ()=>{
    const navigate = useNavigate()
    const handleRoute = ()=>{
        navigate('/')
    }
    return (
        <>
        <nav className='head-nav-bar'>
            <h3 className='app-name' onClick={handleRoute}>LAUNDRY</h3>
            <button className='btn-home'>HOME</button>
            <button className='btn-price'>PRICING</button>
            <button className='btn-career'>CAREER</button>
            <button className='btn-sign-in' onClick={handleRoute}>SIGN-IN</button>
        </nav>
        </>
    )
}

export default Header;