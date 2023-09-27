import React, { useState } from 'react';
import "../style/loginForm.css"
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User ID:', email);
    console.log('Password:', password);
  };

  return (
    <div className='login_container'>
      <div className='left_register_container'>
        <h2 className='rigster_container_header'>Laundry Service</h2>
        <div className="left_text_container">
          <p className='rigster_container_text'>Doorstep Wash & Dryclean Service</p>
          <p>Don’t Have An Account?</p>
          <Link to="/register" className='Regiter_link'>Register</Link>
        </div>
      </div>

      <div className="right_login_container">
        <h2>SIGN IN</h2>
        <div className="right_container">

          <form onSubmit={handleSubmit}>

            <div>
              <input placeholder='Mobil / Email' type="text" id="email" name="email" required value={email} onChange={(e) => setemail(e.target.value)} />
            </div>

            <div>
              <input placeholder='Password' type={showPassword ? 'text' : 'password'} id="password" name="password"required value={password} onChange={(e) => setPassword(e.target.value)}/>
              <span className="password-toggle" onClick={handlePasswordToggle}>
                {showPassword ? <i style={{cursor:"pointer"}} class="fa-solid fa-lock-open"></i> : <i style={{cursor:"pointer"}} class="fa-solid fa-lock"></i>}
              </span>
            </div>
            <p className='forgot_password'>Forget Password?</p>

            <div className='button_sign_in'>
              <button className='sign_in_btn' type="submit">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm