import React, { useState } from 'react';
import "../style/loginForm.css"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import load from "../assets/load.gif";

const API = "http://localhost:5000/api/";

const LoginForm = () => {
  // setChecking(false)
  const [error, setError] = useState();
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(data)
  const navigate = useNavigate();
  const RegisterRoute = () => {
    navigate("/register");
  };

  const showPassword = () => {
    setHide(false);
  };

  const HidePassword = () => {
    setHide(true);
  };

  const handleChange = (e) => {
    setError();
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  };

  const handleForgotPwd = () => {
    navigate("/forgotpassword");
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    Axios.post(API + "/", {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        setLoading(false);
        setError();
        // console.log(res.data)
        localStorage.setItem("token", res.data.Token);
        localStorage.setItem("email", res.data.Name);
        localStorage.setItem("address", res.data.Address);
        navigate("/order"); //orderpage route
      })
      .catch((e) => {
        setLoading(false);
        setError(JSON.stringify(e.response.data));
      });
    };

  return (
    <>
    <div className="full-wrapper">
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
                <input type='text' className={!error?"form-email":"form-email-error"} id="email" value={data.email} onChange={(e) => { handleChange(e)}} placeholder="Mobile / Email" />
                <input type={hide?"password":"text"} className={!error?"form-pwd":"form-pwd-error"} id="password" value={data.password} onChange={(e) => { handleChange(e) }} placeholder="Password" />
                {hide ? <FaEyeSlash onClick={showPassword} size="1.2em" cursor="pointer" color="#77838F" /> : <FaEye onClick={HidePassword} size="1.2em" color="#77838F" cursor="pointer" />}
              </div>
              <p className="forgot-pwd" onClick={handleForgotPwd}>forgot password?</p>
              <button className="submit-sign-in">Sign In</button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm