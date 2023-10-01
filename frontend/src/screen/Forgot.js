import React from 'react';
import '../style/forgot.css';
import "../style/loginForm.css";
import "../style/RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Axios from 'axios';
import load from "../assets/load.gif";
import tick from "../assets/tick.png";

const API = "http://localhost:5000/api/";

const Forgot = () => {
    const [popup , setPopup] = useState(false)
    const [error, setError] = useState()
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const RegisterRoute = () => {
        navigate('/register')
    }

    const showPassword = () => {
        setHide(false);
    }

    const HidePassword = () => {
        setHide(true);
    }

    
    const handleChange = (e) => {
        setError()
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }
    const handlePopSubmit = ()=>{
        setPopup(false)
        navigate('/')
    }

    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        Axios.put(API + "/forgotpassword", {
            email: data.email,
            password: data.password
        })
            .then((res) => {
               
                setLoading(false)
                setPopup(true)
                setError()
                // console.log(res.data)
            }).catch((e) => {
                setLoading(false)
                // console.log(e)
                setError(JSON.stringify(e.response.data))
            })
            

    }


  return (
    <>

    {loading ? (<img className="loading" src={load} alt="loading" />) : ''}

    <div className="login-container">
        <div className="half">
            <div className="para-line-1">LAUNDRY SERVICE</div>
                <h2 className="line2">Doorstep Wash & DryClean Service</h2>

                <h3 className="line-3">Don't have an Account?</h3>
                <button className="regitr-btn" onClick={RegisterRoute}>Register</button>

            </div>
            {popup?(<div className="popup">
            <img src={tick} alt="popUp-Img" width="200px" height="200px"/>
            <h2>Password Reset SuccessFully!!</h2>
            <button className="popup-sub-btn" onClick={handlePopSubmit}>Sign-In</button>
        </div>):""}

        <div className="half-s">
            <h2 className="heading">FORGOT PASSWORD</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="login-form">
                <div className="side-line">
                    <div className="e-message">{error}</div>
                    <input type='text' className={!error?"form-email":"form-email-error"} id="email" value={data.email} onChange={(e) => { handleChange(e)}} placeholder="Mobile / Email" />
                    <input type={hide?"password":"text"} className={!error?"form-pwd":"form-pwd-error"} id="password" value={data.password} onChange={(e) => { handleChange(e) }} placeholder="Password" />
                    {hide ? <FaEyeSlash onClick={showPassword} size="1.2em" cursor="pointer" color="#77838F" /> : <FaEye onClick={HidePassword} size="1.2em" color="#77838F" cursor="pointer" />}
                </div>
                <button className="submit-sign-in">Forgot Password</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Forgot