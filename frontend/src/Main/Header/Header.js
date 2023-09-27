import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css";


const Header = () => {
  return (
    <div className="header_container">
      <div className="hero_logo">
        <h1>LAUNDRY</h1>
      </div>
      <nav>
        <ul className='nav_ul'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/'>Pricing</Link></li>
          <li><Link to='/'>Careers</Link></li>
          <li><Link to='/'>Sign In</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;