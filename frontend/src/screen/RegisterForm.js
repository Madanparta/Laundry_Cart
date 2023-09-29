import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tick from "../assets/tick.png";
import Axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../style/RegisterForm.css';
import load from "../assets/load.gif";

const API = "http://localhost:5000/api";


const RegisterForm = () => {
  const [error, setError] = useState();
  const [popup , setPopup] = useState(false)
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handlerRoute = () =>{
    navigate('/')
  }

  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    address: "",
    pincode: "",
    password: ""

  })

  // console.log(data)

  const handleChange = (e) => {
    setError()
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  const showPassword = () => {
    setHide(false);
  }
  const HidePassword = () => {
    setHide(true);
  }
  const handlePopSubmit = ()=>{
    setPopup(false)
    navigate('/')
  }

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault()
    await Axios.post(API + "/register", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        district: data.district,
        address: data.address,
        pincode: data.pincode,
        password: data.password
    })
        .then(res => {
          console.log(res);
            setError()
            setLoading(false);
            setPopup(true);
            
        }).catch((e) => {
          console.log(e)
            setLoading(false)
            setError(JSON.stringify(e.response.data))
        })

  }

  return (
    <>
    {loading ? (<img className="loading" src={load} alt="loading" />) : ''}

    <div className='registerForm_container'>

      <div className="register_Left_container">
        <h1 className="part-1">Laundry Service</h1>
        <p className="part-2">DoorStep Wash & </p>
        <p className="part-3">Delivery Service</p>
        <div className="part-4">Already Have Account?</div>
        <button onClick={handlerRoute} className="part-5">Sign In</button>
      </div>

      {popup?(<div className="popup">
        <img src={tick} alt="popUp-Img" width="200px" height="200px"/>
        <h2>User Created SuccessFully!!</h2>
        <button className="popup-sub-btn" onClick={handlePopSubmit}>Sign-In</button>
      </div>):""}

      <div className="register_right_container">

        <h1 className="register-head">REGISTER</h1>
        <div className="err">{error}</div>

        <form onSubmit={(e)=> {handleSubmit(e)}}>

          <div className="table">
            <input type="text" id="name" placeholder="Name" onChange={(e) => handleChange(e)} value={data.name} required />
            <input type="email" id="email" className={error?"form-err":''} placeholder="Email" onChange={(e) => handleChange(e)} value={data.email} required />

            <div className="side">
              <input type="tel" id="phone"  className={error?"form-err":''} pattern="[0-9]{10}" title="Ex:-9988776655" placeholder="Phone" onChange={(e) => handleChange(e)} value={data.phone} required />
              <input type="text" id="state" placeholder="State" onChange={(e) => handleChange(e)} value={data.state} required />
              <input type="text" id="district" placeholder="District" onChange={(e) => handleChange(e)} value={data.district} required />
              <input type="text" id="address" placeholder="Address" onChange={(e) => handleChange(e)} value={data.address} required />
            </div>

            <input type="Number" id="pincode" placeholder="Pincode" onChange={(e) => handleChange(e)} value={data.pincode} required />
            <input type={hide?"password":"text"} id="password" minLength="5" maxLength="16" placeholder="Password" onChange={(e) => handleChange(e)} value={data.password} required />

            {hide?<FaEyeSlash onClick={showPassword} size="1.2em" cursor="pointer" color="#77838F" /> : <FaEye onClick={HidePassword} size="1.2em" color="#77838F" cursor="pointer" />}

          </div>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">I agree to Terms & Condition receiving marketing and promotional materials</label>
          <button className="btn-regis">Register</button>

        </form>

      </div>
    </div>
    </>
  )
}

export default RegisterForm