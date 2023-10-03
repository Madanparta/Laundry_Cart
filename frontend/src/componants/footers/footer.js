import React from "react";
import "./footer.css"
import Bckground from '../../Images/Footer.svg'
import { FaFacebookSquare, FaInstagram, FaLinkedin } from 'react-icons/fa'

const FooterLogin = () => {
   return (
      <>
         <footer className="foot-container">
            <div className="footer-1">Now Refer & Earn ₹500 for every referral*</div>
            <div className="footer-2">*Terms and Conditions Applied.</div>
            <div className="foot-content">
               <img src={Bckground} className="footer-img" alt='footer-img' />
               <div className="cont-1">
                  <h3>ABOUT US</h3>
                  <p>Doorstep Wash & DryClean Service</p>
               </div>

               <div className="cont-2">
                  <p >Home</p>
                  <p>Sign-in</p>
                  <p>Register</p>
               </div>
               <p className="cont-3">Pricing</p>
               <div className="cont-4">
                  <p>Career</p>
                  <p>Blogs</p>
                  <p>Create</p>
               </div>

               <p className="cont-5">Contact</p>
               <div className="cont-6">
                  <p ><b>SOCIAL MEDIA</b></p>
                  <FaFacebookSquare size="1.5em" color="#5861AE" /> <FaInstagram size="1.5em" color="#5861AE" /> <FaLinkedin size="1.5em" color="#5861AE" />
               </div>
            </div>

            <div className="footer-3">2023 © LAUNDRY</div>
         </footer>
      </>
   )
}

export default FooterLogin;