import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import './LoginRegister.css';
import { useNavigate,  } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8081';

const LoginRegister = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState('');

  const passwordLink = () => {
    setAction(' active');
  };

  return (
    <div className={`wrapper${action}`}>
      <div className='form-box Login'>
        <p>Enter your email address and password</p>
        <Login navigate={navigate} />
        <div className='forgotText'>
          <a href="#" onClick={passwordLink}>Forgot password?</a>
        </div>
        <div className='register-link'>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
      <div className='form-box Password'>
        <ForgotPassword />
        <div className='register-link'>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

const Login = ({ navigate }) => {
  const [lvalues, setLValues] = useState({
    EmailAddress: '',
    Password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', lvalues);
      if (res.data.Status === "Success") {
        console.log('Successful Login', lvalues);
        // const userType = res.data.userType;
        // const id = res.data.userId
        navigate(`/`); // Redirect to the homepage with userType
      } else {
        console.log(res.data.Message);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error or server is down');
    }
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
      <button type='submit'>Login</button>
    </form>
  );
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/send-reset-link', { email })
      .then(res => {
        if (res.data.Status === "Success") {
          console.log('Email reset link sent', email);
        } else {
          alert(res.data.Message);
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
};

export default LoginRegister;
