import React from "react";
import "./login.css"
import Header from "../../headers/header_login";
import { useNavigate } from "react-router-dom";
import FooterLogin from "../../footers/footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Axios from 'axios';
import load from "../../../Images/load.gif";

const API = process.env.REACT_APP_API || "https://laundry-cart-madan.onrender.com"
// const API = process.env.REACT_APP_API || "http://localhost:5000"

const Login = () => {
    const [error, setError] = useState()
    const [hide, setHide] = useState(true);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()
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
    const handleForgotPwd = ()=>{
        navigate('/forgotpassword')
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        Axios.post(API + "/login", {
            username: data.username,
            password: data.password
        })
            .then((res) => {
                setLoading(false)
                setError()
                // console.log(res.data)
                localStorage.setItem('token', res.data.Token)
                localStorage.setItem('username', res.data.Name)
                localStorage.setItem('address', res.data.Address)
                navigate('/order')   //orderpage route
            }).catch((e) => {
                setLoading(false)
                setError(JSON.stringify(e.response.data))
            })

    }

    return (
        <>
            <div className="full-wrapper">
                <Header />
                {loading ? (<img className="loading" src={load} alt="loading" />) : ''}
                <div className="login-container">
                    <div className="half">
                        <div className="para-line-1">LAUNDRY SERVICE</div>
                        <h2 className="line2">Doorstep Wash & DryClean Service</h2>

                        <h3 className="line-3">Don't have an Account?</h3>
                        <button className="regitr-btn" onClick={RegisterRoute}>Register</button>

                    </div>
                    <div className="half-s">
                        <h2 className="form-head">SIGN IN</h2>
                        <form onSubmit={(e) => handleSubmit(e)} className="login-form">
                            <div className="side-line">
                                <div className="e-message">{error}</div>
                                <input type='text' className={!error?"form-email":"form-email-error"} id="username" value={data.username} onChange={(e) => { handleChange(e)}} placeholder="Mobile / Email" />
                                <input type={hide?"password":"text"} className={!error?"form-pwd":"form-pwd-error"} id="password" value={data.password} onChange={(e) => { handleChange(e) }} placeholder="Password" />
                                {hide ? <FaEyeSlash onClick={showPassword} size="1.2em" cursor="pointer" color="#77838F" /> : <FaEye onClick={HidePassword} size="1.2em" color="#77838F" cursor="pointer" />}
                            </div>
                            <p className="forgot-pwd" onClick={handleForgotPwd}>forgot password?</p>
                            <button className="submit-sign-in">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
            <FooterLogin />

        </>
    )
}

export default Login