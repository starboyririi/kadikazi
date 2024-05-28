// src/Components/LoginRegister/LoginRegister.js
// src/Components/LoginRegister/LoginRegister.js
import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginRegister = () => {
  const navigate= useNavigate();
  const [action, setAction] = useState('');

  const passwordLink = () => {
    setAction(' active');
    navigate()
  };
  
  return (
    <div className={`wrapper${action}`}>
      <div className='form-box Login'>
        <Login />
        <a href="#" onClick={passwordLink}>Forgot password?</a>
        <div className='register-link'>
          <p>Don't have an account? <a href="http://localhost:3000/register" >Register</a></p>
        </div>
      </div>
      <div className='form-box Password'>
        <ForgotPassword />
        <div className='register-link'>
          <p>Already have an account? <a href="http://localhost:3000/login" >Login</a></p>
        </div>
      </div>
      
      </div>
    
  );
};
function Login() {
  const [lvalues, setLValues] = useState({
    EmailAddress: '',
    Password: ''
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/login', lvalues)
      .then(res => {
        if (res.data.Status === "Success") {
          console.log('Successful Login', lvalues);
          navigate('/index'); // Redirect to the homepage or any other page after login
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.log(err));
    console.log('Form submitted:', lvalues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className='input-box'>
        <input
          type="email"
          placeholder='Email Address'
          value={lvalues.EmailAddress}
          onChange={(e) => setLValues({ ...lvalues, EmailAddress: e.target.value })}
          required
        />
        <FaUser className='icon' />
      </div>
      <div className='input-box'>
        <input
          type="password"
          placeholder='Password'
          value={lvalues.Password}
          onChange={(e) => setLValues({ ...lvalues, Password: e.target.value })}
          required
        />
        <FaLock className='icon' />
      </div>
      <div className='remember-forgot'>
        <label>
          <input type="checkbox" />
          Remember me
        </label>
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}



function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/send-reset-link', { email })
      .then(res => {
        if (res.data.Status === "Success") {
          console.log('Email reset link sent', email);
           
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => console.error('Error:', err));
  };

    return (
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className='input-box'>
          <input
            type="email"
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className='icon' />
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  }






export default LoginRegister;